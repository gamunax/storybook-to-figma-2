import { Component } from '@angular/core';
import { Actions, BoxShadows, TabVariants } from 'atlas-cdk';

@Component({
  selector: 'tabs-playground',
  templateUrl: './tabs-playground.component.html',
  styleUrls: ['./tabs-playground.component.scss']
})
export class TabsPlayground {
  actions = Actions;
  boxShadows = BoxShadows;
  variants = TabVariants;


}