import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkModule } from 'atlas-cdk';
import { RouterModule } from '@angular/router';
import { TableModule } from 'atlas-table';
import { QaTableComponent } from './qa-table.component';

@NgModule({
  declarations: [
    QaTableComponent
  ],
  imports: [
    CommonModule,
    CdkModule,
    TableModule,
    RouterModule.forChild([
      {
        path: '',
        component: QaTableComponent
      }
    ])

  ]
})
export class QaTableModule { }
