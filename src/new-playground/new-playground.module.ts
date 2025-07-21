import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AccordionModule } from 'atlas-accordion';
import { AlertModule } from 'atlas-alert';
import { AppBarModule } from 'atlas-app-bar';
import { AvatarModule } from 'atlas-avatar';
import { BadgeModule } from 'atlas-badge';
import { BreadcrumbModule } from 'atlas-breadcrumb';
import { ButtonModule } from 'atlas-button';
import { CdkModule, DATE_FORMATS, DATE_LOCALE, DialogModule, HALO_DIALOG_DATA } from 'atlas-cdk';
import { ChipsModule } from 'atlas-chips';
import { DividerModule } from 'atlas-divider';
import { EndDateDirective, FieldModule, StartDateDirective } from 'atlas-field';
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
import { DialogTest, NewPlaygroundComponent } from './new-playground.component';
import { RatingModule } from 'atlas-rating';
import SharedModule from 'src/common/shared.module';
import { BottomNavigationModule } from 'atlas-bottom-navigation';
import { CardModule } from 'projects/card/src/public-api';
import { MenuModule } from "atlas-menu";
import { OverlayModule } from '@angular/cdk/overlay';
import { NavigationMenuModule } from 'atlas-navigation';
import { ProgressModule } from 'atlas-progress';
import { RadioModule } from 'atlas-radio';
import { PopoverModule } from 'atlas-popover';
import { DrawerModule } from 'atlas-drawer';
import { ButtonPlayground } from './button-playground/button-playground.component';
import { AlertPlayground } from './alert-playground/alert-playground.component';
import { FieldPlayground } from './field-playground/field-playground.component';
import { SelectPlayground } from './select-playground/select-playground.component';
import { RadioPlayground } from './radio-playground/radio-playground.component';
import { ChipPlayground } from './chip-playground/chip-playground.component';
import { AccordionPlayground } from './accordion-playground/accordion-playground.component';
import { PaginationPlayground } from './pagination-playground/pagination-playground.component';
import { TablePlayground } from './table-playground/table-playground.component';
import { RatingPlayground } from './rating-playground/rating-playground.component';
import { CheckboxPlayground } from './checkbox-playground/checkbox-playground.component';
import { SwitchPlayground } from './switch-playground/switch-playground.component';
import { AvatarPlayground } from './avatar-playground/avatar-playground.component';
import { BadgePlayground } from './badge-playground/badge-playground.component';
import { SliderPlayground } from './slider-playground/slider-playground.component';
import { FiledropPlayground } from './filedrop-playground/filedrop-playground.component';
import { TabsPlayground } from './tabs-playground/tabs-playground.component';
import { BreadcrumbPlayground } from './breadcrumb-playground/breadcrumb-playground.component';
import { ListItemPlayground } from './list-item-playground/list-item-playground.component';
import { DividerPlayground } from './divider-playground/divider-playground.component';
import { PopoverPlayground } from './popover-playground/popover-playground.component';
import { TooltipPlayground } from './tooltip-playground/tooltip-playground.component';
import { DatepickerPlayground } from './datepicker-playground/datepicker-playground.component';
import { TimepickerPlayground } from './timepicker-playground/timepicker-playground.component';
import { ProgressPlayground } from './progress-playground/progress-playground.component';
import { SnackbarPlayground } from './snackbar-playground/snackbar-playground.component';
import { NavigationPlayground } from './navigation-playground/navigation-playground.component';
import { IconButtonPlayground } from './icon-button-playground/icon-button-playground.component';
import { IconPlayground } from './icon-playground/icon-playground.component';
import { MenuPlayground } from './menu-playground/menu-playground.component';
import { StepperPlayground } from './stepper-playground/stepper-playground.component';
import { BottomNavigationPlayground } from './bottom-navigation-playground/bottom-navigation-playground.component';
import { ButtonGroupPlayground } from './button-group-playground/button-group-playground.component';
import { AppBarPlayground } from './app-bar-playground/app-bar-playground.component';
import { CardPlayground } from './card-playground/card-playground.component';
import { DrawerPlayground } from './drawer-playground/drawer-playground.component';
import { ModalPlayground } from './modal-playground/modal-playground.component';
import { VirtualScrollPlayground } from './templates/virtual-scroll/virtual-scroll-playground.component';
import { LinkPlayground } from './link-playground/link-playground.component';
import { LegacyModule } from 'atlas-legacy';
import { DropdownPlayground } from './dropdown-playground/dropdown-playground.component';
import { RouterModule } from '@angular/router';

const MY_DATE_FORMAT = {
    parse: {
    dateInput: 'M/dd/yyyy',
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
        NewPlaygroundComponent,
        ButtonPlayground,
        AlertPlayground,
        FieldPlayground,
        SelectPlayground,
        RadioPlayground,
        ChipPlayground,
        AccordionPlayground,
        PaginationPlayground,
        TablePlayground,
        RatingPlayground,
        CheckboxPlayground,
        SwitchPlayground,
        AvatarPlayground,
        BadgePlayground,
        SliderPlayground,
        FiledropPlayground,
        BreadcrumbPlayground,
        ListItemPlayground,
        TabsPlayground,
        DividerPlayground,
        PopoverPlayground,
        TooltipPlayground,
        DatepickerPlayground,
        TimepickerPlayground,
        ProgressPlayground,
        SnackbarPlayground,
        NavigationPlayground,
        IconButtonPlayground,
        IconPlayground,
        MenuPlayground,
        StepperPlayground,
        BottomNavigationPlayground,
        ButtonGroupPlayground,
        AppBarPlayground,
        CardPlayground,
        DrawerPlayground,
        ModalPlayground,
        LinkPlayground,
        VirtualScrollPlayground,
        DialogTest,
        DropdownPlayground
    ],
    imports: [
        SharedModule,
        OverlayModule,
        ScrollingModule,
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
        PopoverModule,
        ProgressModule,
        DrawerModule,
        LinkModule,
        ModalModule,
        LegacyModule,
        RouterModule
    ],
    providers: [
        StartDateDirective,
        EndDateDirective,
        { provide: DATE_LOCALE, useValue: 'en-US'},
        { provide: DATE_FORMATS, useValue: MY_DATE_FORMAT },
        { provide: HALO_DIALOG_DATA, useValue: { count: 1} },
],
})
export class NewPlaygroundModule { }
