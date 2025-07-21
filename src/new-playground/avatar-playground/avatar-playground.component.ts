import { Component } from '@angular/core';
import { Actions,  AvatarSizes, Radii } from 'atlas-cdk';

@Component({
  selector: 'avatar-playground',
  templateUrl: './avatar-playground.component.html',
  styleUrls: ['./avatar-playground.component.scss']
})
export class AvatarPlayground {
  actions = Actions;
  avatarSizes = AvatarSizes;
  radii = Radii;

}