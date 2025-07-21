import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';

import { ProgressComponent } from './progress.component';

@NgModule({
  imports: [
    CommonModule,
    CdkModule
  ],
  declarations: [
    ProgressComponent
  ],
  exports: [
    ProgressComponent
  ]
})
export class ProgressModule { }
