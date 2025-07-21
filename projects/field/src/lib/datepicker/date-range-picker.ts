/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ChangeDetectionStrategy, Component, ViewEncapsulation} from '@angular/core';
import { _RANGE_DATE_SELECTION_MODEL_PROVIDER, DateRange} from './date-selection-model';
import { _CALENDAR_RANGE_STRATEGY_PROVIDER } from './date-range-selection-strategy';
import { DatepickerContentComponent, DatepickerControl, DatepickerComponent } from './datepicker.component';
import { DatepickerInputBaseDirective } from './datepicker-input-base';

/**
 * Input that can be associated with a date range picker.
 * @docs-private
 */
export interface DateRangePickerInput<D> extends DatepickerControl<D> {
  comparisonStart: D|null;
  comparisonEnd: D|null;
}

// TODO(): We use a component instead of a directive here so the user can use implicit
// template reference variables (e.g. #d vs #d="matDateRangePicker"). We can change this to a
// directive if angular adds support for `exportAs: '$implicit'` on directives.
/** Component responsible for managing the date range picker popup/dialog. */
@Component({
  selector: 'date-range-picker',
  template: '',
  exportAs: 'DateRangePicker',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    _RANGE_DATE_SELECTION_MODEL_PROVIDER,
    _CALENDAR_RANGE_STRATEGY_PROVIDER,
    {provide: DatepickerInputBaseDirective, useExisting: DateRangePickerComponent},
  ]
})
export class DateRangePickerComponent<D> extends DatepickerComponent<DateRangePickerInput<D>,
  DateRange<D>, D> {
  protected _forwardContentValues(instance: DatepickerContentComponent<DateRange<D>, D>) {
    super._forwardContentValues(instance);

    const input = this.datepickerInput;

    if (input) {
      instance.comparisonStart = input.comparisonStart;
      instance.comparisonEnd = input.comparisonEnd;
    }
  }
}
