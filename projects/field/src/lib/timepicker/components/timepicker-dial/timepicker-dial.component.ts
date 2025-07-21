import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    TemplateRef,
} from '@angular/core';
import { DateTime, Info } from 'luxon';

import { TimepickerClockFace } from '../../models/timepicker-clock-face.interface';
import { TimepickerPeriods } from '../../models/timepicker-periods.enum';
import { TimepickerUnits } from '../../models/timepicker-units.enum';
import { TIMEPICKER_LOCALE } from '../../tokens/timepicker-time-locale.token';
import { TimepickerUtils } from '../../utils/timepicker.utils';

@Component({
    selector: 'timepicker-dial',
    templateUrl: 'timepicker-dial.component.html',
    styleUrls: ['timepicker-dial.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimepickerDialComponent implements OnChanges {

    @Input() activeTimeUnit: TimepickerUnits;

    @Input()
    set color(newValue: any) {
        this._color = newValue;
    }

    get color(): any {
        return this._color;
    }

    @Input() editableHintTmpl: TemplateRef<Node>;
    @Input() format: number;
    @Input() hour: string;
    @Output() hourChanged = new EventEmitter<TimepickerClockFace>();

    hours: TimepickerClockFace[];
    @Input() hoursOnly: boolean;
    @Input() isEditable: boolean;

    isHintVisible: boolean;
    @Input() maxTime: DateTime;
    meridiems: string[];
    @Input() minTime: DateTime;
    @Input() minute: string;
    @Output() minuteChanged = new EventEmitter<TimepickerClockFace>();
    minutes: TimepickerClockFace[];
    @Input() minutesGap: number;
    @Input() period: TimepickerPeriods;

    @Output() periodChanged = new EventEmitter<TimepickerPeriods>();

    timeUnit = TimepickerUnits;
    @Output() timeUnitChanged = new EventEmitter<TimepickerUnits>();

    private _color: any = 'primary';

    constructor(@Inject(TIMEPICKER_LOCALE) private _locale: string) {
        this.meridiems = Info.meridiems({locale: _locale});
    }

    changeHour(hour: TimepickerClockFace): void {
        this.hourChanged.next(hour);
    }

    changeMinute(minute: TimepickerClockFace): void {
        this.minuteChanged.next(minute);
    }

    changePeriod(period: TimepickerPeriods): void {
        this.periodChanged.next(period);
    }

    changeTimeUnit(unit: TimepickerUnits): void {
        this.timeUnitChanged.next(unit);
    }

    hideHint(): void {
        this.isHintVisible = false;
    }

    ngOnChanges(changes: SimpleChanges) {
        const periodChanged = changes.period && changes.period.currentValue;
        if (periodChanged || changes.format && changes.format.currentValue) {
            const hours = TimepickerUtils.getHours(this.format);

            this.hours = TimepickerUtils.disableHours(hours, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
        if (periodChanged || changes.hour && changes.hour.currentValue) {
            const minutes = TimepickerUtils.getMinutes(this.minutesGap);

            this.minutes = TimepickerUtils.disableMinutes(minutes, +this.hour, {
                min: this.minTime,
                max: this.maxTime,
                format: this.format,
                period: this.period
            });
        }
    }

    showHint(): void {
        this.isHintVisible = true;
    }
}
