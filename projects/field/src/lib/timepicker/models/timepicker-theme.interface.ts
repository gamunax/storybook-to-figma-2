import { TimepickerContainerTheme } from './container-theme.interface';
import { TimepickerDialTheme } from './timepicker-dial-theme.interface';
import { TimepickerFaceTheme } from './timepicker-face-theme.interface';

export interface TimepickerTheme {
    clockFace?: TimepickerFaceTheme;
    container?: TimepickerContainerTheme;
    dial?: TimepickerDialTheme;
}
