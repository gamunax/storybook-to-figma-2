import { OverlayModule } from '@angular/cdk/overlay';
import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkModule } from 'atlas-cdk';

import { Tooltip, TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER, TooltipComponent } from './tooltip.component';

@NgModule({
  declarations: [    
    Tooltip,
    TooltipComponent
  ],
  imports: [   
    CommonModule,    
    CdkModule, 
    OverlayModule,        
    CdkScrollableModule
  ],
  exports: [
    Tooltip,
    TooltipComponent,
  ],
  providers:[TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER]
})
export class TooltipModule { }
