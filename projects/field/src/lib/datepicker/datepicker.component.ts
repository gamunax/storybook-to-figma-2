/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * Inspired by Angular Material
 */
import { Directionality } from '@angular/cdk/bidi';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { FlexibleConnectedPositionStrategy, Overlay, OverlayConfig, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { DateAdapter, ThemingService } from 'atlas-cdk';
import { merge, Observable, Subject, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { CalendarCellClassFunction, CalendarUserEvent } from '../calendar/calendar-body.component';
import { CalendarComponent, CalendarView } from '../calendar/calendar.component';
import { DATE_RANGE_SELECTION_STRATEGY, DateRangeSelectionStrategy } from './date-range-selection-strategy';
import {
  _SINGLE_DATE_SELECTION_MODEL_PROVIDER,
  DateRange,
  DateSelectionModelDirective,
  ExtractDateTypeFromSelection,
} from './date-selection-model';
import { datepickerAnimations } from './datepicker-animations';
import { DateFilterFn, DatepickerInputBaseDirective } from './datepicker-input-base';
import { config } from './datepicker-content.theming'


function coerceStringArray(value: any, separator: string | RegExp = /\s+/): string[] {
  const result = [];

  if (value != null) {
    const sourceValues = Array.isArray(value) ? value : `${value}`.split(separator);
    for (const sourceValue of sourceValues) {
      const trimmedString = `${sourceValue}`.trim();
      if (trimmedString) {
        result.push(trimmedString);
      }
    }
  }

  return result;
}

/** Used to generate a unique ID for each datepicker instance. */
let datepickerUid = 0;

/** Injection token that determines the scroll handling while the calendar is open. */
export const DATEPICKER_SCROLL_STRATEGY =
    new InjectionToken<() => ScrollStrategy>('datepicker-scroll-strategy');

/** @docs-private */
export function _DATEPICKER_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

/** Possible positions for the datepicker dropdown along the X axis. */
export type DatepickerDropdownPositionX = 'start' | 'end';

/** Possible positions for the datepicker dropdown along the Y axis. */
export type DatepickerDropdownPositionY = 'above' | 'below';

/** @docs-private */
export const DATEPICKER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: DATEPICKER_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: _DATEPICKER_SCROLL_STRATEGY_FACTORY,
};
/**
 * @ignore
 */
@Component({
  selector: 'datepicker-content',
  templateUrl: './datepicker-content.component.html',
  styleUrls: ['datepicker-content.component.scss'],
  host: {
    'class': 'datepicker-content',
    '[@transformPanel]': '_animationState',
    '(@transformPanel.done)': '_animationDone.next()',
  },
  animations: [
    datepickerAnimations.transformPanel,
    datepickerAnimations.fadeInCalendar,
  ],
  exportAs: 'DatepickerContent',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerContentComponent<S, D = ExtractDateTypeFromSelection<S>> implements OnDestroy, AfterViewInit {
  private _subscriptions = new Subscription();

  /** Reference to the internal calendar component. */
  @ViewChild(CalendarComponent) _calendar: CalendarComponent<D>;

  /** Reference to the datepicker that created the overlay. */
  datepicker: DatepickerComponent<any, S, D>;

  /** Start of the comparison range. */
  comparisonStart: D | null;

  /** End of the comparison range. */
  comparisonEnd: D | null;

  /** Current state of the animation. */
  _animationState: 'enter' | 'void' = 'enter';

  /** Emits when an animation has finished. */
  _animationDone = new Subject<void>();

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _themingService: ThemingService,
    private _model: DateSelectionModelDirective<S, D>,
    @Optional() private _dateAdapter: DateAdapter<D>,
    @Optional() @Inject(DATE_RANGE_SELECTION_STRATEGY)
        private _rangeSelectionStrategy: DateRangeSelectionStrategy<D>,
  ) {
    this._themingService.applyConfig(config);
  }

  ngAfterViewInit(): void {
    this._subscriptions.add(this.datepicker.stateChanges.subscribe(() => {
      this._changeDetectorRef.markForCheck();
    }));

    this._calendar.focusActiveCell();
  }

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
    this._animationDone.complete();
  }

  _handleUserSelection(event: CalendarUserEvent<D | null>) {
    const selection = this._model.selection;
    const value = event.value;
    const isRange = selection instanceof DateRange;

    // If we're selecting a range and we have a selection strategy, always pass the value through
    // there. Otherwise don't assign null values to the model, unless we're selecting a range.
    // A null value when picking a range means that the user cancelled the selection (e.g. by
    // pressing escape), whereas when selecting a single value it means that the value didn't
    // change. This isn't very intuitive, but it's here for backwards-compatibility.
    if (isRange && this._rangeSelectionStrategy) {
      const newSelection = this._rangeSelectionStrategy.selectionFinished(value,
          selection as unknown as DateRange<D>, event.event);
      this._model.updateSelection(newSelection as unknown as S, this);
    } else if (value && (isRange ||
              !this._dateAdapter.sameDate(value, selection as unknown as D))) {
      this._model.add(value);
    }

    if (!this._model || this._model.isComplete()) {
      this.datepicker.close();
    }
  }

  startExitAnimation(): void {
    this._animationState = 'void';
    this._changeDetectorRef.markForCheck();
  }

  _getSelected() {
    return this._model.selection as unknown as D | DateRange<D> | null;
  }
}

/** Form control that can be associated with a datepicker. */
export interface DatepickerControl<D> {
  min: D | null;
  max: D | null;
  disabled: boolean;
  dateFilter: DateFilterFn<D>;
  stateChanges: Observable<void>;
  getStartValue(): D | null;
  getConnectedOverlayOrigin(): ElementRef;
}

/** A datepicker that can be attached to a {@link DatepickerControl}. */
export interface DatepickerPanel<C extends DatepickerControl<D>, S,
    D = ExtractDateTypeFromSelection<S>> {
  /** Stream that emits whenever the date picker is closed. */
  closedStream: EventEmitter<void>;
  /** The input element the datepicker is associated with. */
  datepickerInput: C;
  /** Whether the datepicker pop-up should be disabled. */
  disabled: boolean;
  /**
   * The id for the datepicker's calendar.
   * @internal
   **/
  id: string;
  /** Whether the datepicker is open. */
  opened: boolean;
  /** Stream that emits whenever the date picker is opened. */
  openedStream: EventEmitter<void>;
  /** Emits when the datepicker's state changes. */
  stateChanges: Subject<void>;
  /** Opens the datepicker. */
  open(): void;
  /** Register an input with the datepicker. */
  registerInput(input: C): DateSelectionModelDirective<S, D>;
}
/**
 * The form component that handles the functionality behind the Calendar display.
 */
@Component({
  selector: 'datepicker',
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    _SINGLE_DATE_SELECTION_MODEL_PROVIDER,
    {provide: DatepickerInputBaseDirective, useExisting: DatepickerComponent},
  ],
  exportAs: 'Datepicker',
})
export class DatepickerComponent <C extends DatepickerControl<D>, S,
  D = ExtractDateTypeFromSelection<S>> implements DatepickerPanel<C, S, D>, OnChanges, OnDestroy {
  private _scrollStrategy: () => ScrollStrategy;
  private _inputStateChanges = Subscription.EMPTY;

  /** An input indicating the type of the custom header component for the calendar, if set. */
  @Input() calendarHeaderComponent: ComponentType<any>;

  /** The date to open the calendar to initially. */
  @Input()
  get startAt(): D | null {
    // If an explicit startAt is set we start there, otherwise we start at whatever the currently
    // selected value is.
    return this._startAt || (this.datepickerInput ? this.datepickerInput.getStartValue() : null);
  }
  set startAt(value: D | null) {
    this._startAt = this._dateAdapter.getValidDateOrNull(this._dateAdapter.deserialize(value));
  }
  private _startAt: D | null;

  /** The view that the calendar should start in. */
  @Input() startView: 'month' | 'year' | 'multi-year' = 'month';

  /**
   * Emits when the datepicker's state changes.
   * @internal
   **/
  readonly stateChanges = new Subject<void>();

  /** Whether the datepicker pop-up should be disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled === undefined && this.datepickerInput ?
        this.datepickerInput.disabled : !!this._disabled;
  }
  set disabled(value: boolean) {
    const newValue = coerceBooleanProperty(value);

    if (newValue !== this._disabled) {
      this._disabled = newValue;
      this.stateChanges.next(undefined);
    }
  }
  private _disabled: boolean;

  /** A reference to the overlay when the calendar is opened as a popup. */
  private _popupRef: OverlayRef | null;

  /** Reference to the component instantiated in popup mode. */
  private _popupComponentRef: ComponentRef<DatepickerContentComponent<S, D>> | null;

  /** Preferred position of the datepicker in the X axis. */
  @Input()
  xPosition: DatepickerDropdownPositionX = 'end';

  /** Preferred position of the datepicker in the Y axis. */
  @Input()
  yPosition: DatepickerDropdownPositionY  = 'below';

  /**
   * Emits selected year in multiyear view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly yearSelected: EventEmitter<D> = new EventEmitter<D>();

  /**
   * Emits selected month in year view.
   * This doesn't imply a change on the selected date.
   */
  @Output() readonly monthSelected: EventEmitter<D> = new EventEmitter<D>();

  /**
   * Emits when the current view changes.
   */
  @Output() readonly viewChanged: EventEmitter<CalendarView> =
    new EventEmitter<CalendarView>(true);

  /** Function that can be used to add custom CSS classes to dates. */
  @Input() dateClass: CalendarCellClassFunction<D>;

  /** Emits when the datepicker has been opened. */
  // tslint:disable-next-line:no-output-rename
  @Output('opened') openedStream: EventEmitter<void> = new EventEmitter<void>();

  /** Emits when the datepicker has been closed. */
  // tslint:disable-next-line:no-output-rename
  @Output('closed') closedStream: EventEmitter<void> = new EventEmitter<void>();

  /**
   * Classes to be passed to the date picker panel.
   * Supports string and string array values, similar to `ngClass`.
   */
  @Input()
  get panelClass(): string | string[] { return this._panelClass; }
  set panelClass(value: string | string[]) {
    this._panelClass = coerceStringArray(value);
  }
  private _panelClass: string[];

  /** Whether the calendar is open. */
  @Input()
  get opened(): boolean { return this._opened; }
  set opened(value: boolean) {
    coerceBooleanProperty(value) ? this.open() : this.close();
  }
  private _opened = false;

  /** The input element the datepicker is associated with. */
  datepickerInput: C;

  /** The id for the datepicker calendar. */
  id = `datepicker-${datepickerUid++}`;

  /** The minimum selectable date. */
  _getMinDate(): D | null {
    return this.datepickerInput && this.datepickerInput.min;
  }

  /** The maximum selectable date. */
  _getMaxDate(): D | null {
    return this.datepickerInput && this.datepickerInput.max;
  }

  _getDateFilter(): DateFilterFn<D> {
    return this.datepickerInput.dateFilter;
  }

  constructor(
    private _overlay: Overlay,
    private _ngZone: NgZone,
    private _viewContainerRef: ViewContainerRef,
    @Inject(DATEPICKER_SCROLL_STRATEGY) scrollStrategy: any,
    @Optional() private _dateAdapter: DateAdapter<D>,
    @Optional() private _dir: Directionality,
    @Optional() private _model: DateSelectionModelDirective<S, D>
  ) {
    this._scrollStrategy = scrollStrategy;
  }

  ngOnChanges(changes: SimpleChanges) {
    const positionChange = changes['xPosition'] || changes['yPosition'];

    if (positionChange && !positionChange.firstChange && this._popupRef) {
      this._setConnectedPositions(
          this._popupRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy);

      if (this.openedStream) {
        this._popupRef.updatePosition();
      }
    }

    this.stateChanges.next(undefined);
  }

  ngOnDestroy() {
    this._destroyPopup();
    this.close();
    this._inputStateChanges.unsubscribe();
    this.stateChanges.complete();
  }

  /** Selects the given date */
  select(date: D): void {
    this._model.add(date);
  }

  /** Emits the selected year in multiyear view */
  _selectYear(normalizedYear: D): void {
    this.yearSelected.emit(normalizedYear);
  }

  /** Emits selected month in year view */
  _selectMonth(normalizedMonth: D): void {
    this.monthSelected.emit(normalizedMonth);
  }

  /** Emits changed view */
  _viewChanged(view: CalendarView): void {
    this.viewChanged.emit(view);
  }

  registerInput(input: C): DateSelectionModelDirective<S, D> {
    this._inputStateChanges.unsubscribe();
    this.datepickerInput = input;
    this._inputStateChanges =
        input.stateChanges.subscribe(() => this.stateChanges.next(undefined));
    return this._model;
  }

  /** Open the calendar. */
  open(): void {
    if (this._opened || this.disabled) {
      return;
    }
    this._opened = true;
    this._openPopup();
    this.openedStream.emit();
  }

  close(): void {
    if (!this._opened) {
      return;
    }
    if (this._popupComponentRef && this._popupRef) {
      const instance = this._popupComponentRef.instance;
      instance.startExitAnimation();
      instance._animationDone.pipe(take(1)).subscribe(() => this._destroyPopup());
      this._destroyPopup();
    }

    if (this._opened) {
      this._opened = false;
      this.closedStream.emit();
    }
  }

  private _openPopup(): void {
    const portal = new ComponentPortal<DatepickerContentComponent<S, D>>(DatepickerContentComponent,
      this._viewContainerRef);
    this._destroyPopup();
    this._createPopup();
    // tslint:disable-next-line:no-non-null-assertion
    this._popupComponentRef = this._popupRef!.attach(portal);
    this._forwardContentValues(this._popupComponentRef.instance);

    // Update the position once the calendar has rendered.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      // tslint:disable-next-line:no-non-null-assertion
      this._popupRef!.updatePosition();
    });
  }

  protected _forwardContentValues(instance: DatepickerContentComponent<S, D>) {
    instance.datepicker = this;
  }

  private _createPopup(): void {
    const positionStrategy = this._overlay.position()
    .flexibleConnectedTo(this.datepickerInput.getConnectedOverlayOrigin())
    .withTransformOriginOn('.datepicker-content')
    .withFlexibleDimensions(false)
    .withViewportMargin(8)
    .withLockedPosition();

    const overlayConfig = new OverlayConfig({
      positionStrategy: this._setConnectedPositions(positionStrategy),
      hasBackdrop: true,
      backdropClass: ['cdk-overlay-transparent-backdrop'],
      direction: this._dir,
      scrollStrategy: this._scrollStrategy(),
      panelClass: 'datepicker-popup',
    });

    this._popupRef = this._overlay.create(overlayConfig);
    this._popupRef.overlayElement.setAttribute('role', 'dialog');

    merge(
      this._popupRef.backdropClick(),
      this._popupRef.detachments(),
      this._popupRef.keydownEvents().pipe(filter(event => {
        // Closing on alt + up is only valid when there's an input associated with the datepicker.
        return (event.key === 'Escape' && !hasModifierKey(event)) || (this.datepickerInput &&
            hasModifierKey(event, 'altKey') && event.key === 'ArrowUp');
      }))
    ).subscribe(event => {
      if (event) {
        event.preventDefault();
      }

      this.close();
    });
  }


  /** Destroys the current popup overlay. */
  private _destroyPopup() {
    if (this._popupRef) {
      this._popupRef.dispose();
      this._popupRef = this._popupComponentRef = null;
    }
  }

  /** Sets the positions of the datepicker in dropdown mode based on the current configuration. */
  private _setConnectedPositions(strategy: FlexibleConnectedPositionStrategy) {
    const primaryX = this.xPosition === 'end' ? 'end' : 'start';
    const secondaryX = primaryX === 'start' ? 'end' : 'start';
    const primaryY = this.yPosition === 'above' ? 'bottom' : 'top';
    const secondaryY = primaryY === 'top' ? 'bottom' : 'top';

    /** Offset accounts for padding on the input element and border. */
    const offsetY = 13;
    /** Offset accounts for padding on the input element, width of toggle element, and border */
    const offsetX = 65;

    return strategy.withPositions([
      {
        originX: primaryX,
        originY: secondaryY,
        overlayX: primaryX,
        overlayY: primaryY,
        offsetY: offsetY,
        offsetX: offsetX,
      },
      {
        originX: primaryX,
        originY: primaryY,
        overlayX: primaryX,
        overlayY: secondaryY,
        offsetY: 0 - offsetY,
        offsetX: offsetX,
      },
      {
        originX: secondaryX,
        originY: secondaryY,
        overlayX: secondaryX,
        overlayY: primaryY
      },
      {
        originX: secondaryX,
        originY: primaryY,
        overlayX: secondaryX,
        overlayY: secondaryY
      }
    ]);
  }
}
