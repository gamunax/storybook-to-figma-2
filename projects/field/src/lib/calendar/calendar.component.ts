/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * Inspired by Angular Material
 */
import { ComponentPortal, ComponentType, Portal } from '@angular/cdk/portal';
import {
  AfterContentInit,
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonSizings, ButtonVariants } from 'atlas-button';
import { DATE_FORMATS, DateAdapter, DateFormats, Radii } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { Subject, Subscription } from 'rxjs';

import { _SINGLE_DATE_SELECTION_MODEL_PROVIDER, DateRange } from '../datepicker/date-selection-model';
import { DatepickerIntl } from '../datepicker/datepicker-intl';
import { CalendarCellClassFunction, CalendarUserEvent } from './calendar-body.component';
import { CalendarMonthComponent } from './calendar-month.component';
import {
  CalendarMultiYearComponent,
  getActiveOffset,
  isSameMultiYearView,
  yearsPerPage,
} from './calendar-multi-year.component';
import { CalendarYearComponent } from './calendar-year.component';
import { ThemingService } from 'atlas-cdk';
import { config } from './calendar.theming';

/**
 * Possible views for the calendar.
 * @docs-private
 */
export type CalendarView = 'month' | 'year' | 'multi-year';

/**
 * A calendar that is used as part of the datepicker.
 * @docs-private
 */
