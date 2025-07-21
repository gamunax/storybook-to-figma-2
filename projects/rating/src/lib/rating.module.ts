import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkModule } from 'atlas-cdk';

import { RatingComponent } from './rating.component';

@NgModule({
  declarations: [
    RatingComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    CdkModule, 
  ],
  exports: [
    RatingComponent
  ]
})
export class RatingModule { }
