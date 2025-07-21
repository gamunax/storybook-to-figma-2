import { IconModule } from 'atlas-icon';
import { Meta, Story } from '@storybook/angular';
import { ButtonComponent, ButtonModule, ButtonSizings, Radii } from 'projects/button/src/public-api';
import { BoxShadows, Styles, Colors } from 'projects/cdk/src/public-api';

export default {
  title: 'Adopters/Components/Button',
  component: ButtonComponent,  
  parameters: {
    options: {
      isToolshown: true,      
    },
    controls: { sort: 'requiredFirst'},
  },
  argTypes: {
    variant: {
      description:
        'This property is deprecated and will be removed in a future version. Please use `style` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      control: false,
    },
    style: {
      description: 'Set the button style',
      options: [Styles.strong, Styles.soft, Styles.outlined, Styles['no-fill']],
      control: { type: 'select' },
      defaultValue: Styles.strong
    },
    action: {
      description:
        'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      control: false,
    },
    "aria-label": {
      table: {
        disable: true
      }
    },
    tabindex: {
      table: {
        disable: true
      }
    },
    color: {
      description: 'Select the color of the button.',
      options: [Colors.neutral, Colors.brand, Colors.caution, Colors.danger, Colors.success, Colors.info ],
      control: { type: 'select' },
      defaultValue: Colors.brand,
    },
    size: {
      options: [ButtonSizings.xsmall, ButtonSizings.small, ButtonSizings.medium, ButtonSizings.large, ButtonSizings.xlarge],
      control: { type: 'select' },
      defaultValue: ButtonSizings.medium
    },
    radius: {
      options: [Radii.soft, Radii.softer, Radii.none, Radii.rounded],
      control: { type: 'select' },
      defaultValue: Radii.soft
    },
    elevation: {
      options: [BoxShadows.flat, BoxShadows.raised, BoxShadows.elevated, BoxShadows.floating, BoxShadows.lifted],
      control: { type: 'select' },
      defaultValue: BoxShadows.raised
    },
    expand: {
      options: [true, false],
      control: { type: 'boolean' },
      defaultValue: false,
    },
    typographyClass: {
      control: { type: 'text' },
      defaultValue: 'typographyStyles-button-medium',
    },
    customClass: {
      control: { type: 'text' },
      defaultValue: '',
    },
    alt: {
      control: { type: 'text' },
      defaultValue: '',
    },
  },
  moduleMetadata: {
    imports: [ButtonModule, IconModule],
  },
} as Meta<ButtonComponent>;

const BasicTemplate =  `
      <atlas-button
        [color]="color"
        [style]="style"
        [radius]="radius"
        [size]="size"
        [disabled]="disabled"
        [elevation]="elevation"
        [expand]="expand"
        [alt]="alt"
        [customClass]="customClass"
        [typographyClass]="typographyClass"
        (onClick)="onClick($event)">
        Button   
      </atlas-button>`;

const ButtonTemplate =  `
      <atlas-button
        [size]="size"
        [radius]="radius"
        [color]="color"
        [style]="style"
        [disabled]="disabled"
        [elevation]="elevation"
        [expand]="expand"
        [alt]="alt"
        [customClass]="customClass"
        [typographyClass]="typographyClass"
        (onClick)="onClick($event)">
        Button   
      </atlas-button>`;

const Template: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: {...args},
  moduleMetadata: {
    imports: [ButtonModule, IconModule],
  },
  template: BasicTemplate,
});

export const Basic = Template.bind({});
Basic.args = {
  style: Styles.strong,
  color: Colors.brand, 
  elevation: BoxShadows.raised, 
  radius : Radii.soft,
  size: ButtonSizings.medium,
  disabled: false,
  expand: false,
  customClass: '',
  typographyClass: 'typographyStyles-button-medium',
  alt: '',
};

Basic.parameters = {
  docs: {
    source: {
      code: BasicTemplate,
    },
  },
}

const OptionalTemplate: Story<ButtonComponent> = (args: ButtonComponent) => ({
  props: {...args},
  moduleMetadata: {
    imports: [ButtonModule, IconModule],
  },
  template: ButtonTemplate,
});

export const Soft = OptionalTemplate.bind({});
Soft.args = {
  style: Styles.soft,
  color: Colors.brand,
  size: ButtonSizings.medium,
  elevation: BoxShadows.raised,
  disabled: false,
  expand: false,
  customClass: '',
  typographyClass: 'typographyStyles-button-medium',
  alt: '',
};

Soft.parameters = {
  docs: {
    source: {
      code: ButtonTemplate,
    },
  },
}

export const Outlined = OptionalTemplate.bind({});
Outlined.args = {
  style: Styles.outlined,
  color: Colors.brand,
  size: ButtonSizings.medium,
  elevation: BoxShadows.raised,
  disabled: false,
  expand: false,
  customClass: '',
  typographyClass: 'typographyStyles-button-medium',
  alt: '',
};

Outlined.parameters = {
  docs: {
    source: {
      code: ButtonTemplate,
    },
  },
}

export const NoFill = OptionalTemplate.bind({});
NoFill.args = {
  style: Styles['no-fill'],
  color: Colors.brand,
  size: ButtonSizings.medium,
  elevation: BoxShadows.raised,
  disabled: false,
  expand: false,
  customClass: '',
  typographyClass: 'typographyStyles-button-medium',
  alt: '',
};

NoFill.parameters = {
  docs: {
    source: {
      code: ButtonTemplate,
    },
  },
}
