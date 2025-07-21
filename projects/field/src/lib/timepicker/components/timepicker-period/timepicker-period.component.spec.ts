import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';

import { TimepickerPeriods } from '../../models/timepicker-periods.enum';
import { TimepickerUnits } from '../../models/timepicker-units.enum';
import { TimepickerUtils } from '../../utils/timepicker.utils';
import { TimepickerPeriodComponent } from './timepicker-period.component';


describe('TimepickerPeriodComponent', () => {
    let fixture: ComponentFixture<TimepickerPeriodComponent>;
    let component: TimepickerPeriodComponent;
    const minutes = TimepickerUtils.getMinutes();

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TimepickerPeriodComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(TimepickerPeriodComponent);

        component = fixture.componentInstance;
    });

    it('should change period for hour unit', () => {
        component.activeTimeUnit = TimepickerUnits.HOUR;
        component.format = 12;
        component.minTime = DateTime.fromObject({hour: 1});
        component.maxTime = DateTime.fromObject({hour: 15});
        component.hours = TimepickerUtils.getHours(12);
        component.isPeriodAvailable = false;
        component.periodChanged.subscribe(p => component.selectedPeriod = p);
        component.changePeriod(TimepickerPeriods.PM);

        expect(component.isPeriodAvailable).toBeTruthy();
        expect(component.selectedPeriod).toBe(TimepickerPeriods.PM);
    });

    it('should change period for minute unit', () => {
        component.activeTimeUnit = TimepickerUnits.MINUTE;
        component.format = 12;
        component.minTime = DateTime.fromObject({hour: 1});
        component.maxTime = DateTime.fromObject({hour: 5});
        component.minutes = minutes;
        component.selectedHour = 4;
        component.periodChanged.subscribe(p => component.selectedPeriod = p);
        component.changePeriod(TimepickerPeriods.AM);

        expect(component.selectedPeriod).toBe(TimepickerPeriods.AM);
    });

    it('should not change period', () => {
        component.activeTimeUnit = TimepickerUnits.MINUTE;
        component.format = 12;
        component.minTime = DateTime.fromObject({hour: 1});
        component.maxTime = DateTime.fromObject({hour: 5});
        component.minutes = minutes;
        component.selectedHour = 4;
        component.selectedPeriod = TimepickerPeriods.AM;
        component.periodChanged.subscribe(p => component.selectedPeriod = p);
        component.changePeriod(TimepickerPeriods.PM);

        expect(component.selectedPeriod).toBe(TimepickerPeriods.AM);
    });

    it('should throw an error', () => {
        component.format = 12;
        component.minTime = DateTime.fromObject({hour: 1});
        component.maxTime = DateTime.fromObject({hour: 5});
        component.minutes = minutes;
        component.selectedHour = 4;
        component.selectedPeriod = TimepickerPeriods.AM;
        try {
            component.changePeriod(TimepickerPeriods.PM);
        } catch (e) {
            expect(e.message).toBe('no such TimepickerUnits');
        }

    });

    it('should set isPeriodAvailable to true', () => {
        component.isPeriodAvailable = false;
        expect(component.isPeriodAvailable).toBeFalsy();

        component.animationDone();
        expect(component.isPeriodAvailable).toBeTruthy();
    });
});
