import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { HALO_DIALOG_DATA } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';

import { TimepickerBaseDirective } from '../../directives/timepicker-base.directive';
import { TimepickerConfig } from '../../models/timepicker-config.interface';
import { TimepickerEventService } from '../../services/timepicker-event.service';
import { TimepickerService } from '../../services/timepicker.service';
import { TIMEPICKER_LOCALE } from '../../tokens/timepicker-time-locale.token';
import { TimepickerDialogRef } from '../../utils/timepicker-dialog-ref.util';

@Component({
    selector: 'timepicker-dialog',    
    templateUrl: 'timepicker-dialog.component.html',
    styleUrls: ['timepicker-dialog.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TimepickerDialogComponent extends TimepickerBaseDirective {

    size: IconSizes = IconSizes.small;
    
    constructor(@Inject(HALO_DIALOG_DATA) public data: TimepickerConfig,
                protected _dialogRef: TimepickerDialogRef,
                timepickerSrv: TimepickerService,
                eventSrv: TimepickerEventService,
                @Inject(TIMEPICKER_LOCALE) locale: string) {

        super(timepickerSrv, eventSrv, locale, data);
    }

    close(): void {
        this._dialogRef.close();
    }

}
