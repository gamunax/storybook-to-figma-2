// Import the core angular services.
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostBinding, Input, OnChanges, Optional, Output, Self, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { Actions, ThemingService, IconSizes, CheckboxIcons, Colors} from 'atlas-cdk';

import { config } from './checkbox.theming';

/**
 * Allow users to select one or more options or toggle an option on or off.
 */
@Component({
  selector: 'atlas-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
  <label [for]="checkboxId" class="atlas-checkbox" [ngClass]="[labelTypography, labelCustomClass ? labelCustomClass : '']">
    <input [name]="checkboxName" 
      [id]="checkboxId"
      [name]="checkboxName"
      [checked]="isChecked"
      [ngClass]="checkboxCustomClass ? checkboxCustomClass : ''"
      [disabled]="disabled"
      [value]="value"
      type="checkbox" 
      (change)="onCheckboxChange($event)"
      [attr.aria-label]="ariaLabel"
      [attr.tabindex]="tabIndex"
    />
    <span class="checkmark-container"
    [ngClass]="[action || color ? 'checkbox-' + (action ? action: color)  : '', disabled ? 'checkbox-disabled' : '']"> 
      <atlas-icon
      [ngClass]="disabled ? 'checkbox-disabled' : ''"
      [icon]="currentIcon"
      [size]="size"
      collection="system"
      role="img"></atlas-icon>
      <div *ngIf="!disabled" class="checkbox-hover-indicator"> </div>
     </span>
     <span #labelText [class.checkbox-label--disabled]="disabled">
      <ng-content></ng-content>
    </span>
  </label>`,
  styleUrls: ['./checkbox.component.scss'],
})

export class CheckboxComponent implements ControlValueAccessor, OnChanges, AfterViewInit {
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * Set the checkbox action 
   */
  @Input() action: Actions;

  /** Set the checkbox color */
  @Input() color: Colors = Colors.brand;

  /** Set the checkbox disabled */
  @Input() disabled = false;
  /** Create a custom class that gets added to the checkbox elem */
  @Input() checkboxCustomClass?: string = '';
  /** Create a custom class that gets added to the checkbox elem */
  @Input() labelCustomClass?: string = '';
  /** Create a custom class that gets added to the checkbox elem */
  @Input() labelTypography: string = 'typographyStyles-body-medium';
  // /** Set the checkbox disabled color token */
  // @Input() disabledColor = 'text-disabled';
  /** Set the checkbox ID */
  @Input() checkboxId = 'haloCheckbox';
  /** Set the checkbox ID */
  @Input() checkboxName = 'haloCheckbox';
  /** Set the checkbox ID */
  @Input() size: IconSizes = IconSizes.medium;
  /** Set the checkbox to checked */
  @Input() isChecked: boolean = false;
  /** @internal 
   * Sets the current icon 
   */
  currentIcon = CheckboxIcons.default;
  /** Sets the current value */
  @Input() value: string | undefined;
  /** Emitted when the checkbox changes */  
  @Output() onChange = new EventEmitter<Event>();

  onCheckChange: any = () => {};
  onTouch: any = () => {};

  _indeterminate = false;
  get indeterminate(): boolean {
    return this._indeterminate;
  }
  /** Sets checkbox to allow indeterminate state */
  @Input() set indeterminate(value: boolean) {
    this._indeterminate = value;
    if (value === true) {
      this.currentIcon = CheckboxIcons.indeterminate;
    } else {
      this.currentIcon = CheckboxIcons.default;
    }
  }

  /** @internal */
  @ViewChild('labelText') labelTextRef: ElementRef;

  /** @internal */
  @Input('aria-label') ariaLabel: string = '';

  /** @internal */
  @Input('tabindex') tabindex: number = 0;
  /** @internal */
  @HostBinding('attr.tabindex') get tabIndex(): string {
    return this.disabled ? '-1' : `${this.tabindex}`;
  };

  constructor(
    private themingService: ThemingService,
    @Optional() @Self() public ngControl: NgControl,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.themingService.applyConfig(config);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }
  /** @internal */
  writeValue(checked: boolean) {
    this.isChecked = checked;
  }

  /** @internal */
  onModelChange(e: boolean) {
    this.isChecked = e;
    this.onCheckChange(e);
  }

  /** @internal */
  registerOnChange(fn: any): void {
    this.onCheckChange = fn;
  }

  /** @internal */
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error('Method not implemented.');
  // }

  ngAfterViewInit() {
    this.ariaLabel = this.ariaLabel.length > 0 ? this.ariaLabel : this.labelTextRef.nativeElement.textContent.trim();
  }

  ngOnChanges(change) {
    if( change?.isChecked?.currentValue ) {
      this.currentIcon = CheckboxIcons.checked;
    } else {
      this.currentIcon = CheckboxIcons.default;
    }
    if (change?.indeterminate?.currentValue) {
      this.currentIcon = CheckboxIcons.indeterminate;
    }
  }

  public onCheckboxChange(event: Event) {
    if (!this.disabled) {
      this.indeterminate = false;
      if (this.isChecked) {
          this.isChecked = false;
          this.currentIcon = CheckboxIcons.default;
      } else if (!this.isChecked ) {
          this.isChecked = true;
          this.currentIcon = CheckboxIcons.checked;  
      }
      this.onModelChange(event.target['checked']);
      this.onChange.emit(event);
    }
  }

  public reset(): void {
    this.isChecked = false;
    this.currentIcon = CheckboxIcons.default;
    this.changeDetectorRef.detectChanges();
  }
}
