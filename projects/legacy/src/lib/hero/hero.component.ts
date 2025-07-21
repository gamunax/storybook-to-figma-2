import { Component, Input, ViewEncapsulation } from '@angular/core';

export enum HeroAlignment {
  left = 'flex-start',
  center = 'center',
  right = 'flex-end',
}

export enum HeroTextAlignment {
  left = 'left',
  center = 'center',
  right = 'right',
}

@Component({
  selector: 'legacy-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  standalone: false,
  host: {
    'class': 'legacy-hero'
  },
  encapsulation: ViewEncapsulation.None,
})
export class HeroComponent {
  /** Set the content alignment. Left aligned by default */
  @Input() alignment: HeroAlignment = HeroAlignment.left;

  /** Set the background color of the hero container. Transparent by default. */
  @Input() backgroundColor = 'transparent';

  /** Set the background image of the hero. Undefined by default. */
  @Input() backgroundImage;

  /** Set the background position of the hero background image. 0 0 x and y coordinates by default. */
  @Input() backgroundPosition = '0 0';

  /** Set the background repeat of the hero background image. No repeat by default. */
  @Input() backgroundRepeat = 'no-repeat';

  /** Set the background size of the hero background image. Auto by default. */
  @Input() backgroundSize = 'auto';

  /** Set the padding top of the hero. spacing-40 by default. */
  @Input() paddingTop = 'spacing-40';

  /** Set the padding right of the hero. spacing-24 by default. */
  @Input() paddingRight = 'spacing-24';

  /** Set the padding bottom of the hero. spacing-40 by default. */
  @Input() paddingBottom = 'spacing-40';

  /** Set the padding left of the hero. spacing-24 by default. */
  @Input() paddingLeft = 'spacing-24';

  /** Set the text alignment. Left aligned by default. */
  @Input() textAlignment: HeroTextAlignment = HeroTextAlignment.left;

  constructor() {}

  /** Set the styles for the hero container. */
  _setHeroContainerStyle() {
    return {
      'text-align': HeroTextAlignment[this.textAlignment],
      'justify-content': HeroAlignment[this.alignment],
      'background': `var(--${this.backgroundColor})`,
      'padding': `var(--${this.paddingTop}) var(--${this.paddingRight}) var(--${this.paddingBottom}) var(--${this.paddingLeft})`,
    };
  }

  /** Set the background image styles for the hero. */
  _setHeroBackgroundStyle() {
    return {
      'background-image': this.backgroundImage ? `url(${this.backgroundImage})` : 'none',
      'background-size': this.backgroundSize,
      'background-position': this.backgroundPosition,
      'background-repeat': this.backgroundRepeat,
    };
  }
}
