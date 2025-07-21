import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkModule } from 'atlas-cdk';

import { SwitchComponent } from './switch.component';

@NgModule({
  declarations: [
    SwitchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    CdkModule
  ],
  exports: [
    SwitchComponent
  ]
})
export class SwitchModule { }
