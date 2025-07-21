import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaBadgeComponent } from './qa-badge.component';
import { CdkModule } from 'atlas-cdk';
import { RouterModule } from '@angular/router';
import { IconModule } from 'atlas-icon';
import { BadgeModule } from 'atlas-badge';

@NgModule({
  declarations: [
    QaBadgeComponent,
  ],
  imports: [
    CommonModule,
    CdkModule,
    IconModule,
    BadgeModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaBadgeComponent
      }
    ])
  ]
})
export class QaBadgeModule { }