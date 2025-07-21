import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarModule } from 'atlas-avatar';
import { CdkModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';

import { ChipListComponent } from './chip-list.component';
import { ChipComponent } from './chip.component';

@NgModule({
  declarations: [
    ChipComponent,
    ChipListComponent,
  ],
  imports: [
    CommonModule,
    CdkModule,
    IconModule,
    AvatarModule,
    FormsModule
  ],
  exports: [    
    ChipComponent,
    ChipListComponent,
  ]
})
export class ChipsModule { }
