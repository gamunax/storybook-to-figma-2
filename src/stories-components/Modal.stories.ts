// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { ButtonModule } from 'atlas-button';
import { Colors, Styles } from 'atlas-cdk';
import { ModalComponent, ModalModule } from 'atlas-modal';
import { Meta, Story } from '@storybook/angular';
import { ButtonVariants } from 'projects/button/src/public-api';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
  title: 'Adopters/Components/Modal',
  component: ModalComponent,
  decorators: [
    withDesign,
  ],
  parameters: {
    badges: [BADGES.ALPHA],
    controls: { sort: 'requiredFirst' },
    options: {
      isToolshown: true
    },
  },
  argTypes: {
    okAction: {
      description: 'Select the color OK button',
      options: [Colors.neutral, Colors.brand, Colors.caution, Colors.danger, Colors.success, Colors.info ],
      control: { type: 'select' },
      defaultValue: Colors.brand,
    },
    cancelAction: {
      description: 'Select the color CANCEL button',
      options: [Colors.neutral, Colors.brand, Colors.caution, Colors.danger, Colors.success, Colors.info ],
      control: { type: 'select' },
      defaultValue: Colors.brand,
    },
    variantAction: {
      description: 'This property is deprecated and will be removed in a future version. Please use `style` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [ButtonVariants.outlined, ButtonVariants.contained, ButtonVariants.text],
      control: { type: 'select' },
      defaultValue: ButtonVariants.outlined 
    },
    styleAction: {
      description: 'Set the button style',
      options: [Styles.strong, Styles.soft, Styles.outlined, Styles['no-fill']],
      control: { type: 'select' },
      defaultValue: Styles.strong
    },
  }  
} as Meta;

const TEMPLATE = `
<atlas-modal
    [title]="'Dialog Title'"
    content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
    [autofocus]="false"
    [okLabel]="'Ok'"
    [cancelLabel]="'Cancel'"
    [okAction]="okAction"
    [cancelAction]="cancelAction"
    [styleAction]="styleAction"
    (onCancelClick)="onCancelClick()"
    (onOkClick)="onOkClick()"
  >
    <atlas-button [color]="okAction" [style]="styleAction" >Open Modal</atlas-button>
  </atlas-modal>
`;

const MODAL_EXAMPLE = `
import { ModalComponent, ModalModule } from 'atlas-modal';
import { ButtonModule, ButtonVariants } from 'atlas-button';
import { Actions } from 'atlas-cdk';

/** Modal Example */
@Component({
  selector: 'modal-example',
  template:\`
  <atlas-modal
    [title]="'Dialog Title'"
    [content]="'Content'"
    [autofocus]="false"
    [okLabel]="'Ok'"
    [okAction]="okAction"
    [cancelAction]="cancelAction"
    [styleAction]="styleAction"
    [cancelLabel]="'Cancel'"
    (onCancelClick)="onCancelClick()"
    (onOkClick)="onOkClick()"
  >
    <atlas-button [color]="okAction" >Open Modal</atlas-button>
  </atlas-modal>\` 
  ,
})
class ModalExample {
  okAction: Colors = Colors.brand,
  cancelAction: Colors = Colors.brand,
  title: string = 'Dialog Title',
  content: string = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
  size: string = '580px',
  styleAction: Styles = Styles.strong,

  constructor() {}

  onCancelClick() {
    console.log('cancel event');
  }

  onSOkClick() {
    console.log('clicked Ok');
  }

}
/** Finish Modal Example */
`;

const Modal: Story<ModalComponent> = (args: ModalComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ModalModule, 
      ButtonModule],
  },
  template: TEMPLATE,
});

export const Basic = Modal.bind({});
Basic.args = {
  okAction: Colors.brand,
  cancelAction: Colors.brand,
  title: 'Dialog Title',
  content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  size: '580px',
  styleAction: Styles.strong,
  hasBackdrop: true,
  cancelLabel: 'Cancel',
  disableClose: false,
  okLabel: 'Ok',
  autofocus: false,
  isToolshown: true,
};
Basic.parameters = {
  docs: {
    source: {
      code: TEMPLATE,
    },
  },
};

export const ModalExample = Modal.bind({});
ModalExample.args = {
  okAction: Colors.brand,
  cancelAction: Colors.brand,
  title: 'Dialog Title',
  content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  size: '580px',
  styleAction: Styles.strong,
  hasBackdrop: true,
  cancelLabel: 'Cancel',
  disableClose: false,
  okLabel: 'Ok'
};
ModalExample.parameters = {
  docs: {
    source: {
      code: MODAL_EXAMPLE,
    }
  }
}


export const ModalDynamicExample: Story<ModalComponent> = (args: ModalComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      ModalModule, 
      ButtonModule],
  },
  template: `<atlas-modal #modalDynamicExample
    [title]="'Modal Dynamic Title'"
    [content]="'Content'"
    [autofocus]="false"
    [okLabel]="'Ok'"
    [okAction]="okAction"
    [cancelAction]="cancelAction"
    [styleAction]="styleAction"
    [cancelLabel]="'Cancel'"
    (onCancelClick)="onCancelClick()"
    (onOkClick)="onOkClick()"
    [headerRef]="HeaderTemplate"
    [contentRef]="ContentTemplate"
    [footerRef]="FooterTemplate"
    [showDialogActions]="showDialogActions"
  >
    <atlas-button [color]="okAction" >Open Dynamic Modal</atlas-button>
  </atlas-modal>
  <ng-template #HeaderTemplate>
    <h1>Title header example</h1>
  </ng-template>

  <ng-template #ContentTemplate>
    <h3>Title Content example</h3>
  </ng-template>
  <ng-template #FooterTemplate>
    <atlas-button>Nothing</atlas-button>
    <atlas-button (click)="modalDynamicExample.closeModal()" >Close</atlas-button>
  </ng-template>`,
});

ModalDynamicExample.args = {
  okAction: Colors.brand,
  cancelAction: Colors.brand,
  title: 'Modal Dynamic Example',
  content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  styleAction: Styles.strong,
  hasBackdrop: true,
  cancelLabel: 'Cancel',
  disableClose: false,
  okLabel: 'Ok',
  showDialogActions: false,
};
