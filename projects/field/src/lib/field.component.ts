import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Actions, ThemingService, FieldVariants, FieldSize, Colors, Styles } from 'atlas-cdk';
import { Subject } from 'rxjs';
import { startWith, takeUntil, tap } from 'rxjs/operators';

import { FieldErrorComponent } from './error/field-error.component';
import { HaloFormFieldControl } from './field.control';
import { config } from './field.theming';
import { FieldHintComponent } from './hint/field-hint.component';
import { FieldLabelComponent } from './label/field-label.component';
import { FieldPrefixComponent } from './prefix/field-prefix.component';
import { FieldSuffixComponent } from './suffix/field-suffix.component';
import { UtilsService } from './utils.service';

let nextUniqueId = 0;

export const CONTROL = new InjectionToken<FieldComponent>('FieldComponent');

@Component({
  selector: 'atlas-field',
  exportAs: 'haloField',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
  host: {
    'class': 'field',
    '[class.field-full-width]': 'fullWidth',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FieldComponent implements AfterContentInit, OnChanges, OnDestroy  {
  private _destroyed$ = new Subject<void>();
  _labelId = `label-${nextUniqueId++}`;

  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `style` instead.
   */
  @Input() variant: FieldVariants;

  /** Set the input style */
  @Input() style: Styles | FieldVariants = Styles.outlined;
  
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * Set the field action 
   */
  @Input() action: Actions;

  /** Set the action color for the input */
  @Input() color: Colors = Colors.neutral;

  /** Removes the max-width set on the field */
  @Input() fullWidth = false;

  /** The form-field size. */
  @Input()
  get size(): FieldSize {
    return this._size;
  }
  set size(value: FieldSize) {
    this._size = value;
  }
  private _size: FieldSize = FieldSize.medium;
  
  @ContentChild(HaloFormFieldControl) _controlNonStatic!: HaloFormFieldControl<any>;
  @ContentChild(NgControl, {static: true}) _controlStatic!: HaloFormFieldControl<any>;
  get _control() {
    return this._explicitFormFieldControl || this._controlNonStatic || this._controlStatic;
  }
  set _control(value) {
    this._explicitFormFieldControl = value;
  }
  private _explicitFormFieldControl!: HaloFormFieldControl<any>;

  /** Whether the required marker should be hidden. */
  @Input()
  get hideRequiredMarker(): boolean { return this._hideRequiredMarker; }
  set hideRequiredMarker(value: boolean) {
    this._hideRequiredMarker = coerceBooleanProperty(value);
  }
  private _hideRequiredMarker = false;

  /**
   * @internal
   * Used to determine if any children exists from ng-content
   */
  @ContentChildren(FieldPrefixComponent, {descendants: true}) _fieldPrefixChildren: QueryList<FieldPrefixComponent> | undefined;
  @ContentChildren(FieldSuffixComponent, {descendants: true}) _fieldSuffixChildren: QueryList<FieldSuffixComponent> | undefined;
  @ContentChildren(FieldLabelComponent, {descendants: true}) _labelChildren: QueryList<FieldLabelComponent> | undefined;
  @ContentChildren(FieldErrorComponent, {descendants: true}) _errorChildren: QueryList<FieldErrorComponent> | undefined;
  @ContentChildren(FieldHintComponent, {descendants: true}) _hintChildren: QueryList<FieldHintComponent> | undefined;
  @ViewChild('connectionContainer', {static: true}) _connectionContainerRef: ElementRef;

  /** @internal */
  typeTextArea: boolean = false;
  
  constructor(
    private _elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private _themingService: ThemingService,
    private _utilsService: UtilsService,
  ) {
    this._themingService.applyConfig(config);
  }
  
  ngOnChanges(changes: SimpleChanges): void {    
    this._utilsService.setAction(this.action);
  }

  ngAfterContentInit() {
    this._validateControlChild();
    const control = this._control as any;
    this.typeTextArea = control?._elementRef?.nativeElement?.localName  === 'textarea';
    if (control.controlType) {
      this._elementRef.nativeElement.classList.add(`control-type-${control.controlType}`);
    }

    // Subscribe to changes in the child control state in order to update the form field UI.
    // TODO: fix or research when stateChanges$ is available in date-range input
    if (control.stateChanges$) {
      control.stateChanges$
        .pipe(
          takeUntil(this._destroyed$),
          startWith(null! as string),
          tap(() => this._changeDetectorRef.markForCheck()),
        )
        .subscribe();
    }

    // Run change detection if the value changes.
    if (control.ngControl && control.ngControl.valueChanges) {
      control.ngControl.valueChanges
        .pipe(
          takeUntil(this._destroyed$),
          tap(() => this._changeDetectorRef.markForCheck()),
        )
        .subscribe();
    }
  }

  protected _validateControlChild() {
    if (!this._control) {
      throw new Error('Missing control, it must contain a atlasInput directive.');
    }
  }

  get shouldDisplayErrors(): boolean {
    return !!(this._errorChildren &&
      (this._errorChildren || []).length > 0 &&
      this._control.ngControl?.invalid &&
      !this._control.focused &&
      this._control.ngControl?.touched);
  }

  get shouldDisplayHints(): boolean {
    return !!(!this.shouldDisplayErrors && (this._hintChildren || []).length > 0);
  }
 
  _shouldForward(prop: keyof NgControl) {
    const ngControl = this._control ? this._control.ngControl : null;
    return ngControl && ngControl[prop];
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
  
  getConnectedOverlayOrigin(): ElementRef {
    return this._connectionContainerRef || this._elementRef;
  }
}
