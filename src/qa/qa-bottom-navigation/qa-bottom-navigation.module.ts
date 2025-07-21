import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkModule } from 'atlas-cdk';
import { RouterModule } from '@angular/router';
import { QaBottomNavigationComponent } from './qa-bottom-navigation.component';
import { BottomNavigationModule } from 'atlas-bottom-navigation';
import { IconModule } from 'atlas-icon';
import { FieldModule } from 'atlas-field';

@NgModule({
  declarations: [
    QaBottomNavigationComponent,
  ],
  imports: [
    CommonModule,
    CdkModule,
    IconModule,
    BottomNavigationModule,
    FieldModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaBottomNavigationComponent
      }
    ])
  ]
})
export class QaBottomNavigationModule { }