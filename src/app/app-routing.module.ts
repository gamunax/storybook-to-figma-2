import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormPatternComponent } from 'src/form-pattern/form-pattern.component';
import { PlaygroundComponent } from 'src/playground/playground.component';

import { DataUploadsComponent } from '../data-uploads/data-uploads.component';
import { LoginComponent } from '../login/login.component';
import { AppComponent } from './app.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { LayoutComponent } from 'src/common/layout/layout.component';
import { NewPlaygroundComponent } from '../new-playground/new-playground.component';
import { ButtonPlayground } from '../new-playground/button-playground/button-playground.component';
import { AlertPlayground } from '../new-playground/alert-playground/alert-playground.component';
import { FieldPlayground } from '../new-playground/field-playground/field-playground.component';
import { SelectPlayground } from '../new-playground/select-playground/select-playground.component';
import { RadioPlayground } from '../new-playground/radio-playground/radio-playground.component';
import { ChipPlayground } from '../new-playground/chip-playground/chip-playground.component';
import { AccordionPlayground } from '../new-playground/accordion-playground/accordion-playground.component';
import { PaginationPlayground } from '../new-playground/pagination-playground/pagination-playground.component';
import { TablePlayground } from '../new-playground/table-playground/table-playground.component';
import { RatingPlayground } from '../new-playground/rating-playground/rating-playground.component';
import { CheckboxPlayground } from '../new-playground/checkbox-playground/checkbox-playground.component';
import { SwitchPlayground } from '../new-playground/switch-playground/switch-playground.component';
import { AvatarPlayground } from '../new-playground/avatar-playground/avatar-playground.component';
import { BadgePlayground } from '../new-playground/badge-playground/badge-playground.component';
import { SliderPlayground } from '../new-playground/slider-playground/slider-playground.component';
import { FiledropPlayground } from '../new-playground/filedrop-playground/filedrop-playground.component';
import { TabsPlayground } from '../new-playground/tabs-playground/tabs-playground.component';
import { BreadcrumbPlayground } from '../new-playground/breadcrumb-playground/breadcrumb-playground.component';
import { ListItemPlayground } from '../new-playground/list-item-playground/list-item-playground.component';
import { DividerPlayground } from '../new-playground/divider-playground/divider-playground.component';
import { PopoverPlayground } from '../new-playground/popover-playground/popover-playground.component';
import { TooltipPlayground } from '../new-playground/tooltip-playground/tooltip-playground.component';
import { DatepickerPlayground } from '../new-playground/datepicker-playground/datepicker-playground.component';
import { TimepickerPlayground } from 'src/new-playground/timepicker-playground/timepicker-playground.component';
import { ProgressPlayground } from 'src/new-playground/progress-playground/progress-playground.component';
import { SnackbarPlayground } from 'src/new-playground/snackbar-playground/snackbar-playground.component';
import { NavigationPlayground } from 'src/new-playground/navigation-playground/navigation-playground.component';
import { IconButtonPlayground } from 'src/new-playground/icon-button-playground/icon-button-playground.component';
import { IconPlayground } from 'src/new-playground/icon-playground/icon-playground.component';
import { MenuPlayground } from 'src/new-playground/menu-playground/menu-playground.component';
import { StepperPlayground } from 'src/new-playground/stepper-playground/stepper-playground.component';
import { BottomNavigationPlayground } from 'src/new-playground/bottom-navigation-playground/bottom-navigation-playground.component';
import { ButtonGroupPlayground } from '../new-playground/button-group-playground/button-group-playground.component';
import { AppBarPlayground } from '../new-playground/app-bar-playground/app-bar-playground.component';
import { CardPlayground } from '../new-playground/card-playground/card-playground.component';
import { DrawerPlayground } from 'src/new-playground/drawer-playground/drawer-playground.component';
import { LinkPlayground } from 'src/new-playground/link-playground/link-playground.component';
import { ModalPlayground } from 'src/new-playground/modal-playground/modal-playground.component';
import { VirtualScrollPlayground } from 'src/new-playground/templates/virtual-scroll/virtual-scroll-playground.component';
import { DropdownPlayground } from '../new-playground/dropdown-playground/dropdown-playground.component';

