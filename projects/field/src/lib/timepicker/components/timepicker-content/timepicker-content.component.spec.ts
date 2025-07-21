import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimepickerContentComponent } from './timepicker-content.component';

describe('TimepickerContentComponent', () => {
    let component: TimepickerContentComponent;
    let fixture: ComponentFixture<TimepickerContentComponent>;

    beforeEach(async() => {
        TestBed.configureTestingModule({
            declarations: [TimepickerContentComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TimepickerContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
