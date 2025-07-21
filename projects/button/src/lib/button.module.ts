import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';

import { ButtonComponent } from './button.component';
import { IconButtonComponent } from './icon-button.component';
import { ButtonGroupComponent } from './button-group.component';

@NgModule({
  imports: [
    CommonModule,
    CdkModule,
    IconModule
  ],
  declarations: [
    ButtonComponent,
    IconButtonComponent,
    ButtonGroupComponent
  ],
  exports: [
    ButtonComponent,
    IconButtonComponent,
    ButtonGroupComponent
  ]
})
export class ButtonModule { }
