import { NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TimepickerPeriods } from '../../models/timepicker-periods.enum';
import { TimepickerUnits } from '../../models/timepicker-units.enum';
import { TimepickerAdapter } from '../../services/timepicker-adapter';
import { TIMEPICKER_LOCALE } from '../../tokens/timepicker-time-locale.token';
import { TimepickerUtils } from '../../utils/timepicker.utils';
import { TimepickerDialComponent } from './timepicker-dial.component';


describe('TimepickerDialComponent', () => {
    let fixture: ComponentFixture<TimepickerDialComponent>;
    let component: TimepickerDialComponent;
    beforeEach(() => {

        fixture = TestBed.configureTestingModule({
            declarations: [TimepickerDialComponent],
            providers: [
                {provide: TIMEPICKER_LOCALE, useValue: TimepickerAdapter.defaultLocale}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(TimepickerDialComponent);

        component = fixture.componentInstance;
    });

    it('should call disableHours and disableMinutes on period change', () => {
        const spyOnFunctionHours = spyOn(TimepickerUtils, 'disableHours');
        const spyOnFunctionMinutes = spyOn(TimepickerUtils, 'disableMinutes');
        const changes: SimpleChanges = {
            period: {
                currentValue: TimepickerPeriods.AM,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };

        component.ngOnChanges(changes);
        expect(spyOnFunctionHours).toHaveBeenCalled();
        expect(spyOnFunctionMinutes).toHaveBeenCalled();
    });

    it('should call disableHours on format change', () => {
        const spyOnFunctionHours = spyOn(TimepickerUtils, 'disableHours');
        const changes: SimpleChanges = {
            format: {
                currentValue: 24,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };

        component.ngOnChanges(changes);
        expect(spyOnFunctionHours).toHaveBeenCalled();
    });

    it('should call disableMinutes on hour change', () => {
        const spy = spyOn(TimepickerUtils, 'disableMinutes');
        const changes: SimpleChanges = {
            hour: {
                currentValue: 24,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };

        component.ngOnChanges(changes);
        expect(spy).toHaveBeenCalled();
    });

    it('should not call disableHours and disableMinutes', () => {
        const spyOnFunctionHours = spyOn(TimepickerUtils, 'disableHours');
        const spyOnFunctionMinutes = spyOn(TimepickerUtils, 'disableMinutes');
        const changes: SimpleChanges = {
            minTime: {
                currentValue: null,
                previousValue: undefined,
                firstChange: true,
                isFirstChange: () => null
            }
        };

        component.ngOnChanges(changes);
        expect(spyOnFunctionHours).toHaveBeenCalledTimes(0);
        expect(spyOnFunctionMinutes).toHaveBeenCalledTimes(0);
    });

    it('should emit changed time unit', fakeAsync(() => {
        let timeUnit = null;

        component.timeUnitChanged.subscribe(unit => timeUnit = unit);
        component.changeTimeUnit(TimepickerUnits.MINUTE);

        expect(timeUnit).toBe(TimepickerUnits.MINUTE);
    }));

    it('should emit changed period', fakeAsync(() => {
        let period = TimepickerPeriods.AM;

        component.periodChanged.subscribe(p => period = p);
        component.changePeriod(TimepickerPeriods.PM);

        tick();
        expect(period).toBe(TimepickerPeriods.PM);
    }));

    it('should emit changed hour', fakeAsync(() => {
        let hour = {time: 1, angle: 30};

        component.hourChanged.subscribe(h => hour = h);
        component.changeHour({time: 2, angle: 60});

        tick();
        expect(hour).toEqual({time: 2, angle: 60});
    }));

    it('should emit changed minute', fakeAsync(() => {
        let minute = {time: 10, angle: 30};

        component.minuteChanged.subscribe(m => minute = m);
        component.changeMinute({time: 20, angle: 60});

        tick();
        expect(minute).toEqual({time: 20, angle: 60});
    }));

    it('should set isHintVisible true', () => {
        expect(component.isHintVisible).toBeFalsy();

        component.showHint();

        expect(component.isHintVisible).toBeTruthy();
    });

    it('should set isHintVisible false', () => {
        component.isHintVisible = true;

        component.hideHint();

        expect(component.isHintVisible).toBeFalsy();
    });

});
