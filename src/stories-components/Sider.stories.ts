// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular';
import { Actions, BoxShadows, Colors } from 'atlas-cdk';
import { SliderComponent, SliderModule } from 'atlas-slider';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';

export default {
  title: 'Adopters/Components/Slider',
  component: SliderComponent,
  decorators: [
    withDesign,
  ],
  parameters: {
    badges: [BADGES.BETA],
    controls: { sort: 'requiredFirst' },
    options: {
      isToolshown: true
    },
  },
  argTypes: {    
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [Actions.primary],
      control: { type: 'select' },    
      defaultValue: Actions.primary
    },
    color: {
      description: 'Select the slider of the color.',
      options: [Colors.brand],
      control: { type: 'select' },
      defaultValue: Colors.brand,
    },
    disabled: {
      options: [true, false],
      constrol: { type: 'select' },
      defaultValue: false,
    },
    elevation: {
      options: [BoxShadows.flat, BoxShadows.raised, BoxShadows.elevated, BoxShadows.floating, BoxShadows.lifted],
      control: { type: 'select' },
    },     
  }
} as Meta;

const BASIC = `
  <atlas-slider [color]="color" [elevation]="elevation" [disabled]="disabled"><atlas-slider>
`;

const BasicSlider: Story<SliderComponent> = (args: SliderComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [SliderModule],
  },
  template: BASIC,
});

export const Basic = BasicSlider.bind({});
Basic.args = {
  elevation: BoxShadows.raised,
  color: Colors.brand,
};

Basic.parameters = {
  docs: {
    source: {
      code: BASIC,
    },
  },
};
