import { Component, OnInit } from '@angular/core';
import { Actions, ThemingService, defaultConfig } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { QaAlert } from './qa-alert.const';

@Component({
  selector: 'qa-alert',
  templateUrl: './qa-alert.component.html',
  styleUrls: ['./qa-alert.component.scss']
})
export class QaAlertComponent implements OnInit {

  constructor(themingService: ThemingService) {
    themingService.applyConfig(defaultConfig)
  }

  alerts: QaAlert[] = [
    {
      id: '1',
      alertIcon: 'icon-warning-outline-24',
      variant: 'filled',
      action: Actions.default,
      title: 'Alert 1',
      content: 'Alert 1 content',
      iconSize: IconSizes.xsmall,
      width: '233px'
    },
    {
      id: '2',
      alertIcon: 'icon-warning-outline-24',
      variant: 'primary',
      action: Actions.error,
      title: 'Alert 2',
      content: 'Alert 2 content',
      iconSize: IconSizes.small,
      width: '333px'
    },
    {
      id: '3',
      alertIcon: 'icon-warning-outline-24',
      variant: 'secondary',
      action: Actions.warning,
      title: 'Alert 3',
      content: 'Alert 3 content',
      iconSize: IconSizes.medium,
      width: '433px'
    },
    {
      id: '4',
      alertIcon: 'icon-warning-outline-24',
      variant: 'filled',
      action: Actions.success,
      title: 'Alert 4',
      content: 'Alert 4 content',
      iconSize: IconSizes.large,
      width: '533px'
    },
    {
      id: '5',
      alertIcon: 'icon-warning-outline-24',
      variant: 'primary',
      action: Actions.info,
      title: 'Alert 5',
      content: 'Alert 5 content',
      iconSize: IconSizes.xlarge,
      width: '1233px'
    }
  ]

  closeEmit() {
    console.log('Closed');
  }

  actionClick() {
    console.log('Clicked');
  }
  ngOnInit(): void {
  }

}
