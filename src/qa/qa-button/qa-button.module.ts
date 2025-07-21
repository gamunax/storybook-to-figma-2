import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaButtonComponent } from './qa-button.component';
import { CdkModule } from 'atlas-cdk';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'atlas-button/';

@NgModule({
  declarations: [
    QaButtonComponent,
  ],
  imports: [
    CommonModule,
    CdkModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaButtonComponent
      }
    ])
  ]
})
export class QaButtonModule { }