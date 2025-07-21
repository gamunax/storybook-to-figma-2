import {
  Directive,
  Component,
  ContentChild,
  OnDestroy,
  OnInit,
  Input,
  ElementRef,
  HostListener,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Actions, Colors, HaloWindowClickService, HaloWindowResizeService, ThemingService } from 'atlas-cdk';
import { config } from './popover.theming';
import { Subscription } from 'rxjs';

interface DirectionCoordinate {
  direction: string;
  tempLeft: number;
  tempTop: number;
  offset: number;
}
/** Popover can be used to display some content on top of another. */
@Component({
  selector: 'atlas-popover-content',
  templateUrl: './popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverContentComponent implements OnInit, OnDestroy {
  @ViewChild('popoverContainer') popoverContainer: ElementRef;

  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * Sets the action color of popover.
   */
  @Input() action: Actions;

  /**
  * Sets the color of popover.
  */
  @Input() color = Colors.neutral;
  /**
   * Title string of popover.
   */
  @Input() popoverTitle: string;
  /**
   * Sets in which direction the popover opens.
   */
  @Input() position: string;
  /**
   * Elevation for the popover content.
   */
  @Input() elevation = 'raised';
  /**
   * Show or hide the X close button.
   */
  @Input() showCloseButton = true;

    /**
   * Automatically close unless explicitly told otherwise 
   */
    @Input() autoClose = true;
    /**
     * 
  /**
   * Styles the popover as a dropdown.
   */
  @Input() isDropdownVariant = false;
  /**
   * Sets the width of popover.
   */
  @Input() defaultWidth = 435;
  /**
   * Determines the width breakpoint when popover positioning should become adapted for smaller devices.
   */
  @Input() responsiveWidth = 1024;
  /**
   * Sets option to include a back button in pop up header
   */
  @Input() backButton = false;

  /**
   * Emits event when hiding popover.
   */
  @Output() hidePopover:  EventEmitter<boolean> = new EventEmitter();
  /**
   * Event when back button is clicked on
   */
  @Output() goBackEvent: EventEmitter<void> = new EventEmitter();

  /**
   * @internal
   * @memberof PopoverContentComponent
   */
  _left = 0;

  /**
   * @internal
   * @memberof PopoverContentComponent
   */
  _top = 0;

  /**
   * @internal
   * @memberof PopoverContentComponent
   */
  _arrowSize = 16;

  /**
   * @internal
   * @memberof PopoverContentComponent
   */
  _directionClass = 'popover-right';

  /**
   * @internal
   * @memberof PopoverContentComponent
   */
  _width: number;

  /**
   * Returns whether the popover is currently visible.
   */
  get isVisible() {
    return this._visible;
  }

  private _resizeSubscription: Subscription;
  private _visible = true;
  private _parentRect = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    right: 0
  };
  private _isMobile = false;
  private _screenWidth: number;
  private _screenHeight: number;

  constructor(
    public element: ElementRef,
    private _cdr: ChangeDetectorRef,
    private _resizeService: HaloWindowResizeService,
    private themingService: ThemingService,
  ) {
    this.themingService.applyConfig(config);
    this._width = this.defaultWidth;
    this._resizeSubscription = this._resizeService.resizeObservable$.subscribe((event) => {
      const childContent = this.element.nativeElement.firstElementChild;
      this._screenWidth = Math.min(screen.width, window.innerWidth, document.documentElement.clientWidth);
      this._screenHeight = Math.min(screen.height, window.innerHeight, document.documentElement.clientHeight);
      if (this._visible && this._screenWidth < this.responsiveWidth) {
        this._responsivePositioning(childContent.clientWidth, childContent.clientHeight);
      } else if (this._visible && this._screenWidth >= this.responsiveWidth) {
        this.hide();
      }
    });
  }

  ngOnInit() {
    this._screenWidth = Math.min(screen.width, window.innerWidth, document.documentElement.clientWidth);
    this._screenHeight = Math.min(screen.height, window.innerHeight, document.documentElement.clientHeight);
    // define direction class on init only when a position is input
    if (this.position) {
      this._directionClass = 'popover-' + this.position;
    }
    this.hide();
  }

  ngOnDestroy() {
    if (this._resizeSubscription) {
      this._resizeSubscription.unsubscribe();
    }
  }

  setPosition(rect) {
    this._parentRect = rect;
  }

  show() {
    // Pop this out
    const elem = this.element.nativeElement;
    document.body.appendChild(elem);

    // Get width and height of popover
    const childContent = elem.firstElementChild;
    const width = childContent.clientWidth;
    const height = childContent.clientHeight;

    this._responsivePositioning(width, height);
    if (this._isMobile) {
      return;
    }

    // always reset the direction class if no position is available
    if (!this.position) {
      this._directionClass = 'popover-right';
    }

    // Update left/top
    this._left = this._parentRect?.left ?? this._left;
    this._top = this._parentRect?.top ?? this._top;

    const locationMap = [
      'right',
      'top',
      'left',
      'bottom',
    ];

    const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

    let tempLeft = 0;
    let tempTop = 0;

    /** TODO edgecase problem: if popover button is in a scrollable container,
     *  the popover doesn't follow the button in the inner-container
     */
    const setPopupPosition = (direction: string, isDropdownVariant: boolean) => {
      if (isDropdownVariant) {
        switch (direction) {
          case 'left':  // opens up and to the left
            tempLeft = this._parentRect.left + window.pageXOffset - width + this._parentRect.width;
            tempTop = this._parentRect.top + window.pageYOffset - height + this._parentRect.height;
            break;
          case 'top':  // opens up and to the right
            tempLeft = this._parentRect.left + window.pageXOffset;
            tempTop = this._parentRect.top + window.pageYOffset - height + this._parentRect.height;
            break;
          case 'bottom':  // opens down and to the left
            tempLeft = this._parentRect.left + window.pageXOffset - width + this._parentRect.width;
            tempTop = this._parentRect.top + window.pageYOffset;
            break;
          default:  // opens down and to the right
            tempLeft = this._parentRect.left + window.pageXOffset;
            tempTop = this._parentRect.top + window.pageYOffset;
            break;
        }
      } else {
        switch (direction) {
          case 'left':
            tempLeft = this._parentRect.left + window.pageXOffset - width;
            tempTop = this._parentRect.top + window.pageYOffset - height / 2 + this._parentRect.height / 2;
            break;
          case 'top':
            tempLeft = this._parentRect.left + window.pageXOffset - width / 2 + this._parentRect.width / 2;
            tempTop = this._parentRect.top + window.pageYOffset - height - this._arrowSize * 1.55;
            break;
          case 'bottom':
            tempLeft = this._parentRect.left + window.pageXOffset - width / 2 + this._parentRect.width / 2;
            tempTop = this._parentRect.top + window.pageYOffset + this._parentRect.height + this._arrowSize * 1.45;
            break;
          default:
            tempLeft = this._parentRect.right + window.pageXOffset + 3;
            tempTop = this._parentRect.top + window.pageYOffset - height / 2 + this._parentRect.height / 2;
            break;
        }
      }

      this._cdr.markForCheck();
    };

    let notPerfect = true;
    const locationDiff: DirectionCoordinate[] = [];

    if (this.position) {
      if (this._directionClass !== 'popover-' + this.position) {
        this._directionClass = 'popover-' + this.position;
      }
      setPopupPosition(this.position, this.isDropdownVariant);
      this._left = tempLeft;
      this._top = tempTop;
    } else {
      for (let i = 0; i < 4; i++) {
        setPopupPosition(locationMap[i], this.isDropdownVariant);

        // perfect case
        if (tempLeft > window.pageXOffset && tempLeft < windowWidth - width + window.pageXOffset &&
          tempTop > window.pageYOffset && tempTop < windowHeight - height + window.pageYOffset) {
          this._directionClass = 'popover-' + locationMap[i];
          notPerfect = false;
          this._left = tempLeft;
          this._top = tempTop;
          break;
        } else {
          const newOffset = Math.max(window.pageXOffset - tempLeft, 0)
            + Math.max(tempLeft - windowWidth + width - window.pageXOffset, 0)
            + Math.max(window.pageYOffset - tempTop, 0)
            + Math.max(tempTop - windowHeight + height - window.pageYOffset, 0);

          locationDiff[i] = {
            direction: locationMap[i],
            tempLeft: tempLeft,
            tempTop: tempTop,
            offset: newOffset
          };
        }
      }

      if (notPerfect) {
        const bestFit: DirectionCoordinate = locationDiff.reduce((best, next) => best.offset > next.offset ? next : best);
        this._directionClass = 'popover-' + bestFit.direction;
        this._left = bestFit.tempLeft;
        this._top = bestFit.tempTop;
      }
    }

    this._visible = true;
    this._cdr.markForCheck();
  }

  hide() {
    this._width = this.defaultWidth;
    this._isMobile = false;
    // Destroy this
    if (this._visible) {
      const el: HTMLElement = this.element.nativeElement;
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
      this.hidePopover.emit(true);
    }
    this._visible = false;
    this._cdr.markForCheck();
  }

  toggle() {
    if (this._visible) {
      this.hide();
    } else {
      this.show();
    }
  }

  /** method emits a 'go back' event when back button is clicked on */
  goBack(event: MouseEvent) {
    event.stopPropagation();
    this.goBackEvent.emit();
  }

  private _responsivePositioning(popupWidth, popupHeight) {
    if (this._screenWidth < this.responsiveWidth) {
      let topPadding = this._screenHeight * 0.05;
      let leftPadding = 15;

      if (this._screenWidth > this.defaultWidth) {
        // if the screen width is bigger than the default popover width, the popover's width will take the default width and it will be centered
        this._width = this.defaultWidth;
        leftPadding = (this._screenWidth - this.defaultWidth) / 2;
      } else if (popupWidth <= this.defaultWidth && this._screenWidth > popupWidth) {
        // if the screen width is smaller than the default popover width,
        // but bigger than the current popover's width, it will just center the popover
        leftPadding = (this._screenWidth - popupWidth) / 2;
      } else if (this._screenWidth <= popupWidth) {
        // if the popup is wider than the screen, it will fill the width of the screen with padding of 15px on both sides
        this._width = this._screenWidth - (leftPadding * 2);
      }
      // if popup is shorter than screen height by 60%, it will center itself
      if (popupHeight <= this._screenHeight * 0.6) {
        topPadding = (this._screenHeight - popupHeight) / 2;
      }

      this._left = leftPadding;
      this._top = topPadding + window.pageYOffset;
      this._directionClass = 'popover-responsive';
      this._visible = true;
      this._cdr.markForCheck();
      this._isMobile = true;
    } else if (this._screenWidth >= this.responsiveWidth && this._width !== this.defaultWidth) {
      // if not in mobile view width, reset popover width to 435px
      this._width = this.defaultWidth;
      this._isMobile = false;
    }
  }
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[atlas-popover]',
})
export class PopoverDirective implements OnDestroy {
  @ContentChild(PopoverContentComponent) content: PopoverContentComponent;

