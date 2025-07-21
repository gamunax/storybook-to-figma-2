import { ActiveDescendantKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { SelectionModel } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay, ConnectedPosition, Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { ViewportRuler } from '@angular/cdk/scrolling';
import {
  AfterContentInit,
  Attribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Self,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Actions, ThemingService } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { defer, merge, Observable, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';

import { HaloFormFieldControl } from '../field.control';
import { AtlasInput } from '../input-field.directive';
import { _getOptionScrollPosition, HALO_OPTION_PARENT_COMPONENT, OptionComponent } from '../option/option.component';
import { UtilsService } from '../utils.service';
import { config } from './select.theming';

let nextUniqueId = 0;

/** Change event object that is emitted when the select value has changed. */
export class HaloSelectChange {
  constructor(
    /** Reference to the select that emitted the change event. */
    public source: HaloSelectComponent,
    /** Current value of the select that emitted the event. */
    public value: any) { }
}

export class HaloSelectTypeaheadChange {
  constructor(
    /** Reference to the input that emitted the change event. */
    public source: AtlasInput,
    /** Current value of the input that emitted the event. */
    public value: any) { }
}

@Component({
  selector: 'atlas-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'listbox',
    '[attr.id]': 'id',
    '[attr.aria-label]': 'ariaLabel',
    '[attr.aria-required]': 'required.toString()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.aria-invalid]': 'ngControl?.invalid',
    '[attr.aria-owns]': 'panelOpen ? _optionIds : null',
    '[attr.aria-multiselectable]': 'multiple',
    '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
    '[class.atlas-select--disabled]': 'disabled',
    '[class.atlas-select--invalid]': 'ngControl?.invalid && ngControl?.touched',
    '[class.atlas-select--required]': 'required',
    '[class.atlas-select--empty]': 'empty',
    '[class.atlas-select--readonly]': 'readonly',
    'class': 'select',
    '(keydown)': '_handleKeydown($event)',
    '(focus)': '_onFocus()',
    '(blur)': '_onBlur()',
  },
  providers: [
    {provide: HaloFormFieldControl, useExisting: HaloSelectComponent},
    {provide: HALO_OPTION_PARENT_COMPONENT, useExisting: HaloSelectComponent}
  ],
})
export class HaloSelectComponent implements HaloFormFieldControl<any>, OnInit, OnChanges, OnDestroy, AfterContentInit {
  /**
   * @internal
   * Padding-x of atlas-control__input-wrapper
   */
  _haloControlInputWrapperPaddingX = 13 * 2;
  iconSize = IconSizes.small;
  /** A name for this control that can be used by `atlas-control`. */
  controlType = 'atlas-select';

  stateChanges$ = new Subject<void>();

  private _uid = `atlas-select-${nextUniqueId++}`;
  _offsetY = 37;

  /**
   * @internal
   * The last measured value for the trigger's client bounding rect.
   */
  _triggerRect: ClientRect;

  /**
   * @internal
   * This position config ensures that the top "start" corner of the overlay
   * is aligned with with the top "start" of the origin by default (overlapping
   * the trigger completely). If the panel cannot fit below the trigger, it
   * will fall back to a position above the trigger.
   */
  _positions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
      offsetX: -(this._haloControlInputWrapperPaddingX / 2),
      offsetY: this._offsetY,
    },
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetX: -(this._haloControlInputWrapperPaddingX / 2),
      offsetY: -(this._offsetY),
    },
  ];

  /**
   * @internal
   * Emits when the panel element is finished transforming in. */
  _panelDoneAnimatingStream = new Subject<void>();

  /**
   * @internal
   * Strategy that will be used to handle scrolling while the select panel is open.
   */
  _scrollStrategy: ScrollStrategy;

  /**
   * @internal
   * Deals with the selection logic.
   */
  _selectionModel: SelectionModel<OptionComponent>;

  /**
   * @internal
   * Manages keyboard events for options in the panel.
   */
  _keyManager: ActiveDescendantKeyManager<OptionComponent>;

  /** Emits whenever the component is destroyed. */
  private readonly _destroyed$ = new Subject<void>();

  /** Trigger that opens the select. */
  @ViewChild('trigger') trigger: ElementRef;

  /** Panel containing the select options. */
  @ViewChild('panel') panel: ElementRef;

  /** Input element for typeahead search. */
  @ViewChild('typeahead') typeaheadElement: AtlasInput;
  @ViewChild('typeahead') typeaheadInput: ElementRef<HTMLInputElement>;

  /**
   * Overlay pane containing the options.
   */
  @ViewChild(CdkConnectedOverlay) private _overlayDir: CdkConnectedOverlay;

  /** All of the defined select options. */
  @ContentChildren(OptionComponent, {descendants: true}) options: QueryList<OptionComponent>;

  /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
  @Input() panelClass: string | string[] | Set<string> | { [key: string]: any };

  /** Enables clear button */
  @Input() clear = false;

  /** Toggles the arrow display  */
  @Input() showArrows = true;

  /** Unique id of the element. */
  @Input()
  get id(): string { return this._id; }
  set id(value: string) {
    this._id = value || this._uid;
    this.stateChanges$.next();
  }
  private _id: string;

  /** Combined stream of all of the child options' change events. */
  readonly optionSelectionChanges: Observable<HaloSelectChange> = defer(() => {
    const options = this.options;

    if (options) {
      return options.changes.pipe(
        startWith(options),
        switchMap(() => merge(...options.map(option => option.selectionChange)))
      );
    }

    return this._ngZone.onStable
      .asObservable()
      .pipe(
        take(1),
        takeUntil(this._destroyed$),
        switchMap(
          () => this.optionSelectionChanges
        ),
        take(1),
      );
  }) as Observable<HaloSelectChange>;

  /** Placeholder to be shown if no value has been selected. */
  @Input()
  get placeholder(): string { return this._placeholder; }
  set placeholder(value: string) {
    this._placeholder = value;
    this.stateChanges$.next();
  }
  private _placeholder = 'Select';

  /** Whether the component is required. */
  @Input()
  get required(): boolean { return this._required; }
  set required(value: boolean) {
    this._required = coerceBooleanProperty(value);
    this.stateChanges$.next();
  }
  private _required = false;

  /** Whether the user should be allowed to select multiple options. */
  @Input()
  get multiple(): boolean { return this._multiple; }
  set multiple(value: boolean) {
    this._multiple = coerceBooleanProperty(value);
  }
  private _multiple = false;

  @Input()
  get disabled(): boolean { return this._disabled; }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
    this.stateChanges$.next();
  }
  private _disabled = false;

  @Input()
  get readonly(): boolean { return this._readonly; }
  set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
    this.stateChanges$.next();
  }
  private _readonly = false;

  /**
   * Function to compare the option values with the selected values. The first argument
   * is a value from an option. The second is a value from the selection. A boolean
   * should be returned.
   */
  @Input()
  get compareWith() { return this._compareWith; }
  set compareWith(fn: (o1: any, o2: any) => boolean) {
    if (typeof fn !== 'function') {
      throw Error('`compareWith` must be a function.');
    }
    this._compareWith = fn;
    if (this._selectionModel) {
      // A different comparator means the selection could change.
      this._initializeSelection();
    }
  }

  /** Value of the select control. */
  @Input()
  get value(): any { return this._value; }
  set value(newValue: any) {
    if (newValue !== this._value) {
      this.writeValue(newValue);
      this._value = newValue;
    }
  }
  private _value: any;

  /** Aria label of the select. If not specified, the placeholder will be used as label. */
  @Input('aria-label') ariaLabel = '';

  /** Input that can be used to specify the `aria-labelledby` attribute. */
  @Input('aria-labelledby') ariaLabelledby: string;

  /** Whether or not typeahead search is enabled. */
  @Input()
  get typeahead(): boolean { return this._typeahead; }
  set typeahead(value: boolean) {
    this._typeahead = coerceBooleanProperty(value);
  }
  private _typeahead: boolean;

  /** Time to wait in milliseconds after the last keystroke before moving focus to an item. */
  @Input()
  get typeaheadDebounceInterval(): number { return this._typeaheadDebounceInterval; }
  set typeaheadDebounceInterval(value: number) {
    this._typeaheadDebounceInterval = coerceNumberProperty(value);
  }
  private _typeaheadDebounceInterval: number;

  /**
   * Function used to sort the values in a select in multiple mode.
   * Follows the same logic as `Array.prototype.sort`.
   */
  @Input() sortComparator: (a: OptionComponent, b: OptionComponent, options: OptionComponent[]) => number;

  /** Set the option action */
  @Input() action: Actions = Actions.default;

  /** Input that can be used to specify the customSelectedText attribute. */
  @Input() customSelectedText: string = '';

  /** Event emitted when the select panel has been toggled. */
  @Output() readonly openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Event emitted when the select has been opened. */
  // tslint:disable-next-line: no-output-rename
  @Output('opened') readonly _openedStream: Observable<void> = this.openedChange.pipe(filter(o => o), map(() => {}));

  /** Event emitted when the select has been closed. */
  // tslint:disable-next-line: no-output-rename
  @Output('closed') readonly _closedStream: Observable<void> = this.openedChange.pipe(filter(o => !o), map(() => {}));

  /** Event emitted when the selected value has been changed by the user. */
  @Output() readonly selectionChange: EventEmitter<HaloSelectChange> = new EventEmitter<HaloSelectChange>();

  /** Event emitted when the typeahead value has been changed by the user. */
  @Output() readonly typeaheadChange: EventEmitter<HaloSelectTypeaheadChange> = new EventEmitter<HaloSelectTypeaheadChange>();

  /**
   * Event that emits whenever the raw value of the select changes. This is here primarily
   * to facilitate the two-way binding for the `value` input.
   */
  @Output() readonly valueChange: EventEmitter<any> = new EventEmitter<any>();

  /** Whether the select is focused. */
  get focused(): boolean {
    return this._focused;
  }
  private _focused = false;

  /** Whether or not the overlay panel is open. */
  get panelOpen(): boolean {
    return this._panelOpen;
  }
  private _panelOpen = false;

  /** The currently selected option. */
  get selected(): OptionComponent | OptionComponent[] {
    return this.multiple ? this._selectionModel.selected : this._selectionModel.selected[0];
  }

  /** Tabindex of the component. */
  get tabIndex(): number { return this.disabled ? -1 : this._tabIndex; }
  set tabIndex(value: number) {
    // If the specified tabIndex value is null or undefined, fall back to the default value.
    this._tabIndex = value ?? 0;
  }
  private _tabIndex: number;

  /**
   * @internal
   * The IDs of child options to be passed to the aria-owns attribute. */
  _optionIds = '';

  /**
   * @internal
   */
  _tempPlaceholder = '';

  /** Whether or not there is a select all option */
  private _selectAllOption = false;

  /** @internal */
  typeaheadSelectedOption = false;

  constructor(
    private _ngZone: NgZone,
    private _elementRef: ElementRef,
    private _viewportRuler: ViewportRuler,
    private _changeDetectorRef: ChangeDetectorRef,
    @Optional() @Self() public ngControl: NgControl,
    @Attribute('tabindex') tabIndex: string,
    private _overlay: Overlay,
    private _liveAnnouncer: LiveAnnouncer,
    private _themingService: ThemingService,
    private _utilsService: UtilsService,
  ) {
    if (this.ngControl) {
      // Note: we provide the value accessor through here, instead of
      // the `providers` to avoid running into a circular import.
      this.ngControl.valueAccessor = this;
    }

    this.tabIndex = parseInt(tabIndex, 10) || 0;

    this._scrollStrategy = this._overlay.scrollStrategies.reposition();
    this._themingService.applyConfig(config);

    this._utilsService.selectedAction$
      .pipe(
        takeUntil(this._destroyed$),
        tap((action) => this.action = action)
      )
      .subscribe();
  }

  ngOnInit(): void {
    this._selectionModel = new SelectionModel<OptionComponent>(this.multiple);
    this.stateChanges$.next();
    this._tempPlaceholder = this.placeholder;


    // We need `distinctUntilChanged` here, because some browsers will
    // fire the animation end event twice for the same animation. See:
    // https://github.com/angular/angular/issues/24084
    this._panelDoneAnimatingStream
      .pipe(
        distinctUntilChanged(),
        takeUntil(this._destroyed$),
        tap(
          () => {
            if (this.panelOpen) {
              this.openedChange.emit(true);
            } else {
              this.openedChange.emit(false);
              this._overlayDir.offsetX = 0;
              this._changeDetectorRef.markForCheck();
            }
          }
        ),
      )
      .subscribe();


    /** Updates values for triggerRect when viewport is changed */
    this._viewportRuler.change()
      .pipe(
        takeUntil(this._destroyed$),
        tap(
          () => {
            if (this._panelOpen) {
              this._triggerRect = this.trigger.nativeElement.getBoundingClientRect();
              this._changeDetectorRef.markForCheck();
            }
          }
        ),
      )
      .subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Updating the disabled state is handled by `mixinDisabled`, but we need to additionally let
    // the parent form field know to run change detection when the disabled state changes.

    if (changes['disabled']) {
      this.stateChanges$.next();
    }

    if (changes['typeaheadDebounceInterval'] && this._keyManager) {
      this._keyManager.withTypeAhead(this._typeaheadDebounceInterval);
    }
  }

  ngAfterContentInit() {
    this._initKeyManager();

    // Initial check to see if a select all option exists
    this._selectAllOption = this.options.some((option) => option.selectAll);

    // Set Action theme
    this.options.forEach((opt:OptionComponent) => {
      opt.action = this.action;
    });

    this._selectionModel.changed.pipe(
      takeUntil(this._destroyed$),
      tap(
        event => {
          event.added.forEach(option => option.select());
          event.removed.forEach(option => option.deselect());

          if (this._selectAllOption) {
            this._setCorrectSelectAllState();
          }
        }
      ),
    ).subscribe();

    this.options.changes.pipe(
      startWith(null as any),
      takeUntil(this._destroyed$),
      tap(
        () => {
          this._resetOptions();
          this._initializeSelection();

          if (this.panelOpen) {
            this._highlightCorrectOption();
          }
        }
      ),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
    this.stateChanges$.complete();
  }

  /** Whether the select has a value. */
  get empty(): boolean {
    return !this._selectionModel || this._selectionModel.isEmpty();
  }

  /** The value displayed in the trigger. */
  get triggerValue(): string {
    if (this.empty) {
      return '';
    }

    if (this._multiple) {
      const selectedOptions = this._selectionModel.selected.map(option => option.viewValue);

      return selectedOptions.join(', ');
    }

    return this._selectionModel.selected[0].viewValue;
  }

  /** Determines the `aria-activedescendant` to be set on the host. */
  _getAriaActiveDescendant(): string | null {
    if (this.panelOpen && this._keyManager && this._keyManager.activeItem) {
      return this._keyManager.activeItem.id;
    }

    return null;
  }

  /** Focuses the select element. */
  focus(options?: FocusOptions): void {
    if (this.typeahead && this.typeaheadElement) {
      this.typeaheadElement['nativeElement']?.focus();
    } else {
      this._elementRef.nativeElement.focus(options);
    }
  }

  /** @internal */
  _onFocus() {
    if (!this.disabled) {
      this._focused = true;
      this.stateChanges$.next();
    }
  }

  /**
   * @interal
   * Calls the touched callback only if the panel is closed. Otherwise, the trigger will
   * "blur" to the panel when it opens, causing a false positive.
   */
  _onBlur() {
    this._focused = false;
    if (!this.disabled && !this.panelOpen) {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
      this.stateChanges$.next();
    }
  }

  onContainerClick() {
    this.focus();
    this.open();
  }

  /** `View -> model callback called when value changes` */
  _onChange: (value: any) => void = () => {};

  /** `View -> model callback called when select has been touched` */
  _onTouched = () => {};

  /** Toggles the overlay panel open or closed. */
  toggle(): void {
    this.panelOpen ? this.close() : this.open();
  }

  /** Opens the overlay panel. */
  open(): void {
    if (this.disabled || !this.options || !this.options.length || this._panelOpen || this.readonly) {
      return;
    }

    this._triggerRect = this.trigger.nativeElement.getBoundingClientRect();
    this._panelOpen = true;
    this._keyManager.withHorizontalOrientation(null);
    this._highlightCorrectOption();
    this._changeDetectorRef.detectChanges();
    this._scrollActiveOptionIntoView();
    this._panelDoneAnimatingStream.next();

    if (this.typeahead) {
      setTimeout(() => {
        this.focus();
      }, 0);
    }
  }

  /** Closes the overlay panel and focuses the host element. */
  close(): void {
    if (this._panelOpen) {
      this._panelOpen = false;
      this._keyManager.withHorizontalOrientation('ltr');
      this._onTouched();

      if (
        this.typeahead &&
        this.typeaheadElement &&
        (this.selected instanceof OptionComponent ? this.selected : (this.selected as OptionComponent[])?.length > 0)
      ) {
        // Emit empty query when input is blurred to signal reset options list and set input value to null
        this.typeaheadElement.value = '';
        this.typeaheadChange.emit(new HaloSelectTypeaheadChange(this.typeaheadElement, ''));
        this.typeaheadSelectedOption = true;
        this.placeholder = this.typeaheadSelectedOption ? '' : this._tempPlaceholder;
      }
      this._onBlur();
      this._panelDoneAnimatingStream.next();
    }
  }

  deselectOption(selectedOption): void {
    this.options.forEach((option: OptionComponent) => {
      if( option.value === selectedOption ) {
        option.deselect();
      }
    });
  }

  /** Select all of the options, use with multiple only. */
  selectAll() {
    this.options.forEach((option: OptionComponent) => {
      if (!option.selectAll) {
       option.select();
      }
    });
  }

  /** Deselect all of the options, use with multiple only. */
  deselectAll(event?) {
    if (!this.disabled) {
      this.options.forEach((option: OptionComponent) => {
        if (!option.selectAll) {
          option.deselect();
          if( this.typeahead) {
            this.typeaheadSelectedOption = false;
            this.placeholder = this._tempPlaceholder;
          }
        }
      });
    }
    event?.stopPropagation();
  }

  /** @internal */
  _stopPropagation(event) {
    event.stopPropagation();
  }

  /**
   * Sets the select's value. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param value New value to be written to the model.
   */
  writeValue(value: any): void {
    if (this.options) {
      this._setSelectionByValue(value);
    }
  }

  /**
   * Saves a callback function to be invoked when the select's value
   * changes from user input. Part of the ControlValueAccessor interface
   * required to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the value changes.
   */
  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  /**
   * Saves a callback function to be invoked when the select is blurred
   * by the user. Part of the ControlValueAccessor interface required
   * to integrate with Angular's core forms API.
   *
   * @param fn Callback to be triggered when the component has been touched.
   */
  registerOnTouched(fn: () => {}): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
    this.stateChanges$.next();
  }

  /** Records option IDs to pass to the aria-owns property. */
  private _setOptionIds() {
    this._optionIds = this.options.map(option => option.id).join(' ');
  }

  /** Sets up a key manager to listen to keyboard events on the overlay panel. */
  private _initKeyManager() {
    this._keyManager = new ActiveDescendantKeyManager<OptionComponent>(this.options)
      .withTypeAhead(this._typeaheadDebounceInterval)
      .withVerticalOrientation()
      .withHorizontalOrientation('ltr')
      .withAllowedModifierKeys(['shiftKey']);

    this._keyManager.tabOut
      .pipe(
        takeUntil(this._destroyed$),
        tap(
          () => {
            if (this.panelOpen) {
              // Select the active item when tabbing away. This is consistent with how the native
              // select behaves. Note that we only want to do this in single selection mode.
              if (!this.multiple && this._keyManager.activeItem) {
                this._keyManager.activeItem._selectViaInteraction();
              }

              // Restore focus to the trigger before closing. Ensures that the focus
              // position won't be lost if the user got focus into the overlay.
              this.focus();
              this.close();
            }
          }
        ),
      ).subscribe();

    this._keyManager.change
      .pipe(
        takeUntil(this._destroyed$),
        tap(
          () => {
            if (!this._panelOpen && !this.multiple && this._keyManager.activeItem) {
              this._keyManager.activeItem._selectViaInteraction();
            }
          }
        ),
      ).subscribe();
  }

  /**
   * @internal
   * Handles the click on the typeahead input.
   * Ensures the panel opens if it's not already.
   */
  _handleInputClick(event: MouseEvent): void {
    // Stop the event from propagating to the parent's toggle() method,
    // which would cause the panel to close if it was already open.
    event.stopPropagation();

    // If the panel is not open, open it.
    if (!this.panelOpen) {
      this.open();
    }
  }

  /**
   * @internal
   * Handles when the input element is focused
   */
  _handleInputFocus(): void {
    if (this.panelOpen) {
      this._focused = true;
      if(this.typeaheadElement) {
        this.typeaheadElement['nativeElement']?.focus();

        // Emit an empty query when
        if (this.typeaheadElement.value) {
          this.typeaheadChange.emit(new HaloSelectTypeaheadChange(this.typeaheadElement, this.typeaheadElement.value));
        }
      }
    }
  }

  /**
   * @internal
   * Handles when the input element is blurred
   */
  _handleInputBlur(): void {
    this._focused = false;
  }

  /**
   * @internal
   * Handles input changes
   */
  _handleInput(event: any): void {
    const target = event.target as HTMLInputElement;
    const value: number | string | null = target.value;
    this.typeaheadChange.emit(new HaloSelectTypeaheadChange(this.typeaheadElement, value));
    this.open();
  }

  /**
   * @internal
   * Handles all keydown events on the select.
   */
  _handleKeydown(event: KeyboardEvent): void {
    if (!this.disabled) {
      this.panelOpen ? this._handleOpenKeydown(event) : this._handleClosedKeydown(event);
    }
  }

  /** Handles keyboard events while the select is closed. */
  private _handleClosedKeydown(event: KeyboardEvent): void {
    const key = event.key;
    const isArrowKey = key === 'ArrowDown' || key === 'Down' ||
                       key === 'ArrowUp' || key === 'Up' ||
                       key === 'ArrowLeft' || key === 'Left' ||
                       key === 'ArrowRight' || key === 'Right';
    const isOpenKey = key === 'Enter' || key === 'Spacebar' || key === ' ';
    const manager = this._keyManager;

    // Open the select on ALT + arrow key to match the native <select>
    if (!manager.isTyping() && (isOpenKey && !hasModifierKey(event)) ||
      ((this.multiple || event.altKey) && isArrowKey)) {
      event.preventDefault(); // prevents the page from scrolling down when pressing space
      this.open();
    } else if (!this.multiple) {
      const previouslySelectedOption = this.selected;

      if (key === 'Home' || key === 'End') {
        key === 'Home' ? manager.setFirstItemActive() : manager.setLastItemActive();
        event.preventDefault();
      } else {
        manager.onKeydown(event);
      }

      const selectedOption = this.selected;

      // Since the value has changed, we need to announce it ourselves.
      if (selectedOption && previouslySelectedOption !== selectedOption) {
        // We set a duration on the live announcement, because we want the live element to be
        // cleared after a while so that users can't navigate to it using the arrow keys.
        this._liveAnnouncer.announce((selectedOption as OptionComponent).viewValue, 10000);
      }
    }
  }

  /** Handles keyboard events when the selected is open. */
  private _handleOpenKeydown(event: KeyboardEvent): void {
    const manager = this._keyManager;
    const key = event.key;
    const isArrowKey = (key === 'ArrowDown' || key === 'Down') || (key === 'ArrowUp' || key === 'Up');
    const isTyping = manager.isTyping();
    const target = event.target as HTMLElement;

    if (target.tagName === 'INPUT' && key !== 'Enter' && key !== 'Escape' && !isArrowKey) {
      return;
    }

    if (key === 'Home' || key === 'End') {
      event.preventDefault();
      key === 'Home' ? manager.setFirstItemActive() : manager.setLastItemActive();
    } else if (isArrowKey && event.altKey) {
      // Close the select on ALT + arrow key to match the native <select>
      event.preventDefault();
      this.close();
      // Don't do anything in this case if the user is typing,
      // because the typing sequence can include the space key.
    } else if (!isTyping && (key === 'Enter' || (key === 'Spacebar' || key === ' ' && !this.typeahead)) && manager.activeItem &&
      !hasModifierKey(event)) {
      event.preventDefault();
      manager.activeItem._selectViaInteraction();
     } else if (!isTyping && (
      (this._multiple && key === 'A' && event.ctrlKey) || 
      (key === 'Enter' && this.typeahead))) // Select all options if Ctrl + A is pressed or Enter is pressed in typeahead mode
      {
      event.preventDefault();
      const hasDeselectedOptions = this.options.some(opt => !opt.disabled && !opt.selected);

      this.options.forEach(option => {
        if (!option.disabled) {
          hasDeselectedOptions ? option.select() : option.deselect();
        }
      });
    } else {
      const previouslyFocusedIndex = manager.activeItemIndex;

      if (isArrowKey) {
        manager.onKeydown(event);
      }

      if (this._multiple && isArrowKey && event.shiftKey && manager.activeItem &&
        manager.activeItemIndex !== previouslyFocusedIndex) {
        manager.activeItem._selectViaInteraction();
      }
    }
  }

  /** Drops current option subscriptions and IDs and resets from scratch. */
  private _resetOptions(): void {
    const changedOrDestroyed = merge(this.options.changes, this._destroyed$);

    this.optionSelectionChanges.pipe(
      takeUntil(changedOrDestroyed),
      tap(
        (event: any) => {
          this._onSelect(event.source, event.isUserInput);

          if (event.isUserInput) {
            if (!this.multiple && this._panelOpen) {
              this.close();
              this.focus();
            } else if (
              this.multiple &&
              !event.source.selected &&
              !event.source.selectAll &&
              !this.options.find((option) => option.selected)
            ) {
              this.deselectAll();
            }
          } else if (this.typeaheadInput?.nativeElement) {
            /* Clear the typeahead input */
            this.typeaheadInput.nativeElement.value = '';
          }
        }
      ),
    ).subscribe();

    // Listen to changes in the internal state of the options and react accordingly.
    // Handles cases like the labels of the selected options changing.
    merge(...this.options.map(option => option._stateChanges))
      .pipe(
        takeUntil(changedOrDestroyed),
        tap(
          () => {
            this._changeDetectorRef.markForCheck();
            this.stateChanges$.next();
          }
        ),
      )
      .subscribe();

    this._setOptionIds();
  }

  /** Invoked when an option is clicked. */
  private _onSelect(option: OptionComponent, isUserInput: boolean): void {
    const wasSelected = this._selectionModel.isSelected(option);

    if (option.value == null && !this._multiple) {
      option.deselect();
      this._selectionModel.clear();
      this._propagateChanges(option.value);
    } else {
      if (wasSelected !== option.selected && !option.selectAll) {
        option.selected ? this._selectionModel.select(option) :
                          this._selectionModel.deselect(option);
      } else if (option.selectAll) {
        // If option is the select all option
        // If no options are selected then select all else deselect all. -1 option for the select all option
        if (option.selected) {
          this.selectAll();
        } else {
          this.deselectAll();
        }
      }

      if (isUserInput) {
        this._keyManager.setActiveItem(option);
      }

      if (this.multiple) {
        this._sortValues();

        if (isUserInput) {
          // In case the user selected the option with their mouse, we
          // want to restore focus back to the trigger, in order to
          // prevent the select keyboard controls from clashing with
          // the ones from `atlas-option`.
          this.focus();
        }
      }
      else {
        this.close();
      }
      this.typeaheadSelectedOption = this.typeahead ?? false;
    }

    if (wasSelected !== this._selectionModel.isSelected(option)) {
      this._propagateChanges();
    }

    // Close panel if multiple + typeahead
    if (this.multiple && this.typeahead) {
      this.close();
    }

    this.stateChanges$.next();
  }

  /** Sorts the selected values in the selected based on their order in the panel. */
  private _sortValues() {
    if (this.multiple) {
      const options = this.options.toArray();

      this._selectionModel.sort((a, b) => {
        return this.sortComparator ? this.sortComparator(a, b, options) :
                                      options.indexOf(a) - options.indexOf(b);
      });
      this.stateChanges$.next();
    }
  }

  /** Emits change event to set the model value. */
  private _propagateChanges(fallbackValue?: any): void {
    let valueToEmit: any = null;

    if (this.multiple) {
      valueToEmit = (this.selected as OptionComponent[]).map(option => option.value);
    } else {
      valueToEmit = this.selected ? (this.selected as OptionComponent).value : fallbackValue;
    }

    this._value = valueToEmit;
    this.valueChange.emit(valueToEmit);
    this._onChange(valueToEmit);
    this.selectionChange.emit(new HaloSelectChange(this, valueToEmit));
    this._changeDetectorRef.markForCheck();
  }

  private _initializeSelection(): void {
    // Defer setting the value in order to avoid the "Expression
    // has changed after it was checked" errors from Angular.
    Promise.resolve().then(() => {
      this._setSelectionByValue(this.ngControl ? this.ngControl.value : this._value);
      this.stateChanges$.next();
    });
  }

  /**
   * Sets the selected option based on a value. If no option can be
   * found with the designated value, the select trigger is cleared.
   */
  private _setSelectionByValue(value: any | any[]): void {
    if (this.multiple && value) {
      if (!Array.isArray(value)) {
        throw Error('Value must be an array in multiple-selection mode.');
      }

      value.forEach((currentValue: any) => this._selectValue(currentValue));
      this._sortValues();
    } else {
      if (!value) {
        this.deselectAll();
      }
      this._selectionModel.clear();
      const correspondingOption = this._selectValue(value);

      // Shift focus to the active item. Note that we shouldn't do this in multiple
      // mode, because we don't know what option the user interacted with last.
      if (correspondingOption) {
        this._keyManager.setActiveItem(correspondingOption);
      } else if (!this.panelOpen) {
        // Otherwise reset the highlighted option. Note that we only want to do this while
        // closed, because doing it while open can shift the user's focus unnecessarily.
        this._keyManager.setActiveItem(-1);
      }
    }

    this._changeDetectorRef.markForCheck();
  }

  /**
   * Highlights the selected item. If no option is selected, it will highlight
   * the first item instead.
   */
  private _highlightCorrectOption(): void {
    if (this._keyManager) {
      if (this.empty || (this.typeaheadElement && this.typeaheadElement?.value)) {
        this._keyManager.setFirstItemActive();
      } else {
        this._keyManager.setActiveItem(this._selectionModel.selected[0]);
      }
    }
  }

  /** Scrolls the active option into view. */
  private _scrollActiveOptionIntoView(): void {
    const activeOptionIndex = this._keyManager.activeItemIndex || 0;
    const option = this.options.toArray()[activeOptionIndex];
    const element = option._getHostElement();

    this.panel.nativeElement.scrollTop = _getOptionScrollPosition(
      element.offsetTop,
      element.offsetHeight,
      this.panel.nativeElement.scrollTop,
      this.panel.nativeElement.offsetHeight
    );
    this._updateScrollActiveHeight();
  }

  private _updateScrollActiveHeight(): void {
    const windowContainerHeight = document.activeElement.clientHeight;
    const maxContentHeight = 400;
    const minContentHeight = 200;
    const viewportRuler = this._viewportRuler.getViewportRect();
    const viewPortHeight = viewportRuler.height;

    const isBelowMax = viewPortHeight <= maxContentHeight;
    const parentBottom = this.trigger.nativeElement.getBoundingClientRect().bottom;  // parent location
    const maxHeight = (isBelowMax ? maxContentHeight : viewPortHeight);


    let result = maxHeight ?? viewPortHeight;

    if (maxHeight - parentBottom >= maxContentHeight) {
      result = maxHeight - parentBottom;
    } else if (parentBottom < maxHeight) {
      result = parentBottom;
    }
    result = result < maxContentHeight && result < minContentHeight ? ((viewPortHeight + result)/2) : result;

    // manage height according to window container, for example modal container
    if (windowContainerHeight < result) {
      result = windowContainerHeight < maxContentHeight ? minContentHeight : maxContentHeight;
    }
    this.panel.nativeElement.style.maxHeight = result - (this._offsetY + 20) + 'px';
  }

  /** Comparison function to specify which option is displayed. Defaults to object equality. */
  private _compareWith = (o1: any, o2: any) => o1 === o2;

  /**
   * Finds and selects and option based on its value.
   * @returns Option that has the corresponding value.
   */
  private _selectValue(value: any): OptionComponent | undefined {
    const correspondingOption = this.options.find((option: OptionComponent) => {
      try {
        // Treat null as a special reset value.
        return option.value != null && this._compareWith(option.value,  value);
      } catch (error) {
        return false;
      }
    });

    if (correspondingOption) {
      this._selectionModel.select(correspondingOption);

      // When option is destroyed from list a new option instance is created
      // so we need to deselect the destroyed options from the selectionModel
      // and select the new instances of those options
      this._selectionModel.selected.filter((option) => !option.selectAll).forEach((option: OptionComponent) => {
        if (option.value === correspondingOption?.value && option.id !== correspondingOption?.id) {
          this._selectionModel.deselect(option);
          this._selectionModel.select(correspondingOption);
        }
      });

      if (this._selectAllOption) {
        this._setCorrectSelectAllState();
        this._highlightCorrectOption();
      }
    }

    return correspondingOption;
  }

  /** Checks and set the correct state of the select all option */
  private _setCorrectSelectAllState() {
    // Recheck if the select all option should be selected
    // or deselected depending if all options currently in view are selected
    const allOptionsSelected = !this.options.filter((option) => !option.selectAll)
      .some((option: OptionComponent) => this._selectionModel.isSelected(option) === false);

    this.options.forEach((option: OptionComponent) => {
      if (option.selectAll) {
        // Select or deselect depending if all options are selected
        // Notice not using selectionModel to select because selectAll is a special option
        // instead we just call the select function to mark it as selected
        if (allOptionsSelected) {
          option.select();
        } else {
          option.deselect();
        }
      }
    });
  }
}
