import { Component } from '@angular/core';
import { Actions, ButtonVariants, Radii } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
@Component({
  selector: 'icon-button-playground',
  templateUrl: './icon-button-playground.component.html',
  styleUrls: ['./icon-button-playground.component.scss']
})
export class IconButtonPlayground{
  actions = Actions;
  iconSizings = IconSizes;
  buttonVariants = ButtonVariants;
  radii = Radii;

  handleClick(event: Event): void {
    alert('Button clicked!');
  }

 }