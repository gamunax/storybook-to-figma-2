import { Directive, HostListener, Inject, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { Actions } from 'atlas-cdk';
import { Observable, Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';

import { TimepickerClockFace } from '../models/timepicker-clock-face.interface';
import { TimepickerPeriods } from '../models/timepicker-periods.enum';
import { TimepickerUnits } from '../models/timepicker-units.enum';
import { TimepickerAdapter } from '../services/timepicker-adapter';
import { TimepickerEventService } from '../services/timepicker-event.service';
import { TimepickerService } from '../services/timepicker.service';
import { TIMEPICKER_CONFIG } from '../tokens/timepicker-config.token';
import { TIMEPICKER_LOCALE } from '../tokens/timepicker-time-locale.token';

@Directive({
    selector: "[timepickerBase]"
})
export class TimepickerBaseDirective implements OnInit, OnDestroy {

    @Input()
    set color(newValue: Actions) {
        this._color = newValue;
    }

    get color(): Actions {
        return this._color;
    }

    get defaultTime(): string {
        return this._defaultTime;
    }

    @Input()
    set defaultTime(time: string) {
        this._defaultTime = time;
        this._setDefaultTime(time);
    }

    activeTimeUnit: TimepickerUnits = TimepickerUnits.HOUR;
    selectedHour: Observable<TimepickerClockFace>;
    selectedMinute: Observable<TimepickerClockFace>;
    selectedPeriod: Observable<TimepickerPeriods>;
    timeUnit: typeof TimepickerUnits = TimepickerUnits;

    protected _color: Actions = Actions.primary;
    protected _defaultTime: string;
    protected _subsCtrl$: Subject<void> = new Subject<void>();

    constructor(protected _timepickerSrv: TimepickerService,
                protected _eventSrv: TimepickerEventService,
                @Inject(TIMEPICKER_LOCALE) protected _locale: string,
                @Inject(TIMEPICKER_CONFIG) @Optional() public data) {

        this.color = data.color;
        this.defaultTime = data.defaultTime;
    }

    changePeriod(period: TimepickerPeriods): void {
        this._timepickerSrv.period = period;
        this._onTimeChange();
        this.data.timepickerBaseRef.timeSet.next(this._timepickerSrv.getFullTime(this.data.format));
    }

    changeTimeUnit(unit: TimepickerUnits): void {
        this.activeTimeUnit = unit;
    }

    close(): void {
        this.data.timepickerBaseRef.close();
    }

    ngOnDestroy(): void {
        this._subsCtrl$.next();
        this._subsCtrl$.complete();
    }

    ngOnInit(): void {
        this._defineTime();
        this.selectedHour = this._timepickerSrv.selectedHour
            .pipe(shareReplay({bufferSize: 1, refCount: true}));
        this.selectedMinute = this._timepickerSrv.selectedMinute
            .pipe(shareReplay({bufferSize: 1, refCount: true}));
        this.selectedPeriod = this._timepickerSrv.selectedPeriod
            .pipe(shareReplay({bufferSize: 1, refCount: true}));
        this.data.timepickerBaseRef.timeUpdated.pipe(takeUntil(this._subsCtrl$))
            .subscribe(this._setDefaultTime.bind(this));
    }

    onHourChange(hour: TimepickerClockFace): void {
        this._timepickerSrv.hour = hour;
        this._onTimeChange();
    }

    onHourSelected(hour: number): void {
        if (!this.data.hoursOnly) {
            this.changeTimeUnit(TimepickerUnits.MINUTE);
        }
        this.data.timepickerBaseRef.hourSelected.next(hour);
    }

    @HostListener("keydown", ["$event"])
    onKeydown(e: any): void {
        this._eventSrv.dispatchEvent(e);
        e.stopPropagation();
    }

    onMinuteChange(minute: TimepickerClockFace): void {
        this._timepickerSrv.minute = minute;
        this._onTimeChange();                
    }

    onMinuteSelected(minute: number): void {
        this.setTime();
    }
   
    onMinuteMouseUp(): void {
        this.setTime();
    }

    setTime(): void {
        this.data.timepickerBaseRef.timeSet.next(this._timepickerSrv.getFullTime(this.data.format));
        this.close();
    }

    protected _defineTime(): void {
        const minTime = this.data.minTime;

        if (minTime && (!this.data.time && !this.data.defaultTime)) {
            const time = TimepickerAdapter.fromDateTimeToString(minTime, this.data.format);

            this._setDefaultTime(time);
        }
    }

    protected _onTimeChange(): void {
        const time = TimepickerAdapter.toLocaleTimeString(this._timepickerSrv.getFullTime(this.data.format), {
            locale: this._locale,
            format: this.data.format
        });

        this.data.timepickerBaseRef.timeChanged.emit(time);
    }

    protected _setDefaultTime(time: string): void {
        this._timepickerSrv.setDefaultTimeIfAvailable(
            time, this.data.minTime, this.data.maxTime, this.data.format, this.data.minutesGap);
    }
}
