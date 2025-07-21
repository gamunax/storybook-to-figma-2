import { Component } from '@angular/core';
import { TooltipPosition } from 'atlas-tooltip';
import { Actions, ButtonSizings, ButtonVariants } from 'atlas-cdk';

@Component({
  selector: 'tooltip-playground',
  templateUrl: './tooltip-playground.component.html',
  styleUrls: ['./tooltip-playground.component.scss'],
})
export class TooltipPlayground {
  haloTooltipPosition = TooltipPosition;
  actions = Actions;
  buttonSizings = ButtonSizings;
  buttonVariants = ButtonVariants;

  tooltipHTML = `<p><strong>Paragraph</strong></p> <ul><li> Element 1 </li><li> Element 2 </li></ul>`;
}