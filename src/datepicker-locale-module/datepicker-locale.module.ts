import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'atlas-button';
import { DATE_LOCALE } from 'atlas-cdk';
import { FieldModule } from 'atlas-field';

import { DatepickerLocaleRoutingModule } from './datepicker-locale-routing.module';
import { DatepickerLocaleComponent } from './datepicker-locale.component';

@NgModule({
  declarations: [DatepickerLocaleComponent],
  imports: [
    CommonModule,
    DatepickerLocaleRoutingModule, 
    ReactiveFormsModule,
    FieldModule, 
    ButtonModule
  ], 
  providers: [
    {provide: DATE_LOCALE, useValue: 'en-AU'},
  ],
})
export class DatepickerLocaleModule { }
