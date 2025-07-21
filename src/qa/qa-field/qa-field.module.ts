import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';

import { RouterModule } from '@angular/router';
import { FieldModule } from 'atlas-field';
import { QaFieldComponent } from './qa-field.component';

@NgModule({
  declarations: [
    QaFieldComponent
  ],
  imports: [
    CommonModule,
    CdkModule,
    IconModule,
    FieldModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaFieldComponent
      }
    ])


  ]
})
export class QaFieldModule { }