import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultsComponent } from './search-results.component';
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
import { DividerModule } from 'atlas-divider';
import { AccordionModule } from 'atlas-accordion';
import { CardModule } from 'atlas-card';
import { ChipsModule } from 'atlas-chips';

@NgModule({
  declarations: [
    SearchResultsComponent,
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
    DividerModule,
    AccordionModule,
    CardModule,
    ChipsModule
  ],
})
export class SearchResultsModule { }
