import { Directive } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
 
@Directive()
export abstract class HaloFormFieldControl<T> {
  readonly id!: string;
  value!: T | null;
  readonly stateChanges$?: Observable<void>;
  readonly placeholder!: string;
  readonly ngControl!: NgControl | null;
  readonly focused!: boolean;
  readonly empty!: boolean;
  readonly required!: boolean;
  readonly disabled!: boolean;
  readonly readonly!: boolean;
  readonly controlType?: string;
  readonly autofilled?: boolean;
  abstract containerClick?(event: MouseEvent): void;
}
