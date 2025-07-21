import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PopoverDirective, PopoverContentComponent  } from './popover.component';
import { IconModule } from 'atlas-icon';
import { CdkModule } from 'atlas-cdk';

@NgModule({
  imports: [
    CommonModule,
    CdkModule,
    IconModule
  ],
  declarations: [
    PopoverDirective,
    PopoverContentComponent
  ],
  exports: [
    PopoverDirective,
    PopoverContentComponent
  ]
})
export class PopoverModule { }
