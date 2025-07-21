// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { BADGE } from '@geometricpanda/storybook-addon-badges/';
import { ButtonModule, IconButtonComponent } from 'atlas-button';
import { Meta, Story } from '@storybook/angular';
import { Actions } from 'projects/cdk/src/public-api';
import { IconSizes } from 'atlas-icon';
import { Icon } from './Avatar.stories';

export default {
  title: 'Adopters/Components/Button/Icon Button',
  component: IconButtonComponent,  
  parameters: {
    options: {
      isToolshown: true,      
    },
    controls: { sort: 'requiredFirst'},
  },
  argTypes: {
    action: {
      options: [Actions.default, Actions.primary, Actions.secondary, Actions.error, Actions.warning, Actions.info, Actions.success, Actions['primary-reverse'], Actions['secondary-reverse']],
      control: { type: 'select' },
      defaultValue: Actions.default
    },
    size: {
      options: [IconSizes.small, IconSizes.medium, IconSizes.large],
      control: { type: 'select' },
      defaultValue: IconSizes.medium
    },    
  },
  moduleMetadata: {
    imports: [ButtonModule],
  },
} as Meta<IconButtonComponent>;

const IconButtonTemplate =  `
<atlas-icon-button
  [icon]="icon"
  [collection]="collection"
  [size]="size"
  [action]="action" 
  [disabled]="disabled"
  (onClick)="onClick($event)">   
</atlas-icon-button>`;

const Template: Story<IconButtonComponent> = (args: IconButtonComponent) => ({
  props: {...args},
  moduleMetadata: {
    imports: [ButtonModule],
  },
  template: IconButtonTemplate,
});

export const Default = Template.bind({});
Default.args = {
  size: IconSizes.medium,
  icon: 'icon-home-24',
  collection: 'system'
};

Default.parameters = {
   docs: {
    source: {
      code: IconButtonTemplate,
    },
  },
}

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  icon: 'icon-home-24',
  collection: 'system',
  size: IconSizes.medium,
};

Disabled.parameters = {
   docs: {
    source: {
      code: IconButtonTemplate,
    },
  },
}

export const Primary = Template.bind({});
Primary.args = {
  action: Actions.primary,
  icon: 'icon-home-24',
  collection: 'system',
  size: IconSizes.medium,
};

Primary.parameters = {
   docs: {
    source: {
      code: IconButtonTemplate,
    },
  },
}

export const Secondary = Template.bind({});
Secondary.args = {
  action: Actions.secondary,
  icon: 'icon-home-24',
  collection: 'system',
  size: IconSizes.medium,
};

Secondary.parameters = {
   docs: {
    source: {
      code: IconButtonTemplate,
    },
  },
}

export const Error = Template.bind({});
Error.args = {
  action: Actions.error,
  icon: 'icon-home-24',
  collection: 'system',
  size: IconSizes.medium,
};

Error.parameters = {
   docs: {
    source: {
      code: IconButtonTemplate,
    },
  },
}

export const Warning = Template.bind({});
Warning.args = {
  action: Actions.warning,
  icon: 'icon-home-24',
  collection: 'system',
  size: IconSizes.medium,
};

Warning.parameters = {
   docs: {
    source: {
      code: IconButtonTemplate,
    },
  },
}

export const Info = Template.bind({});
Info.args = {
  action: Actions.info,
  icon: 'icon-home-24',
  collection: 'system',
  size: IconSizes.medium,
};

Info.parameters = {
   docs: {
    source: {
      code: IconButtonTemplate,
    },
  },
}

export const Success = Template.bind({});
Success.args = {
  action: Actions.success,
  icon: 'icon-home-24',
  collection: 'system',
  size: IconSizes.medium,
};

Success.parameters = {
   docs: {
    source: {
      code: IconButtonTemplate,
    },
  },
}

