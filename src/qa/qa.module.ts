import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QaRoutingModule } from './qa-routing.module';
import { QaAlertModule } from './qa-alert/qa-alert.module';
import { QaAvatarModule } from './qa-avatar/qa-avatar.module';
import { QaBadgeModule } from './qa-badge/qa-badge.module';
import { QaFieldModule } from './qa-field/qa-field.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule, 
    QaRoutingModule
  ]
})
export class QaModule { }
