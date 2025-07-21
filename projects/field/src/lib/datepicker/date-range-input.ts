/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Self,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
import { DateAdapter, ThemingService } from 'atlas-cdk';
import { merge, Observable, Subject } from 'rxjs';

import { FieldComponent } from '../field.component';
import { HaloFormFieldControl } from '../field.control';
import {
  DATE_RANGE_INPUT_PARENT,
  DateRangeInputParent,
  EndDateDirective,
  StartDateDirective,
} from './date-range-input-parts';
import { DateRangePickerInput } from './date-range-picker';
import { DateRange, DateSelectionModelDirective } from './date-selection-model';
import { DateFilterFn, dateInputsHaveChanged } from './datepicker-input-base';
import { DatepickerControl, DatepickerPanel } from './datepicker.component';
import { config } from './date-range-input.theming';


let nextUniqueId = 0;
/**
 * @ignore
 */
@Component({
  selector: 'date-range-input',
  templateUrl: 'date-range-input.html',
  styleUrls: ['date-range-input.scss'],
  exportAs: 'DateRangeInput',
  host: {
    'class': 'date-range-input',
    '[class.date-range-input--hide-placeholders]': '_shouldHidePlaceholders()',
    '[class.date-range-input--required]': 'required',
    '[attr.id]': 'null',
    'role': 'group',
    '[attr.aria-labelledby]': '_getAriaLabelledby()',
    '[attr.aria-describedby]': '_ariaDescribedBy',
    // Used by the test harness to tie this input to its calendar. We can't depend on
    // `aria-owns` for this, because it's only defined while the calendar is open.
    '[attr.data-calendar]': 'rangePicker ? rangePicker.id : null',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {provide: DATE_RANGE_INPUT_PARENT, useExisting: DateRangeInputComponent},
  ]
})
export class DateRangeInputComponent<D> implements HaloFormFieldControl<DateRange<D>>,
  DatepickerControl<D>, DateRangeInputParent<D>, DateRangePickerInput<D>,
  AfterContentInit, OnChanges, OnDestroy {
  static ngAcceptInputType_required: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;

  /** Current value of the range input. */
  get value() {
    return this._model ? this._model.selection : null;
  }

  /** Unique ID for the input. */
  id = `date-range-input-${nextUniqueId++}`;

  /** Whether the control is focused. */
  focused = false;

  /** Name of the form control. */
  controlType = 'date-range-input';

  /**
   * Implemented as a part of `BrightrtControlDirective`.
   * Set the placeholder attribute on `StartDate` and `EndDate`.
   * @docs-private
   */
  get placeholder() {
    const start = this._startInput?._getPlaceholder() || '';
    const end = this._endInput?._getPlaceholder() || '';
    return (start || end) ? `${start} ${this.separator} ${end}` : '';
  }

  /** The range picker that this input is associated with. */
  @Input()
  get rangePicker() { return this._rangePicker; }
  set rangePicker(rangePicker: DatepickerPanel<DatepickerControl<D>, DateRange<D>, D>) {
    if (rangePicker) {
      this._model = rangePicker.registerInput(this);
      this._rangePicker = rangePicker;
      this._registerModel(rangePicker.registerInput(this));
    }
  }
  private _rangePicker: DatepickerPanel<DatepickerControl<D>, DateRange<D>, D>;

  /** Whether the input is required. */
  @Input()
  get required(): boolean { return !!this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }
  private _required: boolean;

  /** Function that can be used to filter out dates within the date range picker. */
  @Input()
  get dateFilter() { return this._dateFilter; }
  set dateFilter(value: DateFilterFn<D>) {
    const start = this._startInput;
    const end = this._endInput;
    const wasMatchingStart = start && start._matchesFilter(start.value);
    const wasMatchingEnd = end && end._matchesFilter(start.value);
    this._dateFilter = value;

    if (start && start._matchesFilter(start.value) !== wasMatchingStart) {
      start._validatorOnChange();
    }

    if (end && end._matchesFilter(end.value) !== wasMatchingEnd) {
      end._validatorOnChange();
    }
  }
  private _dateFilter: DateFilterFn<D>;

  /** The minimum valid date. */
  @Input()
  get min(): D | null { return this._min; }
  set min(value: D | null) {
    const validValue = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));

    if (!this._dateAdapter.sameDate(validValue, this._min)) {
      this._min = validValue;
      this._revalidate();
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
      this._revalidate();
    }
  }
  private _max: D | null;

  /** Whether the input is disabled. */
  @Input()
  get disabled(): boolean {
    return (this._startInput && this._endInput) ?
      (this._startInput.disabled && this._endInput.disabled) :
      this._groupDisabled;
  }
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);

    if (newValue !== this._groupDisabled) {
      this._groupDisabled = newValue;
      this.stateChanges.next(undefined);
    }
  }
  _groupDisabled = false;

  /** Whether the input is in an error state. */
  get errorState(): boolean {
    if (this._startInput && this._endInput) {
      return this._startInput.errorState || this._endInput.errorState;
    }

    return false;
  }

  /** Whether the datepicker input is empty. */
  get empty(): boolean {
    const startEmpty = this._startInput ? this._startInput.isEmpty() : false;
    const endEmpty = this._endInput ? this._endInput.isEmpty() : false;
    return startEmpty && endEmpty;
  }

  /** Value for the `aria-describedby` attribute of the inputs. */
  _ariaDescribedBy: string | null = null;

  /** Date selection model currently registered with the input. */
  private _model: DateSelectionModelDirective<DateRange<D>> | undefined;

  /** Separator text to be shown between the inputs. */
  @Input() separator = '–';

  /** Start of the comparison range that should be shown in the calendar. */
  @Input() comparisonStart: D | null = null;

  /** End of the comparison range that should be shown in the calendar. */
  @Input() comparisonEnd: D | null = null;

  @ContentChild(StartDateDirective) _startInput: StartDateDirective<D>;
  @ContentChild(EndDateDirective) _endInput: EndDateDirective<D>;

  /**
   * Implemented as a part of `FieldComponent`.
   * TODO(): change type to `AbstractControlDirective` after #18206 lands.
   * @docs-private
   */
  ngControl: NgControl | null;

  /** Emits when the input's state has changed. */
  stateChanges = new Subject<void>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _elementRef: ElementRef<HTMLElement>,
    private _themingService: ThemingService,
    @Optional() @Self() control: ControlContainer,
    @Optional() private _dateAdapter: DateAdapter<D>,
    @Optional() @Inject(HaloFormFieldControl) private _Control?: FieldComponent) {

     this._themingService.applyConfig(config);
      
    // TODO(): remove `as any` after #18206 lands.
    this.ngControl = control as any;
  }
  stateChanges$: Observable<void>;
  
  containerClick?(event: MouseEvent): void {
    throw new Error('Method not implemented.');
  }
  readonly: boolean;
  autofilled?: boolean;

  /**
   * Implemented as a part of `FieldComponent`.
   * @docs-private
   */
  setDescribedByIds(ids: string[]): void {
    this._ariaDescribedBy = ids.length ? ids.join(' ') : null;
  }

  /**
   * Implemented as a part of `FieldComponent`.
   * @docs-private
   */
  onContainerClick(): void {
    if (!this.focused && !this.disabled) {
      if (!this._model || !this._model.selection.start) {
        this._startInput.focus();
      } else {
        this._endInput.focus();
      }
    }
  }

  ngAfterContentInit() {
    if (this._model) {
      this._registerModel(this._model);
    }

    // We don't need to unsubscribe from this, because we
    // know that the input streams will be completed on destroy.
    if (this._startInput) {
      merge(this._startInput.stateChanges, this._endInput.stateChanges).subscribe(() => {
        this.stateChanges.next(undefined);
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (dateInputsHaveChanged(changes, this._dateAdapter)) {
      this.stateChanges.next(undefined);
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  /** Gets the date at which the calendar should start. */
  getStartValue(): D | null {
    return this.value ? this.value.start : null;
  }

  /** Gets the element to which the calendar overlay should be attached. */
  getConnectedOverlayOrigin(): ElementRef {
    return this._Control ? this._Control.getConnectedOverlayOrigin() : this._elementRef;
  }

  /** Gets the value that is used to mirror the state input. */
  _getInputMirrorValue() {
    return this._startInput ? this._startInput.getMirrorValue() : '';
  }

  /** Whether the input placeholders should be hidden. */
  _shouldHidePlaceholders() {
    return this._startInput ? !this._startInput.isEmpty() : false;
  }

  /** Handles the value in one of the child inputs changing. */
  _handleChildValueChange() {
    this.stateChanges.next(undefined);
    this._changeDetectorRef.markForCheck();
  }

  /** Opens the date range picker associated with the input. */
  _openDatepicker() {
    if (this._rangePicker) {
      this._rangePicker.open();
    }
  }

  /** Gets the value for the `aria-labelledby` attribute of the inputs. */
  _getAriaLabelledby() {
    const Control = this._Control;
    return Control?._labelId;
  }

  /** Re-runs the validators on the start/end inputs. */
  private _revalidate() {
    if (this._startInput) {
      this._startInput._validatorOnChange();
    }

    if (this._endInput) {
      this._endInput._validatorOnChange();
    }
  }

  /** Registers the current date selection model with the start/end inputs. */
  private _registerModel(model: DateSelectionModelDirective<DateRange<D>>) {
    if (this._startInput) {
      this._startInput._registerModel(model);
    }

    if (this._endInput) {
      this._endInput._registerModel(model);
    }
  }
}
