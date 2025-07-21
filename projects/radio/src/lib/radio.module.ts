import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RadioComponent, RadioGroupComponent } from './radio.component';
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
    RadioComponent,
    RadioGroupComponent
  ],
  exports: [
    RadioComponent,
    RadioGroupComponent
  ]
})
export class RadioModule { }
