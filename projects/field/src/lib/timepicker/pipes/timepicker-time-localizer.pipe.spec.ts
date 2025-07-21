import { DateTime } from 'luxon';

import { TimepickerUnits } from '../models/timepicker-units.enum';
import { TimepickerTimeLocalizerPipe } from './timepicker-time-localizer.pipe';


describe('TimepickerTimeLocalizerPipe', () => {
    const defaultLocale = 'en-US';
    const pipe = new TimepickerTimeLocalizerPipe(defaultLocale);

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should not localize time when provided invalid value', () => {
        const expected = '';

        expect(pipe.transform(undefined, TimepickerUnits.HOUR)).toBe(expected);
        expect(pipe.transform(null, TimepickerUnits.HOUR)).toBe(expected);
        expect(pipe.transform('', TimepickerUnits.HOUR)).toBe(expected);
    });

    it('should return hour in numeric format', () => {
        const hours = Array(23).fill(1).map((v, i) => v + i);

        hours.forEach(hour => {
            const expected = DateTime.fromObject({hour: hour}).setLocale(defaultLocale).toFormat('H');
            expect(pipe.transform(hour, TimepickerUnits.HOUR)).toBe(expected);
        });
    });

    it('should return hour in 2-digit format when 0 is provided', () => {
        const hour = 0;
        const expected = DateTime.fromObject({hour: hour}).setLocale(defaultLocale).toFormat('HH');

        expect(pipe.transform(hour, TimepickerUnits.HOUR)).toBe(expected);
    });

    it('should return hour in 2-digit format when isKeyboardEnabled is true', () => {
        const hour = 1;
        const expected = DateTime.fromObject({hour: hour}).setLocale(defaultLocale).toFormat('HH');

        expect(pipe.transform(hour, TimepickerUnits.HOUR, true)).toBe(expected);
    });


    it('should return minute in 2-digit format', () => {
        const minutes = Array(59).fill(0).map((v, i) => v + i);

        minutes.forEach(minute => {
            const expected = DateTime.fromObject({minute: minute}).setLocale(defaultLocale).toFormat('mm');
            expect(pipe.transform(String(minute).padStart(2, '0'), TimepickerUnits.MINUTE)).toBe(expected);
        });
    });

    it('should throw an error when unexpected TimepickerUnits is provided', () => {
        const timeUnit = undefined;
        try {
            pipe.transform(1, timeUnit);
        } catch (e) {
            expect(e instanceof Error).toBeTruthy();
            expect(e.message).toBe(`There is no Time Unit with type ${timeUnit}`);
        }
    });

    it('should throw an error when cannot format provided time', () => {
        const time = 's3';

        try {
            pipe.transform(time, TimepickerUnits.HOUR);
        } catch (e) {
            expect(e instanceof Error).toBeTruthy();
            expect(e.message).toBe(`Cannot format provided time - ${time} to locale - ${defaultLocale}`);
        }
    });
});
