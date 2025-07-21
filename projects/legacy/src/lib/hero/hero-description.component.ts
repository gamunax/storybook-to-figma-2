import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'legacy-hero-description',
  template: '<ng-content></ng-content>',
  styleUrls: ['./hero.component.scss'],
  standalone: false,
  host: {
    'class': 'legacy-hero__description'
  },
  encapsulation: ViewEncapsulation.None,
})
export class HeroDescriptionComponent {}
