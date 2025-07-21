import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'atlas-button';
import { DialogModule } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';

import { Timepicker12HoursFaceComponent } from './components/timepicker-12-hours-face/timepicker-12-hours-face.component';
import { Timepicker24HoursFaceComponent } from './components/timepicker-24-hours-face/timepicker-24-hours-face.component';
import { TimepickerContentComponent } from './components/timepicker-content/timepicker-content.component';
import { TimepickerDialControlComponent } from './components/timepicker-dial-control/timepicker-dial-control.component';
import { TimepickerDialComponent } from './components/timepicker-dial/timepicker-dial.component';
import { TimepickerDialogComponent } from './components/timepicker-dialog/timepicker-dialog.component';
import { TimepickerFaceComponent } from './components/timepicker-face/timepicker-face.component';
import { TimepickerControlComponent } from './components/timepicker-field/timepicker-control/timepicker-control.component';
import { TimepickerFieldComponent } from './components/timepicker-field/timepicker-field.component';
import { TimepickerHoursFaceDirective } from './components/timepicker-hours-face/timepicker-hours-face.directive';
import { TimepickerMinutesFaceComponent } from './components/timepicker-minutes-face/timepicker-minutes-face.component';
import { TimepickerPeriodComponent } from './components/timepicker-period/timepicker-period.component';
import { TimepickerToggleComponent } from './components/timepicker-toggle/timepicker-toggle.component';
import { TimepickerComponent } from './components/timepicker/timepicker.component';
import { TimepickerAutofocusDirective } from './directives/timepicker-autofocus.directive';
import { TimepickerBaseDirective } from './directives/timepicker-base.directive';
import { TimepickerThemeDirective } from './directives/timepicker-theme.directive';
import { TimepickerToggleIconDirective } from './directives/timepicker-toggle-icon.directive';
import { TimepickerDirective } from './directives/timepicker.directive';
import { TimepickerActiveHourPipe } from './pipes/timepicker-active-hour.pipe';
import { TimepickerActiveMinutePipe } from './pipes/timepicker-active-minute.pipe';
import { TimepickerMinutesFormatterPipe } from './pipes/timepicker-minutes-formatter.pipe';
import { TimepickerParserPipe } from './pipes/timepicker-parser.pipe';
import { TimepickerTimeFormatterPipe } from './pipes/timepicker-time-formatter.pipe';
import { TimepickerTimeLocalizerPipe } from './pipes/timepicker-time-localizer.pipe';
import { TIMEPICKER_CONFIG } from './tokens/timepicker-config.token';
import { TIMEPICKER_LOCALE } from './tokens/timepicker-time-locale.token';

@NgModule({
    imports: [
        CommonModule,
        A11yModule,
        FormsModule,
        ButtonModule,
        DialogModule,
        IconModule,
        OverlayModule,
        PortalModule,
    ],
    exports: [
        TimepickerComponent,
        TimepickerToggleComponent,
        TimepickerFieldComponent,
        TimepickerDirective,
        TimepickerToggleIconDirective,
    ],
    declarations: [
        TimepickerBaseDirective,
        TimepickerHoursFaceDirective,
        TimepickerFieldComponent,
        TimepickerActiveHourPipe,
        TimepickerActiveMinutePipe,
        TimepickerComponent,
        TimepickerDialComponent,
        TimepickerDialControlComponent,
        TimepickerDialogComponent,
        TimepickerDirective,
        TimepickerFaceComponent,
        TimepickerMinutesFaceComponent,
        TimepickerPeriodComponent,
        TimepickerToggleComponent,
        Timepicker12HoursFaceComponent,
        Timepicker24HoursFaceComponent,
        TimepickerToggleIconDirective,
        TimepickerAutofocusDirective,
        TimepickerMinutesFormatterPipe,
        TimepickerThemeDirective,
        TimepickerParserPipe,
        TimepickerContentComponent,
        TimepickerTimeFormatterPipe,
        TimepickerTimeLocalizerPipe,
        TimepickerControlComponent,
    ]
})
export class TimepickerModule {
  static setLocale(
    locale: string
  ): ModuleWithProviders<TimepickerModule> {
    return {
      ngModule: TimepickerModule,
      providers: [
        { provide: TIMEPICKER_LOCALE, useValue: locale },
        { provide: TIMEPICKER_CONFIG, useValue: undefined },
      ],
    };
  }
}
