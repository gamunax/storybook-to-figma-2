import { Component } from '@angular/core';
import { BoxShadows } from 'atlas-cdk';
@Component({
  selector: 'accordion-playground',
  templateUrl: './accordion-playground.component.html',
  styleUrls: ['./accordion-playground.component.scss']
})
export class AccordionPlayground{
  expandedAll = false;
  elevation = BoxShadows.flat;
  accordion = [
    {
      heading: "Heading",
      subheading: "SubHeading",
      expanded: false,
      disabled: false,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      heading: "Heading",
      subheading: "SubHeading",
      expanded: false,
      disabled: false,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      heading: "Heading",
      subheading: "SubHeading",
      expanded: false,
      disabled: false,
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    }
  ]

  changeExpandStatus(ev, index) {
    this.accordion[index].expanded = ev;
  }

 }