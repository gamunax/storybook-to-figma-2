import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkModule } from 'atlas-cdk';

import { SliderComponent } from './slider.component';

@NgModule({
  declarations: [
    SliderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CdkModule
  ],
  exports: [
    SliderComponent
  ]
})
export class SliderModule { }
