import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';
import { ButtonModule } from 'atlas-button';

import { LinkComponent } from './link.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    CdkModule,
    RouterModule,
    IconModule,
    ButtonModule,
  ],
  declarations: [
    LinkComponent,
  ],
  exports: [
    LinkComponent,
  ]
})
export class LinkModule { }
