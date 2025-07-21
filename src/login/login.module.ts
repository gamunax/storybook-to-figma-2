import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ButtonModule } from 'atlas-button';
import { CdkModule } from 'atlas-cdk';
import { FieldModule } from 'atlas-field';
import { IconModule } from 'atlas-icon';
import { AppBarModule } from 'atlas-app-bar';
import { CheckboxModule } from 'atlas-checkbox';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CdkModule,
    AppBarModule,
    ButtonModule,
    IconModule,
    CheckboxModule,
    FieldModule,
  ],
})
export class LoginModule { }
