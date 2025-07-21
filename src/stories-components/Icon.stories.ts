// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular';
import { IconSizes } from 'projects/icon/src/lib/icon.const';

import { IconComponent } from 'projects/icon/src/lib/icon.component';
import { BADGES } from '.storybook/constants';

export default {
  title: 'Adopters/Components/Icon',
  parameters : {
    badges: [ BADGES.STABLE ],
    options: {
      isToolshown: true
    },
  },
  component: IconComponent,
  argTypes: {
    size: {
      options: [IconSizes.xsmall, IconSizes.small, IconSizes.medium, IconSizes.large, IconSizes.xlarge, IconSizes.xxlarge],
      control: { type: 'select' }
    },
    collection: {
      defaultValue: 'system',
      control: { type: 'text' }
    },
    icon: {
      defaultValue: 'icon-cloud-upload-24',
      control: { type: 'text' }
    },
    iconSheetUrl: {
      defaultValue: '',
      control: { type: 'text' }, 
      description: 'External link url icon sheets. <br>Example: /atlas-icons/system.svg',
    },
    title: {
      defaultValue: '',
      control: { type: 'text' }
    },
    alt: {
      defaultValue: '',
      control: { type: 'text' }
    },
    ariaHidden: {
      control: {type: 'boolean'}
    },
    ariaLabelledBy: {
      control: {type: 'text'}
    },
    ariaTitle: {
      control: {type: 'text'}
    }, 
    role: {
      control: {type: 'text'}
    }
  }
} as Meta;


const Template: Story<IconComponent> = (args: IconComponent) => ({
  props: {...args},
  template: `
  <atlas-icon [icon]="icon" [color]="color" [size]="size" [collection]="collection" [iconSheetUrl]="iconSheetUrl" [title]="title" [alt]="alt" [ariaHidden]="ariaHidden" [ariaLabelledBy]="ariaLabelledBy" [ariaTitle]="ariaTitle" [role]="role"></atlas-icon>
  `
});


export const Basic = Template.bind({});
Basic.args = {
  icon: 'icon-cloud-upload-24',
  color: 'semanticColor-background-brand-active',
  size: IconSizes.medium,
  collection: 'system',
  iconSheetUrl: ''
};

window.onload = function () {
  if (! localStorage.justOnce) {
      localStorage.setItem("justOnce", "true");
      window.location.reload();
  }
}