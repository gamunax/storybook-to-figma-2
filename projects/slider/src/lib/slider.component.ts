/** The creation of this component is based on the brighter-slider with modifications */
import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { Actions, BoxShadows, Colors, ThemingService } from 'atlas-cdk';
import { config } from './slider.theming';

const activeEventOptions = normalizePassiveListenerOptions({passive: false});

/**
 * @internal
 * Visually, a 30px separation between tick marks looks best. This is very subjective but it is
 * the default separation we chose.
 */
const MIN_AUTO_TICK_SEPARATION = 30;

/** 
 * @internal
 * The thumb gap size for a disabled slider.
 */
const DISABLED_THUMB_GAP = 7;

/** 
 * @internal 
 * The thumb gap size for a non-active slider at its minimum value. 
 */
const MIN_VALUE_NONACTIVE_THUMB_GAP = 7;

/** 
 * @internal
 * The thumb gap size for an active slider at its minimum value. 
 */
const MIN_VALUE_ACTIVE_THUMB_GAP = 7;

/** A simple change event emitted by the SliderComponent component. */
export class SliderChange {
  /** 
   * @internal
   * The SliderComponent that changed. 
   */
  source: SliderComponent;

  /** 
   * @internal
   * The new value of the source slider. 
   */
  value: number | number[] | null;
}
/**
 * The slider is a form component used to denote a percentage or range selection.
 */
