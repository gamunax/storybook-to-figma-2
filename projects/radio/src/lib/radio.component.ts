import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  HostBinding,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Actions, ThemingService, IconSizes, Colors } from 'atlas-cdk';
import { RadioIcons } from './radio.const';
import { config } from './radio.theming';
import { Subscription } from 'rxjs';

// Increasing integer for generating unique ids for radio components.
let nextUniqueId = 0;

export class RadioButtonChange {
  constructor(
    /** The BrighterRadioButtonComponent that emits the change event. */
    public source: RadioComponent,
    /** The value of the BrighterRadioButtonComponent. */
    public value: any
  ) {}
}
/**
 * @ignore
 */
@Component({
  selector: 'atlas-radio-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
  <div #radios *ngIf="_radios.length > 0" [class.atlas-radio-group--inline]="inline">
    <ng-content></ng-content>
  </div>
 `,
  styleUrls: ['./radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    },
  ],
  host: {
    role: 'radiogroup',
    class: 'brighter-radio-group',
    '[attr.aria-label]': 'ariaLabel'
  },
})
export class RadioGroupComponent implements AfterContentInit, ControlValueAccessor {
  /** Whether the `value` has been set to its initial value. */
  private _isInitialized = false;

  /** Set the radio buttons in the group to be inline */
  @Input() inline = false;

  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * Set the radio action 
   */
   @Input() action: Actions;

  /**
   * Set the radio color 
   */
   @Input() color: Colors = Colors.brand;

  /**
   * Event emitted when the group value changes.
   * Change events are only emitted when the value changes due to user interaction with
   * a radio button (the same behavior as `<input type-"radio">`).
   */
  @Output() readonly change: EventEmitter<RadioButtonChange> = new EventEmitter<RadioButtonChange>();

  /** Child radio buttons. */
  // tslint:disable-next-line: no-use-before-declare
  @ContentChildren(forwardRef(() => RadioComponent), { descendants: true })
  _radios: QueryList<RadioComponent>;

  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  @Input()
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
    this._updateRadioButtonNames();
  }
  /** The HTML name attribute applied to radio buttons in this group. */
  private _name = `brighter-radio-group-${nextUniqueId++}`;

  /** Whether the labels should appear after or before the radio-buttons. Defaults to 'after' */
  @Input()
  get labelPosition(): 'before' | 'after' {
    return this._labelPosition;
  }
  set labelPosition(v) {
    this._labelPosition = v === 'before' ? 'before' : 'after';
    this._markRadiosForCheck();
  }
  private _labelPosition: 'before' | 'after' = 'after';

  /**
   * Value for the radio-group. Should equal the value of the selected radio button if there is
   * a corresponding radio button with a matching value. If there is not such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
   */
  @Input()
  get value(): any {
    return this._value;
  }
  set value(newValue: any) {
    if (this._value !== newValue) {
      // Set this before proceeding to ensure no circular loop occurs with selection.
      this._value = newValue;

      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }
  }
  /** Selected value for the radio group. */
  private _value: any = null;

  /**
   * The currently selected radio button. If set to a new radio button, the radio group value
   * will be updated to match the new selected button.
   */
  @Input()
  get selected() {
    return this._selected;
  }
  set selected(selected) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._checkSelectedRadioButton();
  }
  /** The currently selected radio button. Should match value. */
  private _selected = null;

  /** Whether the radio group is disabled */
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = coerceBooleanProperty(value);
    this._markRadiosForCheck();
  }
  private _disabled = false;

  /** Whether the radio group is required */
  @Input()
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this._markRadiosForCheck();
  }
  private _required = false;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private themingService: ThemingService
  ) {
    this.themingService.applyConfig(config);
  }

  /**
   * @internal
   * The method to be called in order to update ngModel
   */
  _controlValueAccessorChangeFn: (value: any) => void = () => {};

  /**
   * onTouch function registered via registerOnTouch (ControlValueAccessor).
   * @docs-private
   */
  onTouched: () => any = () => {};

  /**
   * Initialize properties once content children are available.
   * This allows us to propagate relevant attributes to associated buttons.
   */
  ngAfterContentInit() {
    // Mark this component as initialized in AfterContentInit because the initial value can
    // possibly be set by NgModel on BrighterRadioGroupComponent, and it is possible that the OnInit of the
    // NgModel occurs *after* the OnInit of the BrighterRadioGroupComponent.
    this._isInitialized = true;
    this._radios?.forEach(child => { 
      child.setCurrentAction((this.action ? this.action : this.color));
    });
  }

  /**
   * @internal
   * Mark this group as being "touched" (for ngModel). Meant to be called by the contained
   * radio buttons upon their blur.
   */
  _touch() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  /** @internal */
  _checkSelectedRadioButton() {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }

  /** Update name attributes of each radio input */
  private _updateRadioButtonNames(): void {
    if (this._radios) {
      this._radios.forEach((radio) => {
        radio.name = this.name;
        radio._markForCheck();
      });
    }
  }

  /** Updates the `selected` radio button from the internal _value state. */
  private _updateSelectedRadioFromValue(): void {
    // If the value already matches the selected radio, do nothing.
    const isAlreadySelected = this._selected !== null && this._selected.value === this._value;

    if (this._radios && !isAlreadySelected) {
      this._selected = null;
      this._radios.forEach((radio) => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }

  /**
   * @internal
   * Dispatch change event with current selection and group value. */
  _emitChangeEvent(): void {
    if (this._isInitialized) {
      this.change.emit(new RadioButtonChange(this._selected, this._value));
    }
  }

  /** @internal */
  _markRadiosForCheck() {
    if (this._radios) {
      this._radios.forEach((radio) => radio._markForCheck());
    }
  }

  /**
   * Sets the model value. Implemented as part of ControlValueAccessor.
   * @param value
   */
  writeValue(value: any) {
    this.value = value;
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Registers a callback to be triggered when the model value changes.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnChange(fn: (value: any) => void) {
    this._controlValueAccessorChangeFn = fn;
  }

  /**
   * Registers a callback to be triggered when the control is touched.
   * Implemented as part of ControlValueAccessor.
   * @param fn Callback to be registered.
   */
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the control. Implemented as a part of ControlValueAccessor.
   * @param isDisabled Whether the control should be disabled.
   */
  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }

  clear() {
    this._radios.forEach(radio => radio.unCheck());
    this._changeDetectorRef.markForCheck();
  }
}
/**
 * Radio button is a form component that can be grouped and typically to select ONE Of a group of options.
 */
@Component({
  selector: 'atlas-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
  <label [for]="inputId" class="atlas-radio" [ngClass]="[labelTypography, labelCustomClass ? labelCustomClass : '']">
    <input #input  
      [name]="radioName" 
      [id]="inputId"
      [ngClass]="radioCustomClass ? radioCustomClass : ''"
      [checked]="checked"
      [disabled]="disabled"
      [attr.name]="name"
      [attr.value]="value"
      [required]="required"
      [attr.aria-label]="ariaLabel"
      [attr.tabindex]="tabIndex"
      [attr.aria-labelledby]="ariaLabelledby"
      [attr.aria-describedby]="ariaDescribedby"
      (change)="_onInputChange($event)"
      (focus)="_onInputFocus()"
      (blur)="_onInputBlur()"
      type="radio" />
    <span class="radio-container"
    [ngClass]="[(action ? action : color) ? 'radio-' + (action ? action : color) : '', disabled ? 'radio-disabled' : '']"> 
      <atlas-icon
      [icon]="currentIcon"
      [ngClass]="disabled ? 'radio-disabled' : ''"
      [size]="size"
      collection="user-interface-solid"
      role="img"></atlas-icon>
      <div *ngIf="!disabled" class="radio-hover-indicator"> </div>
     </span>
     <span [class.radio-disabled]="disabled" [class.radio-label]="!disabled">
      <ng-content></ng-content>
    </span>
  </label>`,
  styleUrls: ['./radio.component.scss'],
  host: {
    class: 'atlas-radio',
    '[attr.id]': 'id',
    '[attr.aria-labelledby]': 'null',
    '[attr.aria-describedby]': 'null',
    // Note: under normal conditions focus shouldn't land on this element, however it may be
    // programmatically set, for example inside of a focus trap, in this case we want to forward
    // the focus to the native element.
    '(focus)': '_onInputFocus()',
    '(blur)': '_onInputBlur()',
    '[class.radio-disabled]': 'disabled',
  },
})
export class RadioComponent implements OnInit, AfterViewInit, OnDestroy {
  /** @internal */
  private _uniqueId = `brighter-radio-button-${++nextUniqueId}`;