  private _clickSubscription: Subscription;

  constructor(
    private _element: ElementRef,
    private _clickService: HaloWindowClickService,
    private _cdr: ChangeDetectorRef,
  ) {
    this._clickSubscription = this._clickService.clickObservable$.subscribe((event) => {
      this.onClick(event);
    });
  }

  @HostListener('click', ['$event'])
  click(e: MouseEvent) {
    this._setPosition();
    this.content.toggle();
  }

  @HostListener('window:keyup', ['$event'])
  onKeyDown(event: any) {
    if (event.keyCode === 27) {
      this.content.hide();
    }
  }

  showPopup() {
    this._setPosition();
    this.content.show();
  }

  hidePopup() {
    this.content.hide();
  }

  togglePopup() {
    this._setPosition();
    this.content.toggle();
  }

  onClick(event: any) {
    if (!this.content.element.nativeElement.contains(event.target)
        && !this._element.nativeElement.contains(event.target)
        && this.content.autoClose
      ) {
      this.content.hide();
    }
  }  

  ngOnDestroy() {
    this.content.hide();
    if (this._clickSubscription) {
      this._clickSubscription.unsubscribe();
    }
  }

  private _setPosition() {
    const rect = this._element.nativeElement.getBoundingClientRect();
    this.content.setPosition(rect);
  }
}
