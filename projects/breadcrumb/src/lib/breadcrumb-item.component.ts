import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Actions } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { Subscription } from 'rxjs';

import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: "atlas-breadcrumb-item",
  template: `
    <div
      (click)="emitOnSelect($event)"
      [ngClass]="[
        'atlas-breadcrumb-item',
        typography,
        customClass
      ]"
    >
     <div [class.atlas-breadcrumb-item--disabled-wrapper]="disabled">
        <div [ngClass]="[
          'atlas-breadcrumb-item',
          typography,
          customClass,
          disabled
            ? 'atlas-breadcrumb-item--disabled'
            : active
            ? 'atlas-breadcrumb-item--active'
            : 'atlas-breadcrumb-item--inactive',
          isHidden ? 'atlas-breadcrumb-item--hide' : '',
          'atlas-breadcrumb-item-'+action,
        ]">
        <ng-content></ng-content>
        </div>
      </div>
      <div class="atlas-breadcrumb-item--collapsed" *ngIf="isHidden && index===2">
        <atlas-icon icon="icon-more-24" [size]="size"></atlas-icon>
      </div>
      <ng-content select="atlas-breadcrumb-item-separator" *ngIf="!isCollapsed || ((isFirstItem || isLastItem) || (isCollapsed && isHidden && index === 2))"></ng-content>
    </div>
  `,  
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbItemComponent implements OnInit, OnDestroy {
  /** Set the list item typography class */
  @Input() typography = "typographyStyles-body-medium";
  /** Create a custom class that gets added to the list item elem */
  @Input() customClass?: string = "";
  /** Set the breadcrumb to disabled state */
  @Input() disabled: boolean = false;
  /** Set the breadcrumb to active state */
  @Input() active: boolean = true;
  /** Emitted when the item is clicked */
  @Output() onSelect: EventEmitter<any>;
  /** Emitted when the collapsed item is clicked */
  @Output() onCollapsed: EventEmitter<any>;

  /** @internal */
  index: number = 0;
  /** @internal */
  isFirstItem: boolean = false;
  /** @internal */
  isLastItem: boolean = false;
  /** @internal */
  isCollapsed: boolean = false;
  /** @internal */
  isHidden: boolean = false;
  /** @internal */
  action: Actions = Actions.default;
  /** @internal */
  size: IconSizes = IconSizes.xsmall;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private _breadcrumbService: BreadcrumbService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this.onSelect = new EventEmitter();
    this.onCollapsed = new EventEmitter();
    this.index = this._breadcrumbService.getItemIndex();
  }

  /**
   * @internal
   * Used to listen for state changes
   */
  ngOnInit(): void {
    this.subscriptions.add(
      this._breadcrumbService.totalItems$.subscribe((countTotalItems) => {
        this.isFirstItem = this.index === 1;
        this.isLastItem = this.index === countTotalItems;
        this.refreshCollapsedState();
        this._changeDetectorRef.detectChanges();
      })
    );

    this.subscriptions.add(
      this._breadcrumbService.collapsedItems$.subscribe((value) => {
        this.isCollapsed = value;
        this.refreshCollapsedState();
        this._changeDetectorRef.detectChanges();
      })
    );

    this.subscriptions.add(
      this._breadcrumbService.action$.subscribe((action) => {
        this.action = action;
        this._changeDetectorRef.detectChanges();
      })
    );
  }

  /**
   * @internal
   * Destroy all subscriptions
  */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * @internal
   * Emits when an item is clicked
  */
  emitOnSelect(value: Event) {
    if (!this.disabled) {
      if (this.isHidden) {
        this.onCollapsed.emit(value);
      } else if(!this.active) {        
        this.onSelect.emit(value);
      }
    }
  }

  /**
   * Refresh collapsed items
  */
  private refreshCollapsedState() {
    if (this.isCollapsed) {
      if (!this.isFirstItem && !this.isLastItem) {
        this.isHidden = true;
      } else {
        this.isHidden = false;
      }
    } else {
      this.isHidden = false;
    }
  }
}
