import { InjectionToken } from '@angular/core';

import { TimepickerAdapter } from '../services/timepicker-adapter';


export const TIMEPICKER_LOCALE = new InjectionToken<string>("TimeLocale", {
    providedIn: "root",
    factory: () => TimepickerAdapter.defaultLocale
});
