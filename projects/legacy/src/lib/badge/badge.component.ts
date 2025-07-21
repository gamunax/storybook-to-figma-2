import {
  Component,
  Input,
  ChangeDetectionStrategy,
  AfterContentInit,
} from '@angular/core';


@Component({
  selector: 'legacy-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyBadgeComponent{



  /** Set the size of the badge. Values: xxsm, xsm, sm, md, lg, xlg, xxlg, xxxlg. Notes: xxsmall (10x10), xsmall
   * (12x12), small (14x14), medium (16x16), large (24x24), xlarge (32x32), xxlarge (48x48), xxxlarge (64x64). */
  @Input() public size = 'xxsm';

  /** Set the theme of the badge. Values: primary, secondary, tertiary, accent1, accent2, primary-alt, secondary-alt,
   * tertiary-alt, accent1-alt, accent2-alt, black, white, alert, alert-light, alert-dark, success, success-light,
   * success-dark, warning, warning-light, warning-dark, info, info-light, info-dark, disabled, disabled-light,
   * disabled-dark. */
  @Input() public theme = 'default';

  /** Set the border theme of the badge. Values: primary, secondary, tertiary, accent1, accent2, primary-alt,
   * secondary-alt, tertiary-alt, accent1-alt, accent2-alt, black, white, alert, alert-light, alert-dark, success,
   * success-light, success-dark, warning, warning-light, warning-dark, info, info-light, info-dark, disabled,
   * disabled-light, disabled-dark. */
  @Input() public borderTheme = 'default';

  /** Set the custom class of the badge. */
  @Input() public customClass = '';

  // legacy brighter 
    /** Change the color to display a different background color and on-color for the badge. Supports color palette vars. */
  @Input() color: string = 'support';

  @Input() brighterSize: any;

  styles: any;

  BRIGHTER_BADGE_SIZES: any = {
      small: {
        paddingLeft: '4px',
        paddingRight: '4px',
        height: '16px',
        fontSize: '10px',
        fontFamily: 'uteregular, Helvetica, Arial, sans-serif',
        borderRadius: '8px'
      },
      medium: {
        paddingLeft: '8px',
        paddingRight: '8px',
        height: '16px',
        fontSize: 'helper-text-font-size',
        fontFamily: 'uteregular, Helvetica, Arial, sans-serif',
        borderRadius: '24px'
      },
      large: {
        paddingLeft: '8px',
        paddingRight: '8px',
        height: '32px',
        fontSize: '16px',
        fontFamily: 'uteregular, Helvetica, Arial, sans-serif',
        borderRadius: '24px'
      },
    };
}
