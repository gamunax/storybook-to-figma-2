import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ThemingService } from 'atlas-cdk';

import { config } from './divider.theming';

 @Component({
   selector: 'atlas-divider',
   host: {
     'role': 'separator',
     '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
     '[class.atlas-divider-vertical]': 'vertical',
     '[class.atlas-divider-horizontal]': '!vertical',     
     'class': 'atlas-divider',
   },
   template: '',
   encapsulation: ViewEncapsulation.None,
   changeDetection: ChangeDetectionStrategy.OnPush,
 })
 export class DividerComponent {
   /** Whether the divider is vertically aligned. */
   @Input()
   get vertical(): boolean {
     return this._vertical;
   }
   set vertical(value: BooleanInput) {
     this._vertical = coerceBooleanProperty(value);
   }
   private _vertical: boolean = false;
   
   constructor(private _themingService: ThemingService){
    this._themingService.applyConfig(config);
  }
 }