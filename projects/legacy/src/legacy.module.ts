import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreloaderComponent } from './lib/preloader/preloader.component';
import { HeroComponent } from './lib/hero/hero.component';
import { HeroHeadlineComponent } from './lib/hero/hero-headline.component';
import { HeroStatementComponent } from './lib/hero/hero-statement.component';
import { HeroDescriptionComponent } from './lib/hero/hero-description.component';
import { HeroActionComponent } from './lib/hero/hero-action.component';
import { FooterModule } from './lib/footer/footer.module';
import { LegacyBadgeComponent } from './lib/badge/badge.component';
import { DropdownModule } from './lib/dropdown/dropdown.module';
import {
  AppNavComponent,
  AppNavHeaderContentComponent,
  AppNavHorizontalContentComponent,
} from './lib/app-nav/app-nav.component';
import {
  SideNavGroupItemComponent,
  SideNavComponent,
  SideNavGroupComponent,
  SideNavLogoComponent,
} from './lib/side-nav/side-nav.component';
import { TooltipModule } from 'atlas-tooltip';
import { IconModule } from 'atlas-icon';
import { ButtonModule } from 'atlas-button';
import { ChipsModule } from 'atlas-chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  LegacyTreeTableComponent, LegacyTreeTableFooterComponent, LegacyTreeTableLeafDirective,
  LegacyTreeTableNodeDirective,
  LegacyTreeTableRowDirective, LegacyTreeTableSubHeaderRowDirective, LegacyTreeTableValueComponent,
} from './lib/tree-table/legacy-tree-table.component';
import { LegacyTableHeaderGroupComponent } from './lib/tree-table/legacy-table/legacy-table-header-group.component';
import { LegacyTableHeaderGroupDirective } from './lib/tree-table/legacy-table/legacy-table-header-group.component';
import { LegacyTablePreloaderComponent } from './lib/table-preloader/legacy-preloader.component';
import { CarouselModule } from './lib/carousel/carousel.module';
import { AtlasEqualizerDirective } from './lib/equalizer/equalizer.directive';
import { LegacyChipManagerComponent } from './lib/chip-manager/legacy-chip-manager.component';
import { LegacyAutocompleteComponent } from './lib/autocomplete/autocomplete.component';
import { LegacyStepComponent, LegacyStepperGroupComponent } from './lib/stepper/stepper.component';
@NgModule({
  declarations: [
    HeroComponent,
    HeroHeadlineComponent,
    HeroStatementComponent,
    HeroDescriptionComponent,
    HeroActionComponent,
    LegacyBadgeComponent,
    LegacyTreeTableComponent,
    LegacyTableHeaderGroupComponent,
    LegacyTableHeaderGroupDirective,
    LegacyTablePreloaderComponent,
    AtlasEqualizerDirective,
    LegacyChipManagerComponent,
    LegacyAutocompleteComponent,
    LegacyStepComponent,
    LegacyStepperGroupComponent,
    LegacyTreeTableRowDirective,
    LegacyTreeTableNodeDirective,
    LegacyTreeTableLeafDirective,
    LegacyTreeTableValueComponent,
    LegacyTreeTableFooterComponent,
    LegacyTreeTableSubHeaderRowDirective,
  ],
  imports: [
    CommonModule,
    PreloaderComponent,
    FooterModule,
    DropdownModule,
    AppNavHorizontalContentComponent,
    AppNavHeaderContentComponent,
    AppNavComponent,
    CarouselModule,
    SideNavLogoComponent,
    SideNavGroupItemComponent,
    SideNavGroupComponent,
    SideNavComponent,
    TooltipModule,
    IconModule,
    FormsModule,
    ButtonModule,
    ChipsModule,
    ReactiveFormsModule
  ],
  exports: [
    PreloaderComponent,
    HeroComponent,
    HeroHeadlineComponent,
    HeroStatementComponent,
    HeroDescriptionComponent,
    HeroActionComponent,
    FooterModule,
    LegacyBadgeComponent,
    DropdownModule,
    AppNavHorizontalContentComponent,
    AppNavHeaderContentComponent,
    AppNavComponent,
    CarouselModule,
    SideNavLogoComponent,
    SideNavGroupItemComponent,
    SideNavGroupComponent,
    SideNavComponent,
    LegacyTreeTableComponent,
    LegacyTableHeaderGroupComponent,
    LegacyTableHeaderGroupDirective,
    LegacyTablePreloaderComponent,
    AtlasEqualizerDirective,
    LegacyChipManagerComponent,
    LegacyAutocompleteComponent,
    LegacyStepComponent,
    LegacyStepperGroupComponent,
    LegacyTreeTableRowDirective,
    LegacyTreeTableNodeDirective,
    LegacyTreeTableLeafDirective,
    LegacyTreeTableValueComponent,
    LegacyTreeTableFooterComponent,
    LegacyTreeTableSubHeaderRowDirective,
  ],
})
export class LegacyModule {}
