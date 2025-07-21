import { Component } from '@angular/core';
import { Actions,  IconSizes, BadgeModes, BadgePositions } from 'atlas-cdk';

@Component({
  selector: 'badge-playground',
  templateUrl: './badge-playground.component.html',
  styleUrls: ['./badge-playground.component.scss']
})
export class BadgePlayground {
  actions = Actions;
  iconSizes = IconSizes
  badgeModes = BadgeModes;
  badgePositions = BadgePositions;
  badgeCount?: number = 9;

}