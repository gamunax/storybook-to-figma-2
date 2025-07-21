import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  forwardRef,
  Host,
  Input,
  OnDestroy,
  Output,
  QueryList,
  ViewEncapsulation,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { TableRowComponent } from './table-row.component';
import { TableComponent } from './table.component';
import { TableColumnAlignment, TableSortDirections } from './table.const';
import { UtilsService } from './utils.service';

/**
 * Table header subcomponent
 */
@Component({
  selector: 'thead[atlas-table-header]',
  template: `
      <ng-content></ng-content>
    `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': `table-header`,
    '[class.table__header--background]': 'headerBackground === true',
    '[class.table-header-default]': '!_isDense',
    '[class.table-header-dense]': '_isDense'
  }
})
export class TableHeaderComponent implements OnDestroy {
  /** Table column alignment options */
  public alignmentOptions = TableColumnAlignment;
  /** Table column sort directions */
  public sortOptions = TableSortDirections;
  /** Set sort direction and field definition */
  public sortOption = {
    direction: this.sortOptions.initial,
    field: null
  };
  /** Toggle the headerBackground class */
  @Input() headerBackground = false;
  /** Highlight sorted header */
  @Input() highlightSortedHeader = false;

  /** Emitted when the sort options have changed */
  @Output() sortOptionsDidChange: EventEmitter<any> = new EventEmitter();

  /**
  *  @internal
  *  Set the header to dense class state 
  */
  _isDense: boolean = false;
  /** @internal */
  private subscription: Subscription;

  private _table: TableComponent;

  /**
   * Query all header row children for highlight logic
   */
  @ContentChildren(TableRowComponent, {descendants: true}) headerRows!: QueryList<TableRowComponent>;

  constructor(
    @Host() parent: TableComponent,
    private utils: UtilsService,
  ) {
    this._table = parent;
    this.subscription = this.utils.dense$.subscribe((value: boolean) => this._isDense = value);
  }

  /** Emits an event when the sort options have changed */
  onSortOptionsDidChange = (sortOption: any) => {
    this.updateHighlights(sortOption.field);
    this.sortOptionsDidChange.emit(sortOption);
  }

  updateHighlights = (field: string) => {
    if (this.highlightSortedHeader && field) {
      console.log('rows', this.headerRows);
      this.headerRows.forEach((headerRow) => {
        headerRow._headerCells.forEach((headerCell) => {
          const element = headerCell.elementRef.nativeElement;
          if (headerCell.columnDef.fieldKey === field) {
            element.classList.add('table-header-column-active');
            element.classList.remove('table-header-column-inactive');
          } else {
            element.classList.remove('table-header-column-active');
            element.classList.add('table-header-column-inactive');
          }
        });
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
