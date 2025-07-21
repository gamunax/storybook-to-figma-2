import { Story, Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs'
import { ProgressComponent } from 'atlas-progress';
import { BADGES } from '.storybook/constants';
import { Colors, Actions } from 'atlas-cdk';

export default {
  title: 'Adopters/Components/Progress',
  component: ProgressComponent,
  decorators: [withDesign],
  parameters: {
    options: {
      isToolshown: true
    },
    badges: [ BADGES.BETA ],
    controls: { sort: 'requiredFirst' },
  },
  argTypes: {
    barStyle: {
      options: ['simple', 'indeterminate', 'buffer'],
      control: { type: 'select' }
    },
    type: {
      options: ['divider', 'circular'],
      control: { type: 'select' },
      defaultValue: 'divider'
    },
    variant: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [ Actions.default, Actions.primary, Actions.success, Actions.error],
      control: { type: 'select' },
      defaultValue: Actions.default,
    },
    color: {
      description: 'Select the color of the progress bar.',
      options: [Colors.neutral, Colors.brand, Colors.danger, Colors.success],
      control: { type: 'select' },
      defaultValue: Colors.brand,
    },
  }
} as Meta;

const BASIC_TEMPLATE = `
<atlas-progress 
  [value]="value" 
  [color]="color" 
  [barStyle]="barStyle" 
  [labeled]="labeled"
  [type]="type"
>
</atlas-progress>`;

const Template: Story<ProgressComponent> = (args: ProgressComponent) => ({
  props: {...args},
  moduleMetadata: {
    declarations: [ProgressComponent],
  },
  template: BASIC_TEMPLATE,
});

export const Divider = Template.bind({});
Divider.args = {
  value: 60,
  color: Colors.brand,
  barStyle: 'simple',
  type: 'divider',
  labeled: true,
}

Divider.parameters = {
  docs: {
    source: {
      code: BASIC_TEMPLATE,
    },
  },
};

export const Circular = Template.bind({});
Circular.args = {
  value: 60,
  color: Colors.brand,
  barStyle: 'simple',
  type: 'circular',
  labeled: true,
}

Circular.parameters = {
  docs: {
    source: {
      code: BASIC_TEMPLATE,
    },
  },
};