import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'legacy-hero-statement',
  template: '<ng-content></ng-content>',
  styleUrls: ['./hero.component.scss'],
  standalone: false,
  host: {
    'class': 'legacy-hero__statement'
  },
  encapsulation: ViewEncapsulation.None,
})
export class HeroStatementComponent {}
