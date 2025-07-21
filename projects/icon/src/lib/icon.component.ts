// Import the core angular services.
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ThemingService } from 'atlas-cdk';

import { IconSizes } from './icon.const';
import { config } from './icon.theming';

/**
 * The icon component handles selecting icons using SVG symbols.
 */
@Component({
  selector: 'atlas-icon',
  inputs: ['title'],
  host: {
    '[attr.title]': 'ariaTitle',
    '[attr.aria-hidden]': 'ariaHidden',
    '[attr.aria-labelledby]': 'ariaLabelledBy',
    'role': 'img'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    atlas-icon {
      display: inline-flex;
      vertical-align: middle;
    }
  `],
  template: `<svg role="role" [attr.alt]="alt" aria-hidden="true" focusable="false" [ngStyle]="setIconStyles()">
    <title *ngIf="ariaTitle" [attr.id]="ariaLabelledBy">
      {{ ariaTitle }}
    </title>
    <use *ngIf="iconSheetUrl" [attr.xlink:href]="iconSheetUrl + '#' + icon" />
    <use *ngIf="!iconSheetUrl" [attr.xlink:href]="('./atlas-icons/'+
    (this.collection) + '.svg#' + icon )" />
  </svg>`
})

export class IconComponent {
  /** Set the icon name 
   * You can find the list of available icons
  */
  @Input() icon: string | undefined;
  /** Set the icon size */
  @Input() size: IconSizes = IconSizes.medium;
  /** Set the icon color */
  @Input() color: string | undefined;
  /** Used to select the particular collection of icons (/atlas-icons/):
   * system (default functional)*/
  @Input() collection = 'system';

  /** Set an aria role of the icon for accessibility. Values: img, presentation  Notes: Presentational icons use
   * presentation. For presentational icons also remember to set ariaHidden="true" to hide icon from screen readers. */
  @Input() role = 'img';

  /** Set alternative text of the icon for accessibility. Notes: Do not set alternative text if icon is only for
   * presentational purposes. If no alt is set then the icon name is used, for example: thumb_up. */
  @Input() alt: string | undefined;

  /** If true, the component is hidden from screen readers. If undefined, it’s accessible. */
  @Input() ariaHidden: boolean | undefined;
  /** Sets the aria-labelledby attribute for screen readers. It should reference the id of another element (e.g. a <title> or <label>) that provides a textual label for this component. */
  @Input() ariaLabelledBy: string | undefined;
  /** Provides accessible text for screen readers by rendering inside a <title> element within the SVG.*/
  @Input() ariaTitle: string | undefined;
  /** Text shown as a native tooltip on hover. Sets the title attribute on the element.*/
  @Input() title: string | undefined;

  /** External link url icon sheets */
  @Input() iconSheetUrl: string | undefined;

  constructor(
    private themingService: ThemingService,
  ) {
    this.themingService.applyConfig(config);
  }

  setIconStyles() {
    if (this.icon?.includes('-outline')) {
      return {
        height: `var(--icon-size-${this.size})`,
        width: `var(--icon-size-${this.size})`,
        stroke: this.color ? `var(--${this.color})` : 'currentColor',
        fill: `none`
      };
    } else {
      return {
        height: `var(--icon-size-${this.size})`,
        width: `var(--icon-size-${this.size})`,
        color: this.color ? `var(--${this.color})` : 'currentColor'
      };
    }
  }
}
