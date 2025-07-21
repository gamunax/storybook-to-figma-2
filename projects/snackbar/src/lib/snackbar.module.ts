import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';
import { ButtonModule } from 'atlas-button';

import { SnackbarActionComponent, SnackbarComponent, SnackbarContentComponent } from './snackbar.component';
import { SnackbarService } from './snackbar.service';

@NgModule({
  imports: [
    CommonModule,
    CdkModule,
    IconModule,
    ButtonModule,
  ],
  declarations: [
    SnackbarComponent,
    SnackbarContentComponent,
    SnackbarActionComponent,
  ],
  exports: [
    SnackbarComponent,
    SnackbarContentComponent,
    SnackbarActionComponent,
  ],
  providers: [
    SnackbarService
  ]
})
export class SnackbarModule { }
