// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Actions } from 'atlas-cdk';
import { FieldComponent, FieldModule, FieldSize, FieldVariants, TimepickerDirective, TimepickerFieldComponent, TimepickerToggleComponent, TimepickerToggleIconDirective } from 'atlas-field';
import { IconModule, IconSizes } from 'atlas-icon';
import { Meta, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';

const TEMPLATE_TIMEPICKER = `
<atlas-field [action]="action" [size]="size" [variant]="variant">
  <input [Timepicker]="timepicker" atlasInput placeholder="Choose a time" #input />
  <atlas-field-suffix>
    <timepicker-toggle [timepicker]="timepicker"></timepicker-toggle>
  </atlas-field-suffix>
  <timepicker #timepicker [color]="action" [defaultTime]="input.value"></timepicker>
</atlas-field>
`;

export default {
  title: 'Adopters/Components/Timepicker',
  subcomponents: { 
    TimepickerToggleComponent,
    TimepickerFieldComponent,
    TimepickerDirective,
    TimepickerToggleIconDirective,
  },
  decorators: [
    withDesign,
  ],
  parameters: {
    docs: {
      source: {
        code: TEMPLATE_TIMEPICKER,
      },
    },
    options: {
      isToolshown: true
    },
    badges: [ BADGES.BETA ],
    controls: { sort: 'requiredFirst' },
    // TODO [AG]: I need to keep this code, we are going to fixed in a different ticket
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/kW4WgVtux0lNhfvsS4kgBh/Design-Foundation---Grandparent-(Copy)?node-id=76%3A893',
    //   allowFullscreen: true,
    // },
  },  
  argTypes: {
    action: {
      options: [
        Actions.default, 
        Actions.primary, 
        Actions.secondary, 
        Actions.info, 
        Actions.warning, 
        Actions.error, 
        Actions.success, 
      ],
      control: { type: 'select' },
      defaultValue: Actions.primary
    },
    size: {
      options: [
        FieldSize.small,
        FieldSize.medium,
        FieldSize.large,
      ],
      control: { type: 'select' },
      defaultValue: FieldSize.medium,
    },
    variant: {
      options: [
        FieldVariants.outlined,
        FieldVariants.filled,
      ],
      control: { type: 'select' },
      defaultValue: FieldVariants.outlined,
    },
  }
} as Meta;

export const Timepicker: Story<FieldComponent> = (args: FieldComponent) => {
  const iconSize = IconSizes.medium;
  return {
    moduleMetadata: {
      imports: [
        FieldModule,
        IconModule,
      ],
    },
    props: {
      ...args,
      iconSize,
    },
    template: TEMPLATE_TIMEPICKER,
  }
};
Timepicker.args = {
  variant: FieldVariants.outlined,
  size: FieldSize.medium,
  action:  Actions.primary,
 };
Timepicker.parameters = {
  docs: {
    source: {
      code: TEMPLATE_TIMEPICKER,
    }
  }
}
