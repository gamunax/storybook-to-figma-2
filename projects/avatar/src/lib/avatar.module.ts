import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AvatarComponent } from './avatar.component';
import { IconModule } from 'atlas-icon';
import { CdkModule } from 'atlas-cdk';

@NgModule({
  imports: [
    CommonModule,
    CdkModule,
    IconModule
  ],
  declarations: [
    AvatarComponent
  ],
  exports: [
    AvatarComponent
  ]
})
export class AvatarModule { }
