import { Component } from '@angular/core';
import { Actions, ButtonVariants, Radii } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
@Component({
  selector: 'icon-playground',
  templateUrl: './icon-playground.component.html',
  styleUrls: ['./icon-playground.component.scss']
})
export class IconPlayground{
  actions = Actions;
  iconSizings = IconSizes;
  buttonVariants = ButtonVariants;
  radii = Radii;

  handleClick(event: Event): void {
    alert('Button clicked!');
  }
}