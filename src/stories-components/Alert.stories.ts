import { BADGE } from '@geometricpanda/storybook-addon-badges/';
import { IconModule, IconSizes } from 'atlas-icon';
import { ButtonSizings } from 'atlas-button';
import { Meta, Story } from '@storybook/angular';
import { AlertActionComponent, AlertComponent, AlertModule } from 'atlas-alert';
import { BoxShadows, Styles, Colors, Actions, ButtonVariants } from 'atlas-cdk';

export default {
  title: 'Adopters/Components/Alert/Alert',
  component: AlertComponent,
  subcomponents: { AlertActionComponent },
  parameters: {
    options: {
      isToolshown: true,
    },
    controls: { sort: 'requiredFirst' },
  },
  argTypes: {
    title: {
      description: 'Set the alert title',
      control: { type: 'text' },
    },
    content: {
      description: 'Set the alert content',
      control: { type: 'text' },
    },
    nameAction: {
      description: 'Set the action button label',
      control: { type: 'text' },
    },
    variant: {
      description:
        'This property is deprecated and will be removed in a future version. Please use `style` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      control: false,
    },
    style: {
      description: 'Set the alert style',
      options: [Styles.strong, Styles.soft, Styles.outlined],
      control: { type: 'select' },
      defaultValue: Styles.strong,
    },
    action: {
      description:
        'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      control: false,
    },
    color: {
      description: 'Select the color of the alert.',
      options: [Colors.neutral, Colors.caution, Colors.danger, Colors.success, Colors.info],
      control: { type: 'select' },
      defaultValue: Colors.neutral,
    },
    elevation: {
      options: [BoxShadows.flat, BoxShadows.raised, BoxShadows.elevated, BoxShadows.floating, BoxShadows.lifted],
      control: { type: 'select' },
      defaultValue: BoxShadows.raised,
    },
    iconSize: {
      options: [IconSizes.xsmall, IconSizes.small, IconSizes.medium, IconSizes.large, IconSizes.xlarge],
      control: { type: 'select' },
      defaultValue: IconSizes.medium,
    },
     buttonSize: {
      options: [ButtonSizings.xsmall, ButtonSizings.small, ButtonSizings.medium, ButtonSizings.large, ButtonSizings.xlarge],
      control: { type: 'select' },
      defaultValue: ButtonSizings.small,
    }
  },
  moduleMetadata: {
    imports: [AlertModule, IconModule],
  },
} as Meta<AlertComponent>;

const TEMPLATE = `
    <atlas-alert
      (closeClick)="closeAlert($event)"
      (actionClick)="actionAlert($event)"
      [actionLabel]="nameAction"
      [color]="color"
      [style]="style"
      [iconSize]="iconSize"
      [alertIcon]="alertIcon"
      [width]="width"
      [dismissible]="dismissible"
      [buttonSize]="buttonSize">
          <atlas-alert-title>{{title}}</atlas-alert-title>
          <atlas-alert-content>
            <div>{{content}}</div>
          </atlas-alert-content>
          <atlas-alert-action></atlas-alert-action>
        </atlas-alert>
`;

const Alert: Story<AlertComponent> = (args: AlertComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [AlertModule],
  },
  template: TEMPLATE,
});

export const Basic = Alert.bind({});
Basic.args = {
  color: Colors.caution,
  style: Styles.strong,
  iconSize: IconSizes.small,
  buttonSize: ButtonSizings.small,
  alertIcon: 'icon-error-24',
  width: '400px',
  dismissible: true,
  title: 'Alert Title',
  content: 'This is the content',
  nameAction: 'Action Button',
};
Basic.parameters = {
  docs: {
    source: {
      code: TEMPLATE,
    },
  },
};
