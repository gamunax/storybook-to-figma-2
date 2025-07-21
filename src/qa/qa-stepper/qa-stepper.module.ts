import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaStepperComponent } from './qa-stepper.component';
import { StepperModule } from 'atlas-stepper';
import { CdkModule } from 'atlas-cdk';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    QaStepperComponent,
  ],
  imports: [
    CommonModule,
    StepperModule,
    CdkModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaStepperComponent
      }
    ])

  ]
})
export class QaStepperModule { }
