import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaMenuComponent } from './qa-menu.component';
import { MenuModule } from 'atlas-menu';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'atlas-button';
import { CdkModule } from 'atlas-cdk';
import { ListModule } from 'atlas-list';
import { IconModule } from 'atlas-icon';

@NgModule({
  declarations: [
    QaMenuComponent
  ],
  imports: [
    CommonModule,
    MenuModule,
    ButtonModule,
    CdkModule,
    ListModule,
    IconModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaMenuComponent
      }
    ])

  ]
})
export class QaMenuModule { }