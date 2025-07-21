import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'legacy-hero-headline',
  template: '<ng-content></ng-content>',
  styleUrls: ['./hero.component.scss'],
  standalone: false,
  host: {
    'class': 'legacy-hero__headline'
  },
  encapsulation: ViewEncapsulation.None,
})
export class HeroHeadlineComponent {}
