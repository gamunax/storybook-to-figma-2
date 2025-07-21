import { TemplateRef } from '@angular/core';
import { ButtonVariants } from 'atlas-button';
import { Actions, Colors, Styles } from 'atlas-cdk';

export interface IData {
  title: string;
  content: string;
  okLabel: string;
  cancelLabel: string;
  okAction: Actions | Colors;
  cancelAction: Actions | Colors;
  variantAction?: ButtonVariants;
  styleAction?: Styles;
  headerRef?: TemplateRef<HTMLObjectElement>;
  contentRef?: TemplateRef<HTMLObjectElement>;
  footerRef?: TemplateRef<HTMLObjectElement>;
  showDialogActions?: boolean;
}
