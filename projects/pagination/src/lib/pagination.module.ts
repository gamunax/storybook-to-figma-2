import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'atlas-button';
import { FieldModule } from "atlas-field";
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';

import { PaginationComponent } from './pagination.component';

@NgModule({
  declarations: [
    PaginationComponent
  ],
  imports: [
    CommonModule,
    CdkModule,
    ButtonModule,
    IconModule,
    FieldModule
  ],
  exports: [
    PaginationComponent
  ]
})
export class PaginationModule { }