  /** The unique ID for the radio button. */
  @Input() radioId: string = this._uniqueId;

  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  @Input() name: string;

  /** Used to set the 'aria-label' attribute on the underlying input element. */
  @Input('aria-label') ariaLabel: string;

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  @Input('aria-labelledby') ariaLabelledby: string;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input('aria-describedby') ariaDescribedby: string;

  /** Tab index for radio */
  @Input('tabindex') tabindex: number = 0;
  /** @internal */
  @HostBinding('attr.tabindex') get tabIndex(): string {
    return this.disabled ? '-1' : `${this.tabindex}`;
  };
  
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * Set the radio action 
   */
  @Input() action: Actions;

  /**
   * Set the radio color 
  */
  @Input() color: Colors = Colors.brand;

  /** Create a custom class that gets added to the radio elem */
  @Input() radioCustomClass?: string = '';

  /** Create a custom class that gets added to the radio elem */
  @Input() labelCustomClass?: string = '';

  /** Create a custom class that gets added to the radio elem */
  @Input() labelTypography: string = 'typographyStyles-body-medium';

  /** Set the radio disabled color token */
  @Input() disabledColor = 'text-disabled';

  /** Set the radio name */
  @Input() radioName = 'haloRadio';

  /** Set the radio ID */
  @Input() size: IconSizes = IconSizes.medium;

