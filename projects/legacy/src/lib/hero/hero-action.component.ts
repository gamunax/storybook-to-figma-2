import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'legacy-hero-action',
  template: '<ng-content></ng-content>',
  styleUrls: ['./hero.component.scss'],
  standalone: false,
  host: {
    'class': 'legacy-hero__action'
  },
  encapsulation: ViewEncapsulation.None,
})
export class HeroActionComponent {}
