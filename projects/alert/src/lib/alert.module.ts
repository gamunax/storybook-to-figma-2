import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';
import { ButtonModule } from 'atlas-button';

import { AlertActionComponent, AlertComponent, AlertContentComponent, AlertTitleComponent } from './alert.component';
import { AlertService } from './alert.service';

@NgModule({
  imports: [
    CommonModule,
    CdkModule,
    IconModule,
    ButtonModule,
  ],
  declarations: [
    AlertComponent,
    AlertTitleComponent,
    AlertContentComponent,
    AlertActionComponent,
  ],
  exports: [
    AlertComponent,
    AlertTitleComponent,
    AlertContentComponent,
    AlertActionComponent,
  ],
  providers: [
    AlertService
  ]
})
export class AlertModule { }
