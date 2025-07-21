import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'atlas-button';
import { CdkModule } from 'atlas-cdk';
import { FieldModule } from 'atlas-field';
import { IconModule } from 'atlas-icon';

import { BottomNavigationComponent, BottomNavigationActionComponent } from './bottom-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    CdkModule,
    FieldModule,
    IconModule,
    ButtonModule
  ],
  declarations: [
    BottomNavigationComponent,
    BottomNavigationActionComponent,
  ],
  exports: [
    BottomNavigationComponent,
    BottomNavigationActionComponent,
  ]
})
export class BottomNavigationModule { }
