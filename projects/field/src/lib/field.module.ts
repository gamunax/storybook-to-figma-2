import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'atlas-button';
import { CdkModule, DATE_FORMATS, DateAdapter, NATIVE_DATE_FORMATS, NativeDateAdapter } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';
import { MenuModule } from 'atlas-menu';

import { CalendarBodyComponent } from './calendar/calendar-body.component';
import { CalendarMonthComponent } from './calendar/calendar-month.component';
import { CalendarMultiYearComponent } from './calendar/calendar-multi-year.component';
import { CalendarYearComponent } from './calendar/calendar-year.component';
import { CalendarComponent, CalendarHeaderComponent } from './calendar/calendar.component';
import { DateRangeInputComponent } from './datepicker/date-range-input';
import { EndDateDirective, StartDateDirective } from './datepicker/date-range-input-parts';
import { DateRangePickerComponent } from './datepicker/date-range-picker';
import { DatepickerInputDirective } from './datepicker/datepicker-input';
import { DatepickerIntl } from './datepicker/datepicker-intl';
import { DatepickerToggleComponent } from './datepicker/datepicker-toggle.component';
import {
  DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
  DatepickerComponent,
  DatepickerContentComponent,
} from './datepicker/datepicker.component';
import { FieldErrorComponent } from './error/field-error.component';
import { FieldComponent } from './field.component';
import { FieldHintComponent } from './hint/field-hint.component';
import { AtlasInput } from './input-field.directive';
import { HaloPasswordRedaction } from './password-redaction.directive';
import { FieldLabelComponent } from './label/field-label.component';
import { OptionComponent } from './option/option.component';
import { FieldPrefixComponent } from './prefix/field-prefix.component';
import { HaloSelectComponent } from './select/select.component';
import { FieldSuffixComponent } from './suffix/field-suffix.component';
import { TimepickerModule } from './timepicker/timepicker.module';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    IconModule,
    MenuModule,
    ButtonModule,
    CdkModule,
  ],
  declarations: [
    FieldComponent,
    FieldSuffixComponent,
    FieldPrefixComponent,
    FieldLabelComponent,
    FieldErrorComponent,
    FieldHintComponent,
    HaloSelectComponent,
    OptionComponent,
    AtlasInput,
    HaloPasswordRedaction,
    CalendarBodyComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    CalendarMonthComponent,
    CalendarMultiYearComponent,
    CalendarYearComponent,
    DatepickerComponent,
    DatepickerContentComponent,
    DatepickerInputDirective,
    DatepickerToggleComponent,
    DateRangeInputComponent,
    DateRangePickerComponent,
    StartDateDirective,
    EndDateDirective,
  ],
  providers: [
    DatepickerIntl,
    DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER,
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: DATE_FORMATS, useValue: NATIVE_DATE_FORMATS },
  ],
  exports: [
    FieldComponent,
    FieldSuffixComponent,
    FieldPrefixComponent,
    FieldLabelComponent,
    FieldErrorComponent,
    FieldHintComponent,
    HaloSelectComponent,
    OptionComponent,
    AtlasInput,
    HaloPasswordRedaction,
    CalendarBodyComponent,
    CalendarComponent,
    CalendarHeaderComponent,
    CalendarMonthComponent,
    CalendarMultiYearComponent,
    CalendarYearComponent,
    DatepickerComponent,
    DatepickerContentComponent,
    DatepickerInputDirective,
    DatepickerToggleComponent,
    DateRangeInputComponent,
    DateRangePickerComponent,
    StartDateDirective,
    EndDateDirective,
    TimepickerModule
  ],
})
export class FieldModule {}
