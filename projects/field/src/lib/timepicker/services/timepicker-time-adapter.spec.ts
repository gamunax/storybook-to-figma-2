import { DateTime } from 'luxon';

import { TimepickerPeriods } from '../models/timepicker-periods.enum';
import { TimepickerAdapter } from './timepicker-adapter';

xdescribe('TimepickerAdapter', () => {

    describe('parseTime', () => {
        const locale = 'en-US';

        // it('should parse from string and return as DateTime', () => {
        //     let expectedHour = 11;
        //     const expectedMinute = 0;

        //     expect(TimepickerAdapter.parseTime('11:00', {locale}).hour).toBe(expectedHour);
        //     expect(TimepickerAdapter.parseTime('11:00', {locale}).minute).toBe(expectedMinute);
        //     expect(TimepickerAdapter.parseTime('11:00 Am', {locale}).hour).toBe(expectedHour);
        //     expect(TimepickerAdapter.parseTime('11:00 Am', {locale}).minute).toBe(expectedMinute);
        //     expect(TimepickerAdapter.parseTime('11:00 am', {locale}).hour).toBe(expectedHour);
        //     expect(TimepickerAdapter.parseTime('11:00 am', {locale}).minute).toBe(expectedMinute);

        //     expectedHour = 23;

        //     expect(TimepickerAdapter.parseTime('23:00', {locale}).hour).toBe(expectedHour);
        //     expect(TimepickerAdapter.parseTime('23:00', {locale}).minute).toBe(expectedMinute);
        //     expect(TimepickerAdapter.parseTime('11:00 Pm', {locale}).hour).toBe(expectedHour);
        //     expect(TimepickerAdapter.parseTime('11:00 Pm', {locale}).minute).toBe(expectedMinute);
        //     expect(TimepickerAdapter.parseTime('11:00 pm', {locale}).hour).toBe(expectedHour);
        //     expect(TimepickerAdapter.parseTime('11:00 pm', {locale}).minute).toBe(expectedMinute);
        // });

        it('should parse time from latn to arab number', () => {
            const arabLocale = 'ar-AE';
            const arabicTime = '١١:١١ ص';

            expect(TimepickerAdapter.parseTime(arabicTime, {locale: arabLocale, numberingSystem: 'arab'}).hour).toBe(11);
            expect(TimepickerAdapter.parseTime(arabicTime, {locale: arabLocale, numberingSystem: 'arab'}).minute).toBe(11);
        });
    });

    describe('formatTime', () => {

        it('should return time in 24-hours format', () => {
            const format = 24;

            expect(TimepickerAdapter.formatTime('11:00 pm', {format})).toBe('23:00');
            expect(TimepickerAdapter.formatTime('18:10', {format})).toBe('18:10');
        });

        it('should return time in am/pm format', () => {
            const format = 12;

            expect(TimepickerAdapter.formatTime('23:00', {format})).toBe('11:00 PM');
            expect(TimepickerAdapter.formatTime('12:20 am', {format})).toBe('12:20 AM');
            expect(TimepickerAdapter.formatTime('12:20 am', {format: 33})).toBe('12:20 AM');
        });

        it('should return Invalid Time message when provide invalid time', () => {
            expect(TimepickerAdapter.formatTime(null, {format: 12})).toBe('Invalid Time');
            expect(TimepickerAdapter.formatTime(undefined, {format: 24})).toBe('Invalid Time');
            expect(TimepickerAdapter.formatTime('', {format: 24})).toBe('Invalid Time');
        });
    });

    describe('isTimeAvailable', () => {
        const locale = 'en-US';

        it('should return false if no time provided', () => {
            expect(TimepickerAdapter.isTimeAvailable('')).toBeFalsy();
            expect(TimepickerAdapter.isTimeAvailable(null)).toBeFalsy();
            expect(TimepickerAdapter.isTimeAvailable(undefined)).toBeFalsy();
        });

        it('should return true', () => {
            const min = TimepickerAdapter.parseTime('11:11 am', {locale});
            let isAvailable = TimepickerAdapter.isTimeAvailable('11:12 am', min);
            expect(isAvailable).toBeTruthy();

            isAvailable = TimepickerAdapter.isTimeAvailable('11:11 am', min);
            expect(isAvailable).toBeTruthy();
        });

        it('should return false', () => {
            const min = TimepickerAdapter.parseTime('11:11 am', {locale});
            const isAvailable = TimepickerAdapter.isTimeAvailable('11:10 am', min);
            expect(isAvailable).toBeFalsy();
        });

        it('should throw an Error', function () {
            const minutesGap = 5;
            const min = TimepickerAdapter.parseTime('11:00 pm', {locale});
            const max = TimepickerAdapter.parseTime('11:50 pm', {locale});
            try {
                TimepickerAdapter.isTimeAvailable('11:43 pm', min, max, 'minute', minutesGap);
            } catch (e) {
                expect(e.message).toBe(`Your minutes - 43 doesn\'t match your minutesGap - ${minutesGap}`);
            }
        });
    });

    describe('formatHour', () => {

        it('should return hour without changes', () => {
            const hour = 23;
            expect(TimepickerAdapter.formatHour(hour, 24, TimepickerPeriods.AM)).toBe(hour);
        });

        it('should return 10', () => {
            expect(TimepickerAdapter.formatHour(10, 12, TimepickerPeriods.AM)).toBe(10);
        });

        it('should return 22', () => {
            expect(TimepickerAdapter.formatHour(10, 12, TimepickerPeriods.PM)).toBe(22);
        });

        it('should return 0', () => {
            expect(TimepickerAdapter.formatHour(12, 12, TimepickerPeriods.AM)).toBe(0);
        });

        it('should return 12', () => {
            expect(TimepickerAdapter.formatHour(12, 12, TimepickerPeriods.PM)).toBe(12);
        });
    });

    describe('toLocaleTimeString', () => {

        it('should convert provided time (en-US) to provided locale (ar-AE) in 12-hours format', () => {
            const expected = '١١:١١ ص';
            const actual = '11:11 am';

            expect(TimepickerAdapter.toLocaleTimeString(actual, {locale: 'ar-AE'})).toBe(expected);
        });

        it('should convert provided time (en-US) to provided locale (ar-AE) in 24-hours format', () => {
            const expected = '٢١:١١';
            const actual = '21:11';

            expect(TimepickerAdapter.toLocaleTimeString(actual, {locale: 'ar-AE', format: 24})).toBe(expected);
        });
    });

    describe('fromDateTimeToString', () => {

        it('should return time as string in 12-hours format', () => {
            const expected = '11:15 pm';
            const dateTime = DateTime.fromObject({hour: 23, minute: 15});

            expect(TimepickerAdapter.fromDateTimeToString(dateTime, 12).toLowerCase()).toBe(expected);
        });

        it('should return time as string in 24-hours format', () => {
            const expected = '23:15';
            const dateTime = DateTime.fromObject({hour: 23, minute: 15});

            expect(TimepickerAdapter.fromDateTimeToString(dateTime, 24)).toBe(expected);
        });

        it(`should convert time from 'arab' numbering system to 'latn' and return as string`, () => {
            const expected = '11:11 am';
            const dateTime = DateTime.fromObject({hour: 11, minute: 11 });

            expect(TimepickerAdapter.fromDateTimeToString(dateTime, 12).toLowerCase()).toBe(expected);
        });
    });
});
