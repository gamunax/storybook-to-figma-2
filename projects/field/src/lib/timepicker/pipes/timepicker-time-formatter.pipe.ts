import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

import { TimepickerUnits } from '../models/timepicker-units.enum';

@Pipe({
    name: "timeFormatter"
})
export class TimepickerTimeFormatterPipe implements PipeTransform {

    transform(time: number | string, timeUnit: TimepickerUnits): any {
        if (time == null || time === '') {
            return time;
        }
        switch (timeUnit) {
            case TimepickerUnits.HOUR:
                return DateTime.fromObject({hour: +time}).toFormat("HH");
            case TimepickerUnits.MINUTE:
                return DateTime.fromObject({minute: +time}).toFormat("mm");
            default:
                throw new Error("no such time unit");
        }
    }

}
