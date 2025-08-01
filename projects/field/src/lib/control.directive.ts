/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 *
 * Inspired by Angular Material
 */
 import {Observable} from 'rxjs';
 import {NgControl} from '@angular/forms';
 import {Directive} from '@angular/core';
 
 
 /** An interface which allows a control to work inside of a `Control`. */
 @Directive({
   selector: '[Control]'
 })
 export abstract class ControlDirective<T> {
   /** The value of the control. */
   value: T | null;
 
   /**
    * Stream that emits whenever the state of the control changes such that the parent `Control`
    * needs to run change detection.
    */
   readonly stateChanges: Observable<void>;
 
   /** The element ID for this control. */
   readonly id: string;
 
   /** The placeholder for this control. */
   readonly placeholder: string;
 
   /** Gets the NgControl for this control. */
   readonly ngControl: NgControl | null;
 
   /** Whether the control is focused. */
   readonly focused: boolean;
 
   /** Whether the control is empty. */
   readonly empty: boolean;
 
   /** Whether the control is required. */
   readonly required: boolean;
 
   /** Whether the control is disabled. */
   readonly disabled: boolean;
 
   /** Whether the control is readonly. */
   readonly readonly: boolean;
 
   /**
    * An optional name for the control type that can be used to distinguish `control` elements
    * based on their control type. The form field will add a class,
    * `control-type-{{controlType}}` to its root element.
    */
   readonly controlType?: string;
 
   /**
    * Whether the input is currently in an autofilled state. If property is not present on the
    * control it is assumed to be false.
    */
   readonly autofilled?: boolean;
 
   /** Handles a click on the control's container. */
   abstract onContainerClick(event: MouseEvent): void;
 }
 