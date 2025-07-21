import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkModule } from 'atlas-cdk';
import { RouterModule } from '@angular/router';
import { ChipsModule } from 'atlas-chips';
import { QaChipComponent } from './qa-chip.component';
import { IconModule } from 'atlas-icon';

@NgModule({
  declarations: [
    QaChipComponent,
  ],
  imports: [
    CommonModule,
    ChipsModule,
    CdkModule,
    IconModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaChipComponent
      }
    ])
  ]
})
export class QaChipModule {}
