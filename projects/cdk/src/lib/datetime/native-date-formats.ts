/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {DateFormats} from './date-formats';


export const NATIVE_DATE_FORMATS: DateFormats = {
  parse: {
    dateInput: null,
  },
  display: {
    dateInput: {year: 'numeric', month: '2-digit', day: '2-digit'},
    monthYearLabel: {year: 'numeric', month: 'short'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
  }
};
