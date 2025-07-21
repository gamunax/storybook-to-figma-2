/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput } from '@angular/cdk/coercion';
import { BACKSPACE } from '@angular/cdk/keycodes';
import {
  Directive,
  DoCheck,
  ElementRef,
  Inject,
  InjectFlags,
  InjectionToken,
  Injector,
  OnInit,
  Optional,
} from '@angular/core';
import {
  AbstractControl,
  FormGroupDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  CanUpdateErrorState,
  CanUpdateErrorStateCtor,
  DATE_FORMATS,
  DateAdapter,
  DateFormats,
  ERROR_STATE_MATCHER,
  ErrorStateMatcher,
  mixinErrorState,
} from 'atlas-cdk';

import { DateRange, DateSelectionModelChange } from './date-selection-model';
import { DateFilterFn, DatepickerInputBaseDirective } from './datepicker-input-base';

/** Parent component that should be wrapped around `StartDate` and `EndDate`. */
export interface DateRangeInputParent<D> {
  id: string;
  min: D | null;
  max: D | null;
  dateFilter: DateFilterFn<D>;
  rangePicker: {
    opened: boolean;
    id: string;
  };
  _startInput: DateRangeInputPartBaseDirective<D>;
  _endInput: DateRangeInputPartBaseDirective<D>;
  _groupDisabled: boolean;
  _handleChildValueChange(): void;
  _openDatepicker(): void;
}

/**
 * Used to provide the date range input wrapper component
 * to the parts without circular dependencies.
 */
export const DATE_RANGE_INPUT_PARENT =
    new InjectionToken<DateRangeInputParent<unknown>>('DATE_RANGE_INPUT_PARENT');

/**
 * Base class for the individual inputs that can be projected inside a `mat-date-range-input`.
 */
@Directive()
abstract class DateRangeInputPartBaseDirective<D>
  extends DatepickerInputBaseDirective<DateRange<D>> implements OnInit, DoCheck {

  /** @docs-private */
  ngControl: NgControl;

  protected abstract _validator: ValidatorFn | null;

  /** @docs-private */
  abstract updateErrorState(): void;
  protected abstract _assignValueToModel(value: D | null): void;
  protected abstract _getValueFromModel(modelValue: DateRange<D>): D | null;

  constructor(
    @Inject(DATE_RANGE_INPUT_PARENT) public _rangeInput: DateRangeInputParent<D>,
    elementRef: ElementRef<HTMLInputElement>,
    public _defaultErrorStateMatcher: ErrorStateMatcher,
    private _injector: Injector,
    @Optional() public _parentForm: NgForm,
    @Optional() public _parentFormGroup: FormGroupDirective,
    @Optional() dateAdapter: DateAdapter<D>,
    @Optional() @Inject(DATE_FORMATS) dateFormats: DateFormats) {
    super(elementRef, dateAdapter, dateFormats);
  }

  ngOnInit() {
    // We need the date input to provide itself as a `ControlValueAccessor` and a `Validator`, while
    // injecting its `NgControl` so that the error state is handled correctly. This introduces a
    // circular dependency, because both `ControlValueAccessor` and `Validator` depend on the input
    // itself. Usually we can work around it for the CVA, but there's no API to do it for the
    // validator. We work around it here by injecting the `NgControl` in `ngOnInit`, after
    // everything has been resolved.
    const ngControl = this._injector.get(NgControl, null, InjectFlags.Self);

    if (ngControl) {
      this.ngControl = ngControl;
    }
  }

  ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      this.updateErrorState();
    }
  }

  /** Gets whether the input is empty. */
  isEmpty(): boolean {
    return this._elementRef.nativeElement.value.length === 0;
  }

  /** Gets the placeholder of the input. */
  _getPlaceholder() {
    return this._elementRef.nativeElement.placeholder;
  }

  /** Focuses the input. */
  focus(): void {
    this._elementRef.nativeElement.focus();
  }

  /** Handles `input` events on the input element. */
  _onInput(value: string) {
    super._onInput(value);
    this._rangeInput._handleChildValueChange();
  }

  /** Opens the datepicker associated with the input. */
  protected _openPopup(): void {
    this._rangeInput._openDatepicker();
  }

  /** Gets the minimum date from the range input. */
  _getMinDate() {
    return this._rangeInput.min;
  }

  /** Gets the maximum date from the range input. */
  _getMaxDate() {
    return this._rangeInput.max;
  }

  /** Gets the date filter function from the range input. */
  protected _getDateFilter() {
    return this._rangeInput.dateFilter;
  }

  protected _parentDisabled() {
    return this._rangeInput._groupDisabled;
  }

  protected _shouldHandleChangeEvent({source}: DateSelectionModelChange<DateRange<D>>): boolean {
    return source !== this._rangeInput._startInput && source !== this._rangeInput._endInput;
  }

  protected _assignValueProgrammatically(value: D | null) {
    super._assignValueProgrammatically(value);
    const opposite = (this === this._rangeInput._startInput ? this._rangeInput._endInput :
        this._rangeInput._startInput) as DateRangeInputPartBaseDirective<D> | undefined;
    opposite?._validatorOnChange();
  }
}

