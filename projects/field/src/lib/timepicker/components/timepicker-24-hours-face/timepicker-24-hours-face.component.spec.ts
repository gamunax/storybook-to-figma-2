import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DateTime } from 'luxon';

import { TimepickerUtils } from '../../utils/timepicker.utils';
import { Timepicker24HoursFaceComponent } from './timepicker-24-hours-face.component';


describe("Timepicker24HoursFaceComponent", () => {
    let fixture: ComponentFixture<Timepicker24HoursFaceComponent>;
    let component: Timepicker24HoursFaceComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [Timepicker24HoursFaceComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(Timepicker24HoursFaceComponent);

        component = fixture.componentInstance;
    });

    it("should call disableHours", () => {
        const spy = spyOn(TimepickerUtils, "disableHours");
        const time = DateTime.fromJSDate(new Date());
        const format = 24;
        const hours = TimepickerUtils.getHours(format);

        component.minTime = time;
        component.maxTime = time;
        component.format = format;
        component.hoursList = hours;

        component.ngAfterContentInit();
        expect(spy).toHaveBeenCalledWith(hours, {min: time, max: time, format});
    });
});
