import { Component, OnInit } from '@angular/core';
import { Actions, ThemingService, defaultConfig } from 'atlas-cdk';

@Component({
  selector: 'stepper',
  templateUrl: './qa-stepper.component.html',
  styleUrls: ['./qa-stepper.component.scss']
})
export class QaStepperComponent implements OnInit {

  constructor(themingService: ThemingService) {
    themingService.applyConfig(defaultConfig)
   }

  ngOnInit(): void {
  }

  steps = [
    {
      title: 'Stepper title 1',
      completed: true,
    },
    {
      title: 'Stepper title 2',
      completed: true,
    },
    {
      title: 'Stepper title 3',
      completed: true,
    },
    {
      title: 'Stepper title 4',
      completed: true,
    },
  ];

  action = Actions
}
