import {
  CommonModule
} from '@angular/common';
import {
  NgModule
} from '@angular/core';
import {
  CdkModule
} from 'atlas-cdk';
import { IconModule } from 'atlas-icon';
import { CheckboxModule } from 'atlas-checkbox';
import { TableBodyComponent } from './table-body.component';
import { TableCellComponent } from './table-cell.component';
import { TableHeaderComponent } from './table-header.component';
import { TableRowComponent, TableHeaderCellComponent } from './table-row.component';
import {
  TableComponent,
} from './table.component';
import { TableFooterComponent } from './table-footer.component';

export const TABLE_COMPONENTS = [
  TableComponent,
  TableHeaderCellComponent,
  TableHeaderComponent,
  TableRowComponent,
  TableBodyComponent,
  TableCellComponent,
  TableFooterComponent
];

@NgModule({
  imports: [
    CdkModule,
    CommonModule,
    IconModule,
    CheckboxModule,
  ],
  declarations: TABLE_COMPONENTS,
  exports: TABLE_COMPONENTS
})
export class TableModule {}
