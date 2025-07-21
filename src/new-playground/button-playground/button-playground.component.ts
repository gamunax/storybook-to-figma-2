import { Component } from '@angular/core';
import { Actions, ButtonSizings, ButtonVariants, Colors, Radii, Styles } from 'atlas-cdk';
@Component({
  selector: 'button-playground',
  templateUrl: './button-playground.component.html',
  styleUrls: ['./button-playground.component.scss']
})
export class ButtonPlayground{
  actions = Actions;
  buttonSizings = ButtonSizings;
  buttonVariants = ButtonVariants;
  radii = Radii;
  styles = Styles;
  colors = Colors;

  handleClick(event: Event): void {
    alert('Button clicked!');
  }

 }