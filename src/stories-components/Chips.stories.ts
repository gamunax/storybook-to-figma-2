import { Meta, Story } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { Actions, ChipVariants, Colors, IndicatorLocation, Styles } from 'atlas-cdk';
import { ChipComponent, ChipSizings, ChipsModule } from 'atlas-chips';
import { IconModule } from 'atlas-icon';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';

export default {
  title: 'Adopters/Components/Chips',
  component: ChipComponent,
  decorators: [
    withDesign,
  ],
  parameters: {
    badges: [BADGES.ALPHA],
    controls: {
      sort: 'requiredFirst',
      exclude: /\*/,
      include: [
        'label',
        'size',
        'style',
        'color',
        'variant',
        'action',
        'typography',
        'disabled',
        'removable',
        'indicator',
        'indicatorLocation',
        'indicatorColor',
        'light',
        'flag',
        'selectionChange',
        'removed',
        'setDisabledState',
        'select',
        'remove',
      ],
    },
    options: {
      isToolshown: true
    },
  },
  args: {
    onClick: action('selectionChange'),
    onRemove: action('removed'),
  },
  argTypes: {
    color: {
      description: 'Set the color',
      options: [Colors.neutral, Colors.brand, Colors.danger, Colors.success, Colors.caution, Colors.info],
      control: { type: 'select' },
      defaultValue: Colors.neutral,
    },
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [Actions.default, Actions.primary, Actions.secondary, Actions.error, Actions.success, Actions.warning, Actions.info],
      control: { type: 'select' },
      defaultValue: Actions.default
    },
    removable: {
      options: [true, false],
      control: { type: 'boolean' },
      defaultValue: false,
    },
    size: {
      options: [ChipSizings.medium, ChipSizings.small],
      control: { type: 'select' },
      defaultValue: ChipSizings.medium,
    },
    iconSize: {
      table: {
        disable: true,
      },
    },
    style: {
      options: [Styles.filled, Styles.outlined],
      control: { type: 'select' },
      defaultValue: Styles.filled,
    },
    variant: {
      description: 'This property is deprecated and will be removed in a future version. Please use `style` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [ChipVariants.filled, ChipVariants.outlined],
      control: { type: 'select' },
      defaultValue: ChipVariants.filled,
    },
    typography: {
      control: { type: 'text' },
      defaultValue: 'typographyStyles-label-large',
    },
    disabled: {
      control: { type: 'boolean' },
      options: [ true, false ],
      defaultValue: false,
    },
  },
  moduleMetadata: {
    imports: [ ChipsModule, IconModule ],
  },
} as Meta;

const onSelectionChange = (event: Event) => {
  console.log('Selection changed:', event);
};

// TEMPLATE function generates a chip list with customizable attributes and content.
// `attributes` allows adding additional attributes to the <atlas-chip> element.
// `content` allows inserting additional HTML content inside the <atlas-chip> element.
const TEMPLATE = (attributes = '', content = '') =>`
<atlas-chip-list>
  <atlas-chip
    [removable]="removable"
    [color]="color"
    [size]="size"
    [style]="style"
    [disabled]="disabled"
    [indicator]="indicator"
    (removed)="removed($event)"
    ${attributes}
    (selectionChange)="selectionChange($event)"
  >
    ${content}
    Chip
  </atlas-chip>
</atlas-chip-list>
`;

const ChipTextOnly: Story<ChipComponent> = (args: ChipComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [ChipsModule, IconModule],
  },
  template: TEMPLATE(),
});

export const TextOnly = ChipTextOnly.bind({});
TextOnly.args = {
  style: Styles.filled,
  color: Colors.brand,
  size: ChipSizings.medium,
};

TextOnly.parameters = {
  docs: {
    source: {
      code: TEMPLATE(),
    },
  },
  controls: {
    exclude: [
      'flag', 'indicator', 'indicatorLocation', 'indicatorColor', 'light',
    ],
  }
};

//  Chip with Icon
const ICON = TEMPLATE('', '<atlas-icon icon="icon-check-circle-24"></atlas-icon>');

const ChipIcon: Story<ChipComponent> = (args: ChipComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [ ChipsModule, IconModule ],
  },
  template: ICON,
});

export const WithIcon = ChipIcon.bind({});
WithIcon.args = {
  color: Colors.brand,
  style: Styles.filled,
  size: ChipSizings.medium,
};

WithIcon.parameters = {
  docs: {
    source: {
      code: ICON,
    },
  },
  controls: {
    exclude: [
      'flag', 'indicator', 'indicatorLocation', 'indicatorColor', 'light',
    ],
  }
};

// Chip with Avatar
const AVATAR = TEMPLATE('', '<atlas-icon icon="icon-profile-24"></atlas-icon>');

const AvatarChipStory: Story<ChipComponent> = (args: ChipComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [ChipsModule, IconModule],
  },
  template: AVATAR,
});

export const WithAvatar = AvatarChipStory.bind({});
WithAvatar.args = {
  color: Colors.neutral,
  style: Styles.filled,
  size: ChipSizings.medium,
};

WithAvatar.parameters = {
  docs: {
    source: {
      code: AVATAR,
    },
  },
  controls: {
    exclude: [
      'flag', 'indicator', 'indicatorLocation', 'indicatorColor', 'light',
    ],
  }
};

// Chip with Flag
const FLAG = TEMPLATE('[flag]="flag"', '');

const ChipFlag: Story<ChipComponent> = (args: ChipComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [ChipsModule, IconModule],
  },
  template: FLAG,
});

export const WithFlag = ChipFlag.bind({});
WithFlag.args = {
  color: Colors.brand,
  style: Styles.filled,
  size: ChipSizings.medium,
  flag: 'US',
};

WithFlag.parameters = {
  docs: {
    source: {
      code: FLAG,
    },
  },
  controls: {
    exclude: [
      'indicator', 'indicatorLocation', 'indicatorColor', 'light',
    ],
  }
}

// Chip with Indicator
const INDICATOR = TEMPLATE(
  '[indicator]="indicator" [indicatorColor]="indicatorColor" [indicatorLocation]="indicatorLocation"',
  ''
);

const ChipIndicator: Story<ChipComponent> = (args: ChipComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [ ChipsModule, IconModule ],
  },
  template: INDICATOR,
});

export const WithIndicator = ChipIndicator.bind({});
WithIndicator.args = {
  color: Colors.brand,
  style: Styles.filled,
  size: ChipSizings.medium,
  indicator: true,
  indicatorColor: Colors.danger,
  indicatorLocation: IndicatorLocation.right,
};
WithIndicator.parameters = {
  docs: {
    source: {
      code: INDICATOR,
    },
  },
  controls: {
    exclude: [ 'flag' ],
  }
};
