import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CdkModule } from 'atlas-cdk';
import { RatingModule } from 'atlas-rating';
import { QaRatingComponent } from './qa-rating.component';

@NgModule({
  declarations: [
    QaRatingComponent
  ],
  imports: [
    CommonModule,
    CdkModule,
    RatingModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaRatingComponent
      }
    ])

  ]
})
export class QaRatingModule { }