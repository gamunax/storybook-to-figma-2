import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input } from '@angular/core';
import { ButtonSizings, ButtonVariants } from 'atlas-button';
import { Actions, Radii } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';

import { TimepickerComponent } from '../timepicker/timepicker.component';


@Component({
    selector: 'timepicker-toggle',
    templateUrl: 'timepicker-toggle.component.html',
})
export class TimepickerToggleComponent {
    @Input()
    get disabled(): boolean {
        return this._disabled === undefined
            ? this.timepicker.disabled
            : this._disabled;
    }

    set disabled(value: boolean) {
        this._disabled = coerceBooleanProperty(value);
    }
    private _disabled: boolean = false;

    @Input() timepicker: TimepickerComponent;

    @Input()
    get iconColor(): Actions {
        return this._iconColor;
    }
    set iconColor(color: Actions) {
        this._iconColor = color;
    }
    private _iconColor:Actions = Actions.default;

    /** @internal */
    _radii: Radii = Radii.rounded;
    /** @internal */
    _buttonSize: ButtonSizings = ButtonSizings.xsmall;
    /** @internal */
    _iconSize: IconSizes = IconSizes.medium;
    /** @internal */
    _buttonVariant: ButtonVariants = ButtonVariants.text;

    open(event: Event): void {
        if (this.timepicker && !this.disabled) {
            this.timepicker.open();
            event.stopPropagation();
        }
    }
}
