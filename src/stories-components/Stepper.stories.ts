
import { Meta, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { BADGES } from '.storybook/constants';

import { StepperComponent } from 'atlas-stepper';
import { AvatarComponent } from 'atlas-avatar';
import { IconComponent } from 'atlas-icon';
import { Colors } from 'projects/cdk/src/public-api';


export default {
  title: 'Adopters/Components/Stepper',
  component: StepperComponent,
  decorators: [
    withDesign,
  ],
  parameters: {
    badges: [BADGES.BETA],
    controls: {
      sort: 'requiredFirst',
      exclude: /\*/,
      include: [
        'steps',
        'iconStep',
        'color',
        'typographyAvatar',
        'typographyIndex',
        'stepAction'
      ],
    },
    options: {
      isToolshown: true
    },
  },
    argTypes: {
      color: {
        description: 'Select the color of the step.',
        options: [Colors.neutral, Colors.brand, Colors.caution, Colors.danger, Colors.success, Colors.info ],
        control: { type: 'select' },
        defaultValue: Colors.brand,
      }
    },
} as Meta<StepperComponent>;

const BASIC = `<atlas-stepper [steps]="steps"
 [iconStep]="iconStep"
 [color]="color"
 [typographyAvatar]="typographyAvatar"
 [typographyIndex]="typographyIndex"
 (stepAction)="changeStep($event)"></atlas-stepper>`;

const StepperBasic: Story<StepperComponent> = (args: StepperComponent) => ({
  props: { ...args },
  moduleMetadata: {
    declarations: [ StepperComponent, AvatarComponent, IconComponent ],
  },
  template: BASIC,
});

export const Basic = StepperBasic.bind({});
Basic.args = {
  color: Colors.brand,
  iconStep: 'icon-check-24',
  disabled: false,
  typographyAvatar: 'typographyStyles-label-medium',
  typographyIndex: 'typographyStyles-label-medium',
  steps: [
    {
      title: 'Stepper title 1',
      action: 'success'
    },
    {
      title: 'Stepper title 2'
    },
    {
      title: 'Stepper title 3'
    },
    {
      title: 'Stepper title 4'
    },
  ]
};

Basic.parameters = {
  docs: {
    source: {
      code: BASIC,
    },
  },
};