  /** Sets the current icon */
  @Input() currentIcon = RadioIcons.default;

  /** Whether this radio button is checked. */
  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    const newCheckedState = coerceBooleanProperty(value);
    if (this._checked !== newCheckedState) {
      // Notify all radio buttons with the same name to un-check.
      this._radioDispatcher.notify(this.radioId, this.name);
      this._checked = newCheckedState;
      
      // is checked when radiogroup.value or element.checked
      if (newCheckedState && this.radioGroup && ((this.radioGroup.value === this.value) || this.radioGroup.value === null) ) {
        this.radioGroup.selected = this;
        this.currentIcon = RadioIcons.checked;
      } else if (!newCheckedState && this.radioGroup && this.radioGroup.value !== this.value) {
        // When unchecking the selected radio button, update the selected radio
        // property on the group.
        this.radioGroup.selected = null;
      }

      this._changeDetectorRef.markForCheck();
    }
  }
  private _checked = false;

  /** The value of this radio button. */
  @Input()
  get value(): any {
    return this._value;
  }
  set value(value: any) {
    if (this._value !== value) {
      this._value = value;
      if (this.radioGroup !== null) {
        if (!this.checked) {
          // Update checked when the value changed to match the radio group's value
          this.checked = this.radioGroup.value === value;
        }
        if (this.checked) {
          this.radioGroup.selected = this;
        }
      }
    }
  }
  private _value: any = null;

  /** Whether the label should appear after or before the radio button. Defaults to 'after' */
  @Input()
  get labelPosition(): 'before' | 'after' {
    return this._labelPosition || (this.radioGroup && this.radioGroup.labelPosition) || 'after';
  }
  set labelPosition(value) {
    this._labelPosition = value;
  }
  private _labelPosition: 'before' | 'after';

  /** Whether the radio button is disabled. */
  @Input()
  get disabled(): boolean {
    return this._disabled || (this.radioGroup !== null && this.radioGroup.disabled);
  }
  set disabled(value: boolean) {
    this._setDisabled(coerceBooleanProperty(value));
  }
  private _disabled: boolean;

  /** Whether the radio button is required. */
  @Input()
  get required(): boolean {
    return this._required || (this.radioGroup && this.radioGroup.required);
  }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
  }
  private _required: boolean;

  /** Whether the radio button is focused. */
  get focused(): boolean {
    return this._focused;
  }
  private _focused = false;
  private _subscription: Subscription = new Subscription();
  /**
   * Event emitted when the checked state of this radio button changes.
   * Change events are only emitted when the value changes due to user interaction with
   * the radio button (the same behavior as `<input type-"radio">`).
   */
  @Output() readonly change: EventEmitter<RadioButtonChange> = new EventEmitter<RadioButtonChange>();

  /** The parent radio group. May or may not be present. */
  radioGroup: RadioGroupComponent;

  /** ID of the native input element inside `<brighter-radio-button>` */
  get inputId(): string {
    return `${this.radioId || this._uniqueId}-input`;
  }

  /** The native `<input type=radio>` element */
  @ViewChild('input') _inputElement: ElementRef<HTMLInputElement>;

  constructor(
    private _elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private _focusMonitor: FocusMonitor,
    private _radioDispatcher: UniqueSelectionDispatcher,
    @Optional()
    @Host()
    // tslint:disable-next-line
    @Inject(RadioGroupComponent)
    radioGroup: RadioGroupComponent
  ) {
    this.radioGroup = radioGroup;

    this._removeUniqueSelectionListener = _radioDispatcher.listen((id: string, name: string) => {
      if (id !== this.radioId && name === this.name) {
        this.checked = false;
        this.currentIcon = RadioIcons.default; 
      }
    });
  }

  /** Focuses the radio button. */
  focus(options?: FocusOptions): void {
    this._focusMonitor.focusVia(this._inputElement, 'keyboard', options);
  }

  /**
   * @internal
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  _markForCheck() {
    // When group value changes, the button will not be notified. Use `markForCheck` to explicit
    // update radio button's status
    this._changeDetectorRef.markForCheck();
  }

  ngOnInit() {
    if (this.radioGroup) {
      // If the radio is inside a radio group, determine if it should be checked
      this.checked = this.radioGroup.value === this._value;
      // Copy name from parent radio group
      this.name = this.radioGroup.name;
    }
  }

  ngAfterViewInit() {
    this._subscription.add(this._focusMonitor.monitor(this._elementRef, true).subscribe((focusOrigin) => {
      if (!focusOrigin && this.radioGroup) {
        this.radioGroup._touch();
      }
    }));
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._elementRef);
    this._removeUniqueSelectionListener();
  }

  /** Unregister function for _radioDispatcher */
  private _removeUniqueSelectionListener: () => void = () => {};

  /** Dispatch change event with current value. */
  private _emitChangeEvent(): void {
    this.change.emit(new RadioButtonChange(this, this._value));
  }

  /** @internal */
  _onInputClick(event: Event) {
    // We have to stop propagation for click events on the visual hidden input element.
    // By default, when a user clicks on a label element, a generated click event will be
    // dispatched on the associated input element. Since we are using a label element as our
    // root container, the click event on the `radio-button` will be executed twice.
    // The real click event will bubble up, and the generated click event also tries to bubble up.
    // This will lead to multiple click events.
    // Preventing bubbling for the second event will solve that issue.
    event.stopPropagation();
  }

  /**
   * @internal
   * Triggered when the radio button received a click or the input recognized any change.
   * Clicking on a label element, will trigger a change event on the associated input.
   */
  _onInputChange(event: Event) {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();

    const groupValueChanged = this.radioGroup && this.value !== this.radioGroup.value;
    this.checked = true;
    this.currentIcon = RadioIcons.checked;
    this._emitChangeEvent();

    if (this.radioGroup) {
      this.radioGroup._controlValueAccessorChangeFn(this.value);
      if (groupValueChanged) {
        this.radioGroup._emitChangeEvent();
      }
    }
  }

  /**
   * @internal
   * Triggered when the radio button received a click or the input recognized any focus.
   */
  _onInputFocus() {
    if (!this.disabled) {
      this._inputElement.nativeElement.focus();
      this._focused = true;
    }
  }

  /**
   * @internal
   * Triggered when the radio button received a click or the input recognized any blur.
   */
  _onInputBlur() {
    if (!this.disabled) {
      this._inputElement.nativeElement.blur();
      this._focused = false;
    }
  }

  /** Sets the disabled state and marks for check if a change occurred. */
  private _setDisabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this._changeDetectorRef.markForCheck();
    }
  }

  /** @internal */
  setCurrentAction(color) {
    this.color = color;
    this._changeDetectorRef.detectChanges();
  }

  unCheck() {
    this.checked = false;
    this.currentIcon = RadioIcons.default;
    this._changeDetectorRef.detectChanges();
  }
}
