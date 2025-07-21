import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaDrawerComponent } from './qa-drawer.component';
import { DrawerModule } from 'atlas-drawer';
import { CdkModule } from 'atlas-cdk';
import { RouterModule } from '@angular/router';
import { ListModule } from 'atlas-list';
import { IconModule } from 'atlas-icon';



@NgModule({
  declarations: [
    QaDrawerComponent
  ],
  imports: [
    CommonModule,
    DrawerModule,
    CdkModule,
    ListModule,
    IconModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaDrawerComponent
      }
    ])
  ]
})
export class QaDrawerModule { }
