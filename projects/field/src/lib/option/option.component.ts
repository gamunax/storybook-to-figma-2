import { FocusableOption, FocusOrigin } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { hasModifierKey } from '@angular/cdk/keycodes';
import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Actions, ThemingService } from 'atlas-cdk';
import { Subject, takeUntil, tap } from 'rxjs';

import { UtilsService } from '../utils.service';
import { config } from './option.theming';

let nextUniqueId = 0;

export class HaloOptionSelectionChange {
  constructor(
    /** Reference to the option that emitted the event. */
    public source: OptionComponent,
    /** Whether the change in the option's value was a result of a user action. */
    public isUserInput = false) { }
}

/**
 * Describes a parent component that manages a list of options.
 * Contains properties that the options can inherit.
 */
export interface HaloOptionParent {
  multiple?: boolean;
}

/**
 * Injection token used to provide the parent component to options.
 */
export const HALO_OPTION_PARENT_COMPONENT = new InjectionToken<HaloOptionParent>('HALO_OPTION_PARENT_COMPONENT');

@Component({
  selector: 'atlas-option',
  templateUrl: './option.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'option',
    '[attr.tabindex]': '_getTabIndex()',
    '[id]': 'id',
    '[attr.aria-selected]': '_getAriaSelected()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '(keydown)': '_handleKeydown($event)',
    '(click)': '_selectViaInteraction()',
    'class': 'option typographyStyles-body-medium',
  },
})
export class OptionComponent implements FocusableOption, AfterViewChecked, OnDestroy {
  @Input() id = `atlas-option-${nextUniqueId++}`;

  /** Whether the wrapping component is in multiple selection mode. */
  get multiple() { return this._parent && this._parent.multiple; }

  /** Whether or not the option is currently selected. */ 
  @Input() get selected(): boolean { return this._selected; }
  private _selected = false;
  /** Emits whenever the component is destroyed. */
  private readonly _destroyed$ = new Subject<void>();

  /**
   * Whether or not the option is currently active and ready to be selected.
   * An active option displays styles as if it is focused, but the
   * focus is actually retained somewhere else. This comes in handy
   * for components like autocomplete where focus must remain on the input.
   */
  get active(): boolean {
    return this._active;
  }
  private _active = false;

  /** The form value of the option. */
  @Input() value: any;

  /** The display value of the option. */
  @Input() displayValue: string;

  /** Whether the option is disabled. */
  @Input()
  get disabled() { return this._disabled; }
  set disabled(value: any) { this._disabled = coerceBooleanProperty(value); }
  private _disabled = false;

  /** Whether or not this option is the select all option. */
  @Input()
  get selectAll(): boolean { return this._selectAll; }
  set selectAll(value: boolean) {
    this._selectAll = coerceBooleanProperty(value);
  }
  private _selectAll = false;

  /** Set the option action */
  @Input() action: Actions = Actions.default;

  /** @set the imageIcon of option  backward compatibility*/
  @Input() imageIcon?: string;

  /** @set the label of option backward compatibility */
  @Input() label?: string;

  /** backward compatibility please update this with the new atlas functionality */
  @Input() selectedValue: string;

  /** Event emitted when the option is selected or deselected. */
  @Output() readonly selectionChange = new EventEmitter<HaloOptionSelectionChange>();

  /** Emits when the state of the option changes and any parents have to be notified. */
  readonly _stateChanges = new Subject<void>();

