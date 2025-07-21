import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { DropdownComponent, DropdownItemComponent, DropdownLabelComponent } from './dropdown.component';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [CommonModule, RouterModule, PortalModule],
  declarations: [DropdownComponent, DropdownItemComponent, DropdownLabelComponent],
  exports: [DropdownComponent, DropdownItemComponent, DropdownLabelComponent],
  providers: [],
})
export class DropdownModule {}
