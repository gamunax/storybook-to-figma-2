import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'atlas-button';
import { CdkModule, DialogModule } from 'atlas-cdk';

import { Modal, ModalComponent } from './modal.component';

@NgModule({
  declarations: [
    Modal,
    ModalComponent
  ],
  imports: [
    CommonModule,
    CdkModule,
    DialogModule,
    ButtonModule
  ],
  exports: [
    ModalComponent
  ]
})
export class ModalModule { }
