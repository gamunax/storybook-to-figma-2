import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';
import { AppBarModule } from 'atlas-app-bar';
import { ButtonModule } from 'atlas-button';
import { AvatarModule } from 'atlas-avatar';
import { QaAppBarComponent } from './qa-app-bar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    QaAppBarComponent
  ],
  imports: [
    CommonModule,
    CdkModule,
    IconModule,
    AppBarModule,
    ButtonModule,
    AvatarModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaAppBarComponent
      }
    ])
  ]
})
export class QaAppBarModule { }
