/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {UntypedFormControl, FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import {Subject} from 'rxjs';
import {ErrorStateMatcher} from '../error/error-options';
import {Constructor} from './constructor';


/** @docs-private */
export interface CanUpdateErrorState {
  readonly stateChanges: Subject<void>;
  errorState: boolean;
  errorStateMatcher: ErrorStateMatcher;
  updateErrorState(): void;
}

/** @docs-private */
export type CanUpdateErrorStateCtor = Constructor<CanUpdateErrorState>;

/** @docs-private */
export interface HasErrorState {
  _parentFormGroup: FormGroupDirective;
  _parentForm: NgForm;
  _defaultErrorStateMatcher: ErrorStateMatcher;
  ngControl: NgControl;
}

/**
 * Mixin to augment a directive with updateErrorState method.
 * For component with `errorState` and need to update `errorState`.
 */
export function mixinErrorState<T extends Constructor<HasErrorState>>(base: T)
: CanUpdateErrorStateCtor & T {
  return class extends base {
    /** Whether the component is in an error state. */
    errorState = false;

    /**
     * Stream that emits whenever the state of the input changes such that the wrapping
     * `ControlComponent` needs to run change detection.
     */
    readonly stateChanges = new Subject<void>();

    errorStateMatcher: ErrorStateMatcher;

    updateErrorState() {
      const oldState = this.errorState;
      const parent = this._parentFormGroup || this._parentForm;
      const matcher = this.errorStateMatcher || this._defaultErrorStateMatcher;
      const control = this.ngControl ? this.ngControl.control as UntypedFormControl : null;
      const newState = matcher.isErrorState(control, parent);

      if (newState !== oldState) {
        this.errorState = newState;
        this.stateChanges.next();
      }
    }

    constructor(...args: any[]) {
      super(...args);
    }
  };
}
