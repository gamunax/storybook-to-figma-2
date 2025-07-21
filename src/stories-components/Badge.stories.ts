// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { BadgeDirective, BadgeModes, BadgeModule, BadgePositions } from 'atlas-badge';
import { Actions, BadgeStyles, Colors } from 'atlas-cdk';
import { IconModule } from 'atlas-icon';
import { Meta, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';

export default {
  title: 'Adopters/Components/Badge',
  component: BadgeDirective,
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
    badge: {
      description: "Set the badge Content when the badge style is number",
      control: { type: 'number' },
      defaultValue: 1
    },
    badgeColor: {
      description: "Set the badge Color",
      options: [Colors.neutral, Colors.brand, Colors.danger, Colors.success, Colors.caution, Colors.info],
      control: { type: 'select' },
      defaultValue: Colors.neutral
    },
    // TODO: drop this in future versions
    badgeAction: {
      description: "This property is deprecated and will be removed in a future version. Please use `badgeColor` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.",
      options: [Actions.default, Actions.primary, Actions.secondary, Actions.error, Actions.success, Actions.warning, Actions.info],
      control: { type: 'select' },
      defaultValue: Actions.primary
    },
    badgePosition: {
      options: [BadgePositions.topRight, BadgePositions.topLeft, BadgePositions.bottomRight, BadgePositions.bottomLeft],
      control: { type: 'select' },
      defaultValue: BadgePositions.topRight
    },
    badgeStyle: {
      description: "Set the badge style as a number or a dot",
      options: [BadgeStyles.numbers, BadgeStyles.dot],
      control: { type: 'select' },
      defaultValue: BadgeStyles.numbers
    },
    // TODO: drop this in future versions
    badgeMode: {
      description: "This property is deprecated and will be removed in a future version. Please use `badgeStyle` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.",
      options: [BadgeModes.numbers, BadgeModes.dot],
      control: { type: 'select' },
      defaultValue: BadgeModes.numbers
    },
  }
} as Meta;

const BASIC = `
<atlas-icon
    [icon]="'icon-window-maximize-24'"
    [size]="'small'"    
    [badgeColor]="badgeColor"
    [badgePosition]="badgePosition"
    [badgeStyle]="badgeStyle"
    [badge]="badge"    
  >
</atlas-icon>`;

const BadgeBasic: Story<BadgeDirective> = (args: BadgeDirective) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [BadgeModule, IconModule],
  },
  template: BASIC,
});

export const Basic = BadgeBasic.bind({});
Basic.parameters = {
  docs: {
    source: {
      code: BASIC,
    },
  },
};

Basic.args = {
  badge: 1,
  badgeColor: Colors.brand,
  badgeStyle: BadgeStyles.numbers,
  badgePosition: BadgePositions.topRight,
};
