import { Component } from '@angular/core';
import { Actions, IconSizes } from 'atlas-cdk';
import { BadgeModes, BadgePositions } from 'atlas-badge';

@Component({
  selector: 'bottom-navigation-playground',
  templateUrl: './bottom-navigation-playground.component.html',
  styleUrls: ['./bottom-navigation-playground.component.scss']
})
export class BottomNavigationPlayground {
  actions = Actions;
  iconSizes = IconSizes;
  badgeModes = BadgeModes.numbers;
  badgePositions = BadgePositions.topRight;
  items: any[] = [
    { 
      label: 'Recent',
      icon: 'icon-calendar-24',
      badgeCount: 7
    },
    { 
      label: 'Shared',
      icon: 'icon-cloud-upload-24',
      badgeCount: 1
    },
    { 
      label: 'Stored',
      icon: 'icon-file-download-24',
      badgeCount: 0
    },
    { 
      label: 'Section',
      icon: 'icon-home-24',
      badgeCount: 99
    },
  ];
}