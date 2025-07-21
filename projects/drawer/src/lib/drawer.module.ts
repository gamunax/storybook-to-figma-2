import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';

import { DrawerComponent } from './drawer.component';

@NgModule({
  imports: [
    CommonModule,
    CdkModule
  ],
  declarations: [
    DrawerComponent
  ],
  exports: [
    DrawerComponent
  ]
})
export class DrawerModule { }
