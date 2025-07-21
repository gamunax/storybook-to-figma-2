import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';
import { IconModule } from 'atlas-icon';
import { CdkModule } from 'atlas-cdk';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    CdkModule,
    IconModule,
    FormsModule
  ],
  declarations: [
    CheckboxComponent
  ],
  exports: [
    CheckboxComponent
  ]
})
export class CheckboxModule { }
