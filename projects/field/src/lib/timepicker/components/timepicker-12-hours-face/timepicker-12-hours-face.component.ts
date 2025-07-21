import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { TimepickerPeriods } from '../../models/timepicker-periods.enum';
import { TimepickerUtils } from '../../utils/timepicker.utils';
import { TimepickerHoursFaceDirective } from '../timepicker-hours-face/timepicker-hours-face.directive';

@Component({
    selector: 'timepicker-12-hours-face',
    templateUrl: 'timepicker-12-hours-face.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class Timepicker12HoursFaceComponent extends TimepickerHoursFaceDirective implements OnChanges {

    @Input() period: TimepickerPeriods;

    constructor() {
        super();
        this.format = 12;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.period && changes.period.currentValue) {
            this.hoursList = TimepickerUtils.disableHours(this.hoursList, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }
}
