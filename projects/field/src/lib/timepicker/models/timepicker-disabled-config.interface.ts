import { DateTime } from 'luxon';

import { TimepickerPeriods } from './timepicker-periods.enum';


export interface TimepickerDisabledConfig {
    format: number;
    max: DateTime;
    min: DateTime;
    period?: TimepickerPeriods;
}
