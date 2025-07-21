import { Inject, Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

import { TimepickerMeasure } from '../models/timepicker-measures.enum';
import { TimepickerUnits } from '../models/timepicker-units.enum';
import { TIMEPICKER_LOCALE } from '../tokens/timepicker-time-locale.token';

@Pipe({
    name: "timeLocalizer"
})
export class TimepickerTimeLocalizerPipe implements PipeTransform {

    constructor(@Inject(TIMEPICKER_LOCALE) private _locale: string) {
    }

    transform(time: number | string, timeUnit: TimepickerUnits, isKeyboardEnabled = false): string {
        if (time == null || time === "") {
            return "";
        }

        switch (timeUnit) {
            case TimepickerUnits.HOUR: {
                const format = (time === 0 || isKeyboardEnabled) ? "HH" : "H";

                return this._formatTime(TimepickerMeasure.hour, time, format);
            }
            case TimepickerUnits.MINUTE:
                return this._formatTime(TimepickerMeasure.minute, time, "mm");
            default:
                throw new Error(`There is no Time Unit with type ${timeUnit}`);
        }
    }

    private _formatTime(timeMeasure: TimepickerMeasure, time: string | number, format: string): string {
        try {
            return DateTime.fromObject({[timeMeasure]: +time}).setLocale(this._locale).toFormat(format);
        } catch {
            throw new Error(`Cannot format provided time - ${time} to locale - ${this._locale}`);
        }
    }
}
