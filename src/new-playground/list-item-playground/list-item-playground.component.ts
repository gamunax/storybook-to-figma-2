import { Component } from '@angular/core';
import { Actions, IconSizes } from 'atlas-cdk';

@Component({
  selector: 'list-item-playground',
  templateUrl: './list-item-playground.component.html',
  styleUrls: ['./list-item-playground.component.scss']
})
export class ListItemPlayground {
  actions = Actions;
  collapsed = false;
  iconSizes = IconSizes;

  items: any[] = [
    {
        value: 'avatar',
        label: 'List item avatar',
        icon: 'icon-home-24',
        disabled: true,
        secondary: '(diabled & secondary)',
        dense: true,
        level: 1,
        avatar: 'https://images.pexels.com/photos/7709022/pexels-photo-7709022.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      value: 'option_S',
      label: 'List item',
      icon: 'icon-cloud-upload-24',
      dense: true,
      level: 1,
      avatar: 'https://images.pexels.com/photos/7709023/pexels-photo-7709023.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
    {
      value: 'option_S',
      label: 'List item',
      icon: 'icon-lock-24',
      dense: true,
      secondary: '(selected & secondary)',
      selected: true,
      level: 1,
    },
    {
        value: 'option_TWO',
        label: 'List active item level 2',
        icon: 'icon-clock-24',
        level: 2
    },
    {
      value: 'option_Oadad',
      label: 'List item level 2',
      icon: 'icon-home-24',
      level: 2
    },
    {
        value: 'option_D',
        label: 'List item level 2',
        icon: 'icon-lock-24',
        selected: false,
        level: 2
    },
    {
        value: 'option_S',
        label: 'List item level 3',
        icon: 'icon-arrow-counterclockwise-time-24',
        level: 3
    },
    {
        value: 'option_JJDO',
        label: 'List item level 3',
        icon: 'icon-eye-24',
        level: 3
    },
    {
      value: 'option_SAS',
      label: 'List item level 4',
      icon: 'icon-arrow-counterclockwise-time-24',
      level: 4
    },
    {
        value: 'option_SSA',
        label: 'List item level 4',
        icon: 'icon-eye-24',
        level: 4
    },
];
}