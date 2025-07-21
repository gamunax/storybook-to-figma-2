import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TimepickerTheme } from '../models/timepicker-theme.interface';
import { TimepickerThemeDirective } from './timepicker-theme.directive';


@Component({
    template: `
        <div [timepickerTheme]="darkTheme"></div>`
})
class TestComponent {
    darkTheme: TimepickerTheme = {
        container: {
            bodyBackgroundColor: "#424242",
        },
    };
}

describe("TimepickerThemDirective", () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TestComponent, TimepickerThemeDirective],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(TestComponent);

        component = fixture.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(TimepickerThemeDirective));
        fixture.detectChanges();
    });

    it("should set property", () => {
        const backgroundColor = debugElement.nativeElement.style.getPropertyValue("--body-background-color");
        expect(backgroundColor).toBe("#424242");
    });
});
