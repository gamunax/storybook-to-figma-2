import { Component } from '@angular/core';
import { Actions, IconSizes } from 'atlas-cdk';

@Component({
  selector: 'navigation-playground',
  templateUrl: './navigation-playground.component.html',
  styleUrls: ['./navigation-playground.component.scss']
})
export class NavigationPlayground {
  actions = Actions;
  collapsed = false;
  iconSizes = IconSizes;

  items: any[] = [
    {
      value: 'option_1',
      label: 'List item',
      icon: 'icon-lock-24',
      secondary: '(secondary)',
    },
    {
        value: 'option_2',
        label: 'List item 2',
        icon: 'icon-clock-24',
    },
    {
      value: 'option_3',
      label: 'List item 3',
      icon: 'icon-home-24',
    },
];
}