@Component({
  selector: 'calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['calendar.component.scss'],
  host: {
    'class': 'calendar',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [_SINGLE_DATE_SELECTION_MODEL_PROVIDER]
})
export class CalendarComponent<D> implements AfterContentInit, AfterViewChecked, OnChanges, OnDestroy {
  /** An input indicating the type of the header component, if set. */
  @Input() headerComponent: ComponentType<any>;

  /** A portal containing the header component type for this calendar. */
  _calendarHeaderPortal: Portal<any>;

  // private _intlChanges: Subscription;

  /**
   * Used for scheduling that focus should be moved to the active cell on the next tick.
   * We need to schedule it, rather than do it immediately, because we have to wait
   * for Angular to re-evaluate the view children.
   */
  private _moveFocusOnNextTick = false;

  /** A date representing the period (month or year) to start the calendar in. */
  @Input()
  get startAt(): D | null { return this._startAt; }
  set startAt(value: D | null) {
    this._startAt = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  private _startAt: D | null;

  /** Whether the calendar should be started in month or year view. */
  @Input() startView: CalendarView = 'month';

  /** The currently selected date. */
  @Input()
  get selected(): DateRange<D> | D | null { return this._selected; }
  set selected(value: DateRange<D> | D | null) {
    if (value instanceof DateRange) {
      this._selected = value;
    } else {
      this._selected = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
    }
  }
  private _selected: DateRange<D> | D | null;

  /** The minimum selectable date. */
  @Input()
  get minDate(): D | null { return this._minDate; }
  set minDate(value: D | null) {
    this._minDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  private _minDate: D | null;

  /** The maximum selectable date. */
  @Input()
  get maxDate(): D | null { return this._maxDate; }
  set maxDate(value: D | null) {
    this._maxDate = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  private _maxDate: D | null;

  /** Function used to filter which dates are selectable. */
  @Input() dateFilter: (date: D) => boolean;

  /** Function that can be used to add custom CSS classes to dates. */
  @Input() dateClass: CalendarCellClassFunction<any>;

  /** Start of the comparison range. */
  @Input() comparisonStart: D | null;

  /** End of the comparison range. */
  @Input() comparisonEnd: D | null;

  /** Emits when the currently selected date changes. */
  @Output() readonly selectedChange: EventEmitter<D | null> = new EventEmitter<D | null>();

  /**
   * Emits the year chosen in multiyear view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly yearSelected: EventEmitter<D> = new EventEmitter<D>();

  /**
   * Emits the month chosen in year view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly monthSelected: EventEmitter<D> = new EventEmitter();

  /**
   * Emits when the current view changes.
   */
  @Output() readonly viewChanged: EventEmitter<CalendarView> =
    new EventEmitter<CalendarView>(true);

  /** Emits when any date is selected. */
  @Output() readonly _userSelection: EventEmitter<CalendarUserEvent<D | null>> =
      new EventEmitter<CalendarUserEvent<D | null>>();

  /** Reference to the current month view component. */
  @ViewChild('month') monthView: CalendarMonthComponent<D>;

  /** Reference to the current year view component. */
  @ViewChild('year') yearView: CalendarYearComponent<D>;

  /** Reference to the current multi-year view component. */
  @ViewChild('multiYear') multiYearView: CalendarMultiYearComponent<D>;

  /**
   * The current active date. This determines which time period is shown and which date is
   * highlighted when using keyboard navigation.
   */
  get activeDate(): D { return this._clampedActiveDate; }
  set activeDate(value: D) {
    this._clampedActiveDate = this._dateAdapter.clampDate(value, this.minDate, this.maxDate);
    this.stateChanges.next();
    this._changeDetectorRef.markForCheck();
  }
  private _clampedActiveDate: D;

  /** Whether the calendar is in month view. */
  get currentView(): CalendarView { return this._currentView; }
  set currentView(value: CalendarView) {
    const viewChangedResult = this._currentView !== value ? value : null;
    this._currentView = value;
    this._moveFocusOnNextTick = true;
    this._changeDetectorRef.markForCheck();
    if (viewChangedResult) {
      this.viewChanged.emit(viewChangedResult);
    }
  }
  private _currentView: CalendarView;

  /**
   * Emits whenever there is a state change that the header may need to respond to.
   */
  stateChanges = new Subject<void>();

  constructor(
    @Optional() private _dateAdapter: DateAdapter<D>, 
    private _changeDetectorRef: ChangeDetectorRef,
    private _themingService: ThemingService
  ) { 
    this._themingService.applyConfig(config)
  }

  ngAfterContentInit() {
    this._calendarHeaderPortal = new ComponentPortal(this.headerComponent || CalendarHeaderComponent);
    this.activeDate = this.startAt || this._dateAdapter.today();
    // Assign to the private property since we don't want to move focus on init.
    this._currentView = this.startView;
  }

  ngAfterViewChecked() {
    if (this._moveFocusOnNextTick) {
      this._moveFocusOnNextTick = false;
      this.focusActiveCell();
    }
  }

  ngOnDestroy() {
    this.stateChanges.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    const change =
        changes['minDate'] || changes['maxDate'] || changes['dateFilter'];

    if (change && !change.firstChange) {
      const view = this._getCurrentViewComponent();

      if (view) {
        // We need to `detectChanges` manually here, because the `minDate`, `maxDate` etc. are
        // passed down to the view via data bindings which won't be up-to-date when we call `_init`.
        this._changeDetectorRef.detectChanges();
        view._init();
      }
    }

    this.stateChanges.next();
  }

  focusActiveCell() {
    this._getCurrentViewComponent()._focusActiveCell(false);
  }

  /** Updates today's date after an update of the active date */
  updateTodaysDate() {
    const currentView = this.currentView;
    let view;

    if (currentView === 'month') {
      view = this.monthView;
    } else if (currentView === 'year') {
      view = this.yearView;
    } else {
      view = this.multiYearView;
    }

    view._init();
  }

  /** Handles date selection in the month view. */
  _dateSelected(event: CalendarUserEvent<D | null>): void {
    const date = event.value;

    if (this.selected instanceof DateRange ||
        (date && !this._dateAdapter.sameDate(date, this.selected))) {
      this.selectedChange.emit(date);
    }

    this._userSelection.emit(event);
  }

  /** Handles year selection in the multiyear view. */
  _yearSelectedInMultiYearView(normalizedYear: D) {
    this.yearSelected.emit(normalizedYear);
  }

  /** Handles month selection in the year view. */
  _monthSelectedInYearView(normalizedMonth) {
    this.monthSelected.emit(normalizedMonth);
  }

  /** Handles year/month selection in the multi-year/year views. */
  _goToDateInView(date: D, view: 'month' | 'year' | 'multi-year'): void {
    this.activeDate = date;
    this.currentView = view;
  }

  /** Returns the component instance that corresponds to the current calendar view. */
  private _getCurrentViewComponent() {
    return this.monthView || this.yearView || this.multiYearView;
  }
}

/** Counter used to generate unique IDs. */
let uniqueId = 0;

/**
 * @ignore
 */
@Component({
  selector: 'calendar-header',
  templateUrl: 'calendar-header.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeaderComponent<D> implements OnDestroy {
  _buttonDescriptionId = `calendar-button-${uniqueId++}`;
  buttonVariants = ButtonVariants;
  buttonSizings = ButtonSizings;
  radii = Radii;
  iconSizes: IconSizes = IconSizes.small;
  
  constructor(private _intl: DatepickerIntl,    
    @Inject(CalendarComponent) public calendar: CalendarComponent<D>,
    @Optional() private _dateAdapter: DateAdapter<D>,
    @Optional() @Inject(DATE_FORMATS) private _dateFormats: DateFormats,
    changeDetectorRef: ChangeDetectorRef) {

    this.calendar.stateChanges.subscribe(() => changeDetectorRef.markForCheck());
  }

  ngOnDestroy() {
    this.calendar.stateChanges.complete();
  }

  /** The label for the current calendar view. */
  get periodButtonText(): string {
    if (this.calendar.currentView === 'month') {
      return `${this.monthName} ${this.yearName}`;
      // return this._dateAdapter
      //     .format(this.calendar.activeDate, this._dateFormats.display.monthYearLabel)
      //         .toLocaleUpperCase();
    }
    if (this.calendar.currentView === 'year') {
      return this._dateAdapter.getYearName(this.calendar.activeDate);
    }

    // The offset from the active year to the "slot" for the starting year is the
    // *actual* first rendered year in the multi-year view, and the last year is
    // just yearsPerPage - 1 away.
    const activeYear = this._dateAdapter.getYear(this.calendar.activeDate);
    const minYearOfPage = activeYear - getActiveOffset(
      this._dateAdapter, this.calendar.activeDate, this.calendar.minDate, this.calendar.maxDate);
    const maxYearOfPage = minYearOfPage + yearsPerPage - 1;
    const minYearName =
      this._dateAdapter.getYearName(this._dateAdapter.createDate(minYearOfPage, 0, 1));
    const maxYearName =
      this._dateAdapter.getYearName(this._dateAdapter.createDate(maxYearOfPage, 0, 1));
    return this._intl.formatYearRange(minYearName, maxYearName);
  }

  get periodButtonLabel(): string {
    return this.calendar.currentView === 'month' ?
        'Choose month and year' : 'Choose date';
  }

  /** The label for the previous button. */
  get prevButtonLabel(): string {
    return {
      'month': 'previous month',
      'year': 'previous year',
      'multi-year': 'previous'
    }[this.calendar.currentView];
  }

  /** The label for the next button. */
  get nextButtonLabel(): string {
    return {
      'month': 'next month',
      'year': 'next year',
      'multi-year': 'next'
    }[this.calendar.currentView];
  }

  get yearName(): string {
    return this._dateAdapter.getYearName(this.calendar.activeDate);
  }

  get monthName(): string {
    const months = this._dateAdapter.getMonthNames("long");
    if(this.calendar.activeDate instanceof Date){
     return months[this.calendar.activeDate.getMonth()]
    }
    return '';
  }

  /** Handles user clicks on the period label. */
  currentPeriodClicked(): void {
    this.calendar.currentView = this.calendar.currentView === 'month' ? 'multi-year' : 'month';
  }

  /** Handles user clicks on the previous button. */
  previousClicked(): void {
    this.calendar.activeDate = this.calendar.currentView === 'month' ?
        this._dateAdapter.addCalendarMonths(this.calendar.activeDate, -1) :
            this._dateAdapter.addCalendarYears(
                this.calendar.activeDate, this.calendar.currentView === 'year' ? -1 : -yearsPerPage
            );
  }

  /** Handles user clicks on the next button. */
  nextClicked(): void {
    this.calendar.activeDate = this.calendar.currentView === 'month' ?
        this._dateAdapter.addCalendarMonths(this.calendar.activeDate, 1) :
            this._dateAdapter.addCalendarYears(
                this.calendar.activeDate,
                    this.calendar.currentView === 'year' ? 1 : yearsPerPage
            );
  }

  /** Whether the previous period button is enabled. */
  previousEnabled(): boolean {
    if (!this.calendar.minDate) {
      return true;
    }
    return !this.calendar.minDate ||
        !this._isSameView(this.calendar.activeDate, this.calendar.minDate);
  }

  /** Whether the next period button is enabled. */
  nextEnabled(): boolean {
    return !this.calendar.maxDate ||
        !this._isSameView(this.calendar.activeDate, this.calendar.maxDate);
  }

  /** Whether the two dates represent the same view in the current view mode (month or year). */
  private _isSameView(date1: D, date2: D): boolean {
    if (this.calendar.currentView === 'month') {
      return this._dateAdapter.getYear(date1) === this._dateAdapter.getYear(date2) &&
          this._dateAdapter.getMonth(date1) === this._dateAdapter.getMonth(date2);
    }
    if (this.calendar.currentView === 'year') {
      return this._dateAdapter.getYear(date1) === this._dateAdapter.getYear(date2);
    }
    // Otherwise we are in 'multi-year' view.
    return isSameMultiYearView(
      this._dateAdapter, date1, date2, this.calendar.minDate, this.calendar.maxDate);
  }
}

