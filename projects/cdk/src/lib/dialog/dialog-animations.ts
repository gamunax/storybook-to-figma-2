/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

/**
 * Animations used by Dialog.
 * @docs-private
 */
export const dialogAnimations: {
  readonly dialogContainer: AnimationTriggerMetadata;
} = {
  /** Animation that is applied on the dialog container by default. */
  dialogContainer: trigger('dialogContainer', [
    // Note: The `enter` animation transitions to `transform: none`, because for some reason
    // specifying the transform explicitly, causes IE both to blur the dialog content and
    // decimate the animation performance. Leaving it as `none` solves both issues.
    state('void, exit', style({opacity: 0, transform: 'scale(0.7)'})),
    state('enter', style({transform: 'none'})),
    transition('* => enter', animate('150ms cubic-bezier(0, 0, 0.2, 1)',
        style({transform: 'none', opacity: 1}))),
    transition('* => void, * => exit',
        animate('75ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({opacity: 0}))),
  ])
};