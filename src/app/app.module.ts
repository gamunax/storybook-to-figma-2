import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppBarModule } from 'atlas-app-bar';
import { BreadcrumbModule } from 'atlas-breadcrumb';
import { ButtonModule } from 'atlas-button';
import { CdkModule } from 'atlas-cdk';
import { ChipsModule } from 'atlas-chips';
import { FieldModule } from 'atlas-field';
import { IconModule } from 'atlas-icon';
import { TableModule } from 'atlas-table';
import { TabsModule } from 'atlas-tabs';
import SharedModule from 'src/common/shared.module';
import { DataUploadsModule } from 'src/data-uploads/data-uploads.module';
import { SearchResultsModule } from 'src/search-results/search-results.module';
import { FormPatternModule } from 'src/form-pattern/form-pattern.module';
import { LoginModule } from 'src/login/login.module';
import { PlaygroundModule } from 'src/playground/playground.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from 'src/common/layout/layout.module';
import { NewPlaygroundModule } from '../new-playground/new-playground.module';


@NgModule({
  declarations: [AppComponent],
  imports: [
    SharedModule,
    LayoutModule,
    CommonModule,
    BrowserAnimationsModule,
    CdkModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    AppBarModule,
    IconModule,
    ChipsModule,
    ButtonModule,
    BreadcrumbModule,
    TableModule,
    FieldModule,
    ReactiveFormsModule,
    DataUploadsModule,
    SearchResultsModule,
    LoginModule,
    PlaygroundModule,
    NewPlaygroundModule,
    TabsModule,
    FormPatternModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
