import {
    Attribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Host,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    SimpleChanges,
    SkipSelf,
    ViewChild,
    ViewEncapsulation,
  } from '@angular/core';
  import {
    ControlContainer,
    ControlValueAccessor,
    UntypedFormControl,
    NG_VALUE_ACCESSOR,
    ValidatorFn,
    Validators,
  } from '@angular/forms';
  import { Subscription } from 'rxjs';
  import { HaloWindowClickService } from 'atlas-cdk';
  import { debounceTime } from 'rxjs/operators';
import { IconSizes } from 'atlas-icon';
  
  let generateId = 0;
  
  export interface AutocompleteOption {
    label: string;
    value?: string;
    type?: 'header' | 'option' | 'action';
    icon?: string;
    flag?: string;
    fields?: any;
    id?: string;
  }
  
  function filterByString(query: string, queryStartsWith: boolean, el: string) {
    if (queryStartsWith) {
      return el.toLowerCase().startsWith(query);
    } else {
      return el.toLowerCase().indexOf(query) > -1;
    }
  }
  
  function filterByObject(query: string, queryStartsWith: boolean, el: AutocompleteOption) {
    if (queryStartsWith) {
      return el.type === 'header' || el.type === 'action' || el.label.toLowerCase().startsWith(query);
    } else {
      return el.type === 'header' || el.type === 'action' || el.label.toLowerCase().indexOf(query) > -1;
    }
  }
  
  function findIndexByObject(query: string, queryStartsWith: boolean, el: AutocompleteOption) {
    if (queryStartsWith) {
      return el.type !== 'header' && el.type !== 'action' ? el.label.toLowerCase().startsWith(query) : false;
    } else {
      return el.type !== 'header' && el.type !== 'action' ? el.label.toLowerCase().indexOf(query) > -1 : false;
    }
  }
  
  @Component({
    selector: 'legacy-autocomplete',
    templateUrl: 'autocomplete.component.html',
    styleUrls: ['_autocomplete.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
      {
        provide: NG_VALUE_ACCESSOR,
        useExisting: LegacyAutocompleteComponent,
        multi: true
      }
    ]
  })
  
  export class LegacyAutocompleteComponent implements OnChanges, OnDestroy, ControlValueAccessor {
    readonly closeIconSize: IconSizes.medium;
    @Input() public data: AutocompleteOption[] = [];
    @Input() public queryCheckLimit = 0;
    @Input() public handleNoResult = false;
    @Input() public noResultText = 'No results found.';
    @Input() public isAbsoluteDropdown = false;
    @Input() public placeholder = '';
    @Input() public theme = '';
    @Input() public required: boolean;
    @Input() public textarea = false;
    /** Set the containing row to collapse mode */
    @Input() public collapseRow = false;
    /**
     * Set to `true` to disable the internal filtering strategy and handle filtering outside this component
     * @memberof LegacyAutocompleteComponent
     */
    @Input() isExternalFilter = false;
  
    /**
     * **NOTE**: ONLY MODIFY IF USING `isExternalFilter`
     *
     * The filtered list
     *
     * @memberof LegacyAutocompleteComponent
     */
    @Input() public filteredList: AutocompleteOption[] = [];
  
    /**
     *
     * queryStartsWith
     * @memberof LegacyAutocompleteComponent
     * Option for the query to only search the beginning of the string, rather than any part of the string.
     */
    @Input() public queryStartsWith = false;
    @Input() public clearEnabled = false;
    @Input() formControl: UntypedFormControl;
    @Input() formControlName: any;
    @Input() hasContainerShadow = false;
    @Input() isAutoScroll = false;
  
    /**
     * Determine if autocomplete utilizes multiple fields for display
     */
    @Input() isMultiField = false;
    /**
     * Determine ID for autocomplete input
     */
    @Input() inputId = `legacy-autocomplete-${++generateId}`;
    /**
     * Determine the label for autocomplete input
     */
    @Input() label: string;
    /**
     * List of fields to display for multi-field autocomplete
     */
    @Input() fieldList: string[];
    /**
     * Determines if autocomplete is read-only
     */
    @Input() isReadOnly = false;
  
    /**
     * Determines if autocomplete utilizes Version 2 designs
     */
    @Input() version2 = false;
  
    /**
     * Determines if arrow toggle appears
     */
    @Input() displayDropdownArrow = false;
  
    /**
     * Determines if dropdown should open on blank query
     */
    @Input() immediateListDisplay = false;
  
    /**
     * For Multifield: ID used for preset data in cases of repeat labels
     */
    @Input() startingId: string;

    /**
     * FORM V1 AND V2 LEGACY COMPONENT UPDATE:
     *
     * This input determines whether the component should use version 2 styles and behaviors.
     * Previously, the form version was controlled setting `$mos-form` or `$mos-form-v2` globally and using the `MosConfigurationService` and `setFormV2()`.
     * Now, this is managed via a boolean input, `isFormV2Enabled`.
     *
     * ### Behavior:
     * - **`true`**: Applies version 2 styles and functionalities.
     * - **`false`**: Uses default (version 1) styles and behaviors.
     *
     * ### Usage:
     * To fully enable version 2 styles, combine this input with `[version2]="true"`.
     *
     * #### Example:
     * ```html
     * <legacy-autocomplete 
     *   [data]="data"
     *   [placeholder]="'Search...'"
     *   [isFormV2Enabled]="true" 
     *   [version2]="true">
     * </legacy-autocomplete>
     * ```
     *
     * @input isFormV2Enabled - Boolean flag to toggle between version 1 and version 2 styles.
     */
    @Input()
    isFormV2Enabled: boolean;
  
    @Output() public isChanged: EventEmitter<string> = new EventEmitter<string>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() public onSelect: EventEmitter<any> = new EventEmitter<any>();
    @Output() public queryChange = new EventEmitter();
    /**
     * Emits an event when an action type option is clicked. Event data is the AutocompleteOption that was clicked.
     */
    @Output() public actionClick: EventEmitter<AutocompleteOption> = new EventEmitter<AutocompleteOption>();
    @ViewChild('dropdown') public dropdown: ElementRef;
    @ViewChild('input') public input: ElementRef;
    @ViewChild('sticky') public sticky: ElementRef;
  
    public selectedIdx: number;
    public clearButtonShown = false;
    autoScrollIdx = 0;
  
    /** @internal */
    _waiting = false;
  
    /** @internal */
    _isFocused = false;
  
    /**
     * @internal
     * Whether or not the dropdown is open
     */
    _isOpen = false;
  
    /** @Internal */
    _fieldItems: any;
  
    /**
     * @internal
     * based on autocomplete container height
     */
    _containerHalfHeight = 150;
  
    /**
     * @internal
     * Whether or not the dropdown should be hidden. Used during keyboard action Escape key.
     */
    _escapeDropdown = false;
  
    /** @internal */
    private _pastQuery = '';
  
    private _blurTimer;
    private _blurDebounce = 100;
    private _updateScrollPositionTimeout: any;
    private _control: UntypedFormControl = new UntypedFormControl();
    private _controlSubscription?: Subscription;
    private _clickSubscription: Subscription;
    /**
     * validators used prior to setting the required validator
     */
    private _oldValidtors: ValidatorFn | ValidatorFn[];
  
    private _onChange: any = () => {
    };
    private _onTouch: any = () => {
    };
  
    constructor(
      @Optional()
      @Host()
      @SkipSelf()
      private _controlContainer: ControlContainer,
      private _cdr: ChangeDetectorRef,
      private _elementRef: ElementRef,
      @Attribute('required') private _required,
      private _clickService: HaloWindowClickService,
    ) {
      this.selectedIdx = -1;
      this._initControlSubscription();
      this._applyRequiredValidator();
  
      this._clickSubscription = this._clickService.clickObservable$.pipe(debounceTime(100)).subscribe((event) => {
        this._clickOutside(event);
      });
    }
    
  
    /**
     * @internal
     * Returns whether or not formV2 is being used
     */
    get _isFormV2Enabled(): boolean {
      return this.isFormV2Enabled;
    }
  
    /**
     * @internal
     * Returns whether or not field is required.
     */
    get _isRequired() {
      return this._required !== null;
    }
  
    ngOnChanges(changes: SimpleChanges) {
      // Form v2 Overrides
      if (this._isFormV2Enabled) {
        if (!changes.immediateListDisplay) {
          this.immediateListDisplay = true;
        }
        if (!changes.handleNoResult) {
          this.handleNoResult = true;
        }
        if (!changes.displayDropdownArrow) {
          this.displayDropdownArrow = true;
        }
        if (!changes.clearEnabled) {
          this.clearEnabled = true;
        }
      }
  
      // filter change handling
      if (this.isExternalFilter) {
        this._waiting = false;
      }
      const filterListChanged = changes.filteredList;
      if (filterListChanged && !this.isExternalFilter) {
        console.warn('[autocomplete] `filteredList` should only be changed if `isExternalFilter` is enabled.');
        // restore original value
        this.filteredList = changes.filteredList.previousValue;
      }
      if (
        filterListChanged &&
        this.isExternalFilter &&
        this.handleNoResult &&
        filterListChanged.currentValue &&
        filterListChanged.currentValue.length === 0
      ) {
        this.filteredList = this.getNoResults();
      }
  
      // required change handling
      if (changes.required) {
        if (this.required) {
          this._applyRequiredValidator();
        } else {
          this._removeRequiredValidator();
        }
      }
  
      // required for async data loading for multi-field autocomplete
      if (this.isMultiField) {
        if (
          !this.isExternalFilter &&
          ((changes.query && changes.query.currentValue && this.data && this.data.length)
            || (changes.data && changes.data.currentValue && changes.data.currentValue.length && this.query))
        ) {
          this.filter();
          this._paintMultiFieldDisplay();
        }
        if (this.isExternalFilter && !this._fieldItems) {
          this._paintMultiFieldDisplay();
        }
      }
    }
  
    ngOnDestroy() {
      clearTimeout(this._blurTimer);
      clearTimeout(this._updateScrollPositionTimeout);
      this._destroyControlSubscription();
      // reset upper level form control validators if ancestor was passed in
      this._removeRequiredValidator();
      if (this._clickSubscription) {
        this._clickSubscription.unsubscribe();
      }
    }
  
    writeValue(val: any): void {
      this._control.setValue(val, { emitEvent: false, onlySelf: true });
    }
  
    registerOnChange(fn: any): void {
      // Workaround to prevent Angular bug (https://github.com/angular/angular/issues/27803).
      // writeValue and registerOnChange methods from ControlValueAccessor is being called after view is destroyed.
      if (!this._cdr['destroyed']) {
        this._onChange = fn;
        this._initControlSubscription();
      }
    }
  
    registerOnTouched(fn: any): void {
      this._onTouch = fn;
      this._cdr.markForCheck();
    }
  
    setDisabledState(isDisabled: boolean): void {
      // defer to passed in form control to control disabled state
      if (this.formControl) {
        return;
      }
      if (isDisabled !== this.isDisabled) {
        this.isDisabled = isDisabled;
      }
    }
  
    @Input()
    get query() {
      return this.control.value ? `${this.control.value}` : '';
    }
  
    set query(val: any) {
      if (this.control.value !== val) {
        this.control.setValue(val);
      }
    }
  
    @Input()
    get isDisabled(): boolean {
      return this.control.disabled;
    }
  
    set isDisabled(isDisabled: boolean) {
      // defer to passed in form control to control disabled state
      if (this.formControl) {
        return;
      }
      if (isDisabled) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
  
    get control(): UntypedFormControl {
      if (this.formControl) {
        return this.formControl;
      }
      if (this.formControlName && this._controlContainer) {
        const control = this._controlContainer.control.get(this.formControlName);
        if (control) {
          return control as UntypedFormControl;
        }
      }
      return this._control;
    }
  
    public filter(event?: any) {
      // prevent filtering from happening when keypress is up, down, or enter
      if (event && (event.key === 'ArrowDown' || event.key === 'ArrowUp'
        || event.key === 'Enter' || event.key === 'Down' || event.key === 'Up')) {
        return;
      }
  
      // if immediateListDisplay input is set to true, and the query is blank, it should show the whole list
      if (this.immediateListDisplay && !this.isExternalFilter && event && !this.query) {
        if (event.key === 'Backspace' || event.type === 'focus' || event.type === 'click') {
          this._createInternalFilteredList('');
        }
        if (event.key === 'Backspace') {
          this.isChanged.emit(this.query);
          this._pastQuery = this.query;
        }
        return;
      }
  
      if (this._isValidQuery()) {
        this.isChanged.emit(this.query);
        if (!this.isExternalFilter) {
          this._createInternalFilteredList(this.query.toLowerCase());
        }
        if (this.isExternalFilter && this._pastQuery !== this.query.toLowerCase()) {
          this._waiting = true;
        }
      } else {
        this.filteredList = [];
        if (this.isExternalFilter) {
          this.isChanged.emit(this.query);
        }
      }
      this._pastQuery = this.query.toLowerCase();
    }
  
    public select(selectedIdx, clicked = false) {
      const item = this.filteredList[selectedIdx];
      const optionItem = item as AutocompleteOption;
      if (optionItem) {
        if (optionItem.type !== 'header' && optionItem.type !== 'action') {
          if (typeof item === 'string' || typeof item === 'object') {
            this.query = optionItem.label;
            this.onSelect.emit(optionItem.value);
            if (clicked || this.isMultiField) {
              this._isFocused = false;
              this._isOpen = false;
            }
            if (this.isMultiField) {
              this._fieldItems = optionItem.fields;
              if (!this._isFormV2Enabled) {
                this.input.nativeElement.blur();
              }
            }
            // Keep focus after selecting option for form V2
            if (this._isFormV2Enabled) {
              this._isFocused = true;
              this._isOpen = false;
              this._cdr.markForCheck();
            }
          }
          if (this.isExternalFilter) {
            this._asyncReset();
          } else {
            this._reset();
          }
        } else if (optionItem.type === 'action') {
          this.actionClick.emit(optionItem);
          this._isFocused = false;
          this._isOpen = false;
        }
      }
    }
  
    public handleFocus($event?: Event) {
      if (this.isReadOnly) {
        return;
      }
  
      this._escapeDropdown = false;
      this.input.nativeElement.focus();
      this._isFocused = true;
      this._isOpen = true;
  
      this.resetBlur();
      if ($event) {
        this.filter($event);
      }
      this.showClearButton();
  
      // FormV2: Set preloader waiting state to true when opening dropdown
      if (this._isFormV2Enabled && this.isExternalFilter) {
        this._waiting = true;
      }
      this._cdr.markForCheck();
    }
  
    public handleBlur() {
      if (!this.dropdown) {
        return;
      }
  
      // NOTE(Franklin/Cindy): IE only solution for dragging scrollbar in dropdown list
      if (document.activeElement === this.dropdown.nativeElement) {
        this.input.nativeElement.focus();
        return;
      }
  
      this._blurTimer = setTimeout(() => this.processBlur(), this._blurDebounce);
    }
  
    public handleQueryChange(val: string) {
      if (!val || !val.length) {
        if (this.isExternalFilter) {
          this._waiting = false;
        }
        this._pastQuery = '';
      }
      this._escapeDropdown = false;
      this._fieldItems = null;
      this.queryChange.emit(this.query);
      this._cdr.detectChanges();
    }
  
    public resetBlur() {
      if (this._blurTimer) {
        clearTimeout(this._blurTimer);
      }
    }
  
    public processBlur() {
      if (this.selectedIdx > -1) {
        const item = this.filteredList[this.selectedIdx];
        if (item.type !== 'header' && item.type !== 'action') {
          this.query = item.label;
          this.onSelect.emit(item.value);
          if (this.isMultiField) {
            this._fieldItems = item.fields;
          }
  
        }
      }
      if (!this.isExternalFilter) {
        this.filteredList = [];
      }
      if (!this._isFormV2Enabled) {
        this._isFocused = false;
      }
      this._isOpen = false;
      this.hideClearButton();
      this.selectedIdx = -1;
      this._cdr.markForCheck();
    }
  
    public stickyMouseDown(event) {
      event.preventDefault();
    }
  
    public stickyClick() {
      this.input.nativeElement.blur();
    }
  
    public handleMultiFieldFocus() {
      if (!this._isFocused) {
        this._isFocused = true;
        this._isOpen = true;
        this.input.nativeElement.focus();
      } else {
        if (!this._isFormV2Enabled) {
          this._isFocused = false;
          this._isOpen = false;
          this.input.nativeElement.blur();
        }
      }
    }
  
    public clearInput() {
      this.control.patchValue(null);
      this.queryChange.emit();
    }
  
    public showClearButton() {
      this.clearButtonShown = true;
    }
  
    public hideClearButton() {
      this.clearButtonShown = false;
    }
  
    /**
     * Handle up and down keyboard events to select
     * @internal
     */
    _handleKeyboardEvents(event: KeyboardEvent) {
      if (!this._waiting) {
        if ((event.key === 'ArrowDown' || event.key === 'Down') && this.selectedIdx + 1 < this.filteredList.length) {
          if (this.isAutoScroll && this.selectedIdx < 0) {
            this.selectedIdx = this.autoScrollIdx - 1;
          }
          // increment selected
          this.selectedIdx++;
          // scroll
          this._updateScrollPositionTimeout = setTimeout(() => this.updateScrollPosition());
  
        } else if ((event.key === 'ArrowUp' || event.key === 'Up') && this.selectedIdx > 0) {
          // decrement selected
          this.selectedIdx--;
          // scroll
          this._updateScrollPositionTimeout = setTimeout(() => this.updateScrollPosition());
        } else if (event.key === 'Escape' || event.key === 'Esc') {
          this._escapeDropdown = true;
        }
      }
    }
  
    /**
     * Handles click event for autocompletes with dropdown arrow and cancel button
     * @internal
     */
    _arrowClearClickEvent() {
      if (this._isFocused) {
        this.clearInput();
        if (!this._isFormV2Enabled) {
          this._isFocused = false;
          this._isOpen = false;
        }
      } else {
        if (!(this.isDisabled || this.isReadOnly)) {
          this.handleMultiFieldFocus();
        }
      }
    }
  
    private _isValidQuery() {
      return this.query.length > this.queryCheckLimit;
    }
  
    private getNoResults(): AutocompleteOption[] {
      return this.handleNoResult ? [{
        type: 'header',
        label: this.noResultText
      }] : [];
    }
  
    private filterByQuery(query: string): any[] {
      const filterFunction = typeof this.data[0] === 'string'
        ? filterByString.bind(null, query, this.queryStartsWith)
        : filterByObject.bind(null, query, this.queryStartsWith);
  
      const filteredList = this.data.filter(filterFunction);
      this.selectedIdx = -1;
      return filteredList.length ? filteredList : this.getNoResults();
    }
  
    private autoScrollToFirstMatch(query: string) {
      const filterFunction = typeof this.data[0] === 'string'
        ? filterByString.bind(null, query, this.queryStartsWith)
        : findIndexByObject.bind(null, query, this.queryStartsWith);
  
      const indexFound = this.data.findIndex(filterFunction);
  
      if (indexFound >= 0) {
        this.autoScrollIdx = indexFound;
      } else {
        this.autoScrollIdx = 0;
      }
      this._updateScrollPositionTimeout = setTimeout(() => this._updateAutoscrollPosition());
    }
  
    private updateScrollPosition() {
      const containerDiv = this.dropdown.nativeElement;
      const currentSelected = containerDiv.querySelector('.mos-c-autocomplete--selected');
  
      if (currentSelected !== null && currentSelected !== undefined) {
        const selectedHeight = currentSelected.clientHeight;
        const selectedOffsetTop = currentSelected.offsetTop;
        const containerHeight = containerDiv.clientHeight;
        const containerOffsetTop = containerDiv.offsetTop;
        const midwayPoint = containerHeight / 2 - selectedHeight / 2;
        const relativeTop = selectedOffsetTop - containerOffsetTop;
        const containerBounding = containerDiv.getBoundingClientRect();
        const selectedBounding = currentSelected.getBoundingClientRect();
  
        if (this.isAutoScroll) {
          // scroll up change
          if (containerBounding.top > selectedBounding.top) {
            containerDiv.scrollTop -= selectedHeight;
          }
          // scroll down change
          if (containerBounding.bottom < selectedBounding.bottom) {
            containerDiv.scrollTop += selectedHeight;
          }
        } else {
          containerDiv.scrollTop = Math.max(0, relativeTop - midwayPoint);
        }
      }
    }
  
    // have list start with first match on top
    private _updateAutoscrollPosition() {
      const containerDiv = this.dropdown.nativeElement;
      const currentSelected = containerDiv.querySelector('.mos-c-autocomplete--autoscroll-selected');
      const selectedOffsetTop = currentSelected.offsetTop;
      let absoluteOffset = 0;
  
      if (!this.isAbsoluteDropdown) {
        absoluteOffset = containerDiv.offsetTop;
      }
  
      containerDiv.scrollTop = selectedOffsetTop - absoluteOffset;
    }
  
    private _reset() {
      this.filteredList = [];
      this.selectedIdx = -1;
      this._cdr.markForCheck();
    }
  
    private _asyncReset() {
      this.selectedIdx = -1;
      this._cdr.markForCheck();
    }
  
    /** Method that will generate the internal filtered list */
    private _createInternalFilteredList(queryVal: string) {
      // if autoscroll-enabled, initial data is used as list and list autoscrolls
      if (this.isAutoScroll && !this.handleNoResult) {
        this._reset();
        this.filteredList = this.data;
        this.autoScrollToFirstMatch(queryVal);
      } else {
        this.filteredList = (this.immediateListDisplay && !queryVal) ? this.data : this.filterByQuery(queryVal);
      }
    }
  
    private _initControlSubscription() {
      this._destroyControlSubscription();
      if (this._controlSubscription) {
        this._controlSubscription.add(this.control.valueChanges.subscribe(this.handleQueryChange.bind(this)));
        this._controlSubscription.add(this._control.valueChanges.subscribe(this._onChange));
      }
    }
  
    private _destroyControlSubscription() {
      if (this._controlSubscription) {
        this._controlSubscription.unsubscribe();
        delete this._controlSubscription;
      }
    }
  
    private _applyRequiredValidator() {
      // only apply if attribute exists, required not set to false and required validator hasn't been
      // applied already
      if (this._required !== null && this.required !== false && !this._oldValidtors) {
        // Angular's validators api from Forms are kind of bad
        // recompose the old validators with the required validator
        this._oldValidtors = this.control.validator;
        this.control.setValidators(Validators.compose([this._oldValidtors, Validators.required]));
      }
    }
  
    private _removeRequiredValidator() {
      // restore former validators before applying the required validator
      if (this._oldValidtors) {
        this.control.setValidators(this._oldValidtors);
        this._oldValidtors = null;
      }
    }
  
    /**
     * Method to paint multi-field display when preset value is present using query or ngModel
     */
    private _paintMultiFieldDisplay() {
      let item: AutocompleteOption | string;
  
      if (this.filteredList.length === 1) {
        item = this.filteredList[0];
      } else if (this.filteredList.length > 1 && this.startingId) {
        item = this.filteredList.find(filteredItem => (filteredItem as AutocompleteOption).id === this.startingId);
      }
  
      if (item && (this.query === ((item as AutocompleteOption).label || item as string))) {
        this._fieldItems = (item as AutocompleteOption).fields;
        this._cdr.markForCheck();
      }
    }
  
    /**
     * checks if a click happens outside of the element, and close if true.
     */
    private _clickOutside(event) {
      const outsideElement = !!this.dropdown ?
        !this._elementRef.nativeElement.contains(event.target)
        && !this.dropdown.nativeElement.contains(event.target)
        : !this._elementRef.nativeElement.contains(event.target);
  
      if (outsideElement) {
        // On option select dropdown is considered false so need to check If event came from clicking option item
        if (event.target.tagName !== 'ATLAS-ICON'
          && event.target.tagName !== 'BUTTON'
          && !event.target.classList.contains('mos-c-autocomplete__list__item')
          && !event.target.classList.contains('mos-c-autocomplete__list__multi--fields')
          && !event.target.classList.contains('mos-c-autocomplete__list__multi--label')
          && !event.target.classList.contains('mos-c-autocomplete__input__multi--fields')
          && !event.target.classList.contains('mos-c-autocomplete__input__multi--label')
          && !event.target.classList.contains('mos-c-autocomplete__input__multi--display')) {
          this._isFocused = false;
          this._isOpen = false;
          this._cdr.markForCheck();
        }
      }
    }
  }
  