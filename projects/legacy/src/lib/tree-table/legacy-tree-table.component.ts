import {
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  Input,
  ViewChild,
  TemplateRef,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  QueryList,
  OnChanges,
  SimpleChanges,
  OnInit,
  ViewChildren,
  ElementRef,
  OnDestroy,
  Renderer2,
  AfterViewChecked,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';

import {
  LegacyTableHeaderGroupComponent
} from './legacy-table/legacy-table-header-group.component';
import { Subscription } from 'rxjs';
import { LegacyStickyHelper } from '../utils/legacy-sticky-helper';
import { debounceTime } from 'rxjs/operators';
import { HaloWindowResizeService } from 'atlas-cdk';

export interface LegacyTableSortEvent {
  /**
   * This is the column to be sorted
   */
  column: string;
  /**
   * Flag to determine if the table should be sorted in reverse
   */
  reverse: boolean;
}

export interface LegacyTableSortOnLoadOptions {
  /**
   * Column by index to select by
   */
  column: number | string;

  /**
   * Direction to sort
   */
  direction: 'asc' | 'desc';
}

export type LegacyTreeTableSort = (col: string, rowsData: LegacyTreeTableRowReferenceData[]) => LegacyTreeTableRowReferenceData[];

export interface LegacyTreeTableHeader {
  /**
   * The name of the header column
   */
  name: string;
  /**
   * The column variable name for each row's object key
   * This must match the appropriate row variable name in each row object
   */
  column: string;
  /**
   * This will add a highlight to the column header
   */
  highlighted?: boolean;
  /**
   * Setting this to true will disable sorting for this column
   */
  disableSort?: boolean;
  /**
   * Hide sort for layered sorting
   */
  hideSort?: boolean;
  /**
   * Hide header text
   */
  hideHeaderText?: boolean;
  /**
   * Disable header text
   */
  disableHeaderText?: boolean;
  /**
   * Set a colspan to determine width of header
   */
  colspan?: string;

  /**
   * Set column alignment
   */
  textAlign?: 'left' | 'center' | 'right';
}

export interface LegacyTreeTableHeaderReferenceData {
  /**
   * This is a reference to the row/column object
   */
  reference: LegacyTreeTableHeader;
}

export interface LegacyTreeTableRowReferenceData {
  /**
   * Index of this reference
   */
  index?: number;

  /**
   * This is a reference to the row/column object
   */
  reference: {
    [index: string]: any;
    /**
     * This is the highlighted status for this reference inside the table
     */
    highlighted?: boolean;
    /**
     * This is the label relating to the rows data
     */
    labelColumn: string;
  };
  /**
   * This is the indentation level/node depth
   */
  level: number;
  /**
   * This is the parent of the node
   */
  parent: LegacyTreeTableRowReferenceData | number;
  /**
   * This is whether the node is currently expanded
   */
  isExpanded: boolean;
  /**
   * This is whether the node is a leaf
   */
  isLeaf: boolean;
  /**
   * This is whether the node is currently visible
   */
  shown?: boolean;
  /**
   * This is the selected status for this reference inside the table
   */
  selected?: boolean;
}

export interface LegacyTableSelectedData {
  /**
   * Reference to the current row or column that has been changed
   * This will be null when select all is fired
   */
  changed: any;
  /**
   * The raw table selection data
   * This will preserve the ordering of the table
   */
  dataReference: LegacyTreeTableRowReferenceData[];
  /**
   * This is the row or column that has been selected
   */
  data: any[];
  /**
   * These are the selected data indices from the original array
   */
  indices: number[];
  /**
   * This will be true when select all is toggled on or off
   */
  allToggled: boolean;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[legacy-tree-table-row]',
})
export class LegacyTreeTableRowDirective {
  /** Set if row is highlighted */
  @Input() isHighlightedRow = false;
}

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[legacy-tree-table-node]',
})
export class LegacyTreeTableNodeDirective { }

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[legacy-tree-table-leaf]',
})
export class LegacyTreeTableLeafDirective { }

