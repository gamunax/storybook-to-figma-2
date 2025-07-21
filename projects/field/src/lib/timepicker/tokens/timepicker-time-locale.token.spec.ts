import { Injector } from '@angular/core';

import { TIMEPICKER_LOCALE } from './timepicker-time-locale.token';

describe("TimeLocaleToken", () => {

    it("should return provided locale", () => {
        const locale = "en-GB";
        const injector = Injector.create({providers: [{provide: TIMEPICKER_LOCALE, useValue: locale}]});
        const actual = injector.get(TIMEPICKER_LOCALE);

        expect(actual).toBe(locale);
    });
});
