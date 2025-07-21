import { TemplateRef } from '@angular/core';
import { DateTime } from 'luxon';

import { TimepickerRef } from './timepicker-ref.interface';
import { TimepickerTheme } from './timepicker-theme.interface';

export interface TimepickerConfig {
    appendToInput: boolean;
    cancelBtnTmpl: TemplateRef<Node>;
    color: any;
    confirmBtnTmpl: TemplateRef<Node>;
    defaultTime: string;
    disableAnimation: boolean;
    disabled: boolean;
    editableHintTmpl: TemplateRef<Node>;
    enableKeyboardInput: boolean;
    format: number;
    hoursOnly: boolean;
    inputElement: any;
    maxTime: DateTime;
    minTime: DateTime;
    minutesGap: number;
    preventOverlayClick: boolean;
    theme: TimepickerTheme;
    time: string;
    timepickerBaseRef: TimepickerRef;
    timepickerClass: string;
}
