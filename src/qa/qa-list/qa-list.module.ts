import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaListComponent } from './qa-list.component';
import { ListModule } from 'atlas-list';
import { RouterModule } from '@angular/router';
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';
import { AvatarModule } from 'atlas-avatar';

@NgModule({
  declarations: [
    QaListComponent
  ],
  imports: [
    CommonModule,
    ListModule,
    CdkModule,
    IconModule,
    AvatarModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaListComponent
      }
    ])
  ]
})
export class QaListModule { }