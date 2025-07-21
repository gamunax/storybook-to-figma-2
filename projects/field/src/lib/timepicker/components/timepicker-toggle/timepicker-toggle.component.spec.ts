import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimepickerComponent } from '../timepicker/timepicker.component';
import { TimepickerToggleComponent } from './timepicker-toggle.component';

xdescribe("TimepickerToggleComponent", () => {
    let fixture: ComponentFixture<TimepickerToggleComponent>;
    let component: TimepickerToggleComponent;
    const timepicker = { disabled: true, open: () => null } as TimepickerComponent;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TimepickerToggleComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(TimepickerToggleComponent);

        component = fixture.componentInstance;
    });

    it("should set disabled state from timepicker if it did not set for toggle", () => {
        component.timepicker = timepicker;
        expect(component.disabled).toBeTruthy();
    });

    it("should set disabled state", () => {
        component.disabled = true;
        expect(component.disabled).toBeTruthy();
    });

    it("should override timepicker's disabled state", () => {
        component.timepicker = timepicker;
        component.disabled = false;
        expect(component.disabled).toBeFalsy();
    });

    it("should call open method for timepicker", () => {
        const spy = spyOn(timepicker, "open");
        component.timepicker = timepicker;
        component.open({
            stopPropagation: () => null,
            bubbles: false,
            cancelBubble: false,
            cancelable: false,
            composed: false,
            currentTarget: undefined,
            defaultPrevented: false,
            eventPhase: 0,
            isTrusted: false,
            returnValue: false,
            srcElement: undefined,
            target: undefined,
            timeStamp: 0,
            type: '',
            composedPath: function (): EventTarget[] {
                throw new Error('Function not implemented.');
            },
            initEvent: function (type: string, bubbles?: boolean, cancelable?: boolean): void {
                throw new Error('Function not implemented.');
            },
            preventDefault: function (): void {
                throw new Error('Function not implemented.');
            },
            stopImmediatePropagation: function (): void {
                throw new Error('Function not implemented.');
            },
            AT_TARGET: 2,
            BUBBLING_PHASE: 3,
            CAPTURING_PHASE: 1,
            NONE: 0
        });

        expect(spy).toHaveBeenCalled();
    });

    it("should not call open method for timepicker if no timepicker provided", () => {
        const spy = spyOn(timepicker, "open");
        component.open({
            stopPropagation: () => null,
            bubbles: false,
            cancelBubble: false,
            cancelable: false,
            composed: false,
            currentTarget: undefined,
            defaultPrevented: false,
            eventPhase: 0,
            isTrusted: false,
            returnValue: false,
            srcElement: undefined,
            target: undefined,
            timeStamp: 0,
            type: '',
            composedPath: function (): EventTarget[] {
                throw new Error('Function not implemented.');
            },
            initEvent: function (type: string, bubbles?: boolean, cancelable?: boolean): void {
                throw new Error('Function not implemented.');
            },
            preventDefault: function (): void {
                throw new Error('Function not implemented.');
            },
            stopImmediatePropagation: function (): void {
                throw new Error('Function not implemented.');
            },
            AT_TARGET: 2,
            BUBBLING_PHASE: 3,
            CAPTURING_PHASE: 1,
            NONE: 0
        });

        expect(spy).toHaveBeenCalledTimes(0);
    });
});
