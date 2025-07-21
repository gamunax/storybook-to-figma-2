import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';

import { BadgeDirective } from './badge.directive';

@NgModule({
  declarations: [
    BadgeDirective
  ],
  imports: [
    CdkModule,
    CommonModule
  ],
  exports: [
    BadgeDirective
  ]
})
export class BadgeModule { }