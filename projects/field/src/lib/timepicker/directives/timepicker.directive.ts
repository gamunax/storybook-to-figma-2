import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    SimpleChanges,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CONTROL, FieldComponent } from '../../field.component';
import { TimepickerComponent } from '../components/timepicker/timepicker.component';
import { TimepickerAdapter } from '../services/timepicker-adapter';
import { TIMEPICKER_LOCALE } from '../tokens/timepicker-time-locale.token';

@Directive({
    selector: 'input[Timepicker]',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: TimepickerDirective,
            multi: true
        }
    ],
    // tslint:disable-next-line:no-host-metadata-property
    host: {
        '[disabled]': 'disabled',
        '(blur)': 'onTouched()',
        '[attr.tabindex]': 'tabindex',
    },
})
export class TimepickerDirective implements ControlValueAccessor, OnDestroy, OnChanges {

    get element(): HTMLElement {
        return this._elementRef && this._elementRef.nativeElement;
    }

    get format(): number {
        return this._format;
    }

    @Input()
    set format(value: number) {
        this._format = +value === 24 ? 24 : 12;
        const isDynamicallyChanged = value && (this._previousFormat && this._previousFormat !== this._format);

        if (isDynamicallyChanged) {
            this.value = this._value;
            this._timepicker.updateTime(this._value);
        }
        this._previousFormat = this._format;
    }

    get max(): string | DateTime {
        return this._max;
    }

    @Input()
    set max(value: string | DateTime) {
        if (typeof value === 'string') {
            this._max = TimepickerAdapter.parseTime(value, {locale: this._locale, format: this.format});

            return;
        }
        this._max = value;
    }

    get min(): string | DateTime {
        return this._min;
    }

    @Input()
    set min(value: string | DateTime) {
        if (typeof value === 'string') {
            this._min = TimepickerAdapter.parseTime(value, {locale: this._locale, format: this.format});

            return;
        }
        this._min = value;
    }

    @Input('Timepicker')
    set timepicker(picker: TimepickerComponent) {
        this._registerTimepicker(picker);
    }

    get value(): string {
        if (!this._value) {
            return '';
        }

        return TimepickerAdapter.toLocaleTimeString(this._value, {format: this.format, locale: this._locale});
    }

    @Input()
    set value(value: any) {
        if (!value) {
            this._value = '';
            this._updateInputValue();

            return;
        }

        if (typeof value !== 'string') {
            value = value.target.value;
        }
        const time = TimepickerAdapter.formatTime(value, {locale: this._locale, format: this.format});
        const isAvailable = TimepickerAdapter.isTimeAvailable(
            time,
            this._min as DateTime,
            this._max as DateTime,
            'minute',
            this._timepicker.minutesGap,
            this._format
        );

        if (isAvailable) {
            this._value = time;
            this._updateInputValue();
            return;
        }
        console.warn(`Selected time doesn't match min or max value`);
    }

    private set _defaultTime(time: string) {
        this._timepicker.defaultTime = TimepickerAdapter.formatTime(time, {
            locale: this._locale,
            format: this.format
        });
    }

    /** Aria label of timepicker. */
    @Input('aria-label') ariaLabel = '';

    /** Tab index of timepicker. */
    @Input('tabindex') tabindex: number = 0;

    // TODO: IMPROVE DETECTING (INJECT) MAT-FORM-FIELD IF PRESENT
    @HostBinding('attr.cdkOverlayOrigin') cdkOverlayOrigin: CdkOverlayOrigin;
    @Input() disableClick: boolean;
    @Input() disabled: boolean;

    private _format = 12;
    private _max: string | DateTime;
    private _min: string | DateTime;
    private _previousFormat: number;
    private _subsCtrl$: Subject<void> = new Subject<void>();
    private _timepicker: TimepickerComponent;
    private _value: string = '';

    constructor(private _elementRef: ElementRef,
                @Optional() @Inject(CONTROL) private _Control: FieldComponent,
                @Inject(TIMEPICKER_LOCALE) private _locale: string,) {
                this.cdkOverlayOrigin =
                    new CdkOverlayOrigin(_Control ? this._Control.getConnectedOverlayOrigin() : this._elementRef);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.value && changes.value.currentValue) {
            this._defaultTime = changes.value.currentValue;
        }
    }

    ngOnDestroy() {
        this._unregisterTimepicker();
        this._subsCtrl$.next();
        this._subsCtrl$.complete();
    }

    // @HostListener('click', ['$event'])
    // onClick(event) {
    //     if (!this.disableClick) {
    //         this._timepicker.open();
    //         event.stopPropagation();
    //     }
    // }

    onTouched = () => {
    }

    registerOnChange(fn: (value: any) => void): void {
        this._onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    @HostListener('change', ['$event'])
    updateValue(value: string) {
        this.value = value;
        this._onChange(value);
    }

    writeValue(value: string): void {
        this.value = value;
        if (value) {
            this._defaultTime = value;
        }
    }

    private _onChange: (value: any) => void = () => {
    }

    private _registerTimepicker(picker: TimepickerComponent): void {
        if (picker) {
            this._timepicker = picker;
            this._timepicker.registerInput(this);
            this._timepicker.timeSet
                .pipe(takeUntil(this._subsCtrl$))
                .subscribe((time: string) => {
                    this.value = time;
                    this._onChange(this.value);
                    this.onTouched();
                    this._defaultTime = this._value;
                });
        }
        else {
            throw new Error('TimepickerComponent is not defined.' +
                ' Please make sure you passed the timepicker to Timepicker directive');
        }
    }

    private _unregisterTimepicker(): void {
        if (this._timepicker) {
            this._timepicker.unregisterInput();
        }
    }

    private _updateInputValue(): void {
        this._elementRef.nativeElement.value = this.value;
    }

    getConnectedOverlayOrigin(): ElementRef {
        return this.cdkOverlayOrigin.elementRef;
    }
}

