import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkModule } from 'atlas-cdk';
import { AlertModule } from 'atlas-alert';
import { QaAlertComponent } from './qa-alert.component';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'atlas-button';


@NgModule({
  declarations: [
    QaAlertComponent
  ],
  imports: [
    CommonModule,
    CdkModule,
    AlertModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaAlertComponent
      }
    ])
  ]
})
export class QaAlertModule { }
