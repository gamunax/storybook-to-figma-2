import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';

import { TimepickerPeriods } from '../../models/timepicker-periods.enum';
import { TimepickerUtils } from '../../utils/timepicker.utils';
import { TimepickerMinutesFaceComponent } from './timepicker-minutes-face.component';

describe('TimepickerMinutesFaceComponent', () => {
    let fixture: ComponentFixture<TimepickerMinutesFaceComponent>;
    let component: TimepickerMinutesFaceComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TimepickerMinutesFaceComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(TimepickerMinutesFaceComponent);

        component = fixture.componentInstance;
    });

    it('should call disableMinutes once period changed', () => {
        const spy = spyOn(TimepickerUtils, 'disableMinutes');
        const changes: SimpleChanges = {
            period: {
                currentValue: TimepickerPeriods.PM,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };
        const time = DateTime.fromJSDate(new Date());
        const format = 12;
        const period = TimepickerPeriods.PM;
        const minutes = TimepickerUtils.getMinutes();
        component.minTime = time;
        component.maxTime = time;
        component.format = format;
        component.period = period;
        component.minutesList = minutes;
        component.selectedHour = 1;

        component.ngOnChanges(changes);
        expect(spy).toHaveBeenCalledWith(minutes, 1, {min: time, max: time, format, period});
    });

    it('should not call disableMinutes', () => {
        const spy = spyOn(TimepickerUtils, 'disableMinutes');
        const changes: SimpleChanges = {
            minTime: {
                currentValue: null,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };

        component.ngOnChanges(changes);
        expect(spy).toHaveBeenCalledTimes(0);
    });
});
