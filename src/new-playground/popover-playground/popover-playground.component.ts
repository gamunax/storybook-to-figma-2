import { Component } from '@angular/core';
import { Actions } from 'atlas-cdk';

@Component({
  selector: 'popover-playground',
  templateUrl: './popover-playground.component.html',
  styleUrls: ['./popover-playground.component.scss']
})
export class PopoverPlayground {

  /**
   * Sets the action color of popover.
   */
  actions = Actions as any;
  /**
   * Title string of popover.
   */
   popoverTitle = 'The title';
  /**
   * Sets in which direction the popover opens.
   */
   position: 'center';
  /**
   * Elevation for the popover content.
   */
   elevation = 'raised';
  /**
   * Show or hide the X close button.
   */
   showCloseButton = true;
  /**
   * Styles the popover as a dropdown.
   */
   isDropdownVariant = false;
  /**
   * Sets the width of popover.
   */
   defaultWidth = 435;
  /**
   * Determines the width breakpoint when popover positioning should become adapted for smaller devices.
   */
   responsiveWidth = 1024;
  /**
   * Sets option to include a back button in pop up header
   */
   backButton = false;

   onHide(event: any): void {
    console.log('popover closed');
  }

  onClickButtonPopover(event: any): void { // no works
    console.log('clicked');
  }

  public onInputChange(event: any): void {
    console.log('onchange datepicker', event);
  }
}