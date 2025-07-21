import { Component } from '@angular/core';
import { Actions, BoxShadows, IconSizes } from 'atlas-cdk';

@Component({
  selector: 'menu-playground',
  templateUrl: './menu-playground.component.html',
  styleUrls: ['./menu-playground.component.scss'],
})
export class MenuPlayground {
  actions = Actions;
  collapsed = false;
  iconSizes = IconSizes;
  elevation = BoxShadows.flat;
  items: any[] = [
    {
      value: 'avatar',
      label: 'List item',
      icon: 'icon-home-24',
      secondary: '(secondary)',
      dense: true,
    },
    {
      value: 'option_S',
      label: 'List item avatar',
      avatar:
        'https://images.pexels.com/photos/7709023/pexels-photo-7709023.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
    {
      value: 'option_S',
      label: 'List item other',
      icon: 'icon-lock-24',
    },
    {
      value: 'option_TWO',
      label: 'List item other other',
      icon: 'icon-clock-24',
    },
  ];
}
