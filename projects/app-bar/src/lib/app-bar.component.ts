
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Actions, BoxShadows, ThemingService, Positions, Layers, BackgroundColors, TextColors } from 'atlas-cdk';
import { config } from './app-bar.theming';

@Component({
  selector: 'atlas-app-bar',
  template: `
    <div
      [ngStyle]="{'z-index': zIndex, 
      'background-color': 'var(--semanticColor-' + background + ')',
      'color': 'var(--semanticColor-' + textColor + ')'}"
      [ngClass]="[
        'app-bar',
        'app-bar-'+action,
        'app-bar--bg-'+background,
        'app-bar--position-'+position,
        'typographyStyles-heading-small',
        'box-shadow-elevation-' + elevation
      ]"  
     >
      <ng-content></ng-content>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AppBarComponent {

  /** 
   * @deprecated
   * The action color. This is deprecated and will be removed in v4, please use background input
   */
  @Input() action: Actions = Actions.default;
  /** 
   * The background color of the app-bar.
   */
  @Input() background: BackgroundColors = BackgroundColors['background-default-light'];
  /** 
   * The text color of the app-bar.
   */
  @Input() textColor: TextColors = TextColors['text-default-main-dark'];
  /** Shadow style that provides elevation for the app-bar */
  @Input() elevation: BoxShadows = BoxShadows.flat;
  /** Set the position of the app-bar */
  @Input() position: Positions = Positions.relative;
  /** Set the zindex of the app-bar */
  @Input() zIndex = Layers.header;

  constructor(
    private themingService: ThemingService,
  ) {
    this.themingService.applyConfig(config);
  }
}

