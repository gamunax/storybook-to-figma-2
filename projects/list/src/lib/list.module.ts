import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';
import { ListItemComponent } from './list-item.component';
import { ListComponent } from './list.component';

@NgModule({
  imports: [
    CommonModule,
    CdkModule
  ],
  declarations: [
    ListComponent,
    ListItemComponent
  ],
  exports: [
    ListComponent,
    ListItemComponent
  ]
})
export class ListModule { }
