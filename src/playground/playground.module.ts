import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'atlas-accordion';
import { AlertModule } from 'atlas-alert';
import { AppBarModule } from 'atlas-app-bar';
import { AvatarModule } from 'atlas-avatar';
import { BadgeModule } from 'atlas-badge';
import { BreadcrumbModule } from 'atlas-breadcrumb';
import { ButtonModule } from 'atlas-button';
import { CdkModule, DATE_FORMATS, DATE_LOCALE, DialogModule } from 'atlas-cdk';
import { ChipsModule } from 'atlas-chips';
import { DividerModule } from 'atlas-divider';
import { FieldModule } from 'atlas-field';
import { IconModule } from 'atlas-icon';
import { ListModule } from 'atlas-list';
import { ModalModule } from 'atlas-modal';
import { PaginationModule } from 'atlas-pagination';
import { StepperModule } from 'atlas-stepper';
import { SwitchModule } from 'atlas-switch';
import { TableModule } from 'atlas-table';
import { TabsModule } from 'atlas-tabs';
import { TooltipModule } from 'atlas-tooltip';
import { SliderModule } from 'atlas-slider';
import { SnackbarModule } from 'atlas-snackbar';
import { LinkModule } from 'atlas-link';
import { FiledropModule } from 'atlas-filedrop';
import { CheckboxModule } from 'atlas-checkbox';
import { DialogTest, PlaygroundComponent } from './playground.component';
import { RatingModule } from 'atlas-rating';
import { BottomNavigationModule } from 'atlas-bottom-navigation';
import SharedModule from 'src/common/shared.module';
import { CardModule } from 'projects/card/src/public-api';
import { MenuModule } from "atlas-menu";
import { OverlayModule } from '@angular/cdk/overlay';
import { NavigationMenuModule } from 'atlas-navigation';
import { RadioModule } from 'atlas-radio';
import { FormsModule } from '@angular/forms';
import { LegacyModule } from '../../projects/legacy/src/legacy.module';

const MY_DATE_FORMAT = {
    parse: {
    dateInput: 'dd/M/yyyy',
    },
    display: {
        ateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
        dateInput: {year: 'numeric', month: '2-digit', day: '2-digit'},
        monthYearA11yLabel: {year: 'numeric', month: 'long'},
        monthYearLabel: {year: 'numeric', month: 'short'},
    },
    };

@NgModule({
    declarations: [
        PlaygroundComponent,
        DialogTest
    ],
    imports: [
        SharedModule,
        OverlayModule,
        CardModule,
        CommonModule,
        CdkModule,
        DialogModule,
        BrowserAnimationsModule,
        ButtonModule,
        BreadcrumbModule,
        TableModule,
        FieldModule,
        IconModule,
        ReactiveFormsModule,
        BadgeModule,
        ChipsModule,
        AvatarModule,
        SwitchModule,
        StepperModule,
        TabsModule,
        ModalModule,
        AlertModule,
        PaginationModule,
        AccordionModule,
        TooltipModule,
        AppBarModule,
        ButtonModule,
        SliderModule,
        ListModule,
        DividerModule,
        SnackbarModule,
        LinkModule,
        FiledropModule,
        CheckboxModule,
        BottomNavigationModule,
        RatingModule,
        NavigationMenuModule,
        MenuModule,
        RadioModule,
        LegacyModule,
        FormsModule
    ],
    providers: [
        { provide: DATE_LOCALE, useValue: 'es-AR'},
        { provide: DATE_FORMATS, useValue: MY_DATE_FORMAT },
],
})
export class PlaygroundModule { }
