import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { getSupportedInputTypes, Platform } from '@angular/cdk/platform';
import { AutofillMonitor } from '@angular/cdk/text-field';
import {
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  Inject,
  Directive,
  InjectionToken,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { HaloFormFieldControl } from './field.control';
import { UtilsService } from './utils.service';

/**
 * Token used to define how to get and set values in the input.
 * When none is provided the defaut `HTMLInputElement` is used.
 */
export const HALO_INPUT_VALUE_ACCESSOR = new InjectionToken<{value: any}>(
  'HALO_INPUT_VALUE_ACCESSOR',
);

/**
 * Input types that are not supported by this directive.
 */
const INPUT_INVALID_TYPES = [
  'button',
  'checkbox',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit',
];

let nextUniqueId = 0;

/**
 * Directive used to support text inputs.
 * Other types like textareas can be supported in the future.
 */
@Directive({
  selector: `input[atlasInput], textarea[atlasInput]`,
  providers: [{provide: HaloFormFieldControl, useExisting: AtlasInput}],
  host: {
    '[disabled]': 'disabled',
    '[required]': 'required',
    '[attr.readonly]': 'readonly ? true : null',
    '[attr.aria-invalid]': 'ngControl?.invalid',
    '[attr.aria-required]': 'required.toString()',
    '[attr.tabindex]': 'tabindex',
  },
  exportAs: 'atlasInput',
})
export class AtlasInput implements HaloFormFieldControl<any>, OnInit, OnChanges, OnDestroy {

   /** Aria label of input. */
   @Input('aria-label') ariaLabel = '';

   /** Tab index of input. */
   @Input('tabindex') tabindex: number = 0;
  
  protected _uid = `input-${nextUniqueId++}`;
  private _inputValueAccessor: {value: any};
  private _destroyed$ = new Subject<void>();
  readonly _stateChanges$: Subject<void> = new Subject<void>();
  public get stateChanges$(): Observable<void> {
    return this._stateChanges$.asObservable();
  }
  focused = false;
  autofilled = false;

  protected _neverEmptyInputTypes = [
    'date',
    'datetime',
    'datetime-local',
    'month',
    'time',
    'week'
  ].filter(t => getSupportedInputTypes().has(t));

  @HostBinding('attr.id')
  /**
   * The id of the input field.
   */
  @Input()
  get id(): string { return this._id; }
  set id(value: string) { this._id = value || this._uid; }
  protected _id!: string;

  
  @HostBinding('attr.placeholder')
  /**
   * The placeholder text of the input field.
   */
  @Input() placeholder!: string;

  /**
   * Specifies if the input is disabled.
   */
  @Input()
  get disabled(): boolean {
    if (this.ngControl && this.ngControl.disabled !== null) {
      return this.ngControl.disabled;
    }
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    if (this.focused) {
      this.focused = false;
      this._stateChanges$.next();
    }
  }
  protected _disabled = false;

  /**
   * Specifies if the input is required.
   */
  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean | string) { this._required = coerceBooleanProperty(value); }  protected _required = false;

  /**
   * Type of the input.
   * e.g. text.
   * It throws an error if the type is not supported.
   */
  @Input()
  get type(): string { return this._type; }
  set type(value: string) {
    this._type = value || 'text';
    this._validateType();
    if (!this._isTextarea() && getSupportedInputTypes().has(this._type)) {
      (this._elementRef.nativeElement as HTMLInputElement).type = this._type;
    }
  }
  protected _type = 'text';

  /**
   * The value of the input field.
   */
  @Input()
  get value(): string { return this._inputValueAccessor.value; }
  set value(value: string) {
    if (value !== this.value) {
      this._inputValueAccessor.value = value;
      this._stateChanges$.next();
    }
  }

  /**
   * Specifies if the input is readonly.
   */
  @Input()
  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
  }
  private _readonly = false;

  /**
    This is a noop function and is used to let Angular know whenever the value changes.
    Angular will run a new change detection each time the `input` event has been dispatched.
    It's necessary that Angular recognizes the value change, because when floatingLabel
    is set to false and Angular forms aren't used, the placeholder won't recognize the
    value changes and will not disappear.
    Listening to the input event wouldn't be necessary when the input is using the
    FormsModule or ReactiveFormsModule, because Angular forms also listens to input events.
   */
  @HostListener('input')
  onInput() {}

  constructor(
    protected _elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    protected _platform: Platform,
    @Optional() @Self() public ngControl: NgControl,
    @Optional() @Self() @Inject(HALO_INPUT_VALUE_ACCESSOR) inputValueAccessor: any,
    private _autofillMonitor: AutofillMonitor,
    private _utilService: UtilsService
  ) {
    const element = this._elementRef.nativeElement;
    // This is needed to force the setter to set an id when an id was not specified.
    this.id = this.id;
    this._inputValueAccessor = inputValueAccessor || element;
  }

  /**
   * @internal
   */
  ngOnInit() {
    if (this._platform.isBrowser) {
      this._autofillMonitor
        .monitor(this._elementRef.nativeElement)
        .pipe(
          takeUntil(this._destroyed$),
          tap(event => {
            this.autofilled = event.isAutofilled;
            this._stateChanges$.next();
          }),
        )
        .subscribe();
    }
    this._utilService.setTypeofElem(this._elementRef.nativeElement.nodeName.toLowerCase())
  }

  /**
   *  @internal 
   */
  ngOnChanges() {
    this._stateChanges$.next();
  }

  /**
   * @internal
   */
  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
    this._stateChanges$.complete();
    if (this._platform.isBrowser) {
      this._autofillMonitor.stopMonitoring(this._elementRef.nativeElement);
    }
  }

  /**
   * Checks whether the input type is one of the types that are never empty.
   */
  protected _isNeverEmpty() {
    return this._neverEmptyInputTypes.indexOf(this._type) > -1;
  }

  /**
   * Checks whether the input is invalid based on the native validation.
   */
  protected _isBadInput() {
    // The `validity` property won't be present on platform-server.
    const validity = (this._elementRef.nativeElement as HTMLInputElement).validity;
    return validity && validity.badInput;
  }

  /**
   * Returns true if the field is empty, false if not.
   */
  get empty(): boolean {
    return (
      !this._isNeverEmpty() &&
      !this._elementRef.nativeElement.value &&
      !this._isBadInput() &&
      !this.autofilled
    );
  }

  /**
   * It focuses the field.
   * @param options Optional focus options
   */
  public focus(options?: FocusOptions): void {
    this._elementRef.nativeElement.focus(options);
  }

  @HostListener('focus', ['true'])
  @HostListener('blur', ['false'])
  /**
   * Callback for the cases where the focused state of the input changes.
   */
  _focusChanged(isFocused: boolean) {
    if (isFocused !== this.focused && (!this.readonly || !isFocused)) {
      this.focused = isFocused;
      this._stateChanges$.next();
    }
  }

  /**
   * Determines if the component host is a textarea.
   */
  _isTextarea() {
    return this._elementRef.nativeElement.nodeName.toLowerCase() === 'textarea';
  }

  /**
   * Make sure the input is a supported type.
   * Throws an error if not.
   */
  protected _validateType() {
    if (INPUT_INVALID_TYPES.indexOf(this._type) > -1) {
      throw Error(`Input type "${this.type}" isn't supported by atlasInput.`);
    }
  }

  /**
   * Focus the field when the container is clicked.
   */
  containerClick() {
    if (!this.focused) {
      this.focus();
    }
  }
}
