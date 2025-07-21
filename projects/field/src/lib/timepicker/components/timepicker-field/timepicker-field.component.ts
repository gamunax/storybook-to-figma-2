import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTime } from 'luxon';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';

import { TimepickerClockFace } from '../../models/timepicker-clock-face.interface';
import { TimepickerPeriods } from '../../models/timepicker-periods.enum';
import { TimepickerTheme } from '../../models/timepicker-theme.interface';
import { TimepickerUnits } from '../../models/timepicker-units.enum';
import { TimepickerAdapter } from '../../services/timepicker-adapter';
import { TimepickerService } from '../../services/timepicker.service';
import { TIMEPICKER_LOCALE } from '../../tokens/timepicker-time-locale.token';
import { TimepickerUtils } from '../../utils/timepicker.utils';

@Component({
    selector: 'timepicker-field',
    templateUrl: 'timepicker-field.component.html',
    styleUrls: ['timepicker-field.component.scss'],
    providers: [
        TimepickerService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TimepickerFieldComponent,
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class TimepickerFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {

    get color(): any {
        return this._color;
    }

    @Input()
    set color(newValue: any) {
        this._color = newValue;
    }

    get defaultTime(): string {
        return this._defaultTime;
    }

    @Input()
    set defaultTime(val: string) {
        this._defaultTime = val;
        this._isDefaultTime = !!val;
    }

    get floatLabel(): any {
        return this._floatLabel;
    }

    @Input()
    set floatLabel(newValue: any) {
        this._floatLabel = newValue;
    }

    get format(): number {
        return this._format;
    }

    @Input()
    set format(value: number) {
        this._format = value === 24 ? 24 : 12;
        this.minHour = this._format === 12 ? 1 : 0;
        this.maxHour = this._format === 12 ? 12 : 23;
        this.hoursList = TimepickerUtils.getHours(this._format);
        const isDynamicallyChanged = value && (this._previousFormat && this._previousFormat !== this._format);

        if (isDynamicallyChanged) {
            this._updateTime(this.timepickerTime);
        }
        this._previousFormat = this._format;
    }

    get max(): string | DateTime {
        return this._max;
    }

    @Input()
    set max(value: string | DateTime) {
        if (typeof value === 'string') {
            this._max = TimepickerAdapter.parseTime(value, {locale: this._locale, format: this.format});

            return;
        }
        this._max = value;
    }

    get min(): string | DateTime {
        return this._min;
    }

    @Input()
    set min(value: string | DateTime) {
        if (typeof value === 'string') {
            this._min = TimepickerAdapter.parseTime(value, {locale: this._locale, format: this.format});

            return;
        }
        this._min = value;
    }

    @Input()
    cancelBtnTmpl: TemplateRef<Node>;

    @Input()
    clockTheme: TimepickerTheme;

    @Input()
    confirmBtnTmpl: TemplateRef<Node>;

    @Input()
    controlOnly: boolean;

    @Input() disabled: boolean;
    hour$: Observable<TimepickerClockFace>;

    hoursList: TimepickerClockFace[];
    isChangePeriodDisabled: boolean;
    isTimeRangeSet: boolean;
    maxHour = 12;
    minHour = 1;
    minute$: Observable<TimepickerClockFace>;
    minutesList: TimepickerClockFace[];
    period: TimepickerPeriods = TimepickerPeriods.AM;
    periods: TimepickerPeriods[] = [
        TimepickerPeriods.AM,
        TimepickerPeriods.PM
    ];

    @Output() timeChanged = new EventEmitter<string>();
    timepickerTime: string;

    timeUnit = TimepickerUnits;
    @Input() toggleIcon: TemplateRef<HTMLObjectElement>;

    private _color: any = 'primary';
    private _defaultTime: string;
    private _floatLabel: any = 'never';
    private _format = 12;
    private _isDefaultTime: boolean;
    private _isFirstTimeChange: boolean = true;
    private _max: string | DateTime;
    private _min: string | DateTime;
    private _previousFormat: number;
    private _selectedHour: number;
    private _subsCtrl$: Subject<void> = new Subject<void>();

    constructor(private _timepickerService: TimepickerService,
                @Inject(TIMEPICKER_LOCALE) private _locale: string) {
    }

    changeHour(hour: number): void {
        this._timepickerService.hour = this.hoursList.find(h => h.time === hour);
        this._changeTime();
    }

    changeMinute(minute: number): void {
        this._timepickerService.minute = this.minutesList.find(m => m.time === minute);
        this._changeTime();
    }

    changePeriod(event: any): void {
        this._timepickerService.period = event.value as TimepickerPeriods;
        this._changeTime();
    }

    ngOnDestroy(): void {
        this._subsCtrl$.next();
        this._subsCtrl$.complete();
    }

    ngOnInit() {
        this._initTime(this.defaultTime);

        this.hoursList = TimepickerUtils.getHours(this._format);
        this.minutesList = TimepickerUtils.getMinutes();
        this.isTimeRangeSet = !!(this.min || this.max);

        this.hour$ = this._timepickerService.selectedHour.pipe(
            tap((clockTime: TimepickerClockFace) => this._selectedHour = clockTime.time),
            map(this._changeDefaultTimeValue.bind(this)),
            tap(() => this.isTimeRangeSet && this._updateAvailableMinutes())
        ) as Observable<TimepickerClockFace>;
        this.minute$ = this._timepickerService.selectedMinute.pipe(
            map(this._changeDefaultTimeValue.bind(this)),
            tap(() => this._isFirstTimeChange = false)
        ) as Observable<TimepickerClockFace>;

        if (this.format === 12) {
            this._timepickerService.selectedPeriod.pipe(
                takeUntil(this._subsCtrl$),
                distinctUntilChanged<TimepickerPeriods>(),
                tap((period: TimepickerPeriods) => this.period = period),
                tap(period => this.isChangePeriodDisabled = this._isPeriodDisabled(period)),
            ).subscribe(() => this.isTimeRangeSet && this._updateAvailableTime());
        }

    }

    onTimeSet(time: string): void {
        this._updateTime(time);
        this._emitLocalTimeChange(time);
    }

    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    registerOnTouched(_fn_: any): void {
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(val: string): void {
        if (val) {
            this._initTime(val);
        }
        else {
            this._resetTime();
        }
    }

    private _changeDefaultTimeValue(clockFaceTime: TimepickerClockFace): TimepickerClockFace {
        if (!this._isDefaultTime && this._isFirstTimeChange) {
            return {...clockFaceTime, time: null};
        }

        return clockFaceTime;
    }

    private _changeTime(): void {
        const time = this._timepickerService.getFullTime(this.format);
        this.timepickerTime = time;

        this._emitLocalTimeChange(time);
    }

    private _emitLocalTimeChange(time: string): void {
        const localTime = TimepickerAdapter.toLocaleTimeString(time, {format: this.format, locale: this._locale});

        this._onChange(localTime);
        this.timeChanged.emit(localTime);
    }

    private _initTime(time): void {
        const isDefaultTimeAvailable = TimepickerAdapter
            .isTimeAvailable(time, this.min as DateTime, this.max as DateTime, 'minute', null, this.format);
        if (!isDefaultTimeAvailable) {
            if (this.min) {
                this._updateTime(TimepickerAdapter.fromDateTimeToString(this.min as DateTime, this.format));

                return;
            }
            if (this.max) {
                this._updateTime(TimepickerAdapter.fromDateTimeToString(this.max as DateTime, this.format));

                return;
            }
        }
        this._updateTime(time);
    }

    private _isPeriodDisabled(period): boolean {
        return TimepickerUtils.disableHours(TimepickerUtils.getHours(12), {
            min: this.min as DateTime,
            max: this.max as DateTime,
            format: 12,
            period: period === TimepickerPeriods.AM ? TimepickerPeriods.PM : TimepickerPeriods.AM
        }).every(time => time.disabled);
    }

    private _onChange: (value: string) => void = () => {
    };

    private _resetTime(): void {
        this._timepickerService.hour = {angle: 0, time: null};
        this._timepickerService.minute = {angle: 0, time: null};
    }

    private _updateAvailableHours(): void {
        this.hoursList = TimepickerUtils.disableHours(this.hoursList, {
            min: this.min as DateTime,
            max: this.max as DateTime,
            format: this.format,
            period: this.period
        });
    }

    private _updateAvailableMinutes(): void {
        this.minutesList = TimepickerUtils.disableMinutes(this.minutesList, this._selectedHour, {
            min: this.min as DateTime,
            max: this.max as DateTime,
            format: this.format,
            period: this.period
        });
    }

    private _updateAvailableTime(): void {
        this._updateAvailableHours();
        if (this._selectedHour) {
            this._updateAvailableMinutes();
        }
    }

    private _updateTime(time: string): void {
        if (time) {
            const formattedTime = TimepickerAdapter.formatTime(time, {locale: this._locale, format: this.format});
            this._timepickerService.setDefaultTimeIfAvailable(formattedTime, this.min as DateTime, this.max as DateTime, this.format);
            this.timepickerTime = formattedTime;
        }
    }

}
