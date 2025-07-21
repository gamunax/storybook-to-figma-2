import { Actions, BoxShadows, ButtonVariants, IconSizes } from 'atlas-cdk';

export class AlertConfig {
  title?: string;
  content?: string;
  alertIcon?: string;
  variant?: ButtonVariants;
  elevation?: BoxShadows;
  actionLabel?: string;
  autoclose?: number;
  alertActionPadding?: string;
  action?: Actions;
  iconSize?: IconSizes;
  typographyTitle?: string;
  typographyContent?: string;
  iconClose?: string;
  width?: string = '';
  dismissible?: boolean = true;
  horizontalPosition?: string;
  verticalPosition?: string;
  actionClick?: Function;
  closeClick?: Function;
}