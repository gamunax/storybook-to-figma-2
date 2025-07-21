import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ThemingService, defaultConfig, Actions, Radii } from 'atlas-cdk';
import { ListItem, config } from 'atlas-list';
import { IconSizes} from 'atlas-icon';

@Component({
  selector: 'qa-list',
  templateUrl: './qa-list.component.html',
  styleUrls: ['./qa-list.component.scss']
})
export class QaListComponent implements OnInit {

  constructor(themingService: ThemingService,) {
    themingService.applyConfig(defaultConfig);
   }

  actions = Actions
  isize = IconSizes
  radius = Radii

  items: ListItem[] = [
    {
      value: "1",
      label: "List Item 1 ",
      dense: true,
      icon: "icon-error-24"
    },
    {
      value: "2",
      label: "Liste Item 2 lvl 2 ",
      dense: true,
      icon: "icon-home-24",
      level: 2
    },
    {
      value: "3",
      label: "List Item 3 lvl 3 ",
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
      label: "List Item 5 lvl 2",
      dense: false,
      icon: "icon-forward-24",
      selected: false,
      level: 2
    },
  ]
  ngOnInit(): void {
  }

  select(value:string):void{
    if(this.items[parseInt(value)-1].selected){
      alert("List Item " + value + ' has been unselected')
      this.items[parseInt(value)-1].selected = false
    }
    else{
      alert("List Item " + value + ' has been selected')
      this.items[parseInt(value)-1].selected = true
    }
    
  }

}
