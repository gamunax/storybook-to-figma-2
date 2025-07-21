import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkModule } from 'atlas-cdk';
import { RouterModule } from '@angular/router';
import { QaSnackBarComponent } from './qa-snack-bar.component';
import { SnackbarModule } from 'atlas-snackbar';

@NgModule({
  declarations: [
    QaSnackBarComponent
  ],
  imports: [
    CommonModule,
    SnackbarModule, 
    CdkModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaSnackBarComponent
      }
    ])
  ]
})
export class QaSnackBarModule { }
