import { Component } from '@angular/core';
import { Actions, ButtonSizings, ButtonVariants } from 'atlas-cdk';

@Component({
  selector: 'timepicker-playground',
  templateUrl: './timepicker-playground.component.html',
  styleUrls: ['./timepicker-playground.component.scss']
})
export class TimepickerPlayground {
  actions = Actions;
  buttonSizings = ButtonSizings;
  buttonVariants = ButtonVariants;
  items: any[] = [
    {
      value: '08:00 am',
      label: '08:00 am',
    },
    {
      value: '10:00 am',
      label: '10:00 am',
    },
    {
      value: '12:00 am',
      label: '12:00 am',
    },
    {
      value: '02:00 pm',
      label: '02:00 pm',
    },
    {
      value: '04:00 pm',
      label: '04:00 pm',
    },
    {
      value: '06:00 pm',
      label: '06:00 pm',
    },
    {
      value: '08:00 pm',
      label: '08:00 pm',
    },
];
}