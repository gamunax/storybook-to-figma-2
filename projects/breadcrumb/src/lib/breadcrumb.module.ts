import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';

import { BreadcrumbItemSeparatorComponent } from './breadcrumb-item-separator.component';
import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { BreadcrumbComponent } from './breadcrumb.component';


@NgModule({
  declarations: [BreadcrumbComponent, BreadcrumbItemComponent, BreadcrumbItemSeparatorComponent],
  imports: [CommonModule, CdkModule, IconModule, RouterModule ],
  exports: [BreadcrumbComponent, BreadcrumbItemComponent, BreadcrumbItemSeparatorComponent],
})
export class BreadcrumbModule {}
