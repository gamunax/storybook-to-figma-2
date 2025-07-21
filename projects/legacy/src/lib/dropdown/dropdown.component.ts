import * as portal from '@angular/cdk/portal';
import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ContentChild,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import Popper, { Placement } from 'popper.js';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { HaloWindowClickService, HaloWindowTouchService } from 'atlas-cdk';
interface IPortalOutlet {
  new (
    outletElement: Element,
    _componentFactoryResolver: ComponentFactoryResolver,
    _appRef: ApplicationRef,
    _defaultInjector: Injector,
  );
  attach(portal: any);
  detach();
}
// This complicated thing is needed to prevent warnings 'DomPortalOutlet' doesn't exist
const PortalOutlet = portal['DomPortal' + ('DomPortalOutlet' in portal ? 'Outlet' : 'Host')] as IPortalOutlet;

@Component({
  selector: 'legacy-dropdown-label',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DropdownLabelComponent {
  constructor(public elementRef: ElementRef) {}
}
@Component({
  selector: 'legacy-dropdown-item',
  template: `<ng-template #itemTemplate><ng-content></ng-content></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class DropdownItemComponent {
  @ViewChild('itemTemplate') itemTemplate: TemplateRef<any>;

  /**
   * Determines if the dropdown should stay open after this option is clicked.
   */
  @Input() remainOpen = false;

  constructor(public elementRef: ElementRef) {}
}

@Component({
  selector: 'legacy-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})

/**
 * Dropdown Component (LEGACY)
 * @deprecated - Use this component only for migration from MOSUI to Atlas.
 * @preferred
 */
export class DropdownComponent implements AfterViewInit, OnDestroy, OnInit {
  /**
   * Sets the max height of dropdown.
   */
  @Input() maxHeight: string;
  /**
   * Sets the positioning of the dropdown. Values: 'left', 'right'.
   */
  @Input() position = 'left';
  /**
   * Sets the dropdown theme.
   */
  @Input() theme = 'default';
  /**
   * Determines if the dropdown should open and close on mouse hover.
   */
  @Input() onHover = false;
  /**
   * Disables the dropdown.
   */
  @Input() isDisabled = false;
  /**
   * Closes the dropdown after clicking an item if set to true.
   */
  @Input() closeOnClick = true;
  /**
   * Sets dropdown opening direction vertically. If set to true, the dropdown list will open above.
   */
  @Input() reverseDirection = false;
  /**
   * Use dropdown as a FAB menu.
   */
  @Input() fabMenu = false;
  /**
   * Flips the open dropdown list up if there's not enough space below.
   */
  @Input() flip = false;
  /**
   * Sync dropdown width with container
   */
  @Input() syncWidth = false;
  /**
   * Change dropdown display to block
   */
  @Input() expanded = false;

  /** @deprecated this output is never emitting */
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onOpen: EventEmitter<void> = new EventEmitter<void>();

  /** @deprecated this output is never emitting */
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();

  /** @deprecated this output is never emitting */
  @Output() formUpdated = new EventEmitter();

  @ViewChild('container') private _container: ElementRef;
  @ViewChild('dropdown') private _dropdown: ElementRef;
  @ViewChild('portal') private _portal: portal.TemplatePortal;
  @ContentChild(DropdownLabelComponent) label: DropdownLabelComponent;
  @ContentChildren(DropdownItemComponent) items: QueryList<DropdownItemComponent>;

  /**
   * Used to determine if the dropdown is hidden or visible.
   * @internal
   */
  _hidden = true;

  // Toggled by Touch Subscription to determine if touch dragging occurred on touch devices
  private _touchMovingState = false;
  private _dropdownVisible = !this._hidden;
  private _portalOutlet?: IPortalOutlet;
  private _popper?: Popper;
  private _subscription: Subscription = new Subscription();
  private _showAnimationFrame?: number;
  private _hideAnimationFrame?: number;
  private _clickHandler$ = new Subject<MouseEvent>();

  constructor(
    private _clickService: HaloWindowClickService,
    private _touchService: HaloWindowTouchService,
    private _cdr: ChangeDetectorRef,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _appRef: ApplicationRef,
    private _defaultInjector: Injector,
    private _renderer: Renderer2,
  ) {}

  /**
   * Dropdown visibility. Can be set to true to show dropdown or false to hide it.
   */
  @Input()
  set dropdownVisible(value: boolean) {
    if (value && !this._dropdownVisible) {
      this._showDropdown();
    } else if (!value && this._dropdownVisible) {
      this._hideAnimationFrame = requestAnimationFrame(this._hideDropdown.bind(this));
    }
    if (this._dropdownVisible !== value) {
      this._dropdownVisible = value;
      this._cdr.detectChanges();
      // TODO: figure out a way to cache this
      this._applyZindex();
    }
  }

  get dropdownVisible(): boolean {
    return this._dropdownVisible;
  }

  ngOnInit() {
    this._initPortalOutlet();
  }

  ngAfterViewInit() {
    this._attachPortalOutlet();
    this._attachSubscriptions();
  }

  ngOnDestroy() {
    this._destroyPopper();
    this._destoryPortalOutlet();
    this._destroySubscription();
    cancelAnimationFrame(this._showAnimationFrame);
    cancelAnimationFrame(this._hideAnimationFrame);
  }

  /**
   * @deprecated method not used
   * Form changed
   */
  formChanged($event) {
    this.formUpdated.emit(true);
  }

  /**
   * Toggle dropdown state
   */
  toggle() {
    if (this.dropdownVisible) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Open dropdown
   */
  open() {
    if (!this.dropdownVisible) {
      this.dropdownVisible = true;
    }
  }

  /**
   * Close dropdown
   */
  close() {
    if (this.dropdownVisible) {
      this.dropdownVisible = false;
    }
  }

  private _determineZindex() {
    let currEl = this._container.nativeElement as HTMLElement;
    let foundZindex;

    // walk up dom tree to find zindex
    while (currEl) {
      if (currEl.style.zIndex) {
        foundZindex = Number(currEl.style.zIndex);
        break;
      }
      currEl = currEl.parentElement;
    }

    // one more than the found zindex
    if (foundZindex) {
      foundZindex++;
    }

    return foundZindex;
  }

  private _applyZindex() {
    const zIndex = this._determineZindex();
    if (zIndex) {
      this._renderer.setStyle(this._dropdown.nativeElement, 'z-index', zIndex);
    }
  }

  private _showDropdown() {
    this._hidden = false;
    this._cdr.detectChanges();
    this._showAnimationFrame = requestAnimationFrame(this._initPopper.bind(this));
  }

  private _hideDropdown() {
    fromEvent(this._dropdown.nativeElement, 'animationend')
      .pipe(take(1))
      .subscribe(() => {
        if (!this.dropdownVisible) {
          this._hidden = true;
          this._destroyPopper();
          this._cdr.detectChanges();
        }
      });
  }

  private _onClick(event: MouseEvent) {
    this._clickHandler$.next(event);
  }

  private _onEnter() {
    if (this.onHover) {
      this.open();
    }
  }

  private _onLeave() {
    if (this.onHover) {
      this.close();
    }
  }

  private _onTouchStart() {
    this._touchMovingState = true;
  }

  private _onTouchEnd(event: TouchEvent) {
    this._onClick(event as any);
    this._touchMovingState = false;
  }

  private _shouldCloseDropdown(target: Element): boolean {
    if (!this.dropdownVisible || !this.closeOnClick) {
      return false;
    }

    if (target && target.closest('.legacy-c-dropdown__item--remain-open')) {
      return false;
    }
    return true;
  }

  private _shouldToggleDropdown(target: Element): boolean {
    const label: Element = this.label.elementRef.nativeElement;
    return label.contains(target) && !this.onHover;
  }

  private _initPopper() {
    this._popper = new Popper(
      this._container.nativeElement,
      this._dropdown.nativeElement,
      {
        placement: this._getPopperPlacement(),
        modifiers: {
          flip: { enabled: this.flip },
          computeStyle: { gpuAcceleration: false },
          autoWidth: {
            enabled: this.syncWidth,
            order: 840,
            fn: (data) => {
              data.offsets.popper.left = data.offsets.reference.left;
              data.offsets.popper.width = (this._container.nativeElement as Element).getBoundingClientRect().width;
              data.styles.width = data.offsets.popper.width + 'px';
              data.styles.maxWidth = 'inherit';
              return data;
            }
          }
        }
      }
    );
  }

  private _destroyPopper() {
    if (this._popper) {
      this._popper.destroy();
      delete this._popper;
    }
  }

  private _attachPortalOutlet() {
    this._portalOutlet.attach(this._portal);
  }

  private _destoryPortalOutlet() {
    this._portalOutlet?.detach();
  }

  private _initPortalOutlet() {
    this._portalOutlet = new PortalOutlet(
      document.body,
      this._componentFactoryResolver,
      this._appRef,
      this._defaultInjector
    );
  }

  private _attachSubscriptions() {
    const containerEl = this._container.nativeElement;
    this._subscription.add(this.items.changes.subscribe(this._cdr.detectChanges.bind(this._cdr)));
    this._subscription.add(this._clickService.clickObservable$.subscribe(this._onClick.bind(this)));
    this._subscription.add(this._touchService.touchmoveObservable$.subscribe(this._onTouchStart.bind(this)));
    this._subscription.add(this._touchService.touchendObservable$.subscribe(this._onTouchEnd.bind(this)));
    this._subscription.add(fromEvent(containerEl, 'mouseenter').subscribe(this._onEnter.bind(this)));
    this._subscription.add(fromEvent(containerEl, 'mouseleave').subscribe(this._onLeave.bind(this)));
    this._subscription.add(this._clickSubscription());
  }

  private _destroySubscription() {
    this._subscription.unsubscribe();
  }

  private _getPopperPlacement(): Placement {
    if (this.position === 'right' && !this.reverseDirection) {
      return 'bottom-end';
    } else if (this.position === 'right' && this.reverseDirection) {
      return 'top-end';
    } else if (this.reverseDirection) {
      return 'top-start';
    } else {
      return 'bottom-start';
    }
  }

  private _clickSubscription() {
    return this._clickHandler$.pipe(debounceTime(64)).subscribe((event) => {
      // NOTE: special logic for touch events for safari
      if (
        event.type === 'touchend' &&
        !this._shouldToggleDropdown(event.target as Element) &&
        this._shouldCloseDropdown(event.target as Element)
      ) {
        return this.close();
      }
      if (event.type !== 'click') {
        return;
      }
      if (this._shouldToggleDropdown(event.target as Element)) {
        return this.toggle();
      }
      if (!this._touchMovingState && this._shouldCloseDropdown(event.target as Element)) {
        return this.close();
      }
    });
  }
}
