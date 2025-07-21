import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { AppBarModule } from 'atlas-app-bar';
import { CdkModule, SortPipe } from 'atlas-cdk';
import { ButtonModule } from 'atlas-button';
import { IconModule } from 'atlas-icon';
import { CheckboxModule } from 'atlas-checkbox';
import { FieldModule } from 'atlas-field';
import { TableModule } from 'atlas-table';
import { BreadcrumbModule } from 'atlas-breadcrumb';
import { ListModule } from 'atlas-list';
import { DrawerModule } from 'atlas-drawer';
import { MenuModule } from 'atlas-menu';
import { AvatarModule } from 'atlas-avatar';
import { RouterModule } from '@angular/router';
import { LinkModule } from 'atlas-link';

@NgModule({
  declarations: [
    LayoutComponent,
  ],
  imports: [
    CommonModule,
    CdkModule,
    RouterModule,
    IconModule,
    AvatarModule,
    AppBarModule,
    ButtonModule,
    MenuModule,
    ListModule,
    CheckboxModule,
    FieldModule,
    TableModule,
    BreadcrumbModule,
    DrawerModule,
    LinkModule,
  ],
  exports: [
    LayoutComponent,
  ]
})
export class LayoutModule { }
