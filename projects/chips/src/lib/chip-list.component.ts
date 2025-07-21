import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { ThemingService } from 'atlas-cdk';

import { config } from './chips.theming';

@Component({
  selector: 'atlas-chip-list',
  template: `
    <div class="atlas-chip-list">
      <ng-content></ng-content>
    </div>
    `, 
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ChipListComponent {
  constructor(private _themingService: ThemingService){
    this._themingService.applyConfig(config);
  }
}
