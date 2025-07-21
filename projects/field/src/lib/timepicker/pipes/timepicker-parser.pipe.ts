import { Inject, Injectable, Pipe, PipeTransform } from '@angular/core';
import { DateTime, NumberingSystem } from 'luxon';

import { TimepickerMeasure } from '../models/timepicker-measures.enum';
import { TimepickerUnits } from '../models/timepicker-units.enum';
import { TIMEPICKER_LOCALE } from '../tokens/timepicker-time-locale.token';

@Pipe({
    name: "timepickerParser"
})
@Injectable()
export class TimepickerParserPipe implements PipeTransform {

    private readonly _numberingSystem: NumberingSystem;

    constructor(@Inject(TIMEPICKER_LOCALE) private _locale: string) {
        this._numberingSystem = DateTime.local().setLocale(this._locale).resolvedLocaleOptions().numberingSystem as NumberingSystem;
    }

    transform(time: string | number, timeUnit = TimepickerUnits.HOUR): string {
        if (time == null || time === "") {
            return "";
        }

        if (!isNaN(+time)) {
            return `${time}`;
        }

        if (timeUnit === TimepickerUnits.MINUTE) {
            return this._parseTime(time, "mm", TimepickerMeasure.minute).toString();
        }

        return this._parseTime(time, "HH", TimepickerMeasure.hour).toString();
    }

    private _parseTime(time: string | number, format: string, timeMeasure: TimepickerMeasure): number {
        const parsedTime = DateTime.fromFormat(String(time), format, {numberingSystem: this._numberingSystem})[timeMeasure];
        if (!isNaN(parsedTime)) {
            return parsedTime;
        }

        throw new Error(`Cannot parse time - ${time}`);
    }

}
