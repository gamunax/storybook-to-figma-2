/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationTriggerMetadata,
} from '@angular/animations';

/**
 * Animations used by the Material datepicker.
 * @docs-private
 * @ignore
 */
export const datepickerAnimations: {
  readonly transformPanel: AnimationTriggerMetadata;
  readonly fadeInCalendar: AnimationTriggerMetadata;
} = {
  /** Transforms the height of the datepicker's calendar. */
  transformPanel: trigger('transformPanel', [
    state('void', style({
      opacity: 0,
      transform: 'scale(1, 0.8)'
    })),
    transition('void => enter',  animate('120ms cubic-bezier(0, 0, 0.2, 1)', style({
      opacity: 1,
      transform: 'scale(1, 1)'
    }))),
    transition('* => void', animate('100ms linear', style({opacity: 0})))
  ]),

  /** Fades in the content of the calendar. */
  fadeInCalendar: trigger('fadeInCalendar', [
    state('void', style({opacity: 0})),
    state('enter', style({opacity: 1})),

    transition('void => *', animate('120ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'))
  ])
};
