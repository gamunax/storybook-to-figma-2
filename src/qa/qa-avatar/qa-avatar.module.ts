import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';
import { AvatarModule } from 'atlas-avatar';
import { QaAvatarComponent } from './qa-avatar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    QaAvatarComponent
  ],
  imports: [
    CommonModule,
    CdkModule,
    IconModule,
    AvatarModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaAvatarComponent
      }
    ])
  ]
})
export class QaAvatarModule { }