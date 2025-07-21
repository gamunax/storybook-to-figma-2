import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppBarModule } from 'atlas-app-bar';
import { AvatarModule } from 'atlas-avatar';
import { BreadcrumbModule } from 'atlas-breadcrumb';
import { ButtonModule } from 'atlas-button';
import { CdkModule } from 'atlas-cdk';
import { CheckboxModule } from 'atlas-checkbox';
import { DrawerModule } from 'atlas-drawer';
import { FieldModule } from 'atlas-field';
import { IconModule } from 'atlas-icon';
import { ListModule } from 'atlas-list';
import { MenuModule } from 'atlas-menu';
import { ModalModule } from 'atlas-modal';
import { RadioModule } from 'atlas-radio';
import { SliderModule } from 'atlas-slider';
import { SwitchModule } from 'atlas-switch';
import { RatingModule } from 'atlas-rating';
import { ChipsModule } from 'atlas-chips';

import { FormPatternComponent } from './form-pattern.component';
import { FiledropModule } from 'atlas-filedrop';
import { LinkModule } from 'atlas-link';
import { SnackbarModule, SnackbarService } from 'atlas-snackbar';
import { TabsModule } from 'atlas-tabs';

@NgModule({
  declarations: [
    FormPatternComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    ReactiveFormsModule,
    CdkModule,        
    IconModule,
    ChipsModule,
    AvatarModule,
    AppBarModule,
    ButtonModule,
    MenuModule,
    ListModule,
    LinkModule,
    CheckboxModule,
    RadioModule,
    FieldModule,
    FiledropModule,
    BreadcrumbModule,
    DrawerModule,
    ModalModule,
    SwitchModule,
    SliderModule,
    RatingModule,
    SnackbarModule,
    FormsModule,
    TabsModule
  ],
})
export class FormPatternModule { }
