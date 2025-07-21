import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaTabsComponent } from './qa-tabs.component';
import { CdkModule } from 'atlas-cdk';
import { TabsModule } from 'atlas-tabs';
import { IconModule } from 'atlas-icon';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    QaTabsComponent
  ],
  imports: [
    CommonModule,
    CdkModule,
    TabsModule,
    IconModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaTabsComponent
      }
    ])

  ]
})
export class QaTabsModule { }