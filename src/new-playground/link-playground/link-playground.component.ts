import { Component } from '@angular/core';
import { Actions } from 'atlas-cdk';

@Component({
  selector: 'link-playground',
  templateUrl: './link-playground.component.html',
  styleUrls: ['./link-playground.component.scss'],
})
export class LinkPlayground {
  actions = Actions;
}
