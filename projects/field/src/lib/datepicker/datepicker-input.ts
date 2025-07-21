/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * Inspired by Angular Material
 */
import { Directive, ElementRef, forwardRef, HostListener, Inject, Input, Optional } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidatorFn, Validators } from '@angular/forms';
import { DATE_FORMATS, DateAdapter, DateFormats, ThemingService } from 'atlas-cdk';

import { CONTROL, FieldComponent } from '../field.component';
import { HALO_INPUT_VALUE_ACCESSOR } from '../input-field.directive';
import { DateSelectionModelChange } from './date-selection-model';
import { DateFilterFn, DatepickerInputBaseDirective } from './datepicker-input-base';
import { DatepickerControl, DatepickerPanel } from './datepicker.component';
import { config } from './date-range-input.theming';


/** @docs-private */
export const _DATEPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => DatepickerInputDirective),
  multi: true
};

/** @docs-private */
export const _DATEPICKER_VALIDATORS: any = {
  provide: NG_VALIDATORS,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => DatepickerInputDirective),
  multi: true
};

/**
 * Used to connect an input to a Datepicker.
*/
@Directive({
  selector: 'input[Datepicker]',
  providers: [
    _DATEPICKER_VALUE_ACCESSOR,
    _DATEPICKER_VALIDATORS,
    {provide: HALO_INPUT_VALUE_ACCESSOR, useExisting: DatepickerInputDirective},
  ],
  host: {
    'class': 'datepicker-input',
    '[attr.aria-haspopup]': '_datepicker ? "dialog" : null',
    '[attr.aria-owns]': '(_datepicker?.opened && _datepicker.id) || null',
    '[attr.min]': 'min ? _dateAdapter.toIso8601(min) : null',
    '[attr.max]': 'max ? _dateAdapter.toIso8601(max) : null',
    '[attr.tabindex]': 'tabindex',
    // Used by the test harness to tie this input to its calendar. We can't depend on
    // `aria-owns` for this, because it's only defined while the calendar is open.
    '[attr.data-mat-calendar]': '_datepicker ? _datepicker.id : null',
    '[disabled]': 'disabled',
    '(input)': '_onInput($event.target.value)',
    '(change)': '_onChange()',
    '(blur)': '_onBlur()',
    '(keydown)': '_onKeydown($event)',
  },
  exportAs: 'DatepickerInput',
})
export class DatepickerInputDirective<D> extends DatepickerInputBaseDirective<D | null, D>
  implements DatepickerControl<D | null> {

  // Accept `any` to avoid conflicts with other directives on `<input>` that
  // may accept different types.
  static ngAcceptInputType_value: any;

  focused = false;

  /** Aria label of datepicker. */
  @Input('aria-label') ariaLabel = '';

  /** Tab index of datepicker. */
  @Input('tabindex') tabindex: number = 0;

  /** The datepicker that this input is associated with. */
  @Input()
  set Datepicker(datepicker: DatepickerPanel<DatepickerControl<D>, D | null, D>) {
    if (datepicker) {
      this._datepicker = datepicker;
      this._registerModel(datepicker.registerInput(this));
    }
  }
  _datepicker: DatepickerPanel<DatepickerControl<D>, D | null, D>;

  /** The minimum valid date. */
  @Input()
  get min(): D | null { return this._min; }
  set min(value: D | null) {
    const validValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));

    if (!this._dateAdapter.sameDate(validValue, this._min)) {
      this._min = validValue;
      this._validatorOnChange();
    }
  }
  private _min: D | null;

  /** The maximum valid date. */
  @Input()
  get max(): D | null { return this._max; }
  set max(value: D | null) {
    const validValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));

    if (!this._dateAdapter.sameDate(validValue, this._max)) {
      this._max = validValue;
      this._validatorOnChange();
    }
  }
  private _max: D | null;

  /** Function that can be used to filter out dates within the datepicker. */
  @Input('DatepickerFilter')
  get dateFilter() { return this._dateFilter; }
  set dateFilter(value: DateFilterFn<D | null>) {
    const wasMatchingValue = this._matchesFilter(this.value);
    this._dateFilter = value;

    if (this._matchesFilter(this.value) !== wasMatchingValue) {
      this._validatorOnChange();
    }
  }
  private _dateFilter: DateFilterFn<D | null>;

  /** The combined form control validator for this input. */
  protected _validator: ValidatorFn | null;

  constructor(
      private _themingService: ThemingService,
      elementRef: ElementRef<HTMLInputElement>,
      @Optional() dateAdapter: DateAdapter<D>,
      @Optional() @Inject(DATE_FORMATS) dateFormats: DateFormats,
      @Optional() @Inject(CONTROL) private _Control: FieldComponent,
  ) {
    super(elementRef, dateAdapter, dateFormats);
    this._validator = Validators.compose(super._getValidators());
    this,_themingService.applyConfig(config);
  }

  @HostListener('focus', ['true'])
  @HostListener('blur', ['false'])
  /** Callback for the cases where the focused state of the input changes. */
  _focusChanged(isFocused: boolean) {
    if (isFocused !== this.focused) {
      this.focused = isFocused;
      this.stateChanges.next();
      if (!isFocused) {
        this._onBlur();
      }
    }
  }

  /**
   * Gets the element that the datepicker popup should be connected to.
   * @return The element to connect the popup to.
   */
  getConnectedOverlayOrigin(): ElementRef {
    return this._Control ? this._Control.getConnectedOverlayOrigin() : this._elementRef;
  }

  /** Gets the value at which the calendar should start. */
  getStartValue(): D | null {
    return this.value;
  }

  /** Opens the associated datepicker. */
  protected _openPopup(): void {
    if (this._datepicker) {
      this._datepicker.open();
    }
  }

  protected _getValueFromModel(modelValue: D | null): D | null {
    return modelValue;
  }

  protected _assignValueToModel(value: D | null): void {
    if (this._model) {
      this._model.updateSelection(value, this);
    }
  }

  /** Gets the input's minimum date. */
  _getMinDate() {
    return this._min;
  }

  /** Gets the input's maximum date. */
  _getMaxDate() {
    return this._max;
  }

  /** Gets the input's date filtering function. */
  protected _getDateFilter() {
    return this._dateFilter;
  }

  protected _shouldHandleChangeEvent(event: DateSelectionModelChange<D>) {
    return event.source !== this;
  }
}
