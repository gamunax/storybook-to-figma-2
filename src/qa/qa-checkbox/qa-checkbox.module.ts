import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkModule } from 'atlas-cdk';
import { RouterModule } from '@angular/router';
import { IconModule } from 'atlas-icon';
import { CheckboxModule } from 'atlas-checkbox';
import { QaCheckboxComponent } from './qa-checkbox.component';

@NgModule({
  declarations: [
    QaCheckboxComponent,
  ],
  imports: [
    CommonModule,
    CdkModule,
    IconModule,
    CheckboxModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaCheckboxComponent
      }
    ])
  ]
})
export class QaCheckboxModule { }