import { Component, Input } from '@angular/core';

@Component({
    selector: 'timepicker-content',
    templateUrl: 'timepicker-content.component.html',
})
export class TimepickerContentComponent {

    @Input() appendToInput: boolean;
    @Input() inputElement: any;

}
