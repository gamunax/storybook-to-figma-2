import { InjectionToken, Provider } from '@angular/core';

import { TimepickerConfig } from '../models/timepicker-config.interface';

export const TIMEPICKER_CONFIG = new InjectionToken<TimepickerConfig>("TIMEPICKER_CONFIG");

export function provideTimepickerOptions(config: TimepickerConfig): Provider[] {
    return [
        {provide: TIMEPICKER_CONFIG, useValue: config},
    ];
}
