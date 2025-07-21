import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';

import { IconButtonComponent } from './icon-button.component';

@NgModule({
  imports: [
    CommonModule,
    CdkModule,
    IconModule
  ],
  declarations: [
   
  ],
  exports: [
    IconButtonComponent
  ]
})
export class IconButtonModule { }
