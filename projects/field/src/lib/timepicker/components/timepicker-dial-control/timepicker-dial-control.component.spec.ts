import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { DateTime } from 'luxon';

import { TimepickerUnits } from '../../models/timepicker-units.enum';
import { TimepickerParserPipe } from '../../pipes/timepicker-parser.pipe';
import { TimepickerTimeLocalizerPipe } from '../../pipes/timepicker-time-localizer.pipe';
import { TIMEPICKER_LOCALE } from '../../tokens/timepicker-time-locale.token';
import { TimepickerUtils } from '../../utils/timepicker.utils';
import { TimepickerDialControlComponent } from './timepicker-dial-control.component';

xdescribe("TimepickerDialControlComponent", () => {
    let fixture: ComponentFixture<TimepickerDialControlComponent>;
    let component: TimepickerDialControlComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [
                TimepickerDialControlComponent,
                TimepickerTimeLocalizerPipe,
                TimepickerParserPipe
            ],
            providers: [
                TimepickerParserPipe,
                {provide: TIMEPICKER_LOCALE, useValue: "ar-AE"}
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(TimepickerDialControlComponent);

        component = fixture.componentInstance;
    });

    it("should set current time to previous time, change time unit and emit focus event", async() => {
        let counter = 0;
        component.timeUnitChanged.subscribe(unit => expect(unit).toBe(TimepickerUnits.MINUTE));
        component.focused.subscribe(() => expect(++counter).toBe(1));

        component.time = "10";
        expect(component.previousTime).toBeUndefined();

        component.saveTimeAndChangeTimeUnit({preventDefault: () => null} as FocusEvent, TimepickerUnits.MINUTE);

        expect(component.previousTime).toBe("10");
    });

    it("should emit changed time if it exists and available", fakeAsync(() => {
        const timeMock = {time: 1, angle: 30, disabled: false};
        let time = null;
        component.timeList = [timeMock];
        component.timeChanged.subscribe(t => time = t);
        component.time = "1";
        component.updateTime();

        tick();
        expect(time).toEqual(timeMock);
        expect(component.previousTime).toBe(1);
    }));

    it("should not emit changed time if it does not exists", fakeAsync(() => {
        const timeMock = {time: 1, angle: 30};
        let time = null;
        component.timeList = [timeMock];
        component.timeChanged.subscribe(t => time = t);
        component.time = "";
        component.updateTime();

        tick();
        expect(time).toBeNull();
        expect(component.previousTime).toBeUndefined();
    }));

    describe("changeTimeByKeyboard", () => {
        let counter = 0;
        const event = {
            keyCode: 0,
            preventDefault: () => {
                counter++;
            },
            type: "keypress"
        } as KeyboardEvent;

        beforeEach(() => {
            counter = 0;
            component.timeList = TimepickerUtils.getHours(24);
        });

        it("should call preventDefault if no time exist or time disabled", () => {
            const NUM_1 = 49; // 1
            component.timeList = [{time: 1, angle: 30, disabled: true}];
            component.time = "1";


            component.changeTimeByKeyboard({...event, keyCode: NUM_1});
            expect(counter).toBe(1);

            component.time = "";
            component.changeTimeByKeyboard({...event, keyCode: NUM_1});
            expect(counter).toBe(2);
        });

        it("should not call preventDefault if provided value is not a number", () => {
            const charA = 65; // a
            component.time = "1";

            component.changeTimeByKeyboard({...event, keyCode: charA});
        });
    });

    describe("onKeyDown", () => {
        let counter = 0;
        const event = {
            keyCode: 0,
            preventDefault: () => {
                counter++;
            },
            type: "keydown"
        } as KeyboardEvent;

        beforeEach(() => {
            counter = 0;
            component.timeList = TimepickerUtils.getHours(24);
        });


        it("should call preventDefault when trying to write not a number", () => {
            const charA = 65; // a
            component.time = "1";

            component.onKeydown({...event, keyCode: charA});
            expect(counter).toBe(1);
            expect(component.time).toBe("1");
        });

        it("should do not change time if value other than number and letter is provided", () => {
            const arrowLeft = 37; // arrow_left
            component.time = "1";

            component.onKeydown({...event, keyCode: arrowLeft});
            expect(counter).toBe(0);
            expect(component.time).toBe("1");
        });

        it("should up time by 1", () => {
            const arrowUp = 38;
            component.time = "11";

            component.onKeydown({...event, keyCode: arrowUp});
            expect(component.time).toBe("12");
        });

        it("should down time by 1", () => {
            const arrowDown = 40;
            component.time = "11";

            component.onKeydown({...event, keyCode: arrowDown});
            expect(component.time).toBe("10");
        });

        it("should up time by 7", () => {
            const arrowUp = 38;
            component.time = "11";
            component.minutesGap = 7;

            component.onKeydown({...event, keyCode: arrowUp});
            expect(component.time).toBe("18");
        });

        it("should down time by 6", () => {
            const arrowDown = 40;
            component.time = "11";
            component.minutesGap = 6;

            component.onKeydown({...event, keyCode: arrowDown});
            expect(component.time).toBe("5");
        });
    });

    describe("onModelChange", () => {

        it("should parse value and set it to time property", () => {
            const unparsedTime = DateTime.fromObject({minute: 10}, {numberingSystem: "arab"}).toFormat("m");
            component.time = "5";
            component.timeUnit = TimepickerUnits.MINUTE;

            component.onModelChange(unparsedTime);

            expect(component.time).toBe(String(10));

        });
    });
});
