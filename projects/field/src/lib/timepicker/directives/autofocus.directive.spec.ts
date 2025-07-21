import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TimepickerAutofocusDirective } from './timepicker-autofocus.directive';


@Component({
    template: `
		<button id="button">Push me</button>
		<input [timepickerAutofocus]="true">`
})
class TestComponent {
}

describe("AutofocusDirective", () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;
    let directive: TimepickerAutofocusDirective;

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            declarations: [TestComponent, TimepickerAutofocusDirective],
            schemas: [NO_ERRORS_SCHEMA]
        }).createComponent(TestComponent);

        component = fixture.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(TimepickerAutofocusDirective));
        directive = debugElement.injector.get(TimepickerAutofocusDirective);
        fixture.detectChanges();
    });

    it("should focus element on which directive is applied", fakeAsync(() => {
        expect(document.activeElement).toEqual(document.body);
        directive.ngOnChanges();
        tick();
        expect(document.activeElement).toEqual(debugElement.nativeElement);
    }));

    it("should not focus element on which directive is applied", fakeAsync(() => {
        directive.isFocusActive = false;
        expect(document.activeElement).toEqual(document.body);
        directive.ngOnChanges();
        tick();
        expect(document.activeElement).toEqual(document.body);
    }));
});