const _DateRangeInputBase:
    CanUpdateErrorStateCtor & typeof DateRangeInputPartBaseDirective =
    // Needs to be `as any`, because the base class is abstract.
    mixinErrorState(DateRangeInputPartBaseDirective as any);

/** Input for entering the start date in a `mat-date-range-input`. */
@Directive({
  selector: 'input[StartDate]',
  host: {
    'class': 'start-date date-range-input__inner',
    '[disabled]': 'disabled',
    '(input)': '_onInput($event.target.value)',
    '(change)': '_onChange()',
    '(keydown)': '_onKeydown($event)',
    '[attr.id]': '_rangeInput.id',
    '[attr.aria-haspopup]': '_rangeInput.rangePicker ? "dialog" : null',
    '[attr.aria-owns]': '(_rangeInput.rangePicker?.opened && _rangeInput.rangePicker.id) || null',
    '[attr.min]': '_getMinDate() ? _dateAdapter.toIso8601(_getMinDate()) : null',
    '[attr.max]': '_getMaxDate() ? _dateAdapter.toIso8601(_getMaxDate()) : null',
    '(blur)': '_onBlur()',
    'type': 'text',
  },
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: StartDateDirective, multi: true},
    {provide: NG_VALIDATORS, useExisting: StartDateDirective, multi: true}
  ],
  // These need to be specified explicitly, because some tooling doesn't
  // seem to pick them up from the base class. See #20932.
  outputs: ['dateChange', 'dateInput']
})
export class StartDateDirective<D> extends _DateRangeInputBase<D> implements
    CanUpdateErrorState, DoCheck, OnInit {
  static ngAcceptInputType_disabled: BooleanInput;

  /** Validator that checks that the start date isn't after the end date. */
  private _startValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const start = this._dateAdapter.getValidDateOrNull(
      this._dateAdapter.deserialize(control.value));
    const end = this._model ? this._model.selection.end : null;
    return (!start || !end ||
        this._dateAdapter.compareDate(start, end) <= 0) ?
        null : {'StartDateInvalid': {'end': end, 'actual': start}};
  }

  // tslint:disable-next-line:member-ordering
  protected _validator = Validators.compose([...super._getValidators(), this._startValidator]);

  constructor(
    @Inject(DATE_RANGE_INPUT_PARENT) rangeInput: DateRangeInputParent<D>,
    elementRef: ElementRef<HTMLInputElement>,
    defaultErrorStateMatcher: ErrorStateMatcher,
    injector: Injector,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    @Optional() dateAdapter: DateAdapter<D>,
    @Optional() @Inject(DATE_FORMATS) dateFormats: DateFormats) {

    // TODO(): this constructor shouldn't be necessary, but ViewEngine doesn't seem to
    // handle DI correctly when it is inherited from `MatDateRangeInputPartBase`. We can drop this
    // constructor once ViewEngine is removed.
    super(rangeInput, elementRef, defaultErrorStateMatcher, injector, parentForm, parentFormGroup,
        dateAdapter, dateFormats);
  }

  ngOnInit() {
    // Normally this happens automatically, but it seems to break if not added explicitly when all
    // of the criteria below are met:
    // 1) The class extends a TS mixin.
    // 2) The application is running in ViewEngine.
    // 3) The application is being transpiled through tsickle.
    // This can be removed once google3 is completely migrated to Ivy.
    super.ngOnInit();
  }

  ngDoCheck() {
    // Normally this happens automatically, but it seems to break if not added explicitly when all
    // of the criteria below are met:
    // 1) The class extends a TS mixin.
    // 2) The application is running in ViewEngine.
    // 3) The application is being transpiled through tsickle.
    // This can be removed once google3 is completely migrated to Ivy.
    super.ngDoCheck();
  }

  protected _getValueFromModel(modelValue: DateRange<D>) {
    return modelValue.start;
  }

  protected _assignValueToModel(value: D | null) {
    if (this._model) {
      const range = new DateRange(value, this._model.selection.end);
      this._model.updateSelection(range, this);
    }
  }

  protected _formatValue(value: D | null) {
    super._formatValue(value);

    // Any time the input value is reformatted we need to tell the parent.
    this._rangeInput._handleChildValueChange();
  }

  /** Gets the value that should be used when mirroring the input's size. */
  getMirrorValue(): string {
    const element = this._elementRef.nativeElement;
    const value = element.value;
    return value.length > 0 ? value : element.placeholder;
  }
}


