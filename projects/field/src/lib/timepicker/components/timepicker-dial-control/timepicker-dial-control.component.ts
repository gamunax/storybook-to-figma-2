import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output } from '@angular/core';

import { TimepickerClockFace } from '../../models/timepicker-clock-face.interface';
import { TimepickerUnits } from '../../models/timepicker-units.enum';
import { TimepickerParserPipe } from '../../pipes/timepicker-parser.pipe';
import { TimepickerUtils } from '../../utils/timepicker.utils';

function retainSelection() {
    this.selectionStart = this.selectionEnd;
}

@Component({
    selector: 'timepicker-dial-control',
    templateUrl: 'timepicker-dial-control.component.html',
    styleUrls: ['timepicker-dial-control.component.scss'],
    providers: [TimepickerParserPipe]
})
export class TimepickerDialControlComponent implements AfterViewInit, OnDestroy {

    private get _selectedTime(): TimepickerClockFace {
        if (!!this.time) {
            return this.timeList.find(t => t.time === +this.time);
        }
        return undefined
    }

    @Input()
    disabled: boolean;

    @Output()
    focused = new EventEmitter<void>();

    @Input()
    isActive: boolean;

    @Input()
    isEditable: boolean;

    @Input()
    minutesGap: number;

    previousTime: number | string;

    @Input()
    time: string;

    @Output()
    timeChanged = new EventEmitter<TimepickerClockFace>();

    @Input()
    timeList: TimepickerClockFace[];

    @Input()
    timeUnit: TimepickerUnits;

    @Output()
    timeUnitChanged = new EventEmitter<TimepickerUnits>();

    @Output()
    unfocused = new EventEmitter<void>();

    constructor(private _elRef: ElementRef, private _timeParserPipe: TimepickerParserPipe) {
    }

    changeTimeByKeyboard(e: any): void {
        const char = String.fromCharCode(e.keyCode);

        if (isTimeDisabledToChange(this.time, char, this.timeList)) {
            e.preventDefault();
        }
    }

    ngAfterViewInit(): void {
        this._elRef.nativeElement.querySelector('input').addEventListener('select', retainSelection, false);
    }

    ngOnDestroy(): void {
        this._elRef.nativeElement.querySelector('input').removeEventListener('select', retainSelection);
    }

    onKeydown(e: any): void {
        if (!TimepickerUtils.isDigit(e)) {
            e.preventDefault();
        }
        else {
            this._changeTimeByArrow(e.keyCode);
        }
    }

    onModelChange(value: string): void {
        this.time = this._timeParserPipe.transform(value, this.timeUnit);
    }

    saveTimeAndChangeTimeUnit(event: FocusEvent, unit: TimepickerUnits): void {
        event.preventDefault();
        this.previousTime = this.time;
        this.timeUnitChanged.next(unit);
        this.focused.next();
    }

    updateTime(): void {
        if (this._selectedTime) {
            this.timeChanged.next(this._selectedTime);
            this.previousTime = this._selectedTime.time;
        }
    }

    private _addTime(amount: number): string {
        return `0${+this.time + amount}`.substr(-2);
    }

    private _changeTimeByArrow(keyCode: number): void {
        let time: string;

        // arrow up
        if (keyCode === 38) {
            time = this._addTime(this.minutesGap || 1);
        }
        // arrow down
        else if (keyCode === 40) {
            time = this._addTime(-1 * (this.minutesGap || 1));
        }

        if (!isTimeUnavailable(time, this.timeList)) {
            this.time = time;
            this.updateTime();
        }
    }

}

function isTimeDisabledToChange(currentTime: string, nextTime: string, timeList: TimepickerClockFace[]): boolean {
    const isNumber = /\d/.test(nextTime);

    if (isNumber) {
        const time = currentTime + nextTime;

        return isTimeUnavailable(time, timeList);
    }

    return false;
}

function isTimeUnavailable(time: string, timeList: TimepickerClockFace[]): boolean {
    const selectedTime = timeList.find(value => value.time === +time);

    return !selectedTime || (selectedTime && selectedTime.disabled);
}
