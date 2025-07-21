import { AfterContentInit, ChangeDetectionStrategy, Component } from '@angular/core';

import { TimepickerUtils } from '../../utils/timepicker.utils';
import { TimepickerHoursFaceDirective } from '../timepicker-hours-face/timepicker-hours-face.directive';

@Component({
    selector: 'timepicker-24-hours-face',
    templateUrl: 'timepicker-24-hours-face.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Timepicker24HoursFaceComponent extends TimepickerHoursFaceDirective implements AfterContentInit {

    constructor() {
        super();
        this.format = 24;
    }

    ngAfterContentInit() {
        this.hoursList = TimepickerUtils.disableHours(this.hoursList, {
            min: this.minTime,
            max: this.maxTime,
            format: this.format
        });
    }
}
