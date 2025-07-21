import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Actions } from 'atlas-cdk';
import { DateTime } from 'luxon';

import { TimepickerClockFace } from '../../models/timepicker-clock-face.interface';
import { TimepickerPeriods } from '../../models/timepicker-periods.enum';
import { TimepickerUnits } from '../../models/timepicker-units.enum';
import { TimepickerUtils } from '../../utils/timepicker.utils';

@Component({
    selector: 'timepicker-minutes-face',
    templateUrl: 'timepicker-minutes-face.component.html'
})
export class TimepickerMinutesFaceComponent implements OnChanges {

    @Input()
    set color(newValue: Actions) {
        this._color = newValue;
    }

    get color(): Actions {
        return this._color;
    }

    @Input() format: number;
    @Input() maxTime: DateTime;
    @Input() minTime: DateTime;

    @Output() minuteChange = new EventEmitter<TimepickerClockFace>();
    @Output() mouseUp = new EventEmitter<Event>();
    @Output() minuteSelected = new EventEmitter<number>();
    @Input() minutesGap: number;

    minutesList: TimepickerClockFace[] = [];
    @Input() period: TimepickerPeriods;
    @Input() selectedHour: number;

    @Input() selectedMinute: TimepickerClockFace;
    timeUnit = TimepickerUnits;

    private _color: Actions = Actions.primary;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.period && changes.period.currentValue) {
            const minutes = TimepickerUtils.getMinutes(this.minutesGap);
            this.minutesList = TimepickerUtils.disableMinutes(minutes, this.selectedHour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }

    onTimeSelected(time: number): void {
        this.minuteSelected.next(time);
    }

    onTimeChange(time: TimepickerClockFace): void {
        this.minuteChange.next(time);
    }
}

