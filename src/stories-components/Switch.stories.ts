// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular';
import { Actions, Colors } from 'atlas-cdk';
import { SwitchComponent, SwitchModule, SwitchSizings } from 'atlas-switch';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';

export default {
  title: 'Adopters/Components/Switch',
  component: SwitchComponent,
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
    color: {
      description: 'Select the color of the switch.',
      options: [Colors.neutral, Colors.brand, Colors.caution, Colors.danger, Colors.success, Colors.info ],
      control: { type: 'select' },
      defaultValue: Colors.neutral,
    },    
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [Actions.default, Actions.primary, Actions.secondary, Actions.error, Actions.success, Actions.warning, Actions.info],
      control: { type: 'select' },    
      defaultValue: Actions.default
    },       
    size: {
      options: [SwitchSizings.medium, SwitchSizings.small],
      control: { type: 'select' },
      defaultValue: SwitchSizings.medium
    },
    changeSwitch: { action: "changeState" },       
  }
} as Meta;

const BASIC = `
  <atlas-switch (onClick)="changeSwitch($event)" [value]="value" [color]="color" [size]="size" [disabled]="disabled">    
  </atlas-switch>
`;

const SwitchBasic: Story<SwitchComponent> = (args: SwitchComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [SwitchModule],
  },
  template: BASIC,
});

export const Basic = SwitchBasic.bind({});
Basic.args = {
  color: Colors.neutral,
  size: SwitchSizings.medium,
  value: true,
}

Basic.parameters = {
  docs: {
    source: {
      code: BASIC,
    },
  },
};

const WITHLABEL = `
  <atlas-switch (onClick)="changeSwitch($event)" [value]="value" [action]="action" [size]="size" [disabled]="disabled" [color]="color">    
    Label
  </atlas-switch>
`;

const Label: Story<SwitchComponent> = (args: SwitchComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [SwitchModule],
  },
  template: WITHLABEL,
});

export const WithLabel = Label.bind({});
WithLabel.args = {
  color: Colors.neutral,
  size: SwitchSizings.medium,
  value: true,
}

WithLabel.parameters = {
  docs: {
    source: {
      code: WITHLABEL,
    },
  },
};

