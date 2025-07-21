import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';

import { AppBarComponent } from './app-bar.component';

@NgModule({
  imports: [
    CommonModule,
     CdkModule
  ],
  declarations: [
    AppBarComponent
  ],
  exports: [
    AppBarComponent
  ]
})
export class AppBarModule { }
