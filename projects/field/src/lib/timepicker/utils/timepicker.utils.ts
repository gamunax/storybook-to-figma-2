import { DateTime } from 'luxon';

import { TimepickerClockFace } from '../models/timepicker-clock-face.interface';
import { TimepickerDisabledConfig } from '../models/timepicker-disabled-config.interface';
import { TimepickerFormat } from '../models/timepicker-format.enum';
import { TimepickerAdapter } from '../services/timepicker-adapter';

export class TimepickerUtils {

    static disableHours(hours: TimepickerClockFace[], config: TimepickerDisabledConfig): TimepickerClockFace[] {
        if (config.min || config.max) {

            return hours.map(value => {
                const hour = config.format === 24 ? value.time : TimepickerAdapter.formatHour(value.time, config.format, config.period);
                const currentTime = DateTime.fromObject({hour}).toFormat(TimepickerFormat.TWELVE);

                return {
                    ...value,
                    disabled: !TimepickerAdapter.isTimeAvailable(currentTime, config.min, config.max, "hour")
                };
            });
        }

        return hours;
    }

    static disableMinutes(minutes: TimepickerClockFace[], selectedHour: number, config: TimepickerDisabledConfig) {
        if (config.min || config.max) {

            const hour = TimepickerAdapter.formatHour(selectedHour, config.format, config.period);

            return minutes.map(value => {
                const currentTime = DateTime.fromObject({
                    hour,
                    minute: value.time
                }).toFormat(TimepickerFormat.TWELVE);

                return {
                    ...value,
                    disabled: !TimepickerAdapter.isTimeAvailable(currentTime, config.min, config.max, "minute")
                };
            });
        }

        return minutes;
    }

    static getHours(format: number): TimepickerClockFace[] {
        return Array(format).fill(1).map((v, i) => {
            const angleStep = 30;
            const time = v + i;
            const angle = angleStep * time;

            return {time: time === 24 ? 0 : time, angle};
        });
    }

    static getMinutes(gap = 1): TimepickerClockFace[] {
        const minutesCount = 60;
        const angleStep = 360 / minutesCount;
        const minutes = [];

        for (let i = 0; i < minutesCount; i++) {
            const angle = angleStep * i;
            if (i % gap === 0) {
                minutes.push({time: i, angle: angle !== 0 ? angle : 360});
            }
        }

        return minutes;
    }

    static isDigit(e: KeyboardEvent) {
        // Allow: backspace, delete, tab, escape, enter
        if ([46, 8, 9, 27, 13].some(n => n === e.keyCode) ||
            // Allow: Ctrl/cmd+A
            (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+C
            (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: Ctrl/cmd+X
            (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, up, down
            (e.keyCode >= 35 && e.keyCode <= 40)) {

            return true;
        }
        return !((e.keyCode < 48 || e.keyCode > 57) && (e.keyCode < 96 || e.keyCode > 105));
    }


}
