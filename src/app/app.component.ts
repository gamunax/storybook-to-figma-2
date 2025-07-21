import { Component } from '@angular/core';
import { defaultConfig, Radii, ThemingService } from 'atlas-cdk';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  items: any[] = [];
  collapsed: boolean = true;
  radii = Radii;
  
  hide = false;
  constructor(themingService: ThemingService) {
    themingService.initializeTheme(defaultConfig);
    this.items.push(
      {
        label: "Stores",
        path: "/stores",     
        active: true,   
      },
      {
        label: "McDonal's",
        path: "/stores/mc",
        active: false,
      },
      {
        label: "XVMC",
        path: "/stores/mc",
        disabled: true,
      },
      {
        label: "Texas",
        path: "/stores/mc/tx",        
        active: true,
      },
    );
  }

  onSelectedItem(value: any): void {
    if(!this.collapsed) {
      this.collapsed = !this.collapsed;
    }
    console.log(value);
  }

  onCollapsed(): void {
    this.collapsed = !this.collapsed; 
  }
}
