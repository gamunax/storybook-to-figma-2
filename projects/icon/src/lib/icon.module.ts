import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';
import { IconComponent } from './icon.component';

@NgModule({
  imports: [
    CommonModule,
    CdkModule
  ],
  declarations: [
    IconComponent
  ],
  exports: [
    IconComponent
  ]
})
export class IconModule { }
