import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';

import { TimepickerPeriods } from '../../models/timepicker-periods.enum';
import { TimepickerUtils } from '../../utils/timepicker.utils';
import { Timepicker12HoursFaceComponent } from './timepicker-12-hours-face.component';


describe('Timepicker12HoursFaceComponent', () => {
    let fixture: ComponentFixture<Timepicker12HoursFaceComponent>;
    let component: Timepicker12HoursFaceComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [Timepicker12HoursFaceComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(Timepicker12HoursFaceComponent);

        component = fixture.componentInstance;
    });

    it('should call disabledHours once period changed', () => {
        const spy = spyOn(TimepickerUtils, 'disableHours');
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
        const hours = TimepickerUtils.getHours(format);
        component.minTime = time;
        component.maxTime = time;
        component.format = format;
        component.period = period;
        component.hoursList = hours;

        component.ngOnChanges(changes);
        expect(spy).toHaveBeenCalledWith(hours, {min: time, max: time, format, period});
    });

    it('should not call disabledHours', () => {
        const spy = spyOn(TimepickerUtils, 'disableHours');
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
