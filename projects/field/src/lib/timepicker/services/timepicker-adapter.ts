import { DateTime, LocaleOptions, NumberingSystem } from 'luxon';

import { TimepickerFormat } from '../models/timepicker-format.enum';
import { TimepickerOptions } from '../models/timepicker-options.interface';
import { TimepickerPeriods } from '../models/timepicker-periods.enum';

// @dynamic
export class TimepickerAdapter {
  static defaultFormat = 12;
  static defaultLocale = 'en-US';
  static defaultNumberingSistem: NumberingSystem = 'latn';

  /***
   *  Format hour according to time format (12 or 24)
   */
  static formatHour(
    currentHour: number,
    format: number,
    period: TimepickerPeriods
  ): number {
    if (format === 24) {
      return currentHour;
    }
    const hour =
      period === TimepickerPeriods.AM ? currentHour : currentHour + 12;

    if (period === TimepickerPeriods.AM && hour === 12) {
      return 0;
    } else if (period === TimepickerPeriods.PM && hour === 24) {
      return 12;
    }

    return hour;
  }

  static formatTime(time: string, opts: TimepickerOptions): string {
    if (!time) {
      return 'Invalid Time';
    }
    const { format } = opts;
    const parsedTime = TimepickerAdapter.parseTime(time, opts).setLocale(
      TimepickerAdapter.defaultLocale
    );

    if (format !== 24) {
      return parsedTime
        .toLocaleString({
          ...DateTime.TIME_SIMPLE,
          hour12: format !== 24,
        })
        .replace(/\u200E/g, '');
    }

    return parsedTime
      .toISOTime({
        includeOffset: false,
        suppressMilliseconds: true,
        suppressSeconds: true,
      })
      .replace(/\u200E/g, '');
  }

  static fromDateTimeToString(time: DateTime, format: number): string {
    const timeFormat =
      format === 24
        ? TimepickerFormat.TWENTY_FOUR
        : TimepickerFormat.TWELVE;

    return time
      .reconfigure({
        numberingSystem: TimepickerAdapter.defaultNumberingSistem,
        locale: TimepickerAdapter.defaultLocale,
      })
      .toFormat(timeFormat);
  }

  static isBetween(
    time: DateTime,
    before: DateTime,
    after: DateTime,
    unit: 'hour' | 'minute' = 'minute'
  ): boolean {
    if (unit === 'hour') {
      return (
        this.isSameOrBefore(time, after, unit) &&
        this.isSameOrAfter(time, before, unit)
      );
    }
    if (unit === 'minute') {
      return (
        this.isSameOrBefore(time, after) && this.isSameOrAfter(time, before)
      );
    }
    return false;
  }

  static isSameOrAfter(
    time: DateTime,
    compareWith: DateTime,
    unit: 'hour' | 'minute' = 'minute'
  ): boolean {
    if (unit === 'hour') {
      return time.hour >= compareWith.hour;
    }
    if (unit === 'minute') {
      return (
        time.hasSame(compareWith, unit) ||
        time.valueOf() > compareWith.valueOf()
      );
    }
    return false;
  }

  static isSameOrBefore(
    time: DateTime,
    compareWith: DateTime,
    unit: 'hour' | 'minute' = 'minute'
  ): boolean {
    if (unit === 'hour') {
      return time.hour <= compareWith.hour;
    }
    if (unit === 'minute') {
      return (
        time.hasSame(compareWith, unit) ||
        time.valueOf() <= compareWith.valueOf()
      );
    }
    return false;
  }

  static isTimeAvailable(
    time: string,
    min?: DateTime,
    max?: DateTime,
    granularity?: 'hour' | 'minute',
    minutesGap?: number | null,
    format?: number
  ): boolean {
    if (!time) {
      return false;
    }

    const convertedTime = this.parseTime(time, { format });
    const minutes = convertedTime.minute;

    if (minutesGap && minutes === minutes && minutes % minutesGap !== 0) {
      throw new Error(
        `Your minutes - ${minutes} doesn\'t match your minutesGap - ${minutesGap}`
      );
    }
    const isAfter =
      min && !max && this.isSameOrAfter(convertedTime, min, granularity);
    const isBefore =
      max && !min && this.isSameOrBefore(convertedTime, max, granularity);
    const between =
      min && max && this.isBetween(convertedTime, min, max, granularity);
    const isAvailable = !min && !max;

    return isAfter || isBefore || between || isAvailable;
  }

  static parseTime(time: string, opts: TimepickerOptions): DateTime {
    const {
      numberingSystem,
      locale,
    } = TimepickerAdapter._getLocaleOptionsByTime(time, opts);
    const isPeriodExist = time.split(' ').length === 2;
    const timeMask = isPeriodExist
      ? TimepickerFormat.TWELVE_SHORT
      : TimepickerFormat.TWENTY_FOUR_SHORT;

    return DateTime.fromFormat(time, timeMask, { numberingSystem, locale });
  }

  static toLocaleTimeString(
    time: string,
    opts: TimepickerOptions = {}
  ): string {
    const {
      format = TimepickerAdapter.defaultFormat,
      locale = TimepickerAdapter.defaultLocale,
    } = opts;
    const hourCycle = format === 24 ? 'h23' : 'h12';
    const timeMask =
      format === 24
        ? TimepickerFormat.TWENTY_FOUR_SHORT
        : TimepickerFormat.TWELVE_SHORT;

    return DateTime.fromFormat(time, timeMask)
      .setLocale(locale)
      .toLocaleString({
        ...DateTime.TIME_SIMPLE,
        //hourCycle, // TODO FIX THIS
      });
  }

  private static _getLocaleOptionsByTime(
    time: string,
    opts: TimepickerOptions
  ): LocaleOptions {
    const { numberingSystem, locale } = DateTime.local()
      .setLocale(opts.locale)
      .resolvedLocaleOptions();
    const localeConfig: LocaleOptions = {
      numberingSystem: numberingSystem as NumberingSystem,
      locale,
    };
    const defaultConfig: LocaleOptions = {
      numberingSystem: TimepickerAdapter.defaultNumberingSistem,
      locale: TimepickerAdapter.defaultLocale,
    };

    return isNaN(parseInt(time, 10)) ? localeConfig : defaultConfig;
  }
}
