import { Component, OnInit } from '@angular/core';
import { DateAdapter, defaultConfig, ThemingService } from 'atlas-cdk';

@Component({
  selector: 'datepicker-locale',
  templateUrl: './datepicker-locale.component.html',
  styleUrls: ['./datepicker-locale.component.scss']
})
export class DatepickerLocaleComponent implements OnInit {
  isLocalEnUS: boolean = false;
  constructor(
    themingService: ThemingService,
    private adapter: DateAdapter<any>,
  ) {
    themingService.applyConfig(defaultConfig);
 }

  ngOnInit(): void {
  }

  switchLocale() {
    this.isLocalEnUS = !this.isLocalEnUS
    if(this.isLocalEnUS){
      this.adapter.setLocale('en-US');
    } else {
      this.adapter.setLocale('en-AU');
    }
  }
}
