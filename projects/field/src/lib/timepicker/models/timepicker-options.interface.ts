import { LocaleOptions } from 'luxon';

export interface TimepickerOptions extends LocaleOptions {
  format?: number;
  locale?: string;
}
