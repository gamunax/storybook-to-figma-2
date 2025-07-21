import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ButtonComponent, ButtonSizings, ButtonVariants, Radii } from 'atlas-button';
import { IconSizes } from 'atlas-icon';
import { merge, of as observableOf, Subscription } from 'rxjs';

import { DatepickerIntl } from './datepicker-intl';
import { DatepickerControl, DatepickerPanel } from './datepicker.component';

/**
 * @ignore
 */
@Component({
  selector: 'datepicker-toggle',
  templateUrl: './datepicker-toggle.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'datepicker-toggle',
    // Always set the tabindex to -1 so that it doesn't overlap with any custom tabindex the
    // consumer may have provided, while still being able to receive focus.
    '[attr.tabindex]': 'disabled ? null : -1',
    '[class.datepicker-toggle-active]': 'datepicker && datepicker.opened',
    // Used by the test harness to tie this toggle to its datepicker.
    '[attr.data-mat-calendar]': 'datepicker ? datepicker.id : null',
  },
  exportAs: 'DatepickerToggle',
})
export class DatepickerToggleComponent<D> implements AfterContentInit, OnChanges, OnDestroy {
  private _stateChanges = Subscription.EMPTY;

  /** Datepicker instance that the button will toggle. */
  @Input() datepicker: DatepickerPanel<DatepickerControl<any>, D>;

  /** Tabindex for the toggle. */
  @Input() tabIndex: number | null;

  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string;

  /** Whether the toggle button is disabled. */
  @Input()
  get disabled(): boolean {
    if (this._disabled === undefined && this.datepicker) {
      return this.datepicker.disabled;
    }

    return !!this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }
  private _disabled: boolean;

  @Input()
  get iconColor(): string { return this._iconColor; }
  set iconColor(color: string) {
    this._iconColor = color;
  }
  private _iconColor = 'primary';

  /** Underlying button element. */
  @ViewChild('button') _button: ButtonComponent;
  
  /** @internal */
  _radii: Radii = Radii.rounded;
  /** @internal */
  _buttonSize: ButtonSizings = ButtonSizings.xsmall;
  /** @internal */
  _iconSize: IconSizes = IconSizes.medium;
  /** @internal */
  _buttonVariant: ButtonVariants = ButtonVariants.text;
  
  constructor(
    public _intl: DatepickerIntl,
    private _changeDetectorRef: ChangeDetectorRef,
    @Attribute('tabindex') defaultTabIndex: string,
  ) {
    const parsedTabIndex = Number(defaultTabIndex);
    this.tabIndex = (parsedTabIndex || parsedTabIndex === 0) ? parsedTabIndex : null;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datepicker']) {
      this._watchStateChanges();
    }
  }

  ngOnDestroy() {
    this._stateChanges.unsubscribe();
  }

  ngAfterContentInit(): void {
    this._watchStateChanges();
  }

  _open(event: Event): void {
    if (this.datepicker && !this.disabled) {
      this.datepicker.open();
      event.stopPropagation();
    }
  }

  private _watchStateChanges() {
    const datepickerStateChanged = this.datepicker ? this.datepicker.stateChanges.asObservable() : observableOf();
    const inputStateChanged = this.datepicker && this.datepicker.datepickerInput ?
        this.datepicker.datepickerInput.stateChanges : observableOf();
    const datepickerToggled = this.datepicker ?
        merge(this.datepicker.openedStream, this.datepicker.closedStream) :
        observableOf();

    this._stateChanges.unsubscribe();
    this._stateChanges = merge(
      this._intl.changes,
      datepickerStateChanged,
      inputStateChanged,
      datepickerToggled
    ).subscribe(() => this._changeDetectorRef.markForCheck());
  }
}
