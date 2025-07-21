import { OverlayModule } from '@angular/cdk/overlay';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';

import { NavigationComponent, NavigationItemComponent, NavigationMenuComponent, NavigationMenuContentAreaComponent, NavigationMenuCustomAreaComponent } from './navigation.component';
import { FieldModule } from 'atlas-field';
import { DividerModule } from 'atlas-divider';
import { ButtonModule } from 'atlas-button';

@NgModule({
  declarations: [   
    NavigationComponent, 
    NavigationMenuComponent,
    NavigationItemComponent,
    NavigationMenuCustomAreaComponent,
    NavigationMenuContentAreaComponent
  ],
  imports: [   
    CommonModule,    
    CdkModule, 
    OverlayModule,        
    CdkScrollableModule,
    FieldModule,
    DividerModule,
    ButtonModule
  ],
  exports: [
    NavigationComponent,
    NavigationMenuComponent,
    NavigationItemComponent,
    NavigationMenuCustomAreaComponent,
    NavigationMenuContentAreaComponent
  ],
})
export class NavigationMenuModule { }
