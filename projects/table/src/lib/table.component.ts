import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ThemingService } from 'atlas-cdk';

import { config } from './table.theming';
import { UtilsService } from './utils.service';


/**
 * Tables are used to display manipulatable lists of data with columns and column headers.
 */
@Component({
  selector: 'atlas-table',
  templateUrl: './table.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TableComponent {
  /** Set the button to dense class state */
  @Input()
  get dense(): boolean {
    return this._dense;
  }
  set dense(value: boolean) {
    this._dense = value;
    this.utils.setDense(this._dense);
  }
  private _dense: boolean = false;

  constructor(
    private themingService: ThemingService,
    private utils: UtilsService,
  ) {
    this.themingService.applyConfig(config);
  }
}
