import { ChangeDetectionStrategy, Component, Host, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';

import { TableComponent } from './table.component';
import { UtilsService } from './utils.service';

/**
 * Table body subcomponent
 */
 @Component({
    selector: 'tbody[atlas-table-body]',
    template: `<ng-content></ng-content>`,
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
      'class': 'atlas-table__body',
      '[class.atlas-table__body--container]': 'tableContainer === true',
      '[class.atlas-table__body--striped]': 'striped === true',
      '[class.atlas-table-body-default]': '!_isDense',
      '[class.atlas-table-body-dense]': '_isDense'
    }
  })
  export class TableBodyComponent implements OnDestroy {
    /** Toggle the table body striped class */
    @Input() striped = false;
    /** Toggle the table container class */
    @Input() tableContainer = false;
    
    /**
     *  @internal
     *  Set the header to dense class state 
     */
    _isDense: boolean = false;
    /** @internal */
    private subscription: Subscription;

    private _table: TableComponent;

    constructor(
      @Host() parent: TableComponent,
      private utils: UtilsService,
    ) {
      this._table = parent;
      this.subscription = this.utils.dense$.subscribe((value: boolean) => this._isDense = value);
    }

    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
  }
  