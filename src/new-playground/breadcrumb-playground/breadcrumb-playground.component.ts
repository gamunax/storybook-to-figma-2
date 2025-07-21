import { Component } from '@angular/core';
import { Actions, IconSizes } from 'atlas-cdk';

@Component({
  selector: 'breadcrumb-playground',
  templateUrl: './breadcrumb-playground.component.html',
  styleUrls: ['./breadcrumb-playground.component.scss']
})
export class BreadcrumbPlayground {
  actions = Actions;
  collapsed = false;
  iconSizes = IconSizes;

  items: any[] = [
    {
      label: "Stores",
      displayName: "Stores",
      path: "/stores",
      active: true,
      url: "/new-playground"
    },
    {
      label: "McDonald's",
      displayName: "McDonald's",
      path: "/stores/mc",
      active: false,
    },
    {
      label: "XVMC",
      displayName: "XVMC",
      path: "/stores/mc",
      disabled: true,
    },
    {
      label: "Texas",
      displayName: "Texas",
      path: "/stores/mc/tx",
      active: true,
    },
  ];

  onSelectedItem(value: any): void {
    if (!this.collapsed) {
      this.collapsed = !this.collapsed;
    }
    console.log(value);
  }

  onCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

}