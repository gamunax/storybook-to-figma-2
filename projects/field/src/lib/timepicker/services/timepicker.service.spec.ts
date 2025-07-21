import { TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';

import { TimepickerClockFace } from '../models/timepicker-clock-face.interface';
import { TimepickerPeriods } from '../models/timepicker-periods.enum';
import { TimepickerAdapter } from './timepicker-adapter';
import { TimepickerService } from './timepicker.service';

xdescribe('TimepickerService', () => {
    const DEFAULT_HOUR: TimepickerClockFace = {
        time: 12,
        angle: 360
    };
    const DEFAULT_MINUTE: TimepickerClockFace = {
        time: 0,
        angle: 360
    };

    type NewType = TimepickerService;

    let timepickerService: NewType;
    let selectedHour: TimepickerClockFace;
    let selectedMinute: TimepickerClockFace;
    let selectedPeriod: TimepickerPeriods;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TimepickerService]
        });

        timepickerService = TestBed.get(TimepickerService);
        timepickerService.selectedHour.subscribe(hour => selectedHour = hour);
        timepickerService.selectedMinute.subscribe(minute => selectedMinute = minute);
        timepickerService.selectedPeriod.subscribe(period => selectedPeriod = period);
    });

    it('should set default hour on startup', () => {
        expect(selectedHour).toEqual(DEFAULT_HOUR);
    });

    it('should set default minute on startup', () => {
        expect(selectedMinute).toEqual(DEFAULT_MINUTE);
    });

    it('should set default period on startup', () => {
        expect(selectedPeriod).toEqual(TimepickerPeriods.AM);
    });

    it('should change hour, minute and period', () => {
        const changedHour: TimepickerClockFace = {time: 11, angle: 20};
        const changedMinute: TimepickerClockFace = {time: 40, angle: 50};

        timepickerService.hour = changedHour;
        timepickerService.minute = changedMinute;
        timepickerService.period = TimepickerPeriods.PM;

        expect(selectedHour).toEqual(changedHour);
        expect(selectedMinute).toEqual(changedMinute);
        expect(selectedPeriod).toEqual(TimepickerPeriods.PM);
    });

    it('should return default full time as string (hh:mm a or HH:mm)', () => {
        expect(timepickerService.getFullTime(12)).toBe('12:00 AM');
        expect(timepickerService.getFullTime(24)).toBe('12:00');
    });

    it('should return default full time if time is not valid', () => {
        timepickerService.hour = {angle: 0, time: null};
        timepickerService.minute = {angle: 0, time: null};
        expect(timepickerService.getFullTime(12)).toBe('12:00 AM');
        expect(timepickerService.getFullTime(24)).toBe('12:00');
    });

    it('should change default time', () => {
        let time = '11:15 am';
        timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: 11});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: 15});
        expect(selectedPeriod).toBe(TimepickerPeriods.AM);

        time = '11:12 pm';
        timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);
        expect(selectedHour.time).toBe(11);
        expect(selectedMinute.time).toBe(12);
        expect(selectedPeriod).toBe(TimepickerPeriods.PM);

        time = '12:00 pm';
        timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);
        expect(selectedHour.time).toBe(12);
        expect(selectedMinute.time).toBe(0);
        expect(selectedPeriod).toBe(TimepickerPeriods.PM);

        time = '12:00 am';
        timepickerService.setDefaultTimeIfAvailable(time, null, null, 12);
        expect(selectedHour.time).toBe(12);
        expect(selectedMinute.time).toBe(0);
        expect(selectedPeriod).toBe(TimepickerPeriods.AM);

        time = '00:00';
        timepickerService.setDefaultTimeIfAvailable(time, null, null, 24);

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: 0});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: 0});
        expect(selectedPeriod).toBe(TimepickerPeriods.AM);

        time = '15:00';
        timepickerService.setDefaultTimeIfAvailable(time, null, null, 24);

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: 15});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: 0});
        expect(selectedPeriod).toBe(TimepickerPeriods.AM);
    });

    it('should reset time if default time is invalid', () => {
        timepickerService.setDefaultTimeIfAvailable('10:10 am', null, null, 12);

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: 10});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: 10});
        expect(selectedPeriod).toBe(TimepickerPeriods.AM);

        timepickerService.setDefaultTimeIfAvailable('invalid time', null, null, 12);

        expect(selectedHour).toEqual(DEFAULT_HOUR);
        expect(selectedMinute).toEqual(DEFAULT_MINUTE);
        expect(selectedPeriod).toBe(TimepickerPeriods.AM);
    });

    it('should not change time if it is not available', () => {
        const min = DateTime.fromObject({hour: 11});

        timepickerService.setDefaultTimeIfAvailable('10:10 am', null, null, 12);

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: 10});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: 10});
        expect(selectedPeriod).toBe(TimepickerPeriods.AM);

        timepickerService.setDefaultTimeIfAvailable('09:15 am', min, null, 12);

        expect(selectedHour).toEqual({...DEFAULT_HOUR, time: 10});
        expect(selectedMinute).toEqual({...DEFAULT_MINUTE, time: 10});
        expect(selectedPeriod).toBe(TimepickerPeriods.AM);
    });

    it('should call console error', () => {
        const minutesGap = 5;
        const locale = 'en-US';
        const min = TimepickerAdapter.parseTime('11:00 pm', {locale});
        const max = TimepickerAdapter.parseTime('11:50 pm', {locale});
        const spy = spyOn(console, 'error');

        timepickerService.setDefaultTimeIfAvailable('11:43 pm', min, max, 12, minutesGap);
        expect(spy).toHaveBeenCalled();
    });
});
