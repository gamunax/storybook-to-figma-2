import { CdkOverlayOrigin, OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, HostBinding, Input, Output, TemplateRef } from '@angular/core';
import { Actions } from 'atlas-cdk';
import { DateTime } from 'luxon';
import { Subject } from 'rxjs';

import { TimepickerDirective } from '../../directives/timepicker.directive';
import { TimepickerRef } from '../../models/timepicker-ref.interface';
import { TimepickerTheme } from '../../models/timepicker-theme.interface';
import { TimepickerDialogService } from '../../services/timepicker.dialog.service';
import { TIMEPICKER_CONFIG } from '../../tokens/timepicker-config.token';
import { TimepickerDialogRef } from '../../utils/timepicker-dialog-ref.util';
import { TimepickerDialogComponent } from '../timepicker-dialog/timepicker-dialog.component';

let config;

// cdkConnectedOverlay
// [cdkConnectedOverlayHasBackdrop]='true'
// cdkConnectedOverlayBackdropClass='cdk-overlay-transparent-backdrop'
// (backdropClick)='close()'
// [cdkConnectedOverlayOrigin]='overlayOrigin'
// [cdkConnectedOverlayOpen]='showPicker'
@Component({
    selector: 'timepicker',
    template: `
		<ng-template></ng-template>`,
    providers: [
        {
            provide: TIMEPICKER_CONFIG, useFactory() {
                return config;
            }
        }
    ]
})
export class TimepickerComponent implements TimepickerRef {

    static nextId: number = 0;
    /** Change the color of the timepicker  */
    @Input()
    set color(newValue: Actions) {
        this._color = newValue;
    }

    get color(): Actions {
        return this._color;
    }

    get disabled(): boolean {
        return this._timepickerInput && this._timepickerInput.disabled;
    }

    get format(): number {
        return this._timepickerInput ? this._timepickerInput.format : this._format;
    }
    /** Sets time formatting  */
    @Input()
    set format(value: number) {
        this._format = value === 24 ? 24 : 12;
    }

    get inputElement(): HTMLElement {
        return this._timepickerInput && this._timepickerInput.element;
    }

    get maxTime(): string | DateTime {
        return this._timepickerInput ? (this._timepickerInput.max as DateTime) : this.max;
    }

    get minTime(): string | DateTime {
        return this._timepickerInput ? (this._timepickerInput.min as DateTime) : this.min;
    }

    get minutesGap(): number {
        return this._minutesGap;
    }
    /** Sets minute gap  */
    @Input()
    set minutesGap(gap: number) {
        if (gap == null) {
            return;
        }
        gap = Math.floor(gap);
        this._minutesGap = gap <= 59 ? gap : 1;
    }

    get overlayOrigin(): CdkOverlayOrigin {
        return this._timepickerInput ? this._timepickerInput.cdkOverlayOrigin : void 0;
    }

    get time(): string {
        return this._timepickerInput && this._timepickerInput.value;
    }

    set timepickerTheme(newValue: TimepickerTheme) {
        this._timepickerTheme = newValue;
    }
    /** Append the timepicker to the input  */
    @Input() appendToInput: boolean;
    /** Cancel button template ref  */
    @Input() cancelBtnTmpl: TemplateRef<Node>;
    /** Confirm button template ref  */
    @Input() confirmBtnTmpl: TemplateRef<Node>;
    /** Default time  */
    @Input() defaultTime: string;
    /** Animation  */
    @Input() disableAnimation: boolean;
    /** Hint template ref  */
    @Input() editableHintTmpl: TemplateRef<Node>;
    /** Keyboard input  */
    @Input() enableKeyboardInput: boolean;
    /** Show hours only  */
    @Input() hoursOnly = false;
    /** Escape key  */
    @Input() isEsc = !0;
    /** Maximum value  */
    @Input() max: string | DateTime;
    /** Minimum value  */
    @Input() min: string | DateTime;
    /** Prevent overlay click  */
    @Input() preventOverlayClick: boolean;
    /** Show picker  */
    showPicker: boolean = !1;
    /** Set a theme  */
    @Input() theme: TimepickerTheme;
    /** Set a custom class for the timepicker  */
    @Input() timepickerClass: string;
    /** Time changed string output  */
    @Output() timeChanged = new EventEmitter<string>();
    /** Time set string output  */
    @Output() timeSet = new EventEmitter<string>();
    /** Closed output  */
    @Output() closed = new EventEmitter<void>();
    /** Opened output  */
    @Output() opened = new EventEmitter<void>();
    /** Hours selected number output  */
    @Output() hourSelected = new EventEmitter<number>();
    @HostBinding('id') id: string = `timepicker_${++TimepickerComponent.nextId}`;
    timeUpdated = new Subject<string>(); // used in the dialog, check if a better approach can be used
    private _color: any = 'primary';
    private _dialogRef: TimepickerDialogRef;
    private _format: number;
    private _minutesGap: number;
    private _timepickerTheme: TimepickerTheme;
    private _overlayRef: OverlayRef;
    private _timepickerInput: TimepickerDirective;

    constructor(private _timepickerDialogSvc: TimepickerDialogService) { }

    close(): void {
        if (this.appendToInput) {
            this._overlayRef && this._overlayRef.dispose();
        }
        else {
            this._dialogRef && this._dialogRef.close();
        }
        this.showPicker = !1;
        this.closed.emit();
    }

    open(): void {
        config = {
            timepickerBaseRef: this,
            time: this.time,
            defaultTime: this.defaultTime,
            maxTime: this.maxTime,
            minTime: this.minTime,
            format: this.format,
            minutesGap: this.minutesGap,
            disableAnimation: this.disableAnimation,
            cancelBtnTmpl: this.cancelBtnTmpl,
            confirmBtnTmpl: this.confirmBtnTmpl,
            editableHintTmpl: this.editableHintTmpl,
            disabled: this.disabled,
            enableKeyboardInput: this.enableKeyboardInput,
            preventOverlayClick: this.preventOverlayClick,
            appendToInput: this.appendToInput,
            hoursOnly: this.hoursOnly,
            theme: this.theme || this._timepickerTheme,
            timepickerClass: this.timepickerClass,
            inputElement: this.inputElement,
            color: this.color
        };

        if (this.appendToInput) {
            this.showPicker = !0;
        }
        else {
            this._dialogRef = this._timepickerDialogSvc.open(TimepickerDialogComponent,
                this._timepickerInput,
                { data: { ...config } });

            this._dialogRef.afterClosed()
                .subscribe(() => {
                    this.closed.emit();
                });
        }
        this.opened.emit();
    }

    /***
     * Register an input with this timepicker.
     * input - The timepicker input to register with this timepicker
     */
    registerInput(input: TimepickerDirective): void {
        if (this._timepickerInput) {
            throw Error('A Timepicker can only be associated with a single input.');
        }
        this._timepickerInput = input;
    }

    unregisterInput(): void {
        this._timepickerInput = void 0;
    }

    updateTime(time: string): void {
        this.timeUpdated.next(time);
    }
}