  private _mostRecentViewValue = '';

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _element: ElementRef<HTMLElement>,
    private _themingService: ThemingService,
    @Optional() @Inject(HALO_OPTION_PARENT_COMPONENT) private _parent: HaloOptionParent,
    private _utilsService: UtilsService,
  ) {
    this._themingService.applyConfig(config);

    this._utilsService.selectedAction$
    .pipe(
      takeUntil(this._destroyed$),
      tap((action) => {
        this._getHostElement().classList.remove(`option-${this.action}-selected`);
        this._getHostElement().classList.remove(`option-${this.action}-disabled`);
        this._getHostElement().classList.remove(`option-${this.action}-multiple`);
        this._getHostElement().classList.remove(`option-${this.action}-active`);
        this._getHostElement().classList.remove( `option-${this.action}-select-all`);
        this.action = action;
      }),
    )
    .subscribe();
  }


  ngAfterViewChecked() {
    // Since parent components could be using the option's label to display the selected values
    // (e.g. `atlas-select`) and they don't have a way of knowing if the option's label has changed
    // we have to check for changes in the DOM ourselves and dispatch an event. These checks are
    // relatively cheap, however we still limit them only to selected options in order to avoid
    // hitting the DOM too often.
    if (this._selected) {
      const viewValue = this.viewValue;

      if (viewValue !== this._mostRecentViewValue) {
        this._mostRecentViewValue = viewValue;
        this._stateChanges.next();
      }

     
    }

    this._selected ?  
      this._getHostElement().classList.add(`option-${this.action}-selected`) :
      this._getHostElement().classList.remove(`option-${this.action}-selected`);
      
    this._disabled ?  
      this._getHostElement().classList.add(`option-${this.action}-disabled`) :
      this._getHostElement().classList.remove(`option-${this.action}-disabled`);

    this.multiple ?  
      this._getHostElement().classList.add(`option-${this.action}-multiple`) :
      this._getHostElement().classList.remove(`option-${this.action}-multiple`);

    this._active ?  
      this._getHostElement().classList.add(`option-${this.action}-active`) :
      this._getHostElement().classList.remove(`option-${this.action}-active`);

    this.selectAll ?  
      this._getHostElement().classList.add( `option-${this.action}-select-all`) :
      this._getHostElement().classList.remove( `option-${this.action}-select-all`);
  }



  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
    this._stateChanges.complete();
  }

  /**
   * The displayed value of the option. It is necessary to show the selected option in the
   * select's trigger.
   */
  get viewValue(): string {
    return this.displayValue ?? (this._getHostElement().textContent || '').trim();
  }

  /** Selects the option. */
  select(): void {
    if (!this._selected) {
      this._selected = true;
      this._changeDetectorRef.markForCheck();
      // Emit selection changes if option is not the select all option
      if (!this._selectAll) {
        this._emitSelectionChangeEvent();
      }
    }
  }

  /** Deselects the option. */
  deselect(): void {
    if (this._selected) {
      this._selected = false;
      this._changeDetectorRef.markForCheck();
      // Emit selection changes if option is not the select all option
      if (!this._selectAll) {
        this._emitSelectionChangeEvent();
      }
    }
  }

  /**
   * @internal
   * `Selects the option while indicating the selection came from the user. Used to
   * determine if the select's view -> model callback should be invoked.`
   */
  _selectViaInteraction(): void {
    if (!this.disabled) {
      this._selected = this.multiple ? !this._selected : true;
      this._changeDetectorRef.markForCheck();
      this._emitSelectionChangeEvent(true);
    }
  }

  /** Emits the selection change event. */
  private _emitSelectionChangeEvent(isUserInput = false): void {
    this.selectionChange.emit(new HaloOptionSelectionChange(this, isUserInput));
  }

  /** Sets focus onto this option. */
  focus(_origin?: FocusOrigin, options?: FocusOptions): void {
    // Note that we aren't using `_origin`, but we need to keep it because some internal consumers
    // use `HaloOption` in a `FocusKeyManager` and we need it to match `FocusableOption`.
    const element = this._getHostElement();

    if (typeof element.focus === 'function') {
      element.focus(options);
    }
  }

  /**
   * This method sets display styles on the option to make it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setActiveStyles(): void {
    if (!this._active && this._selected) {
      this._active = true;
      this._changeDetectorRef.markForCheck();
    } else {
      this.setInactiveStyles();
    }
  }

  /**
   * This method removes display styles on the option that made it appear
   * active. This is used by the ActiveDescendantKeyManager so key
   * events will display the proper options as active on arrow key events.
   */
  setInactiveStyles(): void {
    if (this._active) {
      this._active = false;
      this._changeDetectorRef.markForCheck();
    }
  }

  /** Gets the label to be used when determining whether the option should be focused. */
  getLabel(): string {
    return this.viewValue;
  }

  /**
   * @internal
   * Ensures the option is selected when activated from the keyboard. */
  _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === 'Enter' || (event.key === 'Spacebar' || event.key === ' ')) && !hasModifierKey(event)) {
      this._selectViaInteraction();

      // Prevent the page from scrolling down and form submits.
      event.preventDefault();
    }
  }

  /**
   * @internal
   * Gets the host DOM element.
   */
  _getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }

  /**
   * @internal
   * Gets the `aria-selected` value for the option. We explicitly omit the `aria-selected`
   * attribute from single-selection, unselected options. Including the `aria-selected="false"`
   * attributes adds a significant amount of noise to screen-reader users without providing useful
   * information.
   */
  _getAriaSelected(): boolean | null {
    return this.selected || (this.multiple ? false : null);
  }

  /**
   * @internal
   * Returns the correct tabindex for the option depending on disabled state.
   */
  _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  get _imageIconSrc(): string {
    if (!this.imageIcon) {
      return '';
    }
    return `./atlas-icons/${this.imageIcon.toLocaleLowerCase()}.svg`;
  }
}

/**
 * Determines the position to which to scroll a panel in order for an option to be into view.
 * @param optionOffset Offset of the option from the top of the panel.
 * @param optionHeight Height of the options.
 * @param currentScrollPosition Current scroll position of the panel.
 * @param panelHeight Height of the panel.
 * @docs-private
 */
export function _getOptionScrollPosition(optionOffset: number, optionHeight: number,
    currentScrollPosition: number, panelHeight: number): number {
  if (optionOffset < currentScrollPosition) {
    return optionOffset;
  }

  if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
    return Math.max(0, optionOffset - panelHeight + optionHeight);
  }

  return currentScrollPosition;
}
