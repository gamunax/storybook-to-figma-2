import { Component, OnInit } from '@angular/core';
import { TabVariants} from 'atlas-tabs';
import { Actions} from 'atlas-cdk';
import { QaTabGroup, QaTab} from './qa-tabs.const';

@Component({
  selector: 'app-qa-tabs',
  templateUrl: './qa-tabs.component.html',
  styleUrls: ['./qa-tabs.component.scss']
})
export class QaTabsComponent implements OnInit {

  constructor() { }
  
  tabs: QaTabGroup[] = [
    {
      action: Actions.default,
      fullWidth: false,
      selectedIndex: 0,
      variant: TabVariants.empty
    },

    {
      action: Actions.primary,
      fullWidth: true,
      selectedIndex: 1,
      variant: TabVariants.filled
    },

    {
      action: Actions.secondary,
      fullWidth: false,
      selectedIndex: 2,
      variant: TabVariants.empty
    },

    {
      action: Actions.secondary,
      fullWidth: false,
      selectedIndex: 2,
      variant: TabVariants.filled
    },
    {
      action: Actions.default,
      fullWidth: true,
      selectedIndex: 4,
      variant: TabVariants.empty
    },
  ]

  tests:any[]=[
    {
      label: "Tab 1",
      icon: "icon-home-24",
      content: "texto 1"
    },
    {
      label: "Tab 2",
      icon: "icon-lock-24",
      content: "texto 2"
    },
    {
      label: "Tab 3",
      icon: "icon-file-upload-24",
      content: "texto 3"
    },
  ]


  ngOnInit(): void {
  }

}