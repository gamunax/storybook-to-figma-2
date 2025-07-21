import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Actions } from 'atlas-cdk';

import { TimepickerClockFace } from '../../../models/timepicker-clock-face.interface';
import { TimepickerUnits } from '../../../models/timepicker-units.enum';
import { TimepickerParserPipe } from '../../../pipes/timepicker-parser.pipe';
import { TimepickerUtils } from '../../../utils/timepicker.utils';

function concatTime(currentTime: string, nextTime: string): number {
    const isNumber = /\d/.test(nextTime);

    if (isNumber) {
        const time = currentTime + nextTime;

        return +time;
    }

    return 0;
}

@Component({
    selector: 'timepicker-time-control',
    templateUrl: 'timepicker-control.component.html',
    styleUrls: ['timepicker-control.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TimepickerParserPipe]
})

export class TimepickerControlComponent implements OnChanges {

    static nextId: number = 0;

    @Input()
    set color(newValue: Actions) {
        this._color = newValue;
    }

    get color(): Actions {
        return this._color;
    }

    @Input() disabled: boolean;

    @Input()
    set floatLabel(newValue: any) {
        this._floatLabel = newValue;
    }

    get floatLabel(): any {
        return this._floatLabel;
    }

    id: number = TimepickerControlComponent.nextId++;
    isFocused: boolean;
    @Input() max: number;
    @Input() min: number;
    @Input() placeholder: string;
    @Input() preventTyping: boolean;

    @Input() time: number;

    @Output() timeChanged = new EventEmitter<number>();
    @Input() timeList: TimepickerClockFace[];
    @Input() timeUnit: TimepickerUnits;

    private _color: Actions = Actions.primary;
    private _floatLabel: any = 'never';
    private _previousTime: number;

    constructor(private _timeParser: TimepickerParserPipe) {
    }

    changeTime(event: any): void {
        event.stopPropagation();

        const char = String.fromCharCode(event.keyCode);
        const time = concatTime(String(this.time), char);

        this._changeTimeIfValid(time);
    }

    decrease(): void {
        if (!this.disabled) {
            let previousTime = +this.time - 1;

            if (previousTime < this.min) {
                previousTime = this.max;
            }

            if (this._isSelectedTimeDisabled(previousTime)) {
                previousTime = this._getAvailableTime(previousTime, this._getPrevAvailableTime.bind(this));
            }

            if (previousTime !== this.time) {
                this.timeChanged.emit(previousTime);
            }
        }
    }

    increase(): void {
        if (!this.disabled) {
            let nextTime = +this.time + 1;

            if (nextTime > this.max) {
                nextTime = this.min;
            }

            if (this._isSelectedTimeDisabled(nextTime)) {
                nextTime = this._getAvailableTime(nextTime, this._getNextAvailableTime.bind(this));
            }

            if (nextTime !== this.time) {
                this.timeChanged.emit(nextTime);
            }
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.timeList && this.time != null) {
            if (this._isSelectedTimeDisabled(this.time)) {
                this._setAvailableTime();
            }
        }
    }

    onBlur(): void {
        this.isFocused = false;

        if (this._previousTime !== this.time) {
            this._changeTimeIfValid(+this.time);
        }
    }

    onFocus(): void {
        this.isFocused = true;
        this._previousTime = this.time;
    }

    onKeydown(event: any): void {
        event.stopPropagation();

        if (!TimepickerUtils.isDigit(event)) {
            event.preventDefault();
        }

        switch (event.key) {
            case 'ArrowUp':
                this.increase();
                break;
            case 'ArrowDown':
                this.decrease();
                break;
        }

        if (this.preventTyping && event.key !== 'Tab') {
            event.preventDefault();
        }
    }

    onModelChange(value: string): void {
        this.time = +this._timeParser.transform(value, this.timeUnit);
    }

    private _changeTimeIfValid(value: number | undefined) {
        if (!isNaN(value)) {
            this.time = value;

            if (this.time > this.max) {
                const timeString = String(value);
                this.time = +timeString[timeString.length - 1];
            }

            if (this.time < this.min) {
                this.time = this.min;
            }

            this.timeChanged.emit(this.time);
        }
    }

    private _getAvailableTime(currentTime: number, fn: (index: number) => number | undefined): number | undefined {
        const currentTimeIndex = this.timeList.findIndex(time => time.time === currentTime);
        const availableTime = fn(currentTimeIndex);

        return availableTime != null ? availableTime : this.time;
    }

    private _getNextAvailableTime(index: number): number | undefined {
        const timeCollection = this.timeList;
        const maxValue = timeCollection.length;
        for (let i = index + 1; i < maxValue; i++) {
            const time = timeCollection[i];
            if (!time.disabled) {
                return time.time;
            }
        }

        return undefined;
    }

    private _getPrevAvailableTime(index: number): number | undefined {
        for (let i = index; i >= 0; i--) {
            const time = this.timeList[i];
            if (!time.disabled) {
                return time.time;
            }
        }

        return undefined;
    }

    private _isSelectedTimeDisabled(time: number): boolean {
        return this.timeList.find((faceTime: TimepickerClockFace) => faceTime.time === time).disabled;
    }

    private _setAvailableTime(): void {
        this.time = this.timeList.find(t => !t.disabled).time;
        this.timeChanged.emit(this.time);
    }
}

