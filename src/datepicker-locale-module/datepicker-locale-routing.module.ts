import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatepickerLocaleComponent } from './datepicker-locale.component';

const routes: Routes = [{ path: '', component: DatepickerLocaleComponent }];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatepickerLocaleRoutingModule { }
