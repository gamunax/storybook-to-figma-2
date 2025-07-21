import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Actions } from 'atlas-cdk';
import { DateTime } from 'luxon';

import { TimepickerClockFace } from '../../models/timepicker-clock-face.interface';
import { TimepickerUtils } from '../../utils/timepicker.utils';

@Directive({
    selector: '[timepickerHoursFace]'
})
export class TimepickerHoursFaceDirective {

    @Input()
    set color(newValue: Actions) {
        this._color = newValue;
    }
    get color(): Actions {
        return this._color;
    }

    @Input()
    set format(newValue: 12 | 24) {
        this._format = newValue;
        this.hoursList = TimepickerUtils.getHours(this._format);
    }

    get format(): 12 | 24 {
        return this._format;
    }

    @Output() hourChange = new EventEmitter<TimepickerClockFace>();
    @Output() hourSelected = new EventEmitter<number>();

    hoursList: TimepickerClockFace[] = [];
    @Input() maxTime: DateTime;
    @Input() minTime: DateTime;
    @Input() selectedHour: TimepickerClockFace;

    protected _color: Actions = Actions.primary;
    protected _format: 12 | 24 = 24;

    constructor() {
    }

    onTimeSelected(time: number): void {
        this.hourSelected.next(time);
    }
}
