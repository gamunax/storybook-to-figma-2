import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, HostBinding, Input, OnChanges, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ThemingService, RatingSizings } from 'atlas-cdk';
import { config } from './rating.theming';

/**
 * Ratings provide insight regarding others' opinions and experiences, and can allow the user to submit a rating of their own.
 */
@Component({
  selector: 'atlas-rating',
  template: `
    <div class="atlas-rating-container">

    <ng-container *ngIf="!hide">
      <div [id]="'rating-item-' + i"   *ngFor="let item of items; let i=index" 
        (click)="onClicked(i)" (mouseover)="onHide($event)" 
        [ngClass]="[
          'atlas-rating', 
          'atlas-rating-size-' + size,
          iconClass[item], 
          readOnly && !disabled ? 'atlas-rating-read-only' : '',
          disabled ? 'atlas-rating-disabled' : '']">
      </div>
      <div *ngIf="showLabel" [ngClass]="[
        'atlas-rating-label',
        size === ratingSizing.small ? 'typographyStyles-label-small' : 'typographyStyles-label-medium',
        disabled ? 'atlas-rating-label-disabled' : ''
      ]">{{originalRating}} out of {{numberOfItems}}</div>    
    </ng-container>

    <ng-container *ngIf="hide && !disabled">
      <div [id]="'rating-item-hidden-' + i" *ngFor="let hide of hiddenItems; let i=index" 
      (click)="onClicked(i)" (mouseover)="onMouseEnter($event, i)" (mouseout)="onMouseLeave($event, i)"
        [ngClass]="[
          'atlas-rating', 
          'atlas-rating-size-' + size,
          iconClass[hide], 
          readOnly ? 'atlas-rating-read-only' : '',
          disabled ? 'atlas-rating-disabled' : '']">        
      </div>     
      <div *ngIf="showLabel" [ngClass]="[
        'atlas-rating-label',
        size === ratingSizing.small ? 'typographyStyles-label-small' : 'typographyStyles-label-medium',
        disabled ? 'atlas-rating-label-disabled' : ''
      ]">{{hiddenRating}} out of {{numberOfItems}}    
      </div>        
    </ng-container>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true
    },
  ],
  host: {
    '[attr.tabIndex]': 'tabIndex',
    '[attr.aria-label]': 'ariaLabel'
  }
})
export class RatingComponent implements ControlValueAccessor, OnChanges {
  /** Set the rating value */
  @Input() rating: number = 0;
  /** Set the numbers of items */
  @Input() numberOfItems: number = 5;
  /** Set the rating to disabled state */
  @Input() disabled: boolean = false;
  /** Set the rating to read only state */
  @Input() readOnly: boolean = false;
  /** Select the size icon of the rating */
  @Input() size: RatingSizings = RatingSizings.medium;
  /** Set the rating label visible */
  @Input() showLabel: boolean = false;
  /** Emitted when the rating value is changed */
  @Output() rated: EventEmitter<number> = new EventEmitter();

   /** Tab index of the component */
   @Input() tabindex = 0;

   /** @internal */
   @HostBinding('attr.tabindex') get tabIndex(): string {
     return this.disabled ? '-1' : `${this.tabindex}`;
   };
 
   /** Aria label for rating. */
   @Input('aria-label') ariaLabel = '';

  /** @internal */
  iconClass = {};
  /** @internal */
  items: number[] = Array<number>(this.numberOfItems).fill(0);
  /** @internal */
  originalRating: number = 0;
  /** @internal */
  ratingSizing = RatingSizings;
  /** @internal */
  hide: boolean = false;
  /** @internal */
  hiddenRating: number = 0;
  /** @internal */
  hiddenItems: number[] = [];

  ratingChange: any = () => {};
  onTouchFn: any = () => {};

  constructor(
    private _themingService: ThemingService) {
    this._themingService.applyConfig(config);
  }
  writeValue(obj: any): void {
    this.rating = obj;
  }
  registerOnChange(fn: any): void {
    this.ratingChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchFn = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if(isDisabled) {
      this.disabled = isDisabled
    }
    this.ratingChange(isDisabled);
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges): void {
    this.items = Array<number>(this.numberOfItems).fill(0);
    this.hiddenItems = Array<number>(this.numberOfItems).fill(0);

    if (this.rating > this.numberOfItems) {
      this.rating = this.numberOfItems;
    }

    this.iconClass = {
      0: `atlas-rating-size-${this.size}-empty`,
      0.5: `atlas-rating-size-${this.size}-half`,
      1: `atlas-rating-size-${this.size}-full`
    };

    this.originalRating = this.fillStars();
  }

  /** @internal */
  fillStars(): number {
    this.items.fill(0);
    let itemsToFill = Math.round(this.rating * 2) / 2;
    let i = 0;
    while (itemsToFill > 0.5) {
      this.items[i] = 1;
      i++;
      itemsToFill--;
    }
    if (itemsToFill === 0.5) {
      this.items[i] = 0.5;
    }
    return this.items.reduce((a, b) => a + b, 0);
  }

  /** @internal */
  onClicked(index: number): void {
    if (this.disabled || this.readOnly) { return; }

    this.items.fill(0).fill(1, 0, index + 1);
    this.rating = this.items.reduce((a, b) => a + b, 0);
    this.originalRating = this.rating;
    this.ratingChange(this.rating);
    this.rated.emit(this.rating);
  }

  /** @internal */
  onMouseEnter(event: MouseEvent, index: number): void {
    event.preventDefault();
    event.stopPropagation();
    this.hiddenItems.fill(0).fill(1, 0, index + 1);
    this.hiddenRating = this.hiddenItems.reduce((a, b) => a + b, 0);
  }

  /** @internal */
  onMouseLeave(event: MouseEvent, index: number): void {
    event.preventDefault();
    event.stopPropagation();
    this.hide=false;
  }

  /** @internal */
  onHide(event: MouseEvent): void {
    if (this.disabled || this.readOnly) { return; }

    event.preventDefault();
    event.stopPropagation();
    this.hide = true;
  }
}
