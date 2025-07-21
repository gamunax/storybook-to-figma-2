import { Component, OnInit } from '@angular/core';
import { ThemingService, defaultConfig, Actions, Density } from 'atlas-cdk';
import { QaDrawer} from './qa-drawer.const';
import { ListItem} from 'atlas-list';
import { IconSizes } from 'atlas-icon';

@Component({
  selector: 'qa-drawer',
  templateUrl: './qa-drawer.component.html',
  styleUrls: ['./qa-drawer.component.scss']
})
export class QaDrawerComponent implements OnInit {

  constructor(themingService: ThemingService) {
    themingService.applyConfig(defaultConfig)
   }

  act = Actions
  dense = Density
  isize = IconSizes

  items: QaDrawer[] = [
    {
      action: this.act.default,
      density: this.dense.expanded
    },
    {
      action: this.act.secondary,
      density: this.dense.dense
    },
  ]


  Listitems: ListItem[] = [
    {
      value: "1",
      label: "List Item 1 ",
      dense: true,
      icon: "icon-error-24"
    },
    {
      value: "2",
      label: "List Item 2",
      dense: true,
      icon: "icon-home-24",
      level: 2
    },
    {
      value: "3",
      label: "List Item 3",
      dense: true,
      icon: "icon-caret-circle-up-24",
      selected: true,
      level: 3
    },
    {
      value: "4",
      label: "List Item 4",
      dense: false,
      icon: "icon-eject-24",
      selected: false,
    },
    {
      value: "5",
      label: "List Item 5",
      dense: false,
      icon: "icon-forward-24",
      selected: false,
      level: 2
    },
  ]

  condensed: ListItem[] = [
    {
      value: "6",
      label: "List item 6",
      icon: "icon-error-24"
    },
    {
      value: "7",
      label: "List item 7",
      icon: "icon-home-24"
    },
    {
      value: "8",
      label: "List item 8",
      icon: "icon-caret-circle-up-24"
    },
    {
      value: "9",
      label: "List item 9",
      icon: "icon-eject-24"
    },
  ]

  ngOnInit(): void {
  }

}