@Component({
  selector: 'legacy-tree-table-value',
  template: `<ng-template #itemTemplate><ng-content></ng-content></ng-template>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyTreeTableValueComponent {
  @ViewChild('itemTemplate') itemTemplate: TemplateRef<any>;
  @Input() colNum: number;
}

@Component({
  selector: 'legacy-tree-table-footer',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyTreeTableFooterComponent { }

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[legacy-tree-table-sub-header-row]',
})
export class LegacyTreeTableSubHeaderRowDirective { }

@Component({
  selector: 'legacy-tree-table',
  templateUrl: './legacy-tree-table.component.html',
  styleUrls: ['./legacy-tree-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Table Component
 * @preferred
 */
export class LegacyTreeTableComponent implements OnInit, OnChanges, AfterViewChecked, AfterViewInit, OnDestroy {
  @ContentChild(LegacyTreeTableRowDirective, { read: TemplateRef }) rowData: TemplateRef<any>;
  @ContentChild(LegacyTreeTableNodeDirective, { read: TemplateRef }) nodeData: TemplateRef<LegacyTreeTableNodeDirective>;
  @ContentChild(LegacyTreeTableSubHeaderRowDirective, { read: TemplateRef }) subHeaderRow: TemplateRef<LegacyTreeTableSubHeaderRowDirective>;
  @ContentChild(LegacyTreeTableLeafDirective, { read: TemplateRef }) leafTemplate: TemplateRef<LegacyTreeTableLeafDirective>;

  @ContentChildren(LegacyTableHeaderGroupComponent) _headerGroups: QueryList<LegacyTableHeaderGroupComponent>;

  @ViewChildren('_tableCopies')
  private _tableCopies: QueryList<ElementRef>;

  @ViewChild('_tableBody') private _tableBody: ElementRef;

  @ViewChild('_tableOverflowContainer') private _tableOverflowContainer: ElementRef;

  columnsData: LegacyTreeTableHeaderReferenceData[] = [];

  rowsData: LegacyTreeTableRowReferenceData[] = [];

  /**
   * Set this flag to true if sorting will be handled external to this component
   * This will disable the sorting functionality on this component, however sorting events will still be fired
   */
  @Input() customSort: LegacyTreeTableSort | null = null;

  /** Set if the table is sortable */
  @Input() sortable = false;

  /** Set if the table is selectable */
  @Input() rowSelectable = false;

  /** Set to enable horizontal scrolling */
  @Input() scrollHorizontal = false;

  /** Options for sorting on load */
  @Input() sortOnLoadOptions: LegacyTableSortOnLoadOptions;

  /** Input that will sort the table by provided options */
  @Input() sortByInputOptions: LegacyTableSortOnLoadOptions;

  /** Set if the table row has borders */
  @Input() bordered = true;

  /** Set if the table columns has border */
  @Input() columnBordered = false;

  /** Set if the table has striped rows */
  @Input() striped = false;

  /** Set if the table has row highlights on hover */
  @Input() rowHighlight = false;

  /** Set if the table cell text is all centered */
  @Input() centered = false;

  /** Set if the table is responsive */
  @Input() responsive = false;

  /** Set if the table is dense style */
  @Input() dense = false;

  /** Set if the table has a footer */
  @Input() footer = false;

  /** Wrap text in thead th */
  @Input() headerWrapText = true;

  /** toggle word break in thead th */
  @Input() headerWordBreak = false;

  /** Wrap text in tbody td */
  @Input() rowWrapText = true;

  /** toggle word break in tbody td */
  @Input() rowWordBreak = false;

  /** Toggles whether the row is clickable */
  @Input() rowClickable = true;

  /** Truncate text in thead th and enable tooltip for column header text */
  @Input() headerTruncateText = false;

  /** Set the expand icon */
  @Input() expandIcon = 'keyboard_arrow_right';

  /** Set the collapse icon */
  @Input() collapseIcon = 'keyboard_arrow_down';

  /** Set the size of the expanse/collapse icon */
  @Input() iconSize = 'lg';

  /** Set the colspan of the labelColumn td */
  @Input() labelColspan = '1';

  /** Set the table layout to fixed */
  @Input() fixedTableLayout = false;

  /** Enable sticky headers */
  @Input() stickyHeader = false;

  /** Toggles whether the sub-header row is clickable */
  @Input() subHeaderClickable = false;

  /** Toggles whether the tree data should be flattened */
  @Input() flatten = false;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() rowClickedRequest: EventEmitter<LegacyTreeTableRowReferenceData> = new EventEmitter<LegacyTreeTableRowReferenceData>();

  /** Emits when a row is clicked */
  @Output() rowClicked: EventEmitter<LegacyTreeTableRowReferenceData> = new EventEmitter<LegacyTreeTableRowReferenceData>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSort: EventEmitter<LegacyTableSortEvent> = new EventEmitter<LegacyTableSortEvent>();
  /** Emits when a sub-header row is clicked */
  @Output() subHeaderRowClicked: EventEmitter<any> = new EventEmitter<any>();

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelectAll: EventEmitter<boolean> = new EventEmitter<boolean>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onSelectRow: EventEmitter<LegacyTableSelectedData> = new EventEmitter<LegacyTableSelectedData>();

  @Input()
  set rows(val) {
    this._originalRows = val;
    this.rowsData = this._generateRowReferenceList(this._originalRows);
  }

  @Input()
  set headers(val) {
    this._originalHeaders = val;
    this.columnsData = this._generateHeaderReferenceList(this._originalHeaders);
  }

  sortCol: number;
  reverse = false;
  allSelected = false;
  /** Whether or not all rows are deselected. Default: true */
  allDeselected = true;
  /** Whether or not a row has been selected */
  rowSelected = false;

  private _originalHeaders: LegacyTreeTableHeader[] = [];
  private _originalRows: any[] = [];
  private _stickyHelper?: LegacyStickyHelper;
  private _stickySubscription?: Subscription;
  private _resizeSubscription?: Subscription;
  private _tableHeadWidthsSetTimeout: any;
  private _tableOverflowContainerSetTimeout: any;
  /** Combined parent labelColumns for flattened tree view */
  private _parentLabels = '';

  constructor(
    private _renderer: Renderer2,
    private _windowResizeService: HaloWindowResizeService,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    this._stickyHelper = new LegacyStickyHelper(
      this._renderer,
      {
        refFactory: () => this._tableCopies.first.nativeElement,
        stickyFactory: () => this._tableCopies.last.nativeElement,
        tbodyFactory: () => this._tableBody.nativeElement,
        syncWidth: true,
        display: 'table',
      }
    );
  }

  selectRow(row: LegacyTreeTableRowReferenceData) {
    this._propagateSelection(row, this.rowsData);
    this._setRowSelectedStates();

    const selectedRows = this._getSelectedRows();
    selectedRows.changed = row.reference;
    this.onSelectRow.emit(selectedRows);
  }


  selectAll() {
    if (this.rowSelectable) {
      for (let i = 0; i < this.rowsData.length; i++) {
        const row = this.rowsData[i];
        if (row.reference.selectable !== false) {
          row.selected = this.allSelected;
        }
      }
      const selectedRows = this._getSelectedRows();
      selectedRows.allToggled = true;
      this.onSelectRow.emit(selectedRows);
      this.onSelectAll.emit(!this.allSelected);

      this._setRowSelectedStates();
    }
  }

  deselectAll() {
    for (let i = 0; i < this.rowsData.length; i++) {
      const row = this.rowsData[i];
      row.selected = false;
    }
    const selectedRows = this._getSelectedRows();
    selectedRows.allToggled = false;
    this.onSelectRow.emit(selectedRows);

    this._setRowSelectedStates();
  }

  get _copies() {
    if (this.stickyHeader) {
      return ['original', 'sticky'];
    }
    return ['original'];
  }

  get _backgrounds(): Array<string | undefined> {
    if (!this._headerGroups) {
      return [];
    }
    return this._headerGroups
      .reduce(
        (result, component) => [
          ...result,
          ...Array.from({ length: component.colspan }, () => component.background)
        ],
        [],
      );
  }

  ngOnInit() {
    if (this.sortOnLoadOptions) {
      this._sortByOptions(this.sortOnLoadOptions);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sortByInputOptions) {
      this._sortByOptions(this.sortByInputOptions);
    }
    if ('stickyHeader' in changes) {
      if (this.stickyHeader) {
        this._attachStickySubscription();
      } else {
        this._detachStickySubscription();
      }
    }
    if (changes.flatten) {
      this.rowsData = this._generateRowReferenceList(this._originalRows);
    }
  }

  ngAfterViewChecked(): void {
    if (this.stickyHeader && this._tableBody) {
      this._tableHeadWidthsSetTimeout = setTimeout(() => {
        this._stickyHelper.applyTableHeadWidths();
      });
    }
    if (this.scrollHorizontal && this.stickyHeader && this._tableOverflowContainer) {
      this._tableOverflowContainerSetTimeout = setTimeout(() => {
        const { clientWidth, scrollWidth } = this._tableOverflowContainer.nativeElement;
        if (scrollWidth > clientWidth) {
          this.stickyHeader = false;
          this._detachStickySubscription();
          this._changeDetectorRef.markForCheck();
        }
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.scrollHorizontal && this.stickyHeader && this._tableOverflowContainer) {
      this._initResizeSubscription();
    }
  }

  ngOnDestroy() {
    this._detachStickySubscription();
    clearTimeout(this._tableHeadWidthsSetTimeout);
    clearTimeout(this._tableOverflowContainerSetTimeout);
    this._destroyResizeSubscription();
  }

  /**
   * @internal
   * Emit the data of the table column when the header input value is changed
   */
  trackRow(index: number) {
    return index;
  }

  /** @internal */
  _rowClick($event: MouseEvent, index: number, row: LegacyTreeTableRowReferenceData) {
    this.rowClicked.emit(row);
  }

  /** @internal */
  _subHeaderRowClick($event: MouseEvent) {
    const target = $event.target as Element;
    if (target && (target.classList.contains('mos-c-tree-table--skip-click') || target.closest('.mos-c-tree-table--skip-click'))) {
      return;
    }
    this.subHeaderRowClicked.emit();
  }

  /** @internal */
  _expandNode($event: MouseEvent, index: number, row: LegacyTreeTableRowReferenceData) {
    if (this.rowClickable && !row.isLeaf) {
      $event.stopPropagation();
      this.rowsData[index].isExpanded = !this.rowsData[index].isExpanded;
      this.rowsData = this._updateRowReferenceList(this.rowsData);
      this.rowClickedRequest.emit(row);
    }
  }

  /** @internal */
  _rowContext(row: LegacyTreeTableRowReferenceData, index: number) {
    return {
      row: row.reference,
      column: this.columnsData,
      index,
      ref: row
    };
  }

  sortColumn(column: number, $event?: any) {
    if ($event && $event.target.tagName === 'INPUT') {
      return;
    }

    const header = this.columnsData[column];
    const col = header.reference.column;

    if (this.sortCol === column) {
      this.reverse = !this.reverse;
    } else {
      this.reverse = false;
    }

    this.onSort.emit({
      column: col,
      reverse: this.reverse
    });

    this.sortCol = column;

    if (!this.customSort) {
      this._defaultSort(col, this.rowsData);
    } else {
      this.customSort(col, this.rowsData);
    }
  }

  /**
   * Propagates the selection to children nodes
   * @param  selectedRow      row that got selected
   * @param  rowsData
   */
  private _propagateSelection(selectedRow: LegacyTreeTableRowReferenceData, rowsData: LegacyTreeTableRowReferenceData[]) {
    for (let i = selectedRow.index + 1; i < rowsData.length && rowsData[i].level > selectedRow.level; i++) {
      rowsData[i].selected = selectedRow.selected;
    }
  }

  private _generateHeaderReferenceList(array): LegacyTreeTableHeaderReferenceData[] {
    const refArray: LegacyTreeTableHeaderReferenceData[] = [];
    for (let i = 0; i < array.length; i++) {
      const header = array[i];
      const headerData = {
        index: i,
        reference: header,
      };
      refArray.push(headerData);
    }
    return refArray;
  }

  private _generateRowReferenceList(array): LegacyTreeTableRowReferenceData[] {
    const refArray: LegacyTreeTableRowReferenceData[] = [];
    for (let i = 0; i < array.length; i++) {
      const row = array[i];
      if (this.flatten) {
        this._getParentLabels(array, array[row.parent]);
        const newReference = { ...row.reference };
        newReference.labelColumn = this._parentLabels + row.reference.labelColumn;
        const rowData = {
          index: i,
          reference: newReference,
          level: 1,
          shown: row.isLeaf ? true : false,
          parent: row.parent != null ? refArray[row.parent] : null,
          isExpanded: false,
          isLeaf: row.isLeaf,
          selected: row.selected,
        };
        refArray.push(rowData);
        this._parentLabels = '';
      } else {
        const rowData = {
          index: i,
          reference: row.reference,
          level: row.level,
          shown: row.parent != null ? this._getShown(refArray[row.parent]) : true,
          parent: row.parent != null ? refArray[row.parent] : null,
          isExpanded: row.isExpanded,
          isLeaf: row.isLeaf,
          selected: row.selected,
        };
        refArray.push(rowData);
      }
    }

    return refArray;
  }

  /** Update values of the row states. */
  private _setRowSelectedStates() {
    const allRowsSelected = this.rowsData.every(row => row.selected); // True if all rows are selected else false.
    const allRowsDeselected = this.rowsData.every(row => !row.selected); // True if all rows are deselected else false.

    this.allSelected = allRowsSelected;
    this.allDeselected = allRowsDeselected;
    this.rowSelected = !(!allRowsSelected && allRowsDeselected);
  }

  private _getSelectedRows(): LegacyTableSelectedData {
    return this._getSelected(this.rowsData);
  }

  private _getSelected(dataArray): LegacyTableSelectedData {
    const selected = [];
    const indices = [];

    for (let i = 0; i < dataArray.length; i++) {
      const row = dataArray[i];
      if (row.selected) {
        selected.push(row.reference);
        indices.push(i);
      }
    }

    const selectEvent: LegacyTableSelectedData = {
      changed: null,
      dataReference: selected,
      data: dataArray,
      indices: indices,
      allToggled: false,
    };

    return selectEvent;
  }

  /** Get the parent labels for flattened tree view */
  private _getParentLabels(array, row): LegacyTreeTableRowReferenceData | void {
    if (!row) {
      return;
    }
    this._parentLabels = `${row.reference.labelColumn} / ${this._parentLabels}`;

    return this._getParentLabels(array, array[row.parent]);
  }

  private _updateRowReferenceList(array): LegacyTreeTableRowReferenceData[] {
    for (let i = 0; i < array.length; i++) {
      array[i].shown = this._getShown(array[i].parent);
    }
    return array;
  }

  private _getShown(parent) {
    return (parent === null || parent.isExpanded && parent.shown);
  }

  private _defaultSort(col: string, rowsData: LegacyTreeTableRowReferenceData[]) {
    const result = [];
    const rootLevel = Math.min(...rowsData.map(x => x.level));
    const sortLevel = Math.max(...rowsData.filter(x => x['shown']).map(x => x.level));
    rowsData.forEach(row => row['children'] = rowsData.filter(child => child.parent === row));
    const root = rowsData.filter(x => x.level === rootLevel);
    const defaultSort = (a, b) => {
      let first = a.reference[col];
      let second = b.reference[col];

      if (a.level !== sortLevel || b.level !== sortLevel) {
        return 0;
      }

      if (this.reverse) {
        first = b.reference[col];
        second = a.reference[col];
      }

      // If values are string convert to lowercase to allow lowercase, uppercase, and capatalized sorting compatibility
      if (typeof first === 'string' && typeof second === 'string') {
        first = first.toLowerCase();
        second = second.toLowerCase();
      }

      if (typeof first === 'string' && !isNaN(first as any) && typeof second === 'string' && !isNaN(second as any)) {
        first = Number(first);
        second = Number(second);
      }

      if (first === second) {
        return 0;
      }

      return first > second ? 1 : -1;
    };
    const pushChildren = child => {
      result.push(child);
      child['children'].sort(defaultSort);
      child['children'].forEach(pushChildren);
    };
    root.sort(defaultSort);
    root.forEach(pushChildren);
    rowsData.splice(0, rowsData.length);
    result.forEach(x => {
      delete x['children'];
      rowsData.push(x);
    });
  }

  private _sortByOptions(sortOptions: LegacyTableSortOnLoadOptions) {
    const normalizedOptions = {
      direction: 'asc',
      column: 0,
      ...sortOptions
    };
    const column = Number(normalizedOptions.column);

    if (normalizedOptions.direction === 'desc') {
      this.reverse = false;
      this.sortCol = column;
    }

    this.sortColumn(column);
  }

  private _attachStickySubscription() {
    this._detachStickySubscription();
    this._stickySubscription = this._stickyHelper.subscribe();
  }

  private _detachStickySubscription() {
    if (this._stickySubscription) {
      this._stickySubscription.unsubscribe();
      delete this._stickySubscription;
    }
  }

  private _initResizeSubscription(): void {
    this._resizeSubscription = this._windowResizeService
      .resizeObservable$
      .pipe(debounceTime(300))
      .subscribe(() => {
        const { clientWidth, scrollWidth } = this._tableOverflowContainer.nativeElement;
        const prevStickyHeaderValue = this.stickyHeader;
        if (scrollWidth > clientWidth) {
          this.stickyHeader = false;
          this._detachStickySubscription();
        } else {
          this.stickyHeader = true;
          this._attachStickySubscription();
        }
        // Call change detection only if stickyHeader was changed to avoid excessive calls to ngAfterViewChecked
        if (prevStickyHeaderValue !== this.stickyHeader) {
          this._changeDetectorRef.markForCheck();
        }
      });
  }

  private _destroyResizeSubscription(): void {
    if (this._resizeSubscription) {
      this._resizeSubscription.unsubscribe();
    }
  }

  protected readonly top = top;
}
