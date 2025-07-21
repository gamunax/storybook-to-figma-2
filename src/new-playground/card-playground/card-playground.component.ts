import { Component } from '@angular/core';
import { Actions, IconSizes, SurfaceColors } from 'atlas-cdk';

@Component({
  selector: 'card-playground',
  templateUrl: './card-playground.component.html',
  styleUrls: ['./card-playground.component.scss']
})
export class CardPlayground {
  actions = Actions;
  cardBackground = SurfaceColors['layer-neutral'];
  actionAppBarPrimary = Actions.primary;
}