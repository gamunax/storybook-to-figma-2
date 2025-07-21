import { AnimationEvent } from '@angular/animations';
import { AriaDescriber, FocusMonitor } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import {
  ConnectedPosition,
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  OriginConnectionPosition,
  Overlay,
  OverlayConnectionPosition,
  OverlayRef,
  ScrollDispatcher,
  ScrollStrategy,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { normalizePassiveListenerOptions, Platform } from '@angular/cdk/platform';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  SecurityContext,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { ThemingService } from 'atlas-cdk';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { TooltipAnimations } from './tooltip-animations';
import { TooltipPosition, TooltipTouchGestures, TooltipVisibility } from './tooltip.const';
import { config } from './tooltip.theming';
import { DomSanitizer } from '@angular/platform-browser';

/** Time in ms to throttle repositioning after scroll events. */
export const SCROLL_THROTTLE_MS = 20;

const PANEL_CLASS = 'tooltip-panel';

/** Options used to bind passive event listeners. */
const passiveListenerOptions = normalizePassiveListenerOptions({passive: true});

/**
 * Time between the user putting the pointer on a tooltip
 * trigger and the long press event being fired.
 */
const LONGPRESS_DELAY = 500;

/**
 * Creates an error to be thrown if the user supplied an invalid tooltip position.
 * @docs-private
 */
export function getTooltipInvalidPositionError(position: string) {
  return Error(`Tooltip position "${position}" is invalid.`);
}

/** Injection token that determines the scroll handling while a tooltip is visible. */
export const TOOLTIP_SCROLL_STRATEGY = new InjectionToken<() => ScrollStrategy>(
  'tooltip-scroll-strategy',
);

/** @docs-private */
export function TOOLTIP_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition({scrollThrottle: SCROLL_THROTTLE_MS});
}

/** @docs-private */
export const TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: TOOLTIP_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: TOOLTIP_SCROLL_STRATEGY_FACTORY,
};

/** Default `haloTooltip` options that can be overridden. */
export interface haloTooltipDefaultOptions {
  showDelay: number;
  hideDelay: number;
  touchendHideDelay: number;
  touchGestures?: TooltipTouchGestures;
  position?: TooltipPosition;
}

/** Injection token to be used to override the default options for `haloTooltip`. */
export const TOOLTIP_DEFAULT_OPTIONS = new InjectionToken<haloTooltipDefaultOptions>(
  'tooltip-default-options',
  {
    providedIn: 'root',
    factory: TOOLTIP_DEFAULT_OPTIONS_FACTORY,
  },
);

/** @docs-private */
export function TOOLTIP_DEFAULT_OPTIONS_FACTORY(): haloTooltipDefaultOptions {
  return {
    showDelay: 0,
    hideDelay: 0,
    touchendHideDelay: 1500,
  };
}

