import { ChangeDetectionStrategy, Component, Host, Input, ViewEncapsulation } from '@angular/core';
import { TableComponent } from './table.component';

/**
 * Table footer subcomponent
 */
@Component({
  selector: 'tfoot[atlas-table-footer]',
  template: ` <ng-content></ng-content> `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: `table-footer`,
    '[class.table__footer--background]': 'footerBackground === true',
  },
})
export class TableFooterComponent {
  /** Toggle the headerBackground class */
  @Input() footerBackground = false;

  private _table: TableComponent;

  constructor(@Host() parent: TableComponent) {
    this._table = parent;
  }
}
