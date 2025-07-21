import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'atlas-button';
import { DialogModule } from 'atlas-cdk';
import { CheckboxModule } from 'atlas-checkbox';
import { FieldModule } from 'atlas-field';
import { FiledropModule } from 'atlas-filedrop';
import { ModalModule } from 'atlas-modal';
import { ProgressModule } from 'atlas-progress';
import { RadioModule } from 'atlas-radio';
import { TooltipModule } from 'atlas-tooltip';
import { PopoverModule } from 'atlas-popover';
import { IconModule } from 'atlas-icon';
import { SnackbarModule } from 'atlas-snackbar';

import { DialogLazyTest, LazyModuleComponent } from './lazy-module.component';
import { LazyRoutingModule } from './lazy-routing.module';



@NgModule({
  declarations: [LazyModuleComponent, DialogLazyTest],
  imports: [
    CommonModule,
    LazyRoutingModule, 
    ReactiveFormsModule,
    ButtonModule,
    ModalModule,
    DialogModule,
    FieldModule, 
    TooltipModule,
    ProgressModule,
    CheckboxModule,
    RadioModule,
    FiledropModule,
    PopoverModule,
    IconModule,
    SnackbarModule,
    FormsModule
  ],
})
export class LazyModule { }
