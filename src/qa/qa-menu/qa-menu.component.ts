import { Component, OnInit } from '@angular/core';
import { Actions, ThemingService, defaultConfig} from 'atlas-cdk';
import { ListItem } from 'atlas-list';
import { IconSizes } from 'atlas-icon';

@Component({
  selector: 'app-qa-menu',
  templateUrl: './qa-menu.component.html',
  styleUrls: ['./qa-menu.component.scss']
})
export class QaMenuComponent implements OnInit {

  constructor(themingService: ThemingService) {
    themingService.applyConfig(defaultConfig)
   }

  menuOpened(value:any):void{
      console.log('Menu opened')
  }

  menuClosed(value:any):void{
    console.log('Menu closed')
  }

  onMenuClick(value:any):void{
    console.log('Menu has been clicked')
  }

  ngOnInit(): void {
  }

  actions = Actions
  isize = IconSizes

  
  items: ListItem[] = [
    {
      value: "1",
      label: "List Item 1",
      icon: "icon-error-24"
    },
    {
      value: "2",
      label: "Liste Item 2",
      icon: "icon-home-24",
    },
    {
      value: "3",
      label: "List Item 3",
      icon: "icon-caret-circle-up-24",
      selected: true
    },
    {
      value: "4",
      label: "List Item 4",
      icon: "icon-eject-24",
    },
    {
      value: "5",
      label: "List Item 5",
      icon: "icon-forward-24",
    },
  ]
}