import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { MenuComponent } from './menu.component';
import { ClickOutsideDirective } from './click-outside.directive';

@NgModule({
  imports: [
    CommonModule,
    CdkModule
  ],
  declarations: [
    MenuComponent,
    MenuTriggerDirective,
    ClickOutsideDirective
  ],
  exports: [
    MenuComponent,
    MenuTriggerDirective,
    ClickOutsideDirective
  ]
})
export class MenuModule { }