/** Input for entering the end date in a `date-range-input`. */
@Directive({
  selector: 'input[EndDate]',
  host: {
    'class': 'end-date date-range-input__inner',
    '[disabled]': 'disabled',
    '(input)': '_onInput($event.target.value)',
    '(change)': '_onChange()',
    '(keydown)': '_onKeydown($event)',
    '[attr.aria-haspopup]': '_rangeInput.rangePicker ? "dialog" : null',
    '[attr.aria-owns]': '(_rangeInput.rangePicker?.opened && _rangeInput.rangePicker.id) || null',
    '[attr.min]': '_getMinDate() ? _dateAdapter.toIso8601(_getMinDate()) : null',
    '[attr.max]': '_getMaxDate() ? _dateAdapter.toIso8601(_getMaxDate()) : null',
    '(blur)': '_onBlur()',
    'type': 'text',
  },
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: EndDateDirective, multi: true},
    {provide: NG_VALIDATORS, useExisting: EndDateDirective, multi: true}
  ],
  // These need to be specified explicitly, because some tooling doesn't
  // seem to pick them up from the base class. See #20932.
  outputs: ['dateChange', 'dateInput']
})
export class EndDateDirective<D> extends _DateRangeInputBase<D> implements
    CanUpdateErrorState, DoCheck, OnInit {
  static ngAcceptInputType_disabled: BooleanInput;

  /** Validator that checks that the end date isn't before the start date. */
  private _endValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const end = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(control.value));
    const start = this._model ? this._model.selection.start : null;
    return (!end || !start ||
        this._dateAdapter.compareDate(end, start) >= 0) ?
        null : {'EndDateInvalid': {'start': start, 'actual': end}};
  }

  // tslint:disable-next-line:member-ordering
  protected _validator = Validators.compose([...super._getValidators(), this._endValidator]);

  constructor(
    @Inject(DATE_RANGE_INPUT_PARENT) rangeInput: DateRangeInputParent<D>,
    elementRef: ElementRef<HTMLInputElement>,
    defaultErrorStateMatcher: ErrorStateMatcher,
    injector: Injector,
    @Optional() parentForm: NgForm,
    @Optional() parentFormGroup: FormGroupDirective,
    @Optional() dateAdapter: DateAdapter<D>,
    @Optional() @Inject(DATE_FORMATS) dateFormats: DateFormats) {

    // TODO(): this constructor shouldn't be necessary, but ViewEngine doesn't seem to
    // handle DI correctly when it is inherited from `MatDateRangeInputPartBase`. We can drop this
    // constructor once ViewEngine is removed.
    super(rangeInput, elementRef, defaultErrorStateMatcher, injector, parentForm, parentFormGroup,
        dateAdapter, dateFormats);
  }

  ngOnInit() {
    // Normally this happens automatically, but it seems to break if not added explicitly when all
    // of the criteria below are met:
    // 1) The class extends a TS mixin.
    // 2) The application is running in ViewEngine.
    // 3) The application is being transpiled through tsickle.
    // This can be removed once google3 is completely migrated to Ivy.
    super.ngOnInit();
  }

  ngDoCheck() {
    // Normally this happens automatically, but it seems to break if not added explicitly when all
    // of the criteria below are met:
    // 1) The class extends a TS mixin.
    // 2) The application is running in ViewEngine.
    // 3) The application is being transpiled through tsickle.
    // This can be removed once google3 is completely migrated to Ivy.
    super.ngDoCheck();
  }

  protected _getValueFromModel(modelValue: DateRange<D>) {
    return modelValue.end;
  }

  protected _assignValueToModel(value: D | null) {
    if (this._model) {
      const range = new DateRange(this._model.selection.start, value);
      this._model.updateSelection(range, this);
    }
  }

  _onKeydown(event: KeyboardEvent) {
    // If the user is pressing backspace on an empty end input, move focus back to the start.
    if (event.keyCode === BACKSPACE && !this._elementRef.nativeElement.value) {
      this._rangeInput._startInput.focus();
    }

    super._onKeydown(event);
  }
}
