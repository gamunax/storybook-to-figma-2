import { ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnInit, Optional, Output, Self, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Actions, ThemingService, SwitchSizings, Colors } from 'atlas-cdk';

import { config } from './switch.theming';

@Component({
  selector: 'atlas-switch',
  template: `
     <div [ngClass]="[
        'switch',
        disabled ? 'switch-disabled' : '']">
        <input  class="switch-input" type="checkbox" 
          [value]="value" 
          [attr.checked]="state" 
          [id]="id"
          [attr.aria-label]="ariaLabel"
          [attr.tabindex]="tabIndex"
        />
        <button (click)="changeState()" [disabled]="disabled" [ngClass]="[
          'switch-btn',
          'switch-btn-size-' + size,
          state ? 'switch-btn-color-' + (action ? action : color ) + '-on' : 'switch-btn-off',
          state ? 'switch-btn-on' : 'switch-btn-off',
          customClass,
          disabled ? 'switch-btn-disabled' : '']"></button>
        <span (click)="changeState()" [ngClass]="[
          'switch-label',
           typography]">
          <ng-content></ng-content>
        </span>
      </div>
  `,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.id]': 'externalId',
    '[attr.disabled]': 'disabled',
  }
})
export class SwitchComponent implements ControlValueAccessor, OnInit {
  @HostBinding('attr.id')
  externalId = '';

  /** @internal */
  private _ID = '';

  /** @internal */
  @Input()
  set id(value: string) {
    this._ID = value;
    this.externalId = null;
  }

  /** @internal */
  get id() {
    return this._ID;
  }
  /** Set the switch typography class */
  @Input() typography = 'typographyStyles-body-medium';
  /** Create a custom class that gets added to the switch elem */
  @Input() customClass?: string = '';
  /** Value of the switch */
  @Input('value') _value = false;
  /** Select the size of the switch */
  @Input() size: SwitchSizings = SwitchSizings.medium;
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead. 
   * Select the action color of the switch 
  */
  @Input() action: Actions;

  /** Select the color of the switch */
  @Input() color: Colors = Colors.neutral;
  /** Whether the switch is disabled. */
  @Input() disabled = false;
  /** Emitted when the switch is changed */
  @Output() onClick = new EventEmitter<boolean>();
  /** @internal */
  state: boolean = false;
  /** @internal */
  onChange: any = () => {};
  /** @internal */
  onTouched: any = () => {};

   /** Tab index of the component */
   @Input('tabindex') tabindex = 0;

   /** @internal */
   @HostBinding('attr.tabindex') get tabIndex(): string {
     return this.disabled ? '-1' : `${this.tabindex}`;
   };

  /** Aria label for switch. */
  @Input('aria-label') ariaLabel = '';
  

  constructor(
    private _themingService: ThemingService,
    @Optional() @Self() public ngControl: NgControl,
    private _cd: ChangeDetectorRef) {
    this._themingService.applyConfig(config);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.writeValue(this._value);
  }

   /** @internal */
  get value() {
    return this._value;
  }
 /** @internal */
  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  /** @internal */
  registerOnChange(fn) {
    this.onChange = fn;
  }
 /** @internal */
 writeValue(value) {
  if (value !== undefined && value !== null) {
    this.state = value;
  }
}

   /** @internal */
  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  /**
   * @internal
   * change state of switch ON / OFF
   *
  */
  changeState(): void {
    this.state = !this.state;
    this.onChange(this.state);
    this.onClick.emit(this.state);
  }

  @Input()
  set stateValue(val: boolean) {
    this.state = val;
    this.onChange(val);
  }
  
  get stateValue(): boolean {
    return this.state;
  }
}
