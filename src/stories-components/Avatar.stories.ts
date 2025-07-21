// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Meta, Story } from '@storybook/angular';
import { AvatarComponent } from 'projects/avatar/src/public-api';
import { Actions, Radii, Colors, AvatarSizes } from 'projects/cdk/src/public-api';
import { IconComponent } from 'projects/icon/src/public-api';


import { BADGES } from '.storybook/constants';

export default {
  title: 'Adopters/Components/Avatar/Avatar',
  component: AvatarComponent,
  parameters: {
    options: {
      isToolshown: true
    },
    badges: [BADGES.ALPHA],
    controls: { sort: 'requiredFirst' },
  },
  argTypes: {
    color: {
      options: [Colors.neutral, Colors.brand, Colors.danger, Colors.success, Colors.caution, Colors.info],
      control: { type: 'select' },
      defaultValue: Colors.brand
    },
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [Actions.default, Actions.primary, Actions.secondary, Actions.error, Actions.success, Actions.warning, Actions.info],
      control: { type: 'select' },
      defaultValue: Actions.primary
    },
    indicator: {
      options: [true, false],
      control: { type: 'select' }
    },
    indicatorAction: {
      description: 'This property is deprecated and will be removed in a future version. Please use `indicatorColor` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [Colors.neutral, Colors.neutral, Colors.danger, Colors.success, Colors.caution, Colors.info],
      control: { type: 'select' }
    },
    indicatorColor: {
      description: 'Set the Color of the indicator. Must first set indicator to true.',
      options: [Colors.neutral, Colors.neutral, Colors.danger, Colors.success, Colors.caution, Colors.info],
      control: { type: 'select' }
    },
    radius: {
      options: [Radii.none, Radii.soft, Radii.softer, Radii.rounded],
      control: { type: 'select' }
    },
    size: {
      options: [AvatarSizes.small, AvatarSizes.medium, AvatarSizes.large, AvatarSizes.xlarge ],
      control: { type: 'select' },
      defaultValue: AvatarSizes.medium
    },
  }
} as Meta;

const AvatarTemplateBasic=  `  
<atlas-avatar [color]="color" [imgSrc]="imgSrc" [radius]="radius || 'rounded'" [indicator]="indicator" [indicatorColor]="indicatorColor" [size]="size" [typography]="typography">OP</atlas-avatar>`;

const AvatarTemplateGroup = `  
<div style="display: flex;">
<atlas-avatar [action]="action" [grouped]="true" [indicator]="indicator" [indicatorColor]="indicatorColor" [imgSrc]="imgSrc1" [radius]="radius || 'rounded'" [size]="size"></atlas-avatar>
<atlas-avatar [action]="action" [grouped]="true" [indicator]="indicator" [indicatorColor]="indicatorColor" [imgSrc]="imgSrc2" [radius]="radius || 'rounded'" [size]="size"></atlas-avatar>
<atlas-avatar [action]="action" [grouped]="true" [indicator]="indicator" [indicatorColor]="indicatorColor" [imgSrc]="imgSrc3" [radius]="radius || 'rounded'" [size]="size"></atlas-avatar>
<atlas-avatar [action]="action" [grouped]="true" [indicator]="indicator" [indicatorColor]="indicatorColor" [radius]="radius || 'rounded'" [size]="size">+3</atlas-avatar>
</div>`;

const AvatarTemplateImage = `  
  <atlas-avatar [action]="action" [indicator]="indicator" [indicatorColor]="indicatorColor" [imgSrc]="imgSrc1" [radius]="radius || 'rounded'" [size]="size"></atlas-avatar>`;

const AvatarTemplateIcon = `
<atlas-avatar [action]="action" [indicator]="indicator" [indicatorColor]="indicatorColor" [imgSrc]="imgSrc1" [radius]="radius || 'rounded'" [size]="size"><atlas-icon [icon]="icon"></atlas-icon></atlas-avatar>`;

const Template: Story<AvatarComponent> = (args: AvatarComponent) => ({
  props: { ...args },
  moduleMetadata: {
    declarations: [AvatarComponent, IconComponent],
  },
  template: AvatarTemplateBasic,
});

const GroupTemplate: Story<any> = (args: any) => ({
  props: { ...args },
  moduleMetadata: {
    declarations: [AvatarComponent],
  },
  template: AvatarTemplateGroup,
});

const ImageTemplate: Story<any> = (args: any) => ({
  props: { ...args },
  moduleMetadata: {
    declarations: [AvatarComponent, IconComponent],
  },
  template: AvatarTemplateImage,
});

const IconTemplate: Story<any> = (args: any) => ({
  props: { ...args },
  moduleMetadata: {
    declarations: [AvatarComponent, IconComponent],
  },
  template: AvatarTemplateIcon,
});

export const Basic = Template.bind({});
Basic.args = {
  color: Colors.brand,
  indicator: false,
  indicatorColor: Colors.success,
  typography: 'typographyStyles-body-largeAlt',
  avatarPaddingClass: 'padding-left-8',
  background: 'background-default-light',
  contentPaddingClass: 'padding-y-8 padding-x-8',
  footerPaddingClass: 'padding-y-8 padding-x-4',
  headerPaddingClass: 'padding-y-8 padding-x-8',
  size: AvatarSizes.medium,
};

Basic.parameters = {
  docs: {
    source: {
      code: AvatarTemplateBasic,
    },
  },
}

export const Image = ImageTemplate.bind({});
Image.args = {
  imgSrc1: 'https://images.pexels.com/photos/922934/pexels-photo-922934.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  indicator: false,
  indicatorColor: Colors.success,
  size: AvatarSizes.medium,
};

Image.parameters = {
  docs: {
    source: {
      code: AvatarTemplateImage,
    },
  },
}

export const Icon = IconTemplate.bind({});
Icon.args = {
  icon: 'icon-screen-share-24',
  action: Actions.primary,
  indicator: false,
  indicatorColor: Colors.success,
  size: AvatarSizes.medium,
};

Icon.parameters = {
  docs: {
    source: {
      code: AvatarTemplateIcon,
    },
  },
}

export const Group = GroupTemplate.bind({});
Group.args = {
  imgSrc1: 'https://images.pexels.com/photos/7709022/pexels-photo-7709022.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  imgSrc2: 'https://images.pexels.com/photos/5082976/pexels-photo-5082976.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  imgSrc3: 'https://images.pexels.com/photos/10130215/pexels-photo-10130215.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  indicator: false,
  indicatorColor: Colors.success,
  size: AvatarSizes.medium,
};

Group.parameters = {
  docs: {
    source: {
      code: AvatarTemplateGroup,
    },
  },
}
