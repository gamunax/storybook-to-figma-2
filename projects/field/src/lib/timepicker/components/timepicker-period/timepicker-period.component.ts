import { animate, sequence, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateTime } from 'luxon';

import { TimepickerClockFace } from '../../models/timepicker-clock-face.interface';
import { TimepickerPeriods } from '../../models/timepicker-periods.enum';
import { TimepickerUnits } from '../../models/timepicker-units.enum';
import { TimepickerUtils } from '../../utils/timepicker.utils';

@Component({
    selector: 'timepicker-period',
    templateUrl: 'timepicker-period.component.html',
    styleUrls: ['timepicker-period.component.scss'],
    animations: [
        trigger('scaleInOut', [
            transition(':enter', [
                style({transform: 'scale(0)'}),
                animate('.2s', style({transform: 'scale(1)'})),
                sequence([
                    animate('3s', style({opacity: 1})),
                    animate('.3s', style({opacity: 0}))
                ])
            ])
        ])
    ]
})
export class TimepickerPeriodComponent {

    @Input() activeTimeUnit: TimepickerUnits;
    @Input() format: number;
    @Input() hours: TimepickerClockFace[];
    isPeriodAvailable = true;
    @Input() maxTime: DateTime;
    @Input() meridiems: string[];
    @Input() minTime: DateTime;
    @Input() minutes: TimepickerClockFace[];
    @Output() periodChanged = new EventEmitter<TimepickerPeriods>();
    @Input() selectedHour: number | string;
    @Input() selectedPeriod: TimepickerPeriods;
    timePeriod = TimepickerPeriods;
    @Input() typography: string = 'typographyStyles-button-medium';

    animationDone(): void {
        this.isPeriodAvailable = true;
    }

    changePeriod(period: TimepickerPeriods): void {
        this.isPeriodAvailable = this._isSwitchPeriodAvailable(period);
        if (this.isPeriodAvailable) {
            this.periodChanged.next(period);
        }
    }

    private _getDisabledTimeByPeriod(period: TimepickerPeriods): TimepickerClockFace[] {
        switch (this.activeTimeUnit) {
            case TimepickerUnits.HOUR:
                return TimepickerUtils.disableHours(this.hours, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            case TimepickerUnits.MINUTE:
                return TimepickerUtils.disableMinutes(this.minutes, +this.selectedHour, {
                    min: this.minTime,
                    max: this.maxTime,
                    format: this.format,
                    period
                });
            default:
                throw new Error('no such TimepickerUnits');
        }
    }

    private _isSwitchPeriodAvailable(period: TimepickerPeriods): boolean {
        const time = this._getDisabledTimeByPeriod(period);

        return !time.every(t => t.disabled);
    }
}
