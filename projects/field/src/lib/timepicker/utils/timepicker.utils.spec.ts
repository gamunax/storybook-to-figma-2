import { DateTime } from 'luxon';

import { TimepickerPeriods } from '../models/timepicker-periods.enum';
import { TimepickerAdapter } from '../services/timepicker-adapter';
import { TimepickerUtils } from './timepicker.utils';

describe("TimepickerTime", () => {
    describe("Hour", () => {
        const min = DateTime.fromObject({hour: 10});
        const max = DateTime.fromObject({hour: 15});

        it("should return 12 hours", () => {
            const hours = TimepickerUtils.getHours(12);
            for (let i = 0; i < hours.length; i++) {
                const angleStep = 30;
                expect(hours[i]).toEqual({time: i + 1, angle: (i + 1) * angleStep});
            }
        });

        it("should return 24 hours", () => {
            const hours = TimepickerUtils.getHours(24);
            for (let i = 0; i < hours.length; i++) {
                const angleStep = 30;
                const time = i + 1;

                expect(hours[i]).toEqual({time: time === 24 ? 0 : time, angle: time * angleStep});
            }
        });

        it("should disable hours if min time present (12 hours format)", () => {
            const hours = TimepickerUtils.getHours(12);
            let disabledHours = TimepickerUtils.disableHours(hours, {
                min,
                max: undefined,
                format: 12,
                period: TimepickerPeriods.AM
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(10);
            for (let i = 0; i < disabledHours.length; i++) {
                expect(disabledHours[i].time).toBe(disabledHours[i].time === 12 ? 12 : i + 1);
            }

            disabledHours = TimepickerUtils.disableHours(hours, {
                min,
                max: undefined,
                format: 12,
                period: TimepickerPeriods.PM
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(0);
        });

        it("should disable hours if max time present (12 hours format)", () => {
            const hours = TimepickerUtils.getHours(12);
            let disabledHours = TimepickerUtils.disableHours(hours, {
                min: undefined,
                max,
                format: 12,
                period: TimepickerPeriods.AM
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(0);


            disabledHours = TimepickerUtils.disableHours(hours, {
                min: undefined,
                max,
                format: 12,
                period: TimepickerPeriods.PM
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(8);
            for (let i = 0; i < disabledHours.length; i++) {
                expect(disabledHours[i].time).toBe(i + 4);
            }
        });

        it("should disable hours if min and max time present (24 hours format)", () => {
            const hours = TimepickerUtils.getHours(24);
            const disabledHours = TimepickerUtils.disableHours(hours, {
                min,
                max,
                format: 24,
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(18);
        });

        it("should return hours without disabling if nor min and max values were provided", () => {
            const hours = TimepickerUtils.getHours(24);
            const disabledHours = TimepickerUtils.disableHours(hours, {
                min: undefined,
                max: undefined,
                format: 24,
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(0);
        });
    });

    describe("Minute", () => {
        const min = DateTime.fromObject({hour: 1, minute: 10});
        const max = DateTime.fromObject({hour: 3, minute: 50});
        const minutes = TimepickerUtils.getMinutes();


        it("should return array with 60 minutes by default", () => {
            const angleStep = 360 / 60;

            expect(minutes.length).toBe(60);

            for (let i = 0; i < minutes.length; i++) {
                const angle = i * angleStep;

                expect(minutes[i]).toEqual({time: i, angle: angle !== 0 ? angle : 360});
            }
        });

        it("should return minutes with gap in 5 minutes", () => {
            const gap = 5;
            const minutesWithGap = TimepickerUtils.getMinutes(gap);
            const angleStep = 360 / 60;

            expect(minutesWithGap.length).toBe(12);

            for (let i = 0; i < minutesWithGap.length; i++) {
                const angle = i * angleStep * gap;

                expect(minutesWithGap[i]).toEqual({time: i * gap, angle: angle !== 0 ? angle : 360});
            }
        });

        it("should disable minutes with min time", () => {
            let disabledMinutes = TimepickerUtils.disableMinutes(minutes, 1, {
                min,
                max: undefined,
                format: 12,
                period: TimepickerPeriods.AM
            }).filter(m => m.disabled);

            expect(disabledMinutes.length).toBe(10);
            for (let i = 0; i < disabledMinutes.length; i++) {
                const time = disabledMinutes[i].time;
                expect(time).toBe(i);
            }

            disabledMinutes = TimepickerUtils.disableMinutes(minutes, 2, {
                min,
                max: undefined,
                format: 12,
                period: TimepickerPeriods.AM
            }).filter(m => m.disabled);

            expect(disabledMinutes.length).toBe(0);

            disabledMinutes = TimepickerUtils.disableMinutes(minutes, 0, {
                min,
                max: undefined,
                format: 12,
                period: TimepickerPeriods.AM
            }).filter(m => m.disabled);

            expect(disabledMinutes.length).toBe(60);
        });

        it("should disable minutes with max time", () => {
            let disabledMinutes = TimepickerUtils.disableMinutes(minutes, 3, {
                min: undefined,
                max,
                format: 12,
                period: TimepickerPeriods.AM
            }).filter(m => m.disabled);

            expect(disabledMinutes.length).toBe(9);
            for (let i = 0; i < disabledMinutes.length; i++) {
                const time = i + 51;
                expect(disabledMinutes[i].time).toBe(time);
            }

            disabledMinutes = TimepickerUtils.disableMinutes(minutes, 2, {
                min: undefined,
                max,
                format: 12,
                period: TimepickerPeriods.AM
            }).filter(m => m.disabled);

            expect(disabledMinutes.length).toBe(0);

            disabledMinutes = TimepickerUtils.disableMinutes(minutes, 4, {
                min: undefined,
                max,
                format: 12,
                period: TimepickerPeriods.AM
            }).filter(m => m.disabled);

            expect(disabledMinutes.length).toBe(60);
        });

        it("should return minutes without disabling if nor min and max values were provided", () => {
            const disabledHours = TimepickerUtils.disableMinutes(minutes, 1, {
                min: undefined,
                max: undefined,
                format: 24,
            }).filter(h => h.disabled);

            expect(disabledHours.length).toBe(0);
        });
    });

    const locale = "en-US";

    describe("isSameOrAfter", () => {

        it("should return true if time the same or more than min value", () => {
            const min = TimepickerAdapter.parseTime("11:11 am", {locale});
            let time = TimepickerAdapter.parseTime("11:12 am", {locale});
            let isSameOrAfterVar = TimepickerAdapter.isSameOrAfter(time, min);
            expect(isSameOrAfterVar).toBeTruthy();

            time = TimepickerAdapter.parseTime("11:11 am", {locale});
            isSameOrAfterVar = TimepickerAdapter.isSameOrAfter(time, min);
            expect(isSameOrAfterVar).toBeTruthy();
        });

        it("should return false if hour less than min value", () => {
            const min = TimepickerAdapter.parseTime("11:11 am", {locale});
            const time = TimepickerAdapter.parseTime("10:12 am", {locale});
            expect(TimepickerAdapter.isSameOrAfter(time, min, "hour")).toBeFalsy();
        });

        it("should return false", () => {
            const min = TimepickerAdapter.parseTime("11:11 am", {locale});
            const time = TimepickerAdapter.parseTime("10:12 am", {locale});
            expect(TimepickerAdapter.isSameOrAfter(time, min, undefined)).toBeFalsy();
        });
    });

    describe("isSameOrBefore", () => {

        it("should return true if time before or equal max value", () => {
            const max = TimepickerAdapter.parseTime("11:11 am", {locale});
            let time = TimepickerAdapter.parseTime("11:10 am", {locale});
            let isSameOrBeforeVar = TimepickerAdapter.isSameOrBefore(time, max);
            expect(isSameOrBeforeVar).toBeTruthy();

            time = TimepickerAdapter.parseTime("11:11 am", {locale});
            isSameOrBeforeVar = TimepickerAdapter.isSameOrBefore(time, max);
            expect(isSameOrBeforeVar).toBeTruthy();
        });

        it("should return false if hour more than max", () => {
            const max = TimepickerAdapter.parseTime("11:11 am", {locale});
            const time = TimepickerAdapter.parseTime("12:10 pm", {locale});
            expect(TimepickerAdapter.isSameOrBefore(time, max, "hour")).toBeFalsy();
        });

        it("should return false", () => {
            const max = TimepickerAdapter.parseTime("11:11 am", {locale});
            const time = TimepickerAdapter.parseTime("12:10 pm", {locale});
            expect(TimepickerAdapter.isSameOrBefore(time, max, undefined)).toBeFalsy();
        });
    });

    describe("isBetween", () => {

        it("should return true if time between min(inclusively) and max(inclusively) value", () => {
            const min = TimepickerAdapter.parseTime("09:00 am", {locale});
            const max = TimepickerAdapter.parseTime("03:00 pm", {locale});
            let time = TimepickerAdapter.parseTime("12:12 pm", {locale});
            let isBetweenVar = TimepickerAdapter.isBetween(time, min, max);
            expect(isBetweenVar).toBeTruthy();

            time = TimepickerAdapter.parseTime("09:00 am", {locale});
            isBetweenVar = TimepickerAdapter.isBetween(time, min, max);
            expect(isBetweenVar).toBeTruthy();

            time = TimepickerAdapter.parseTime("03:00 pm", {locale});
            isBetweenVar = TimepickerAdapter.isBetween(time, min, max);
            expect(isBetweenVar).toBeTruthy();
        });

        it("should return false if hour is not between min(inclusively) and max(inclusively) value", () => {
            const min = TimepickerAdapter.parseTime("09:00 am", {locale});
            const max = TimepickerAdapter.parseTime("03:00 pm", {locale});
            const time = TimepickerAdapter.parseTime("04:05 pm", {locale});

            expect(TimepickerAdapter.isBetween(time, min, max, "hour")).toBeFalsy();
        });

        it("should return false", () => {
            const min = TimepickerAdapter.parseTime("09:00 am", {locale});
            const max = TimepickerAdapter.parseTime("03:00 pm", {locale});
            const time = TimepickerAdapter.parseTime("04:05 pm", {locale});

            expect(TimepickerAdapter.isBetween(time, min, max, undefined)).toBeFalsy();
        });
    });

    describe("isDigit", () => {
        const numbers = Array(10).fill(48).map((v, i) => v + i);
        const numpadNumbers = Array(10).fill(96).map((v, i) => v + i);
        const arrows = Array(6).fill(35).map((v, i) => v + i); // home, end, left, right, up, down
        const specialKeys = [46, 8, 9, 27, 13]; // backspace, delete, tab, escape, enter


        it("should allow numbers", () => {

            const keyCodes = numbers.concat(numpadNumbers);

            keyCodes.forEach(code => {
                expect(TimepickerUtils.isDigit({keyCode: code} as KeyboardEvent)).toBeTruthy();
            });
        });

        it("should allow backspace, delete, tab, escape, enter", () => {
            specialKeys.forEach(code => {
                expect(TimepickerUtils.isDigit({keyCode: code} as KeyboardEvent)).toBeTruthy();
            });
        });

        it("should allow home, end, left, right, up, down", () => {
            arrows.forEach(code => {
                expect(TimepickerUtils.isDigit({keyCode: code} as KeyboardEvent)).toBeTruthy();
            });
        });

        it("should allow ctrl/cmd+a, ctrl/cmd+c, ctrl/cmd+x", () => {
            const chars = [65, 67, 88];

            chars.forEach(code => {
                expect(TimepickerUtils.isDigit({keyCode: code, ctrlKey: true} as KeyboardEvent)).toBeTruthy();
            });

            chars.forEach(code => {
                expect(TimepickerUtils.isDigit({keyCode: code, metaKey: true} as KeyboardEvent)).toBeTruthy();
            });
        });

        it("should not allow chars but numbers, backspace, delete, tab, escape, enter, home, end, left, right, up, down", () => {
            const allKeyCodes = Array(114).fill(8).map((v, i) => v + i);
            const allowedCodes = [...numbers, ...numpadNumbers, ...specialKeys, ...arrows];
            const restrictedCodes = allKeyCodes.filter(code => !allowedCodes.includes(code));

            restrictedCodes.forEach((code) => {
                expect(TimepickerUtils.isDigit({keyCode: code} as KeyboardEvent)).toBeFalsy();
            });
        });
    });
});