@Component({
  selector: 'atlas-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderComponent),
      multi: true
    },
  ],
  host: {
    'class': 'atlas-slider',
    '[attr.role]': '_isRangeSlider ? "range" :"slider"',
    '[attr.tabindex]': 'tabIndex',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-disabled]': 'disabled',
    '[attr.aria-valuemax]': 'max',
    '[attr.aria-valuemin]': 'min',
    '[attr.aria-valuenow]': 'value',
    '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
    '[class.atlas-slider--disabled]': 'disabled',
    '[class.atlas-slider--has-ticks]': 'tickInterval',
    '[class.atlas-slider--horizontal]': '!vertical',
    '[class.atlas-slider--axis-inverted]': '_invertAxis && !_isRangeSlider',
    '[class.atlas-slider--sliding]': '_isSliding',
    '[class.atlas-slider--sliding-left]': '_isSliding ? _currentSliderDir === "left" : false',
    '[class.atlas-slider--sliding-right]': '_isSliding ? _currentSliderDir === "right" : false',
    '[class.atlas-slider--focused-left]': 'focused ? _currentSliderDir === "left" : false',
    '[class.atlas-slider--focused-right]': 'focused ? _currentSliderDir === "right" : false',
    '[class.atlas-slider--thumb-label-showing]': 'thumbLabel',
    '[class.atlas-slider--vertical]': 'vertical',
    '[class.atlas-slider--min-value]': '_isMinValue',
    '[class.atlas-slider--max-value]': '_isMaxValue',
    '[class.atlas-slider--range]': '_isRangeSlider',
    // On Safari starting to slide temporarily triggers text selection mode which
    // show the wrong cursor. We prevent it by stopping the `selectstart` event.
    '(selectstart)': '$event.preventDefault()',
    '(focus)': '_onFocus()',
    '(blur)': '_onBlur()',
    '(keydown)': '_onKeydown($event)',
    '(keyup)': '_onKeyup()',
    '(mouseenter)': '_onMouseenter()',
  },
})
export class SliderComponent implements AfterViewInit, OnDestroy, ControlValueAccessor {
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   *  Action style for slider
  */
  @Input() action: Actions;
  /**
   * Color style for slider
   */
  @Input() color: Colors = Colors.brand;
   /** Shadow elevation of the accordion group */
   @Input() elevation = BoxShadows.flat;
  /** Whether the slider is disabled. */
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }
  private _disabled = false;

  /** Tabindex for the slider. */
  @Input('tabindex') tabindex: number = 0;
  /** @internal */
  @HostBinding('attr.tabindex') get tabIndex(): string {
    return this.disabled ? '-1' : `${this.tabindex}`;
  };

  /** Aria label for rating. */
  @Input('aria-label') ariaLabel = '';


  /** 
   * @internal 
   * Whether the slider is inverted. */
  // @Input() NOTE: Not UX approved
  get invert(): boolean { return this._invert; }
  set invert(value: boolean) {
    this._invert = coerceBooleanProperty(value);
  }
  private _invert = false;

  /** The maximum value that the slider can have. */
  @Input()
  get max(): number { return this._max; }
  set max(v: number) {
    this._max = coerceNumberProperty(v, this._max);
    this._percent = this._calculatePercentage(this._value);

    // Since this also modifies the percentage, we need to let the change detection know.
    this._changeDetectorRef.markForCheck();
  }
  private _max = 100;

  /** The minimum value that the slider can have. */
  @Input()
  get min(): number { return this._min; }
  set min(v: number) {
    this._min = coerceNumberProperty(v, this._min);

    // If the value wasn't explicitly set by the user, set it to the min.
    if (this._value === null) {
      this.value = this._min;
    }
    this._percent = this._calculatePercentage(this._value);

    // Since this also modifies the percentage, we need to let the change detection know.
    this._changeDetectorRef.markForCheck();
  }
  private _min = 0;

  /** The values at which the thumb will snap. */
  @Input()
  get step(): number { return this._step; }
  set step(v: number) {
    this._step = coerceNumberProperty(v, this._step);

    if (this._step % 1 !== 0) {
      this._roundToDecimal = this._step.toString().split('.').pop()?.length;
    }

    // Since this could modify the label, we need to notify the change detection.
    this._changeDetectorRef.markForCheck();
  }
  private _step = 1;

  /** 
   * @internal 
   * Whether or not to show the thumb label. */
  // @Input() NOTE: Not UX approved
  get thumbLabel(): boolean { return this._thumbLabel; }
  set thumbLabel(value: boolean) { this._thumbLabel = coerceBooleanProperty(value); }
  private _thumbLabel = false;

  /**
   * @internal
   * How often to show ticks. Relative to the step so that a tick always appears on a step.
   * Ex: Tick interval of 4 with a step of 3 will draw a tick every 4 steps (every 12 values).
   */
  // @Input() NOTE: Not UX approved
  get tickInterval() { return this._tickInterval; }
  set tickInterval(value: 'auto' | number) {
    if (value === 'auto') {
      this._tickInterval = 'auto';
    } else if (typeof value === 'number' || typeof value === 'string') {
      this._tickInterval = coerceNumberProperty(value, this._tickInterval as number);
    } else {
      this._tickInterval = 0;
    }
  }
  private _tickInterval: 'auto' | number = 0;

  /** Value of the slider. */
  @Input()
  get value(): number | number[] | null {
    // If the value needs to be read and it is still uninitialized, initialize it to the min.
    if (this._value === null) {
      this.value = this._min;
    }
    return this._value;
  }
  set value(v: number | number[] | null) {
    if (v !== this._value ||
       (v instanceof Array && this._value != null &&
       (v[0] !== this._value[0] || v[1] !== this._value[1]))) {

      let value: number | number[] | null = null;
      if (v instanceof Array) {
        value = [coerceNumberProperty(v[0]), coerceNumberProperty(v[1])];
        value = [Math.min(value[0], value[1]), Math.max(value[1], value[0])];
      } else {
        value = coerceNumberProperty(v);
      }

      // While incrementing by a decimal we can end up with values like 33.300000000000004.
      // Truncate it to ensure that it matches the label and to make it easier to work with.
      if (this._roundToDecimal) {
        if (v instanceof Array) {
          value = [
            parseFloat(value[0].toFixed(this._roundToDecimal)),
            parseFloat(value[1].toFixed(this._roundToDecimal))
          ];
        } else {
          value = parseFloat(Number(value).toFixed(this._roundToDecimal));
        }
      }

      this._value = value;
      this._percent = this._calculatePercentage(this._value);

      // Since this also modifies the percentage, we need to let the change detection know.
      this._changeDetectorRef.markForCheck();
    }
  }
  private _value: number | number[] | null = null;

  /**
   * @internal
   * Function that will be used to format the value before it is displayed
   * in the thumb label. Can be used to format very large number in order
   * for them to fit into the slider thumb.
   */
  // @Input() NOTE: Not UX approved
  displayWith: (value: number | null) => string | number;

  /** 
   * @internal 
   * Whether the slider is vertical. */
  // @Input() NOTE: Only for further implementation
  get vertical(): boolean { return this._vertical; }
  set vertical(value: boolean) {
    this._vertical = coerceBooleanProperty(value);
  }
  private _vertical = false;

  /** 
   * @internal 
   * Whether the left and right thumb are moving in sync. */
  // @Input() NOTE: Only for further implementation
  get syncMovement() { return this._syncMovement; }
  set syncMovement(value: any) { this._syncMovement = coerceBooleanProperty(value); }
  private _syncMovement = false;

  /** Event emitted when the slider value has changed. */
  @Output() readonly change: EventEmitter<SliderChange> = new EventEmitter<SliderChange>();

  /** Event emitted when the slider thumb moves. */
  @Output() readonly input: EventEmitter<SliderChange> = new EventEmitter<SliderChange>();

  /**
   * Emits when the raw value of the slider changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   */
  @Output() readonly valueChange: EventEmitter<number | number[] | null> = new EventEmitter<number | number[] | null>();

  /** 
   * @internal 
   * The value to be used for display purposes. */
  get displayValueLeft(): string | number {
    if (this.value == null) {
      return '';
    }
    if (this.displayWith) {
      if (this.value instanceof Array) {
        return this.displayWith(this.value[0]);
      } else {
        return this.displayWith(this.value);
      }
    }

    // Note that this could be improved further by rounding something like 0.999 to 1 or
    // 0.899 to 0.9, however it is very performance sensitive, because it gets called on
    // every change detection cycle.
    if (this.value instanceof Array) {
      if (this._roundToDecimal && this.value &&
         (this.value[0] % 1 !== 0 || this.value[1] % 1 !== 0)) {
        return this.value[0].toFixed(this._roundToDecimal);
      }
    } else {
      if (this._roundToDecimal && this.value && this.value % 1 !== 0) {
        return this.value.toFixed(this._roundToDecimal);
      }
    }

    if (this.value instanceof Array) {
      return this.value[0] || 0;
    } else {
      return this.value || 0;
    }
  }

  /** 
   * @internal 
   * The value to be used for display purposes. */
  get displayValueRight(): string | number {
    if (this.value == null) {
      return '';
    }
    if (this.displayWith) {
      return this.displayWith(this.value[1]);
    }

    // Note that this could be improved further by rounding something like 0.999 to 1 or
    // 0.899 to 0.9, however it is very performance sensitive, because it gets called on
    // every change detection cycle.
    if (this._roundToDecimal && this.value && this.value != null && this.value[1] % 1 !== 0) {
      return this.value[1].toFixed(this._roundToDecimal);
    }

    return this.value[1] || 0;
  }

  /** 
   * @internal 
   * The percentage of the slider that coincides with the value. */
  get percent(): number | number[] { return this._clamp(this._percent); }
  private _percent: number | number[] = 0;

  /**
   * @internal
   * Whether or not the thumb is sliding.
   * Used to determine if there should be a transition for the thumb and fill track.
   */
  _isSliding = false;

  /**
   * @internal
   * Whether or not the slider is active (clicked or sliding).
   */
  _isActive = false;

  /**
   * @internal
   * Whether the axis of the slider is inverted.
   * (i.e. whether moving the thumb in the positive x or y direction decreases the slider's value).
   */
  get _invertAxis() {
    // Standard non-inverted mode for a vertical slider should be dragging the thumb from bottom to
    // top. However from a y-axis standpoint this is inverted.
    return this.vertical ? !this.invert : this.invert;
  }


  /** 
   * @internal 
   * Whether the slider is at its minimum value. */
  get _isMinValue() {
    if (this.value instanceof Array) {
      return this.percent[0] === 0;
    } else {
      return this.percent === 0;
    }
  }

  get _isMaxValue() {
    if (this.value instanceof Array) {
      return this.percent[1] === 1;
    } else {
      return this.percent === 1;
    }
  }

  /**
   * @internal
   * The amount of space to leave between the slider thumb and the track fill & track background
   * elements.
   */
  get _thumbGap() {
    if (this.disabled) {
      return DISABLED_THUMB_GAP;
    }
    if (this._isMinValue && !this.thumbLabel) {
      return this._isActive ? MIN_VALUE_ACTIVE_THUMB_GAP : MIN_VALUE_NONACTIVE_THUMB_GAP;
    }
    return 0;
  }

  /** 
   * @internal 
   * CSS styles for the track background element. */
  get _trackBackgroundStylesLeft(): { [key: string]: string } {
    const axis = this.vertical ? 'Y' : 'X';
    let scale = '';
    if (this.percent instanceof Array) {
      scale = this.vertical ? `1, ${this.percent[0]}, 1` : `${this.percent[0]}, 1, 1`;
    } else {
      scale = this.vertical ? `1, ${this.percent}, 1` : `${this.percent}, 1, 1`;
    }
    const sign = this._shouldInvertMouseCoords() ? '-' : '';

    return {
      // scale3d avoids some rendering issues in Chrome. See #12071.
      transform: `translate${axis}(${sign}${this._thumbGap}px) scale3d(${scale})`
    };
  }

  get _trackBackgroundStylesRight(): { [key: string]: string } {
    const axis = this.vertical ? 'Y' : 'X';
    let scale = '';
    if (this.percent instanceof Array) {
      scale = this.vertical ? `1, ${1 - this.percent[1]}, 1` : `${1 - this.percent[1]}, 1, 1`;
    } else {
      scale = this.vertical ? `1, ${1 - this.percent}, 1` : `${1 - this.percent}, 1, 1`;
    }
    const sign = this._shouldInvertMouseCoords() ? '' : '-';
    return {
      // scale3d avoids some rendering issues in Chrome. See #12071.
      transform: `translate${axis}(${sign}0px) scale3d(${scale})`
    };
  }

  /** 
   * @internal 
   * CSS styles for the track fill element. */
  get _trackFillStyles(): { [key: string]: string } {
    const percent = this.percent;
    const axis = this.vertical ? 'Y' : 'X';
    let scale = '';
    if (percent instanceof Array) {
        scale = this.vertical ?
            `1, ${percent[1] - percent[0]}, 1` :
            `${percent[1] - percent[0]}, 1, 1`;
    } else {
      scale = this.vertical ? `1, ${percent}, 1` : `${percent}, 1, 1`;
    }

    const invertOffset = (this._getDirection() === 'rtl' && !this.vertical) ?
      !this._invertAxis : this._invertAxis;
    let offset = 0;
    if (percent instanceof Array) {
      offset = (invertOffset ? 1 - this.percent[1] : this.percent[0]) * 100;
    } else {
      offset = 0;
    }
    const sign = this._shouldInvertMouseCoords() ? '' : '-';

    if (this._isRangeSlider) {
      return {
        // scale3d avoids some rendering issues in Chrome. See #12071.
        transform: `translate${axis}(${offset}%) scale3d(${scale})`,
        // iOS Safari has a bug where it won't re-render elements which start of as `scale(0)` until
        // something forces a style recalculation on it. Since we'll end up with `scale(0)` when
        // the value of the slider is 0, we can easily get into this situation. We force a
        // recalculation by changing the element's `display` when it goes from 0 to any other value.
        display: percent === 0 ? 'none' : ''
      };
    } else {
      return {
        // scale3d avoids some rendering issues in Chrome. See #12071.
        transform: `translate${axis}(${sign}${this._thumbGap}px) scale3d(${scale})`,
        // iOS Safari has a bug where it won't re-render elements which start of as `scale(0)` until
        // something forces a style recalculation on it. Since we'll end up with `scale(0)` when
        // the value of the slider is 0, we can easily get into this situation. We force a
        // recalculation by changing the element's `display` when it goes from 0 to any other value.
        display: percent === 0 ? 'none' : ''
      };
    }
  }

  /** 
   * @internal 
   * CSS styles for the ticks container element. */
  get _ticksContainerStyles(): { [key: string]: string } {
    const axis = this.vertical ? 'Y' : 'X';
    // For a horizontal slider in RTL languages we push the ticks container off the left edge
    // instead of the right edge to avoid causing a horizontal scrollbar to appear.
    const sign = !this.vertical && this._getDirection() === 'rtl' ? '' : '-';
    const offset = this._tickIntervalPercent / 2 * 100;
    return {
      'transform': `translate${axis}(${sign}${offset}%)`
    };
  }

  /** 
   * @internal 
   * CSS styles for the ticks element. */
  get _ticksStyles(): { [key: string]: string } {
    const tickSize = this._tickIntervalPercent * 100;
    const backgroundSize = this.vertical ? `2px ${tickSize}%` : `${tickSize}% 2px`;
    const axis = this.vertical ? 'Y' : 'X';
    // Depending on the direction we pushed the ticks container, push the ticks the opposite
    // direction to re-center them but clip off the end edge. In RTL languages we need to flip the
    // ticks 180 degrees so we're really cutting off the end edge abd not the start.
    const sign = !this.vertical && this._getDirection() === 'rtl' ? '-' : '';
    const rotate = !this.vertical && this._getDirection() === 'rtl' ? ' rotate(180deg)' : '';
    const styles: { [key: string]: string } = {
      'backgroundSize': backgroundSize,
      // Without translateZ ticks sometimes jitter as the slider moves on Chrome & Firefox.
      'transform': `translateZ(0) translate${axis}(${sign}${tickSize / 2}%)${rotate}`
    };

    if (this._isMinValue && this._thumbGap) {
      let side: string;

      if (this.vertical) {
        side = this._invertAxis ? 'Bottom' : 'Top';
      } else {
        side = this._invertAxis ? 'Right' : 'Left';
      }

      styles[`padding${side}`] = `${this._thumbGap}px`;
    }

    return styles;
  }

  /** 
   * @internal 
   * */
  get _thumbContainerStylesLeft(): { [key: string]: string } {
    const axis = this.vertical ? 'Y' : 'X';
    // For a horizontal slider in RTL languages we push the thumb container off the left edge
    // instead of the right edge to avoid causing a horizontal scrollbar to appear.
    const invertOffset =
        (this._getDirection() === 'rtl' && !this.vertical) ? !this._invertAxis : this._invertAxis;
    let offset = 0;
    if (this.percent instanceof Array) {
      offset = (invertOffset ? this.percent[0] : 1 - this.percent[0]) * 100;
    } else {
      offset = (invertOffset ? this.percent : 1 - this.percent) * 100;
    }
    return {
      'transform': `translate${axis}(-${offset}%)`
    };
  }

  /** 
   * @internal 
   * */
  get _thumbContainerStylesRight(): { [key: string]: string } {
    const axis = this.vertical ? 'Y' : 'X';
    // For a horizontal slider in RTL languages we push the thumb container off the left edge
    // instead of the right edge to avoid causing a horizontal scrollbar to appear.
    const invertOffset =
        (this._getDirection() === 'rtl' && !this.vertical) ? !this._invertAxis : this._invertAxis;
    let offset = 0;
    if (this.percent instanceof Array) {
      offset = (invertOffset ? this.percent[1] : 1 - this.percent[1]) * 100;
    } else {
      offset = (invertOffset ? this.percent : 1 - this.percent) * 100;
    }
    return {
      'transform': `translate${axis}(-${offset}%)`
    };
  }

  /** 
   * @internal 
   * Whether the slider is focused. */
  get focused(): boolean {
    return this._focused;
  }
  set focused(val: boolean) {
    this._focused = coerceBooleanProperty(val);
  }
  private _focused = false;

  /** Whether the slider is a range slider. */
  get _isRangeSlider(): boolean {
    return (this.value instanceof Array);
  }

  /** 
   * @internal 
   * The size of a tick interval as a percentage of the size of the track. */
  private _tickIntervalPercent = 0;

  /** 
   * @internal 
   * The dimensions of the slider. */
  private _sliderDimensions: ClientRect | null = null;

  /** 
   * @internal 
   * Decimal places to round to, based on the step amount. */
  private _roundToDecimal: number;

  /** 
   * @internal 
   * Subscription to the Directionality change EventEmitter. */
  private _dirChangeSubscription = Subscription.EMPTY;

  /** 
   * @internal 
   * The value of the slider when the slide start event fires. */
  private _valueOnSlideStart: number | number[] | null;

  /** 
   * @internal 
   * Position of the pointer when the dragging started. */
  private _pointerPositionOnStart: {x: number, y: number} | null;

  /** 
   * @internal 
   * Reference to the inner slider wrapper element. */
  @ViewChild('sliderWrapper') private _sliderWrapper: ElementRef;

  /** 
   * @internal 
   * Reference to the right thumb element. Used for focusing tabIndex purposes. */
  @ViewChild('rightThumbContainer') private _rightThumbContainer: ElementRef;

  // @ViewChild('leftThumb') private _leftThumb: ElementRef;
  // @ViewChild('rightThumb') private _rightThumb: ElementRef;

  /** 
   * @internal 
   * Keeps track of the last pointer event that was captured by the slider. */
  private _lastPointerEvent: MouseEvent | TouchEvent | null;

  /** 
   * @internal 
   * Used to subscribe to global move and end events */
  protected _document: Document;

  /**
   * @internal
   * The slider thumb which is currently used (left or right) */
  _currentSliderDir: 'left' | 'right' = 'left';

  /** 
   * @internal 
   * onTouch function registered via registerOnTouch (ControlValueAccessor). */
  onTouched: () => any = () => {};

  /** 
   * @internal 
   * */
  private _controlValueAccessorChangeFn: (value: any) => void = () => {};

  constructor(
    private _elementRef: ElementRef,
    private _focusMonitor: FocusMonitor,
    private _changeDetectorRef: ChangeDetectorRef,
    private _themingService: ThemingService,
    @Optional() private _dir: Directionality,
    private _ngZone: NgZone,
    @Inject(DOCUMENT) _document: any,
  ) {
    this._themingService.applyConfig(config);
    this._document = _document;

    _ngZone.runOutsideAngular(() => {
      const element = this._elementRef.nativeElement;
      element.addEventListener('mousedown', this._pointerDown, activeEventOptions);
      element.addEventListener('touchstart', this._pointerDown, activeEventOptions);
    });
  }

  /** 
   * @internal 
   * */
  ngAfterViewInit() {
    this._dirChangeSubscription.add(this._focusMonitor
      .monitor(this._elementRef, true)
      .subscribe((origin: FocusOrigin) => {
        this._isActive = !!origin && origin !== 'keyboard';
        this.focused = true;
        // Set the _currentSliderDir to right because we are focused on the right thumb
        if (this._document.activeElement === this._rightThumbContainer?.nativeElement) {
          this._currentSliderDir = 'right';
        } else {
          this._currentSliderDir = 'left';
        }
        this._changeDetectorRef.detectChanges();
      }));
    if (this._dir) {
      this._dirChangeSubscription.add(this._dir.change.subscribe(() => {
        this._changeDetectorRef.markForCheck();
      }));
    }
  }

  /** 
   * @internal 
   * */
  ngOnDestroy() {
    const element = this._elementRef.nativeElement;
    element.removeEventListener('mousedown', this._pointerDown, activeEventOptions);
    element.removeEventListener('touchstart', this._pointerDown, activeEventOptions);
    this._lastPointerEvent = null;
    this._removeGlobalEvents();
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._dirChangeSubscription.unsubscribe();
  }

  /** 
   * @internal 
   * set focus to the host element */
  focus(options?: FocusOptions) {
    this._focusHostElement(options);
  }

  /** 
   * @internal 
   * blur the host element */
  blur() {
    this._blurHostElement();
  }

  /**
   * @internal
   * Whether mouse events should be converted to a slider position by calculating their distance
   * from the right or bottom edge of the slider as opposed to the top or left.
   */
  private _shouldInvertMouseCoords() {
    return (this._getDirection() === 'rtl' && !this.vertical) ? !this._invertAxis : this._invertAxis;
  }

  /**@internal  The language direction for this slider element. */
  private _getDirection() {
    return (this._dir && this._dir.value === 'rtl') ? 'rtl' : 'ltr';
  }

  /** 
   * @internal 
   * */
  _onMouseenter() {
    if (this.disabled) {
      return;
    }

    // We save the dimensions of the slider here so we can use them to update the spacing of the
    // ticks and determine where on the slider click and slide events happen.
    this._sliderDimensions = this._getSliderDimensions();
    this._updateTickIntervalPercent();
  }

  /** 
   * @internal 
   * */
  _onFocus() {
    // We save the dimensions of the slider here so we can use them to update the spacing of the
    // ticks and determine where on the slider click and slide events happen.
    this._sliderDimensions = this._getSliderDimensions();
    this._updateTickIntervalPercent();
  }

  /** 
   * @internal 
   * */
  _onBlur() {
    this.onTouched();
  }

  /** 
   * @internal 
   * */
  _onKeydown(event: KeyboardEvent) {
    if (this.disabled || hasModifierKey(event)) {
      return;
    }

    const oldValue = this.value;

    switch (event.key) {
      case 'PageUp':
        this._increment(10);
        break;
      case 'PageDown':
        this._increment(-10);
        break;
      case 'End':
        this.value = this.max;
        break;
      case 'Home':
        this.value = this.min;
        break;
      case 'ArrowLeft':
      case 'Left':
        // NOTE: For a sighted user it would make more sense that when they press an arrow key on an
        // inverted slider the thumb moves in that direction. However for a blind user, nothing
        // about the slider indicates that it is inverted. They will expect left to be decrement,
        // regardless of how it appears on the screen. For speakers ofRTL languages, they probably
        // expect left to mean increment. Therefore we flip the meaning of the side arrow keys for
        // RTL. For inverted sliders we prefer a good a11y experience to having it "look right" for
        // sighted users, therefore we do not swap the meaning.
        this._increment(this._getDirection() === 'rtl' ? 1 : -1);
        break;
      case 'ArrowUp':
      case 'Up':
        this._increment(1);
        break;
      case 'ArrowRight':
      case 'Right':
        // See comment on LEFT_ARROW about the conditions under which we flip the meaning.
        this._increment(this._getDirection() === 'rtl' ? -1 : 1);
        break;
      case 'ArrowDown':
      case 'Down':
        this._increment(-1);
        break;
      default:
        // Return if the key is not one that we explicitly handle to avoid calling preventDefault on
        // it.
        return;
    }

    if (oldValue !== this.value) {
      this._emitInputEvent();
      this._emitChangeEvent();
    }

    this._isSliding = true;
    event.preventDefault();
  }

  /** 
   * @internal 
   * */
  _onKeyup() {
    this._isSliding = false;
  }

  /** Called when the user has put their pointer down on the slider. */
  private _pointerDown = (event: TouchEvent | MouseEvent) => {
    // Don't do anything if the slider is disabled or the
    // user is using anything other than the main mouse button.
    if (this.disabled || this._isSliding || (!isTouchEvent(event) && event.button !== 0)) {
      return;
    }

    this._ngZone.run(() => {
      const oldValue = this.value;
      const pointerPosition = getPointerPositionOnPage(event);
      this._isSliding = true;
      this._lastPointerEvent = event;
      event.preventDefault();
      this._focusHostElement();
      this._onMouseenter(); // Simulate mouseenter in case this is a mobile device.
      this._bindGlobalEvents(event);
      this._focusHostElement();

      this._calculateInitialSlideDirection(event);

      if (this._currentSliderDir === 'left') {
        this._updateValueFromPositionLeft(pointerPosition);
        if (this.syncMovement) {
          this.value = [
            this.value[0],
            this.max - this.value[0],
          ];
        }
      } else {
        this._updateValueFromPositionRight(pointerPosition);
        if (this.syncMovement) {
          this.value = [
            this.max - this.value[1],
            this.value[1],
          ];
        }
      }

      this._valueOnSlideStart = this.value;
      this._pointerPositionOnStart = pointerPosition;

      // Emit a change and input event if the value changed.
      if (oldValue !== this.value) {
        this._emitInputEvent();
        this._emitChangeEvent();
      }
    });
  }

  /**
   * @internal
   * Called when the user has moved their pointer after
   * starting to drag. Bound on the document level.
   */
  private _pointerMove = (event: TouchEvent | MouseEvent) => {
    if (this._isSliding) {
      // Prevent the slide from selecting anything else.
      event.preventDefault();
      const oldValue = this.value;
      this._lastPointerEvent = event;

      this._calculateInitialSlideDirection(event);

      if (this._currentSliderDir === 'left') {
        this._updateValueFromPositionLeft(getPointerPositionOnPage(event));
        if (this.syncMovement) {
          this.value = [
            this.value[0],
            this.max - this.value[0],
          ];
        }
      } else {
        this._updateValueFromPositionRight(getPointerPositionOnPage(event));
        if (this.syncMovement) {
          this.value = [
            this.max - this.value[1],
            this.value[1],
          ];
        }
      }

      // Native range elements always emit `input` events when the value changed while sliding.
      if (oldValue !== this.value) {
        this._emitInputEvent();
      }
    }
  }

  /** 
   * @internal 
   * Called when the user has lifted their pointer. Bound on the document level. */
  private _pointerUp = (event: TouchEvent | MouseEvent) => {
    if (this._isSliding) {
      const pointerPositionOnStart = this._pointerPositionOnStart;
      const currentPointerPosition = getPointerPositionOnPage(event);

      event.preventDefault();
      this._removeGlobalEvents();
      this._valueOnSlideStart = this._pointerPositionOnStart = this._lastPointerEvent = null;
      this._isSliding = false;

      if (this._valueOnSlideStart !== this.value && !this.disabled &&
          pointerPositionOnStart && (pointerPositionOnStart.x !== currentPointerPosition.x ||
          pointerPositionOnStart.y !== currentPointerPosition.y)) {
        this._emitChangeEvent();
      }
    }
  }

  /** 
   * @internal 
   * Called when the window has lost focus. */
  private _windowBlur = () => {
    // If the window is blurred while dragging we need to stop dragging because the
    // browser won't dispatch the `mouseup` and `touchend` events anymore.
    if (this._lastPointerEvent) {
      this._pointerUp(this._lastPointerEvent);
    }
  }

  /** 
   * @internal 
   * Use defaultView of injected document if available or fallback to global window reference */
  private _getWindow(): Window {
    return this._document.defaultView || window;
  }

  /**
   * @internal
   * Binds our global move and end events. They're bound at the document level and only while
   * dragging so that the user doesn't have to keep their pointer exactly over the slider
   * as they're swiping across the screen.
   */
  private _bindGlobalEvents(triggerEvent: TouchEvent | MouseEvent) {
    // Note that we bind the events to the `document`, because it allows us to capture
    // drag cancel events where the user's pointer is outside the browser window.
    const document = this._document;
    const isTouch = isTouchEvent(triggerEvent);
    const moveEventName = isTouch ? 'touchmove' : 'mousemove';
    const endEventName = isTouch ? 'touchend' : 'mouseup';
    document.addEventListener(moveEventName, this._pointerMove, activeEventOptions);
    document.addEventListener(endEventName, this._pointerUp, activeEventOptions);

    if (isTouch) {
      document.addEventListener('touchcancel', this._pointerUp, activeEventOptions);
    }

    const window = this._getWindow();

    if (typeof window !== 'undefined' && window) {
      window.addEventListener('blur', this._windowBlur);
    }
  }

  /** 
   * @internal 
   * Removes any global event listeners that we may have added. */
  private _removeGlobalEvents() {
    const document = this._document;
    document.removeEventListener('mousemove', this._pointerMove, activeEventOptions);
    document.removeEventListener('mouseup', this._pointerUp, activeEventOptions);
    document.removeEventListener('touchmove', this._pointerMove, activeEventOptions);
    document.removeEventListener('touchend', this._pointerUp, activeEventOptions);
    document.removeEventListener('touchcancel', this._pointerUp, activeEventOptions);

    const window = this._getWindow();

    if (typeof window !== 'undefined' && window) {
      window.removeEventListener('blur', this._windowBlur);
    }
  }

  /** 
   * @internal 
   * Increments the slider by the given number of steps (negative number decrements). */
  private _increment(numSteps: number) {
    if (this.value instanceof Array) {
      if (this.syncMovement) {
        this.value =
          this._clamp([
            (this.value[0] || 0) + this.step * (this._currentSliderDir === 'left' ? numSteps : -numSteps),
            (this.value[1] || 0) + this.step * (this._currentSliderDir === 'right' ? numSteps : -numSteps)
          ], this.min, this.max);
      } else {
        this.value =
          this._clamp([
            this._currentSliderDir === 'left' ? (this.value[0] || 0) + this.step * numSteps : this.value[0],
            this._currentSliderDir === 'right' ? (this.value[1] || 0) + this.step * numSteps : this.value[1],
          ], this.min, this.max);
      }
    } else {
      this.value = this._clamp((this.value || 0) + this.step * numSteps, this.min, this.max);
    }
  }

  /** 
   * @internal 
   * Calculate the new value from the new physical location. The value will always be snapped. */
  private _updateValueFromPositionLeft(pos: { x: number, y: number }) {
    if (!this._sliderDimensions) {
      return;
    }

    const offset = this.vertical ? this._sliderDimensions.top : this._sliderDimensions.left;
    const size = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
    const posComponent = this.vertical ? pos.y : pos.x;

    // The exact value is calculated from the event and used to find the closest snap value.
    let percent = Number(this._clamp((posComponent - offset) / size));

    if (this._shouldInvertMouseCoords()) {
      percent = 1 - percent;
    }

    // Since the steps may not divide cleanly into the max value, if the user
    // slid to 0 or 100 percent, we jump to the min/max value. This approach
    // is slightly more intuitive than using `Math.ceil` below, because it
    // follows the user's pointer closer.
    if (percent === 0) {
      if (this.value instanceof Array) {
        this.value = [this.min, this.value[1]];
      } else {
        this.value = this.min;
      }
    } else if (percent === 1) {
      if (this.value instanceof Array) {
        this.value = [this.max, this.value[1]];
      } else {
        this.value = this.max;
      }
    } else {
      const exactValue = this._calculateValue(percent);

      // This calculation finds the closest step by finding the closest
      // whole number divisible by the step relative to the min.
      const closestValue =
        Math.round((Number(exactValue) - this.min) / this.step) * this.step + this.min;

      // The value needs to snap to the min and max.
      if (this.value instanceof Array) {
        this.value = [
          Number(this._clamp(closestValue, this.min, this.max)),
          this.value[1]
        ];
      } else {
        this.value = this._clamp(closestValue, this.min, this.max);
      }
    }
  }

  /** 
   * @internal 
   * Calculate the new value from the new physical location. The value will always be snapped. */
  private _updateValueFromPositionRight(pos: { x: number, y: number }) {
    if (!this._sliderDimensions) {
      return;
    }

    const offset = this.vertical ? this._sliderDimensions.top : this._sliderDimensions.left;
    const size = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
    const posComponent = this.vertical ? pos.y : pos.x;

    // The exact value is calculated from the event and used to find the closest snap value.
    let percent = Number(this._clamp((posComponent - offset) / size));

    if (this._shouldInvertMouseCoords()) {
      percent = 1 - percent;
    }

    // Since the steps may not divide cleanly into the max value, if the user
    // slid to 0 or 100 percent, we jump to the min/max value. This approach
    // is slightly more intuitive than using `Math.ceil` below, because it
    // follows the user's pointer closer.
    if (percent === 0) {
      if (this.value instanceof Array) {
        this.value = [this.value[0], this.min];
      } else {
        this.value = this.min;
      }
    } else if (percent === 1) {
      if (this.value instanceof Array) {
        this.value = [this.value[0], this.max];
      } else {
        this.value = this.max;
      }
    } else {
      const exactValue = this._calculateValue(percent);

      // This calculation finds the closest step by finding the closest
      // whole number divisible by the step relative to the min.
      const closestValue =
        Math.round((Number(exactValue) - this.min) / this.step) * this.step + this.min;

      // The value needs to snap to the min and max.
      if (this.value instanceof Array) {
        this.value = [
          this.value[0],
          Number(this._clamp(closestValue, this.min, this.max))
        ];
      } else {
        this.value = this._clamp(closestValue, this.min, this.max);
      }
    }
  }

  /** 
   * @internal 
   * Emits a change event if the current value is different from the last emitted value. */
  private _emitChangeEvent() {
    this._controlValueAccessorChangeFn(this.value);
    this.valueChange.emit(this.value);
    this.change.emit(this._createChangeEvent());
  }

  /** 
   * @internal 
   * Emits an input event when the current value is different from the last emitted value. */
  private _emitInputEvent() {
    this.input.emit(this._createChangeEvent());
  }

  /** 
   * @internal 
   * Updates the amount of space between ticks as a percentage of the width of the slider. */
  private _updateTickIntervalPercent() {
    if (!this.tickInterval || !this._sliderDimensions) {
      return;
    }

    if (this.tickInterval === 'auto') {
      const trackSize = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
      const pixelsPerStep = trackSize * this.step / (this.max - this.min);
      const stepsPerTick = Math.ceil(MIN_AUTO_TICK_SEPARATION / pixelsPerStep);
      const pixelsPerTick = stepsPerTick * this.step;
      this._tickIntervalPercent = pixelsPerTick / trackSize;
    } else {
      this._tickIntervalPercent = this.tickInterval * this.step / (this.max - this.min);
    }
  }

  /** 
   * @internal 
   * Creates a slider change object from the specified value. */
  private _createChangeEvent(value = this.value): SliderChange {
    const event = new SliderChange();

    event.source = this;
    event.value = value;

    return event;
  }

  /** 
   * @internal 
   * Calculates the percentage of the slider that a value is. */
  private _calculatePercentage(value: number | number[] | null) {
    if (value instanceof Array) {
      return [
        ((value[0] || 0) - this.min) / (this.max - this.min),
        ((value[1] || 0) - this.min) / (this.max - this.min)
      ];
    } else {
      return ((value || 0) - this.min) / (this.max - this.min);
    }
  }

  /** 
   * @internal 
   * Calculates the value a percentage of the slider corresponds to. */
  private _calculateValue(percentage: number | number[]) {
    if (percentage instanceof Array) {
      return [
        this.min + percentage[0] * (this.max - this.min),
        this.min + percentage[1] * (this.max - this.min)
      ];
    } else {
      return this.min + percentage * (this.max - this.min);
    }
  }

  /** 
   * @internal 
   * Return a number between two numbers. */
  private _clamp(value: number | number[], min = 0, max = 1) {
    if (value instanceof Array) {
      return [
        Math.max(min, Math.min(value[0], max)),
        Math.max(min, Math.min(value[1], max))
      ];
    } else {
      return Math.max(min, Math.min(value, max));
    }
  }

  /**
   * @internal
   * Get the bounding client rect of the slider track element.
   * The track is used rather than the native element to ignore the extra space that the thumb can
   * take up.
   */
  private _getSliderDimensions() {
    return this._sliderWrapper ? this._sliderWrapper.nativeElement.getBoundingClientRect() : null;
  }

  /**
   * @internal
   * Focuses the native element.
   * Currently only used to allow a blur event to fire but will be used with keyboard input later.
   */
  private _focusHostElement(options?: FocusOptions) {
    this._elementRef.nativeElement.focus(options);
  }

  /** 
   * @internal 
   * Blurs the native element. */
  private _blurHostElement() {
    this._elementRef.nativeElement.blur();
  }

  /**
   * @internal
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value: any) {
    this.value = value;
  }

  /**
   * @internal
   * Registers a callback to be triggered when the value has changed.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  /**
   * @internal
   * Registers a callback to be triggered when the component is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  /**
   * @internal
   * Sets whether the component should be disabled.
   * Implemented as part of ControlValueAccessor.
   * @param isDisabled
   */
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  /** 
   * @internal 
   * Determine if moving left or right thumb */
  private _calculateInitialSlideDirection(event: MouseEvent | TouchEvent) {
    if (!this._sliderDimensions || !this._isRangeSlider) {
      return;
    }

    const offset = this.vertical ? this._sliderDimensions.top : this._sliderDimensions.left;
    const size = this.vertical ? this._sliderDimensions.height : this._sliderDimensions.width;
    let posComponent = 0;

    if (event instanceof MouseEvent) {
      posComponent = this.vertical ? event.clientY : event.clientX;
    } else {
      posComponent = this.vertical ? event.touches[0].clientY : event.touches[0].clientX;
    }

    // The exact value is calculated from the event and used to find the closest snap value.
    let percent = Number(this._clamp((posComponent - offset) / size));

    if (this._shouldInvertMouseCoords()) {
      percent = 1 - percent;
    }

    // When reaching the overlap to transition the formula (this.percent[0] + (this.percent[1] - this.percent[0]) / 2
    // is off by 0.05 which prevents us from having overlap this cutoff value accounts for that depending on the direction
    const cutoffOffset = this._currentSliderDir === 'left' ? 0.005 : -0.005;

    if (percent <= (this.percent[0] + (this.percent[1] - this.percent[0]) / 2) + cutoffOffset) {
      this._currentSliderDir = 'left';
    } else {
      this._currentSliderDir = 'right';
    }
  }
}

/** 
 * @internal 
 * Returns whether an event is a touch event. */
function isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
  // This function is called for every pixel that the user has dragged so we need it to be
  // as fast as possible. Since we only bind mouse events and touch events, we can assume
  // that if the event's name starts with `t`, it's a touch event.
  return event.type[0] === 't';
}

/** 
 * @internal 
 * Gets the coordinates of a touch or mouse event relative to the viewport. */
function getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
  // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
  const point = isTouchEvent(event) ? (event.touches[0] || event.changedTouches[0]) : event;
  return {x: point.clientX, y: point.clientY};
}
