import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject, Observable } from 'rxjs';

import { TimepickerClockFace } from '../models/timepicker-clock-face.interface';
import { TimepickerPeriods } from '../models/timepicker-periods.enum';
import { TimepickerAdapter } from './timepicker-adapter';

const DEFAULT_HOUR: TimepickerClockFace = {
    time: 12,
    angle: 360
};
const DEFAULT_MINUTE: TimepickerClockFace = {
    time: 0,
    angle: 360
};

@Injectable({
    providedIn: "root"
})
export class TimepickerService {


    set hour(hour: TimepickerClockFace) {
        this._hour$.next(hour);
    }

    set minute(minute: TimepickerClockFace) {
        this._minute$.next(minute);
    }

    set period(period: TimepickerPeriods) {
        const isPeriodValid = (period === TimepickerPeriods.AM) || (period === TimepickerPeriods.PM);

        if (isPeriodValid) {
            this._period$.next(period);
        }
    }

    get selectedHour(): Observable<TimepickerClockFace> {
        return this._hour$.asObservable();
    }

    get selectedMinute(): Observable<TimepickerClockFace> {
        return this._minute$.asObservable();
    }

    get selectedPeriod(): Observable<TimepickerPeriods> {
        return this._period$.asObservable();
    }

    private _hour$ = new BehaviorSubject<TimepickerClockFace>(DEFAULT_HOUR);
    private _minute$ = new BehaviorSubject<TimepickerClockFace>(DEFAULT_MINUTE);
    private _period$ = new BehaviorSubject<TimepickerPeriods>(TimepickerPeriods.AM);

    getFullTime(format: number): string {
        const selectedHour = this._hour$.getValue().time;
        const selectedMinute = this._minute$.getValue().time;
        const hour = selectedHour != null ? selectedHour : DEFAULT_HOUR.time;
        const minute = selectedMinute != null ? selectedMinute : DEFAULT_MINUTE.time;
        const period = format === 12 ? this._period$.getValue() : "";
        const time = `${hour}:${minute} ${period}`.trim();

        return TimepickerAdapter.formatTime(time, {format});
    }


    setDefaultTimeIfAvailable(time: string, min: DateTime, max: DateTime, format: number, minutesGap?: number) {
        /* Workaround to double error message*/
        try {
            if (TimepickerAdapter.isTimeAvailable(time, min, max, "minute", minutesGap)) {
                this._setDefaultTime(time, format);
            }
        } catch (e) {
            console.error(e);
        }
    }

    private _resetTime(): void {
        this.hour = {...DEFAULT_HOUR};
        this.minute = {...DEFAULT_MINUTE};
        this.period = TimepickerPeriods.AM;
    }

    private _setDefaultTime(time: string, format: number) {
        const defaultTime = TimepickerAdapter.parseTime(time, {format}).toJSDate();

        // Check on null, because invalid date will be null
        if (DateTime.fromJSDate(defaultTime) !== null) {
            const period = time.substr(time.length - 2).toUpperCase();
            const hour = defaultTime.getHours();

            this.hour = {...DEFAULT_HOUR, time: formatHourByPeriod(hour, period as TimepickerPeriods)};
            this.minute = {...DEFAULT_MINUTE, time: defaultTime.getMinutes()};
            this.period = period as TimepickerPeriods;

        }
        else {
            this._resetTime();
        }
    }
}

/***
 *  Format hour in 24hours format to meridian (AM or PM) format
 */
function formatHourByPeriod(hour: number, period: TimepickerPeriods): number {
    switch (period) {
        case TimepickerPeriods.AM:
            return hour === 0 ? 12 : hour;
        case TimepickerPeriods.PM:
            return hour === 12 ? 12 : hour - 12;
        default:
            return hour;
    }
}
