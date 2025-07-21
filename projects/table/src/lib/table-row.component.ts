import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { Actions } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { Subscription } from 'rxjs';

import { TableHeaderComponent } from './table-header.component';
import { ColumnDef, TableColumnAlignment, TableSortDirections } from './table.const';
import { UtilsService } from './utils.service';

/**
 * Table header cell subcomponent
 */
@Component({
  selector: 'th[atlas-table-header-cell]',
  templateUrl: './table-header-cell.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    'class': 'table-header-column',
    '[class.table-header-column-align-right]': 'align === alignmentOptions.right || columnDef.align === alignmentOptions.right',
    '[class.table-header-column-sortable]': 'columnDef.sortable !== false',
    '[class.table-header-column-default]': '!_isDense',
    '[class.table-header-column-dense]': '_isDense',
  }
})
export class TableHeaderCellComponent implements OnDestroy {
  /** Table column alignment options */
  public alignmentOptions = TableColumnAlignment;
  /** Table column sort directions */
  public sortOptions = TableSortDirections;
  /** Table header component ref */
  public tableHeader: TableHeaderComponent;
  /** Set the header cell typography class */
  @Input() headerCellType = 'typographyStyles-label-mediumAlt';
  /** Set the header cell alignment */
  @Input() align = this.alignmentOptions.left;
  /** Type for generating table header columns */
  @Input() columnDef: ColumnDef = {
    fieldKey: '',
    displayLabel: undefined,
    align: this.alignmentOptions.left,
  };

  /**
   *  @internal
   *  Set the header to dense class state 
   */
   _isDense: boolean = false;
   /** @internal */
   private subscription: Subscription;

   @Input() iconColor: string = Actions.default;
   @Input() iconSize: IconSizes = IconSizes.small;
   @Input() icon = 'icon-caret-up-24';
   @Input() collection = 'system';

  constructor(
    @Host() parent: TableHeaderComponent,
    public elementRef: ElementRef,
    private utils: UtilsService,
  ) {
    this.tableHeader = parent;
    this.subscription = this.utils.dense$.subscribe((value: boolean) => this._isDense = value);
  }

    /** @internal */
    updateSortOptions() {
      if (this.columnDef.sortable !== false) {
        if (this.tableHeader.sortOption.direction === this.sortOptions.ascending ||
          this.tableHeader.sortOption.direction === this.sortOptions.initial
        ) {
          this.tableHeader.sortOption = {
            ...this.tableHeader.sortOption,
            direction: this.sortOptions.descending,
            field: this.columnDef.fieldKey};
        } else {
          this.tableHeader.sortOption = {
            ...this.tableHeader.sortOption,
            direction: this.sortOptions.ascending,
            field: this.columnDef.fieldKey};
        }
        this.tableHeader.onSortOptionsDidChange(this.tableHeader.sortOption);
      }
    }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

/**
 * Table row subcomponent
 */
@Component({
  selector: 'tr[atlas-table-row]',
  template: `<ng-content></ng-content>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.table-row-border]': 'border',
    '[class.table-header-row]': '_isHeaderRow',
    '[class.table-header-row-default]': '_isHeaderRow && !_isDense',
    '[class.table-header-row-dense]': '_isHeaderRow && _isDense',
    '[class.table-row]': '_isBodyRow',
    '[class.table-row-selected]': 'isSelected',
    '[class.table-row-size-default]': '_isBodyRow && !_isDense',
    '[class.table-row-size-dense]': '_isBodyRow && _isDense'
  }
})
export class TableRowComponent implements OnDestroy {
  /** Toggle the row border class */
  @Input() border = true;
  @ContentChildren(TableHeaderCellComponent) _headerCells?: QueryList<TableHeaderCellComponent>;

  /**
   *  Set to row selected class state 
   */
  @Input() isSelected: boolean = false;

  /** Determines if this row is a row in table header */
  get _isHeaderRow() {
    return this._elementRef.nativeElement.parentElement.tagName === 'THEAD';
  }

  /** Determines if this row is a row in table body */
  get _isBodyRow() {
    return this._elementRef.nativeElement.parentElement.tagName === 'TBODY';
  }

   /**
   *  @internal
   *  Set to dense class state 
   */
    _isDense: boolean = false;
  /** @internal */
  private subscriptions: Subscription = new Subscription();

  constructor(
    private _elementRef: ElementRef,
    private utils: UtilsService,
  ) {
    this.subscriptions.add(this.utils.dense$.subscribe((value: boolean) => this._isDense = value));   
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