const routes: Routes = [
  { path: 'button', component: ButtonPlayground },
  { path: 'button-group', component: ButtonGroupPlayground },
  { path: 'icon-button', component: IconButtonPlayground },
  { path: 'icon', component: IconPlayground },
  { path: 'alert', component: AlertPlayground },
  { path: 'chip', component: ChipPlayground },
  { path: 'accordion', component: AccordionPlayground },
  { path: 'pagination', component: PaginationPlayground },
  { path: 'table', component: TablePlayground },
  { path: 'rating', component: RatingPlayground },
  { path: 'checkbox', component: CheckboxPlayground },
  { path: 'switch', component: SwitchPlayground },
  { path: 'field', component: FieldPlayground },
  { path: 'select', component: SelectPlayground },
  { path: 'radio', component: RadioPlayground },
  { path: 'avatar', component: AvatarPlayground },
  { path: 'badge', component: BadgePlayground },
  { path: 'slider', component: SliderPlayground },
  { path: 'filedrop', component: FiledropPlayground },
  { path: 'tabs', component: TabsPlayground },
  { path: 'breadcrumb', component: BreadcrumbPlayground },
  { path: 'listitem', component: ListItemPlayground },
  { path: 'menu', component: MenuPlayground },
  { path: 'navigation', component: NavigationPlayground },
  { path: 'app-bar', component: AppBarPlayground },
  { path: 'bottom-navigation', component: BottomNavigationPlayground },
  { path: 'divider', component: DividerPlayground },
  { path: 'popover', component: PopoverPlayground },
  { path: 'tooltip', component: TooltipPlayground },
  { path: 'datepicker', component: DatepickerPlayground },
  { path: 'timepicker', component: TimepickerPlayground },
  { path: 'progress', component: ProgressPlayground },
  { path: 'snackbar', component: SnackbarPlayground },
  { path: 'stepper', component: StepperPlayground },
  { path: 'card', component: CardPlayground },
  { path: 'drawer', component: DrawerPlayground },
  { path: 'link', component: LinkPlayground },
  { path: 'modal', component: ModalPlayground },
  { path: 'template-virtual-scroll', component: VirtualScrollPlayground },
  { path: 'template-dropdown', component: DropdownPlayground },

  {path: '', redirectTo: 'new-playground', pathMatch: 'full'},
  {path: 'display', component: LayoutComponent, data: { breadcrumb: 'Display'},
    children: [
      {path: 'data', component: DataUploadsComponent, data: { breadcrumb: 'Data Uploads'}},
      {path: 'results', component: SearchResultsComponent, data: { breadcrumb: 'Search Results'}},
    ]
  },
  {path: 'login', component: LoginComponent, data: { breadcrumb: 'login'}},
  {path: 'playground', component: PlaygroundComponent, data: { breadcrumb: 'play'}},
  {path: 'new-playground', component: NewPlaygroundComponent, data: { breadcrumb: 'new-play'}},
  {path: 'form', component: FormPatternComponent, data: { breadcrumb: 'Form Pattern'}},
  {path: 'stores', component: AppComponent, data: { breadcrumb: 'Stores', disabled: true },  
    children: [
      {path: '', component: AppComponent},
      {path: 'mc', component: AppComponent, data: { breadcrumb: 'McDonald\'s'},
        children: [
          {path: '', component: AppComponent },
          {path: 'ny', component: AppComponent, data: { breadcrumb: 'New York'}},
          {path: 'ca', component: AppComponent, data: { breadcrumb: 'California'}},
          {path: 'tx', component: AppComponent, data: { breadcrumb: 'Texas'}}
        ]
      }
    ]
  },
  // { path: 'qa', loadChildren: () => import('../qa/qa.module').then(m => m.QaModule)},
  { path: "**", redirectTo: "" },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}