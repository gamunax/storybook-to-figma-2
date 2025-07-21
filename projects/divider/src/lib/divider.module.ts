import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';

import { DividerComponent } from './divider.component';

@NgModule({
  declarations: [
    DividerComponent
  ],
  imports: [
    CommonModule,
    CdkModule,
  ],
  exports: [
    DividerComponent
  ]
})
export class DividerModule { }