@Directive()
export abstract class _TooltipBase<T extends _TooltipComponentBase>
  implements OnDestroy, AfterViewInit
{
  _overlayRef: OverlayRef | null;
  _tooltipInstance: T | null;

  private _portal: ComponentPortal<T>;
  private _position: TooltipPosition = TooltipPosition.bottom;
  private _useArrow: boolean = false;
  private _disabled: boolean = false;
  private _tooltipClass: string | string[] | Set<string> | {[key: string]: any};
  private _tooltipTypography: string = 'typographyStyles-label-smallAlt';
  private _scrollStrategy: () => ScrollStrategy;
  private _viewInitialized = false;
  private _pointerExitEventsInitialized = false;
  protected abstract readonly _tooltipComponent: ComponentType<T>;
  protected _viewportMargin = 8;
  private _currentPosition: TooltipPosition;
  protected readonly _cssClassPrefix: string = 'halo';

  /** Allows the user to define the position of the tooltip relative to the parent element */
  @Input('haloTooltipPosition')
  get position(): TooltipPosition {
    return this._position;
  }
  set position(value: TooltipPosition) {
    if (value !== this._position) {
      this._position = value;

      if (this._overlayRef) {
        this._updatePosition(this._overlayRef);
        this._tooltipInstance?.show(0);
        this._overlayRef.updatePosition();
      }
    }
  }

  /** Set to show arrow in the tooltip message. */
  @Input('haloTooltipWithArrow')
  get useArrow(): boolean {
    return this._useArrow;
  }
  set useArrow(value: boolean) {
    if (value !== this._useArrow) {
      this._useArrow = value;     
      this._updateTooltipWithArrow();
    }
  }

  /** Disables the display of the tooltip. */
  @Input('haloTooltipDisabled')
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: BooleanInput) {
    this._disabled = coerceBooleanProperty(value);

    // If tooltip is disabled, hide immediately.
    if (this._disabled) {
      this.hide(0);
    } else {
      this._setupPointerEnterEventsIfNeeded();
    }
  }

  /** The default delay in ms before showing the tooltip after show is called */
  @Input('haloTooltipShowDelay')
  get showDelay(): number {
    return this._showDelay;
  }
  set showDelay(value: NumberInput) {
    this._showDelay = coerceNumberProperty(value);
  }
  private _showDelay: number;

  /** The default delay in ms before hiding the tooltip after hide is called */
  @Input('haloTooltipHideDelay')
  get hideDelay(): number {
    return this._hideDelay;
  }
  set hideDelay(value: NumberInput) {
    this._hideDelay = coerceNumberProperty(value);
  }
  private _hideDelay: number;

  /**
   * How touch gestures should be handled by the tooltip. On touch devices the tooltip directive
   * uses a long press gesture to show and hide, however it can conflict with the native browser
   * gestures. To work around the conflict, Angular Material disables native gestures on the
   * trigger, but that might not be desirable on particular elements (e.g. inputs and draggable
   * elements). The different values for this option configure the touch event handling as follows:
   * - `auto` - Enables touch gestures for all elements, but tries to avoid conflicts with native
   *   browser gestures on particular elements. In particular, it allows text selection on inputs
   *   and textareas, and preserves the native browser dragging on elements marked as `draggable`.
   * - `on` - Enables touch gestures for all elements and disables native
   *   browser gestures with no exceptions.
   * - `off` - Disables touch gestures. Note that this will prevent the tooltip from
   *   showing on touch devices.
   */
  @Input('haloTooltipTouchGestures') touchGestures: TooltipTouchGestures = TooltipTouchGestures.auto;

  /** The message to be displayed in the tooltip */
  @Input('haloTooltip')
  get message() {
    return this._message;
  }
  set message(value: string) {
    this._ariaDescriber.removeDescription(this._elementRef.nativeElement, this._message, 'tooltip');

    // If the message is not a string (e.g. number), convert it to a string and trim it.
    // Must convert with `String(value)`, not `${value}`, otherwise Closure Compiler optimises
    // away the string-conversion: https://github.com/angular/components/issues/20684
    this._message = value != null ? this._sanitizer.sanitize(SecurityContext.HTML, value) : '';

    if (!this._message && this._isTooltipVisible()) {
      this.hide(0);
    } else {
      this._setupPointerEnterEventsIfNeeded();
      this._updateTooltipMessage();
      this._ngZone.runOutsideAngular(() => {
        // The `AriaDescriber` has some functionality that avoids adding a description if it's the
        // same as the `aria-label` of an element, however we can't know whether the tooltip trigger
        // has a data-bound `aria-label` or when it'll be set for the first time. We can avoid the
        // issue by deferring the description by a tick so Angular has time to set the `aria-label`.
        Promise.resolve().then(() => {
          this._ariaDescriber.describe(this._elementRef.nativeElement, this.message, 'tooltip');
        });
      });
    }
  }
  private _message = '';

  /** Classes to be passed to the tooltip. Supports the same syntax as `ngClass`. */
  @Input('haloTooltipClass')
  get tooltipClass() {
    return this._tooltipClass;
  }
  set tooltipClass(value: string | string[] | Set<string> | {[key: string]: any}) {
    this._tooltipClass = value;
    if (this._tooltipInstance) {
      this._setTooltipClass(this._tooltipClass);
    }
  }

  @Input('haloTooltipTypography')
  get tooltipTypography() {
    return this._tooltipTypography;
  }
  set tooltipTypography(value: string) {
    this._tooltipTypography = value;
    if (this._tooltipInstance) {
      this._setTooltipClass(this._tooltipClass);
    }
  }

  /** Manually-bound passive event listeners. */
  private readonly _passiveListeners: (readonly [string, EventListenerOrEventListenerObject])[] =
    [];

  /** Reference to the current document. */
  private _document: Document;

  /** Timer started at the last `touchstart` event. */
  private _touchstartTimeout: number;

  /** Emits when the component is destroyed. */
  private readonly _destroyed = new Subject<void>();

  constructor(
    private _overlay: Overlay,
    private _elementRef: ElementRef<HTMLElement>,
    private _scrollDispatcher: ScrollDispatcher,
    private _viewContainerRef: ViewContainerRef,
    private _ngZone: NgZone,
    private _platform: Platform,
    private _ariaDescriber: AriaDescriber,
    private _focusMonitor: FocusMonitor,
    scrollStrategy: any,
    protected _dir: Directionality,
    private _defaultOptions: haloTooltipDefaultOptions,
    @Inject(DOCUMENT) _document: any,
    private _sanitizer: DomSanitizer
  ) {
    this._scrollStrategy = scrollStrategy;
    this._document = _document;
    this._showDelay = _defaultOptions?.showDelay;
    this._hideDelay = _defaultOptions?.hideDelay;

    if (_defaultOptions) {
      if (_defaultOptions.position) {
        this.position = _defaultOptions.position;
      }

      if (_defaultOptions.touchGestures) {
        this.touchGestures = _defaultOptions.touchGestures;
      }
    }

    _dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => {
      if (this._overlayRef) {
        this._updatePosition(this._overlayRef);
      }
    });
  }

  ngAfterViewInit() {
    // This needs to happen after view init so the initial values for all inputs have been set.
    this._viewInitialized = true;
    this._setupPointerEnterEventsIfNeeded();

    this._focusMonitor
      .monitor(this._elementRef)
      .pipe(takeUntil(this._destroyed))
      .subscribe(origin => {
        // Note that the focus monitor runs outside the Angular zone.
        if (!origin) {
          this._ngZone.run(() => this.hide(0));
        } else if (origin === 'keyboard') {
          this._ngZone.run(() => this.show());
        }
      });
  }

  /**
   * @internal
   * Dispose the tooltip when destroyed.
   */
  ngOnDestroy() {
    const nativeElement = this._elementRef.nativeElement;

    clearTimeout(this._touchstartTimeout);

    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._tooltipInstance = null;
    }

    // Clean up the event listeners set in the constructor
    this._passiveListeners.forEach(([event, listener]) => {
      nativeElement.removeEventListener(event, listener, passiveListenerOptions);
    });
    this._passiveListeners.length = 0;

    this._destroyed.next();
    this._destroyed.complete();

    this._ariaDescriber.removeDescription(nativeElement, this.message, 'tooltip');
    this._focusMonitor.stopMonitoring(nativeElement);
  }

  /** 
   * Shows the tooltip after the delay in ms, defaults to tooltip-delay-show or 0ms if no input 
   */
  public show(delay: number = this.showDelay): void {
    if (
      this.disabled ||
      !this.message ||
      (this._isTooltipVisible() &&
        !this._tooltipInstance!._showTimeoutId &&
        !this._tooltipInstance!._hideTimeoutId)
    ) {
      return;
    }

    const overlayRef = this._createOverlay();
    this._detach();
    this._portal =
      this._portal || new ComponentPortal(this._tooltipComponent, this._viewContainerRef);
    this._tooltipInstance = overlayRef.attach(this._portal).instance;
    this._tooltipInstance
      .afterHidden()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());
    this._setTooltipClass(this._tooltipClass);
    this._updateTooltipMessage();
    this._updateTooltipWithArrow();
    this._tooltipInstance!.show(delay);
  }

  /** 
   * Hides the tooltip after the delay in ms, defaults to tooltip-delay-hide or 0ms if no input 
   */
  hide(delay: number = this.hideDelay): void {
    if (this._tooltipInstance) {
      this._tooltipInstance.hide(delay);
    }
  }

  /** 
   * Shows/hides the tooltip 
   */
  toggle(): void {
    this._isTooltipVisible() ? this.hide() : this.show();
  }

  /** 
   * @internal
   * Returns true if the tooltip is currently visible to the user */
  _isTooltipVisible(): boolean {
    return !!this._tooltipInstance && this._tooltipInstance.isVisible();
  }

  /** Create the overlay config and position strategy */
  private _createOverlay(): OverlayRef {
    if (this._overlayRef) {
      return this._overlayRef;
    }

    const scrollableAncestors = this._scrollDispatcher.getAncestorScrollContainers(
      this._elementRef,
    );

    // Create connected position strategy that listens for scroll events to reposition.
    const strategy = this._overlay
      .position()
      .flexibleConnectedTo(this._elementRef)
      .withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`)
      .withFlexibleDimensions(false)
      .withViewportMargin(this._viewportMargin)
      .withScrollableContainers(scrollableAncestors);

    strategy.positionChanges.pipe(takeUntil(this._destroyed)).subscribe(change => {
      this._updateCurrentPositionClass(change.connectionPair);

      if (this._tooltipInstance) {
        if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance.isVisible()) {
          // After position changes occur and the overlay is clipped by
          // a parent scrollable then close the tooltip.
          this._ngZone.run(() => this.hide(0));
        }
      }
    });

    this._overlayRef = this._overlay.create({
      direction: this._dir,
      positionStrategy: strategy,
      panelClass: `${this._cssClassPrefix}-${PANEL_CLASS}`,
      scrollStrategy: this._scrollStrategy(),
    });

    this._updatePosition(this._overlayRef);

    this._overlayRef
      .detachments()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());

    this._overlayRef
      .outsidePointerEvents()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._tooltipInstance?._handleBodyInteraction());

    this._overlayRef
      .keydownEvents()
      .pipe(takeUntil(this._destroyed))
      .subscribe(event => {
        if (this._isTooltipVisible() && event.keyCode === ESCAPE && !hasModifierKey(event)) {
          event.preventDefault();
          event.stopPropagation();
          this._ngZone.run(() => this.hide(0));
        }
      });

    return this._overlayRef;
  }

  /** Detaches the currently-attached tooltip. */
  private _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }

    this._tooltipInstance = null;
  }

  /** Updates the position of the current tooltip. */
  private _updatePosition(overlayRef: OverlayRef) {
    const position = overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();

    position.withPositions([
      this._addOffset({...origin.main, ...overlay.main}),
      this._addOffset({...origin.fallback, ...overlay.fallback}),
    ]);
  }

  /** Adds the configured offset to a position. Used as a hook for child classes. */
  protected _addOffset(position: ConnectedPosition): ConnectedPosition {
    return position;
  }

  /**
   * Returns the origin position and a fallback position based on the user's position preference.
   * The fallback position is the inverse of the origin (e.g. `'bottom' -> 'above'`).
   */
  _getOrigin(): {main: OriginConnectionPosition; fallback: OriginConnectionPosition} {
    const isLtr = !this._dir || this._dir.value == 'ltr';
    const position = this.position;
    let originPosition: OriginConnectionPosition;

    if (position == 'top' || position == 'bottom') {
      originPosition = {originX: 'center', originY: position == 'top' ? 'top' : 'bottom'};
    } 
    else if (
      position == 'before' ||
      (position == 'left' && isLtr) ||
      (position == 'right' && !isLtr)
    ) {
      originPosition = {originX: 'start', originY: 'center'};
    } else if (
      position == 'after' ||
      (position == 'right' && isLtr) ||
      (position == 'left' && !isLtr)
    ) {
      originPosition = {originX: 'end', originY: 'center'};
    } 

    const {x, y} = this._invertPosition(originPosition!.originX, originPosition!.originY);

    return {
      main: originPosition!,
      fallback: {originX: x, originY: y},
    };
  }

  /** Returns the overlay position and a fallback position based on the user's preference */
  _getOverlayPosition(): {main: OverlayConnectionPosition; fallback: OverlayConnectionPosition} {
    const isLtr = !this._dir || this._dir.value == 'ltr';
    const position = this.position;
    let overlayPosition: OverlayConnectionPosition;

    if (position == 'top') {
      overlayPosition = {overlayX: 'center', overlayY: 'bottom'};
    } else if (position == 'bottom') {
      overlayPosition = {overlayX: 'center', overlayY: 'top'};
    } 
    else if (
      position == 'before' ||
      (position == 'left' && isLtr) ||
      (position == 'right' && !isLtr)
    ) {
      overlayPosition = {overlayX: 'end', overlayY: 'center'};
    } else if (
      position == 'after' ||
      (position == 'right' && isLtr) ||
      (position == 'left' && !isLtr)
    ) {
      overlayPosition = {overlayX: 'start', overlayY: 'center'};
    } 

    const {x, y} = this._invertPosition(overlayPosition!.overlayX, overlayPosition!.overlayY);

    return {
      main: overlayPosition!,
      fallback: {overlayX: x, overlayY: y},
    };
  }

  /** Updates the tooltip message and repositions the overlay according to the new message length */
  private _updateTooltipMessage() {
    // Must wait for the message to be painted to the tooltip so that the overlay can properly
    // calculate the correct positioning based on the size of the text.
    if (this._tooltipInstance) {
      this._tooltipInstance.message = this.message;
      this._tooltipInstance._markForCheck();

      this._ngZone.onMicrotaskEmpty.pipe(take(1), takeUntil(this._destroyed)).subscribe(() => {
        if (this._tooltipInstance) {
          this._overlayRef!.updatePosition();
        }
      });
    }
  }

  private _updateTooltipWithArrow() {
    if (this._tooltipInstance) {
      this._tooltipInstance.useArrow = this.useArrow;
      this._tooltipInstance._markForCheck();      
    }
  }

  /** Updates the tooltip class */
  private _setTooltipClass(tooltipClass: string | string[] | Set<string> | {[key: string]: any}) {
    if (this._tooltipInstance) {
      this._tooltipInstance.tooltipClass = tooltipClass;
      this._tooltipInstance._markForCheck();
    }
  }

  /** Inverts an overlay position. */
  private _invertPosition(x: HorizontalConnectionPos, y: VerticalConnectionPos) {
    if (this.position === 'top' || this.position === 'bottom') {
      if (y === 'top') {
        y = 'bottom';
      } else if (y === 'bottom') {
        y = 'top';
      }
    } else {
      if (x === 'end') {
        x = 'start';
      } else if (x === 'start') {
        x = 'end';
      }
    }

    return {x, y};
  }

  /** Updates the class on the overlay panel based on the current position of the tooltip. */
  private _updateCurrentPositionClass(connectionPair: ConnectionPositionPair): void {
    const {overlayY, originX, originY} = connectionPair;
    let newPosition: TooltipPosition;

    // If the overlay is in the middle along the Y axis,
    // it means that it's either before or after.
    if (overlayY === 'center') {
      // Note that since this information is used for styling, we want to
      // resolve `start` and `end` to their real values, otherwise consumers
      // would have to remember to do it themselves on each consumption.
      if (this._dir && this._dir.value === 'rtl') {
        newPosition = originX === 'end' ? TooltipPosition.left : TooltipPosition.right;
      } else {
        newPosition = originX === 'start' ? TooltipPosition.left : TooltipPosition.right;
      }
    } else {
      newPosition = overlayY === 'bottom' && originY === 'top' ? TooltipPosition.top : TooltipPosition.bottom;
    }

    if (newPosition !== this._currentPosition) {
      const overlayRef = this._overlayRef;

      if (overlayRef) {
        const classPrefix = `${this._cssClassPrefix}-${PANEL_CLASS}-`;
        overlayRef.removePanelClass(classPrefix + this._currentPosition);
        overlayRef.addPanelClass(classPrefix + newPosition);
      }

      this._currentPosition = newPosition;
    }
  }

  /** Binds the pointer events to the tooltip trigger. */
  private _setupPointerEnterEventsIfNeeded() {
    // Optimization: Defer hooking up events if there's no message or the tooltip is disabled.
    if (
      this._disabled ||
      !this.message ||
      !this._viewInitialized ||
      this._passiveListeners.length
    ) {
      return;
    }

    // The mouse events shouldn't be bound on mobile devices, because they can prevent the
    // first tap from firing its click event or can cause the tooltip to open for clicks.
    if (this._platformSupportsMouseEvents()) {
      this._passiveListeners.push([
        'mouseenter',
        () => {
          this._setupPointerExitEventsIfNeeded();
          this.show();
        },
      ]);
    } else if (this.touchGestures !== 'off') {
      this._disableNativeGesturesIfNecessary();

      this._passiveListeners.push([
        'touchstart',
        () => {
          // Note that it's important that we don't `preventDefault` here,
          // because it can prevent click events from firing on the element.
          this._setupPointerExitEventsIfNeeded();
          clearTimeout(this._touchstartTimeout);
          this._touchstartTimeout = window.setTimeout(() => this.show(), LONGPRESS_DELAY);
        },
      ]);
    }

    this._addListeners(this._passiveListeners);
  }

  private _setupPointerExitEventsIfNeeded() {
    if (this._pointerExitEventsInitialized) {
      return;
    }
    this._pointerExitEventsInitialized = true;

    const exitListeners: (readonly [string, EventListenerOrEventListenerObject])[] = [];
    if (this._platformSupportsMouseEvents()) {
      exitListeners.push(
        ['mouseleave', () => this.hide()],
        ['wheel', event => this._wheelListener(event as WheelEvent)],
      );
    } else if (this.touchGestures !== 'off') {
      this._disableNativeGesturesIfNecessary();
      const touchendListener = () => {
        clearTimeout(this._touchstartTimeout);
        this.hide(this._defaultOptions.touchendHideDelay);
      };

      exitListeners.push(['touchend', touchendListener], ['touchcancel', touchendListener]);
    }

    this._addListeners(exitListeners);
    this._passiveListeners.push(...exitListeners);
  }

  private _addListeners(listeners: (readonly [string, EventListenerOrEventListenerObject])[]) {
    listeners.forEach(([event, listener]) => {
      this._elementRef.nativeElement.addEventListener(event, listener, passiveListenerOptions);
    });
  }

  private _platformSupportsMouseEvents() {
    return !this._platform.IOS && !this._platform.ANDROID;
  }

  /** Listener for the `wheel` event on the element. */
  private _wheelListener(event: WheelEvent) {
    if (this._isTooltipVisible()) {
      const elementUnderPointer = this._document.elementFromPoint(event.clientX, event.clientY);
      const element = this._elementRef.nativeElement;

      // On non-touch devices we depend on the `mouseleave` event to close the tooltip, but it
      // won't fire if the user scrolls away using the wheel without moving their cursor. We
      // work around it by finding the element under the user's cursor and closing the tooltip
      // if it's not the trigger.
      if (elementUnderPointer !== element && !element.contains(elementUnderPointer)) {
        this.hide();
      }
    }
  }

  /** Disables the native browser gestures, based on how the tooltip has been configured. */
  private _disableNativeGesturesIfNecessary() {
    const gestures = this.touchGestures;

    if (gestures !== 'off') {
      const element = this._elementRef.nativeElement;
      const style = element.style;

      // If gestures are set to `auto`, we don't disable text selection on inputs and
      // textareas, because it prevents the user from typing into them on iOS Safari.
      if (gestures === 'on' || (element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA')) {
        style.userSelect =
          (style as any).msUserSelect =
          style.webkitUserSelect =
          (style as any).MozUserSelect =
            'none';
      }

      // If we have `auto` gestures and the element uses native HTML dragging,
      // we don't set `-webkit-user-drag` because it prevents the native behavior.
      if (gestures === 'on' || !element.draggable) {
        (style as any).webkitUserDrag = 'none';
      }

      style.touchAction = 'none';
      (style as any).webkitTapHighlightColor = 'transparent';
    }
  }
}

@Directive({
  selector: '[haloTooltip], haloTooltip',
  exportAs: 'haloTooltip',
  host: {
    'class': 'tooltip-trigger',
  },
})
export class Tooltip extends _TooltipBase<TooltipComponent> {
  protected readonly _tooltipComponent = TooltipComponent;

  constructor(
    overlay: Overlay,
    elementRef: ElementRef<HTMLElement>,
    scrollDispatcher: ScrollDispatcher,
    viewContainerRef: ViewContainerRef,
    ngZone: NgZone,
    platform: Platform,
    ariaDescriber: AriaDescriber,
    focusMonitor: FocusMonitor,
    @Inject(TOOLTIP_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() dir: Directionality,
    @Optional() @Inject(TOOLTIP_DEFAULT_OPTIONS) defaultOptions: haloTooltipDefaultOptions,
    @Inject(DOCUMENT) _document: any,
    _sanitizer: DomSanitizer,
  ) {
    super(
      overlay,
      elementRef,
      scrollDispatcher,
      viewContainerRef,
      ngZone,
      platform,
      ariaDescriber,
      focusMonitor,
      scrollStrategy,
      dir,
      defaultOptions,
      _document,
      _sanitizer
    );
  }
}

@Directive()
export abstract class _TooltipComponentBase implements OnDestroy {
  /** @internal Message to display in the tooltip */
  message: string;

  /** @internal Classes to be added to the tooltip. Supports the same syntax as `ngClass`. */
  tooltipClass: string | string[] | Set<string> | {[key: string]: any};
  
  /** @internal Set the tooltip typography class */
  tooltipTypography: string = 'typographyStyles-label-smallAlt';

  /** @internal Set to display arrow in the tooltip */
  useArrow: boolean = true;
  
  /** 
   * @internal
   * The timeout ID of any current timer set to show the tooltip 
   */
  _showTimeoutId: number | undefined;

  /** 
   * @internal
   * The timeout ID of any current timer set to hide the tooltip 
   */
  _hideTimeoutId: number | undefined;

  /** 
   * @internal
   * Property watched by the animation framework to show or hide the tooltip 
   */
  _visibility: TooltipVisibility = TooltipVisibility.initial;

  /** @internal Whether interactions on the page should close the tooltip */
  private _closeOnInteraction: boolean = false;

  /** @internal Subject for notifying that the tooltip has been hidden from the view */
  private readonly _onHide: Subject<void> = new Subject();

  constructor(private _changeDetectorRef: ChangeDetectorRef) {}

  /**
   * Shows the tooltip with an animation originating from the provided origin
   * @param delay Amount of milliseconds to the delay showing the tooltip.
   */
  show(delay: number): void {
    // Cancel the delayed hide if it is scheduled
    clearTimeout(this._hideTimeoutId);

    // Body interactions should cancel the tooltip if there is a delay in showing.
    this._closeOnInteraction = true;
    this._showTimeoutId = window.setTimeout(() => {
      this._visibility = TooltipVisibility.visible;
      this._showTimeoutId = undefined;
      this._onShow();

      // Mark for check so if any parent component has set the
      // ChangeDetectionStrategy to OnPush it will be checked anyways
      this._markForCheck();
    }, delay);
  }

  /**
   * Begins the animation to hide the tooltip after the provided delay in ms.
   * @param delay Amount of milliseconds to delay showing the tooltip.
   */
  hide(delay: number): void {
    // Cancel the delayed show if it is scheduled
    clearTimeout(this._showTimeoutId);

    this._hideTimeoutId = window.setTimeout(() => {
      this._visibility = TooltipVisibility.hidden;
      this._hideTimeoutId = undefined;

      // Mark for check so if any parent component has set the
      // ChangeDetectionStrategy to OnPush it will be checked anyways
      this._markForCheck();
    }, delay);
  }

  /** 
   * @internal
   * Returns an observable that notifies when the tooltip has been hidden from view. */
  afterHidden(): Observable<void> {
    return this._onHide;
  }

  /** 
   * @internal
   * Whether the tooltip is being displayed. */
  isVisible(): boolean {
    return this._visibility === 'visible';
  }

  /** @internal */
  ngOnDestroy() {
    clearTimeout(this._showTimeoutId);
    clearTimeout(this._hideTimeoutId);
    this._onHide.complete();
  }

  /** @internal */
  _animationStart() {
    this._closeOnInteraction = false;
  }

  /** @internal */
  _animationDone(event: AnimationEvent): void {
    const toState = event.toState as TooltipVisibility;

    if (toState === 'hidden' && !this.isVisible()) {
      this._onHide.next();
    }

    if (toState === 'visible' || toState === 'hidden') {
      this._closeOnInteraction = true;
    }
  }

  /**
   * @internal
   * Interactions on the HTML body should close the tooltip immediately
   */
  _handleBodyInteraction(): void {
    if (this._closeOnInteraction) {
      this.hide(0);
    }
  }

  /**
   * @internal
   * Marks that the tooltip needs to be checked in the next change detection run.
   * Mainly used for rendering the initial text before positioning a tooltip, which
   * can be problematic in components with OnPush change detection.
   */
  _markForCheck(): void {
    this._changeDetectorRef.markForCheck();
  }

  /**
   * @internal
   * Callback for when the timeout in this.show() gets completed.
   * This method is only needed by the mdc-tooltip, and so it is only implemented
   * in the mdc-tooltip, not here.
   */  
  protected _onShow(): void {}
}

@Component({
  selector: 'atlas-tooltip',
  template:`
  <div class="{{useArrow ? 'atlas-tooltip' : 'atlas-tooltip-no-arrow'}}"
    [ngClass]="tooltipClass"
    [class.tooltip-handset]="(_isHandset | async)?.matches"
    [@state]="_visibility"
    (@state.start)="_animationStart()"
    (@state.done)="_animationDone($event)">
    <span [ngClass]="[tooltipTypography]" [innerHTML]="message"></span>
  </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [TooltipAnimations.tooltipState],
  host: {
    '[style.zoom]': '_visibility === "visible" ? 1 : null',
    'aria-hidden': 'true',
  },
})
export class TooltipComponent extends _TooltipComponentBase {

  /**
   * @internal
   */
  _isHandset: Observable<BreakpointState>;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private _breakpointObserver: BreakpointObserver,
    private themingService: ThemingService,
  ) {
    super(changeDetectorRef);
    this._isHandset = _breakpointObserver?.observe(Breakpoints.Handset);
    this.themingService.applyConfig(config);    
  }
}