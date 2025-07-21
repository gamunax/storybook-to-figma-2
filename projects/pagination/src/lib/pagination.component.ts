import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Actions,  ButtonSizings, ButtonVariants, ThemingService, Radii, PaginationInfo, PaginationRadius, PaginationSizings, Colors, Styles} from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';

import { config } from './pagination.theming';
import { PaginationVariants } from './pagination.const';

@Component({
  selector: 'atlas-pagination',
  template: `
  <div class="atlas-pagination__container">
    <ul class="atlas-pagination">
     <ng-container *ngIf="lastPageNumber > 1">
      <!--  arrow left -->
      <li>
        <atlas-button 
          [radius]="buttonRadii" 
          [style]="buttonVariant"  
          [size]="buttonSize"
          [color]="action ? action : color"
          [disabled]="(disabled || currentPageIsFirstPage())"
          [customClass]="(disabled || currentPageIsFirstPage()) ? 'atlas-pagination__arrow--disabled' : ''"          
          (onClick)="onLeftArrowClicked()">
            <atlas-icon [icon]="'icon-chevron-left-24'" [size]="iconSize"></atlas-icon>
        </atlas-button>
      </li>
      </ng-container>

      <!--  first Page-->
      <li>
        <atlas-button 
          [radius]="buttonRadii" 
          [style]="currentPageIsFirstPage() ? buttonVariantContained : buttonVariant" 
          [size]="buttonSize" 
          [disabled]="currentPageIsFirstPage() || disabled" 
          [color]="(action ? action : color)"
          [customClass]="disabled ? 'atlas-pagination__item--disabled' : ' ' 
                && currentPageIsFirstPage() ? 
                'atlas-pagination__' + buttonVariant + '-' + (action ? action : color) +'--active' : 
                'atlas-pagination__' + buttonVariant + '-' + (action ? action : color)"          
          (onClick)="onPageClicked(1)"><span class="{{typography}}">1</span>
        </atlas-button>
      </li>

      <ng-container  *ngIf="lastPageNumber > 1">
      <!--  pages -->
      <li *ngFor="let page of pagesCurrentlyRendered; let i = index">
        <atlas-button 
          [radius]="buttonRadii" 
          [style]="pageIsCurrentPage(page) ? buttonVariantContained : buttonVariant"
          [size]="buttonSize"  
          [disabled]="pageIsCurrentPage(page) || disabled"
          [color]="(action ? action : color)"
          [customClass]="disabled ? 'atlas-pagination__item--disabled' : ' ' 
                && pageIsCurrentPage(page) ? 
                'atlas-pagination__' + buttonVariant + '-' + action +'--active' :
                'atlas-pagination__' + buttonVariant + '-' + action "
          (onClick)="onPageClicked(page)"
         ><span class="{{typography}}">{{shouldDisplayEllipsis(page,i)}}</span></atlas-button>
      </li>

      <!--  last Page-->
      <li>
        <atlas-button 
          [radius]="buttonRadii" 
          [style]="currentPageIsLastPage() ? buttonVariantContained : buttonVariant" 
          [size]="buttonSize"  
          [disabled]="currentPageIsLastPage() || disabled"
          [color]="(action ? action : color)"
          [customClass]="disabled ? 'atlas-pagination__item--disabled' : ' ' 
                && currentPageIsLastPage() ? 
                'atlas-pagination__' + buttonVariant + '-' + (action ? action : color) +'--active' :
                'atlas-pagination__' + buttonVariant + '-' + (action ? action : color) "    
          (onClick)="onPageClicked(lastPageNumber)"><span class="{{typography}}">{{lastPageNumber}}</span></atlas-button>
      </li>
      </ng-container>

      <!--  arrow right -->      
      <li *ngIf="!currentPageIsLastPage()">
        <atlas-button 
          [radius]="buttonRadii" 
          [style]="buttonVariant"            
          [size]="buttonSize"
          [color]="(action ? action : color)"
          [customClass]="disabled ? 'atlas-pagination__arrow--disabled' : ''"
          [disabled]="disabled"
          (onClick)="onRightArrowClicked()">
            <atlas-icon [icon]="'icon-chevron-right-24'" [size]="iconSize"></atlas-icon>
        </atlas-button>
      </li>
    </ul>

    <!-- select items per page -->
    <div *ngIf="showLimitOptions" class="atlas-pagination__items-per-page">
      <atlas-field>
        <atlas-select [value]="limitOptions[0]" [action]="action">
          <atlas-option *ngFor="let item of limitOptions" [value]="item"
            (click)="onSelectItemsPerPage(item)">
            {{ item }}
          </atlas-option>
        </atlas-select>
      </atlas-field>
    </div>
  </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnChanges {

  private _maxSize: number = 5;
  /** Max number of items rendered before the ellipsis item
   * This should be greater than 2
   */
  @Input() set maxSize(maxSizeToSet: number) {
    if (maxSizeToSet > 2) {
      this._maxSize = maxSizeToSet;
    }
  }
  /** Model to represent current page, items by page and total items */
  @Input() paginationInfo: PaginationInfo = { page: 1, itemsByPage: 1, total: 0 };
  /** Select the size of the page items */
  @Input() size: PaginationSizings = PaginationSizings.medium;
  /** 
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `style` instead.
   * Select which variant to display, ie: contained, filled
   */
  @Input() variant: PaginationVariants | Styles;
  /** Set the pagination style */
  @Input() style: Styles = Styles['no-fill'];
  /** Select the border radius of the page items */
  @Input() radius: PaginationRadius = PaginationRadius.round;
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * Set the pagination action
   */
  @Input() action: Actions;
  /** Set the pagination color*/
  @Input() color: Colors = Colors.neutral;
  /** Set the pagination typography */
  @Input() typography: string = 'typographyStyles-body-small';
  /** Set the pagination to disabled state */
  @Input() disabled: boolean = false;
  /** Show select options for items per page */
  @Input() showLimitOptions: boolean = false;
  /** Limit options to show in items per page select */
  @Input() limitOptions: number[] = [10, 20, 50, 100];
  /** Emitted when the page item is clicked and return the number of page selected */
  @Output() selectedPageNumber = new EventEmitter<number>();
  /** Emitted when the pagination info is requested and return the pagination info */
  @Output() paginationInfoRequest = new EventEmitter<PaginationInfo>();


  /** @internal */
  lastPageNumber = 1;
  /** @internal */
  currentPageNumber = 1;
  /** array of pages between first and last available be rendered by groups.
   * @internal 
   */
  middlePagesToBeRendered = [];
  /** array with currently rendered pages
   * @internal 
   */
  pagesCurrentlyRendered = [];
  /** @internal */
  buttonVariant: ButtonVariants | Styles;
  /** @internal */
  buttonVariantContained: ButtonVariants | Styles;
  /** @internal */
  buttonRadii: Radii;
  /** @internal */
  buttonSize: ButtonSizings;
  /** @internal */
  iconSize: IconSizes;

  constructor(
    private cd: ChangeDetectorRef,
    private themingService: ThemingService) {
    this.themingService.applyConfig(config);
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges) {
    this.buttonRadii = Radii.softer;
    this.buttonVariant = Styles.strong;

    switch (this.size) {
      case PaginationSizings.small:
        this.buttonSize = ButtonSizings.small;
        this.iconSize = IconSizes.small;
        break;
      case PaginationSizings.medium:
        this.buttonSize = ButtonSizings.medium;
        this.iconSize = IconSizes.medium;
        break;
      case PaginationSizings.large:
        this.buttonSize = ButtonSizings.large;
        this.iconSize = IconSizes.large;
        break;
      case PaginationSizings.xlarge:
        this.buttonSize = ButtonSizings.xlarge;
        this.iconSize = IconSizes.large;
        break;
    }
    if(this.variant === PaginationVariants.text || this.style === Styles['no-fill']){
      this.buttonVariant = Styles['no-fill'];
      this.buttonVariantContained = Styles.soft;
    }
    if(this.variant === PaginationVariants.outlined || this.style === Styles.outlined){
      this.buttonVariant = Styles.soft;
      this.buttonVariantContained = Styles.soft;
    }

    if (this.radius === PaginationRadius.round) {
      this.buttonRadii = Radii.rounded;
    }

    const chng = changes['paginationInfo'];
    if (chng && chng.currentValue) {

      const paginationInfo = chng.currentValue as PaginationInfo;

      this.currentPageNumber = paginationInfo.page;

      const totalItems = paginationInfo.total || 0;
      const itemsByPage = paginationInfo.itemsByPage || 0;
      this.lastPageNumber = this.calculateLastPageNumber(totalItems, itemsByPage);

      if (this.lastPageNumber >= 2) {

        this.middlePagesToBeRendered = [];
        this.pagesCurrentlyRendered = [];

        for (let index = 2; index < this.lastPageNumber; index++) {
          this.middlePagesToBeRendered.push(index);
        }
      }
    }

    this.renderGroupOfPagesFromCurrentPageNumber();
    this.cd.detectChanges();
  }

  /** @internal */
  onSelectItemsPerPage(itemsByPage: number) {
    this.paginationInfoRequest.emit({...this.paginationInfo, page: 1, itemsByPage});
  }

  /** @internal */
  onPageClicked(pageNumberClicked: number) {
    if (!this.disabled) {
      this.selectedPageNumber.next(pageNumberClicked);
      this.paginationInfoRequest.emit({...this.paginationInfo, page: pageNumberClicked});
    }
  }

  /** @internal */
  pageIsCurrentPage(pageNumber: number): boolean {
    return pageNumber === this.currentPageNumber;
  }

  /** @internal */
  currentPageIsFirstPage(): boolean {
    return this.currentPageNumber === 1;
  }

  /** @internal */
  currentPageIsLastPage(): boolean {
    return this.currentPageNumber === this.lastPageNumber;
  }

  /** @internal */
  onLeftArrowClicked() {
    const previousPageNumber: number = this.getPreviousPageNumber();
    if (!this.disabled) {
      this.selectedPageNumber.next(previousPageNumber);
      this.paginationInfoRequest.emit({...this.paginationInfo, page: previousPageNumber});
    }
  }

  /** @internal */
  getPreviousPageNumber(): number {
    if (this.currentPageNumber <= 1) {
      throw Error('Illegal State: Cannot go back from first page!');
    }
    return this.currentPageNumber - 1;
  }

  /** @internal */
  getNextPageNumber(): number {
    if (this.currentPageNumber >= this.lastPageNumber) {
      throw Error('Illegal State: Cannot go forward from last page!');
    }
    return this.currentPageNumber + 1;
  }

  /** @internal */
  onRightArrowClicked() {
    const nextPageNumber: number = this.getNextPageNumber();

    if (!this.disabled) {
      this.selectedPageNumber.next(nextPageNumber);
      this.paginationInfoRequest.emit({...this.paginationInfo, page: nextPageNumber});
    }
  }

  /** @internal */
  currentPageIsLastPageOfRenderedGroup(): boolean {
    return this.currentPageNumber === this.pagesCurrentlyRendered[this.pagesCurrentlyRendered.length - 1];
  }

  /** @internal */
  renderGroupOfPagesFromCurrentPageNumber() {
    if (this.currentPageIsFirstPage()) {
      // if current page iss first page render first group (variable size)
      this.pagesCurrentlyRendered = [...this.middlePagesToBeRendered.slice(0, this._maxSize)];
      return;
    }

    if (this.currentPageIsLastPage()) {
      // if current page is last page,  render the last pages from the end
      const lastGroupFirstItemIndex =
        (this.middlePagesToBeRendered.length - this._maxSize > 0)
          ? (this.middlePagesToBeRendered.length - this._maxSize) : 0;
      this.pagesCurrentlyRendered =
        [...this.middlePagesToBeRendered.slice(lastGroupFirstItemIndex, this.middlePagesToBeRendered.length)];
      return;
    }

    // if its a page in the middle then find which group it belogs to.
    let auxCurrentGroupFirstItemIndex = 0;

    // set auxCurrentGroupLastItemIndex as middlePagesToBeRendered.length OR this._maxSize - 1
    let auxCurrentGroupLastItemIndex =
      (this.middlePagesToBeRendered.length >= this._maxSize) ? this._maxSize - 1 : (this.middlePagesToBeRendered.length);

    // loop through middlePagesToBeRendered to find group to which currentPage belongs to.
    do {
      for (let index = auxCurrentGroupFirstItemIndex; index < auxCurrentGroupLastItemIndex; index++) {
        const element = this.middlePagesToBeRendered[index];
        if (element === this.currentPageNumber) {
          // found current page in group!
          // then render its corresponding group
          this.pagesCurrentlyRendered =
            [...this.middlePagesToBeRendered.slice(auxCurrentGroupFirstItemIndex, auxCurrentGroupLastItemIndex + 1)];
          return;
        }
      }

      // did not find currentPage within previous group. Increase pointers and try again
      auxCurrentGroupFirstItemIndex = auxCurrentGroupLastItemIndex - 1;
      auxCurrentGroupLastItemIndex = (auxCurrentGroupLastItemIndex - 1) + this._maxSize - 1;

      // if we didn't find it, then it's in the last group of pages.
      // We render the last pages from the end to avoid a short last page with less elements than desired.
      const lastGroupFirstItemIndex =
        (this.middlePagesToBeRendered.length - this._maxSize > 0) ? (this.middlePagesToBeRendered.length - this._maxSize) : 0;
      this.pagesCurrentlyRendered = [...this.middlePagesToBeRendered.slice(lastGroupFirstItemIndex, this.middlePagesToBeRendered.length)];

    } while (auxCurrentGroupLastItemIndex <= this.middlePagesToBeRendered.length - 1);

  }

  /**
   * @internal 
   * Returns ellipsis '...' unless the page number is '2', if it is '2' then it returns '2'.
   * @param page page number to check
   */
  getFirstRenderedItemLabel(page: number): string {
    const ellipsis = '...';
    if (page !== 2) {
      return ellipsis;
    }
    return String(page);

  }

  /**
  * @internal
  * Returns ellipsis '...' unless the page number is the last element of middlePagesToBeRendered.
  * Else returns the last element of middlePagesToBeRendered.
  * @param page page number to check
  */
  getLastRenderedItemLabel(page: number): string {
    const ellipsis = '...';
    if (page !== this.middlePagesToBeRendered[this.middlePagesToBeRendered.length - 1]) {
      return ellipsis;
    }
    return String(page);

  }

  /**
   * @internal
   * Checks whether should show ellipsis or the number in the first and last element of the middlePagesToBeRendered array.
   * @param page page to check
   * @param index current position in button loop
   */
  shouldDisplayEllipsis(page: number, index: number): string {
    if (index === 0) {
      return this.getFirstRenderedItemLabel(page);
    }

    if (index === this.pagesCurrentlyRendered.length - 1) {
      return this.getLastRenderedItemLabel(page);
    }
    return String(page);

  }

  /** @internal */
  calculateLastPageNumber(totalItems: number, itemsByPage: number): number {
    if (itemsByPage !== 0) {
      return Math.ceil(totalItems / itemsByPage);
    }
    return null;
  }
}
