import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { Actions, ThemingService , BadgeModes, BadgePositions, Colors, BadgeStyles } from 'atlas-cdk';

import { config } from './badge.theming';

@Directive({
  selector: '[badge], badge',
})
export class BadgeDirective {
  /** Set the badge content */
  @Input() badge: number | null = null;
  /**
   * @deprecated
   * This property is deprecated and will be removed in a future version.
   * Use `badgeColor` instead. 
   * Set the badge action 
  */
  @Input() badgeAction: Actions;

  /** Set the badge Color */
  @Input() badgeColor: Colors = Colors.neutral;

  /** Set the list item typography class */
  @Input() badgeTypography = 'typographyStyles-label-smallAlt';
  /** Set the badge position */
  @Input() badgePosition: BadgePositions = BadgePositions.topRight;
  /** 
   * @deprecated
   * This property is deprecated and will be removed in a future version.
   * Use `badgeColor` instead. 
   * Set the badge mode as a number or a dot
   *  */
  @Input() badgeMode: BadgeModes;

  /** Set the badge style as a number or a dot */
  @Input() badgeStyle: BadgeStyles = BadgeStyles.numbers;

  /** Set the badge custom class */
  @Input() badgeCustomClass: string | null = null;
  /** Output used to target badge component method */
  @Output() onBadgeClick: EventEmitter<any> = new EventEmitter();

  private _badgeElement: HTMLElement | undefined = undefined;
  private _length: number = 0;

  constructor(
    private _render: Renderer2,
    private _elementRef: ElementRef<HTMLElement>,
    private _themingService: ThemingService
  ) {
    this._themingService.applyConfig(config);
  }

  /**
   * @internal
   * Emits when an badge is clicked
   */
  @HostListener('click', ['$event'])
  onClick($event: any) {
    this.onBadgeClick.emit($event);
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges): void {
    const value = `${this.badge}`.trim();

    if (this._badgeElement) {
      this._elementRef.nativeElement.removeChild(this._badgeElement);
      this._badgeElement = null;
    }

    if (this.badge && value?.length > 0) {
      this._badgeElement = this._createBadge(this._formatValue(value));
    }
  }

  /**
   * @internal
   * Remove badge control
   */
  ngOnDestroy() {
    if (this._badgeElement) {
      this._elementRef.nativeElement.removeChild(this._badgeElement);
    }
  }

  /**
   * @internal
   * Create the span tag for the badge
   */
  private _createBadge(value: string): HTMLElement {
    const badgeElement = this._render.createElement('span');
    this._addClasses(badgeElement, value);
    if ((this.badgeMode ? this.badgeMode: this.badgeStyle) === BadgeModes.numbers) {
      badgeElement.textContent = value;
    }
    this._render.addClass(this._elementRef.nativeElement, 'badge');
    this._render.appendChild(this._elementRef.nativeElement, badgeElement);
    return badgeElement;
  }

  /**
   * @internal
   * Add different classes
   */
  private _addClasses(badgeElement: HTMLElement, value: string) {
    const [vPos, hPos] = this.badgePosition.split('-');
    this._length = value.length < 4 ? value.length : 4;

    this._render.addClass(badgeElement, 'badge-content');
    this._render.addClass(badgeElement, `badge-content--${(this.badgeAction ? this.badgeAction : this.badgeColor)}`);
    this._render.addClass(
      badgeElement,
      `badge-content-mode--${(this.badgeMode ? this.badgeMode: this.badgeStyle)}`
    );
    this._render.addClass(
      badgeElement,
      `badge-content-mode--${(this.badgeMode ? this.badgeMode: this.badgeStyle)}-${vPos}`
    );
    this._render.addClass(
      badgeElement,
      `badge-content-mode--${(this.badgeMode ? this.badgeMode: this.badgeStyle)}-${hPos}-${this._length}`
    );
    this._render.addClass(badgeElement, this.badgeTypography);
    this._render.addClass(badgeElement, this.badgeCustomClass);
  }

  /**
   * @internal
   * Helper to format value if length of string is greater than 3
   */
  private _formatValue(value: string): string {
    const numericValue = parseInt(value, 10);
    
    if (isNaN(numericValue)) {
      return value;
    }
  
    if (numericValue > 999) {
      return '+999';
    } else if (numericValue < -999) {
      return '-999';
    }
  
    return value;
  }
}
