// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { AppBarComponent, AppBarModule } from 'atlas-app-bar';
import { ButtonModule } from 'atlas-button';
import { Actions, BoxShadows, ThemingService } from 'atlas-cdk';
import { IconModule, IconSizes } from 'atlas-icon';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';
import { AvatarModule } from 'atlas-avatar';

export default {
  title: 'Adopters/Components/AppBar',
  component: AppBarComponent,
  decorators: [
    withDesign,
    moduleMetadata({
      imports: [AppBarModule, ButtonModule, IconModule],
    })
  ],
  parameters: {
    options: {
      isToolshown: true,
    },
    badges: [BADGES.ALPHA],
    controls: { sort: 'requiredFirst' },
    // TODO [AG]: I need to keep this code, we are going to fixed in a different ticket
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/Yzrgj31BciBNyvrN4BJUNR/Foundation-0.0.1?node-id=12412%3A23532',
    //   allowFullscreen: true,
    // },
  },
  argTypes: {
    action: {
      options: [Actions.default, Actions.primary, Actions.secondary],
      control: { type: 'select' },
      defaultValue: Actions.default
    },
    actionBtn: {
      options: [Actions.default, Actions.primary, Actions.secondary],
      control: { type: 'select' },
      description: 'The action color for avatar and icon button components',
      defaultValue: Actions.default
    },
    size: {
      table: {
        disable: true
      }
    },
    elevation: {
      options: [BoxShadows.flat, BoxShadows.raised, BoxShadows.elevated, BoxShadows.floating, BoxShadows.lifted],
      control: { type: 'select' },
      defaultValue: BoxShadows.raised
    },
  },
} as Meta<AppBarComponent>;

const WITH_LOGO_TEMPLATE = `
  <atlas-app-bar [background]="background" [elevation]="elevation || BoxShadows.raised" [action]="action || Actions.default">
    <atlas-icon-button
      [size]="size || 'medium'"
      [action]="actionBtn || 'default'"
      [icon]="'icon-menu-24'"
    ></atlas-icon-button>
    <img src="./atlas-logos/Mercer.png" height="20px" class="padding-left-8"/>
    <span class="app-bar-separator"></span>
    <atlas-icon-button
      [size]="size || 'medium'"
      [action]="actionBtn || 'default'"
      [icon]="'icon-search-24'"
    ></atlas-icon-button>
    <atlas-button
      [action]="actionBtn || 'default'" 
      [variant]="'text'" >
      Medium
    </atlas-button>
  </atlas-app-bar>`;

export const WithLogoAndButton: Story<any> = (args: any) => ({
  props: { ...args },
  template: WITH_LOGO_TEMPLATE,
  moduleMetadata: {
    imports: [ ButtonModule, AvatarModule],
    providers: [ThemingService]
  },
});

WithLogoAndButton.args = {
  action: Actions.primary, 
  elevation: BoxShadows.raised
};

WithLogoAndButton.parameters = {
  docs: {
    source: {
      code: WITH_LOGO_TEMPLATE,
    },
  },
};

const PRIMARY_LOGO_TEMPLATE = `
  <atlas-app-bar [background]="background" [action]="action || Actions.default" [elevation]="elevation || BoxShadows.raised" [textColor]="textColor">
    <atlas-icon-button
      [size]="size || 'medium'"
      [action]="actionBtn || 'default'"
      [icon]="'icon-menu-24'"
      [customClass]="'app-bar-primary-icon-button'"
    ></atlas-icon-button>
    <img src="./atlas-logos/Mercer_R.png" height="20px" class="padding-left-8"/>
    <span class="app-bar-separator"></span>
      <atlas-icon-button
      [size]="size || 'medium'"
      [action]="actionBtn || 'default'"
      [icon]="'icon-search-24'"
      [customClass]="'app-bar-primary-icon-button'"
    ></atlas-icon-button>
    <atlas-avatar
      [action]="actionBtn || 'default'"
      typography="typographyStyles-body-largeAlt"
      [grouped]="false"
      [indicator]="false"
      class="padding-left-2"
      [avatarCustomClass]="'app-bar-primary-avatar'"
    >CF</atlas-avatar>
  </atlas-app-bar>
`;

export const WithLogoAsPrimary: Story<any> = (args: any) => ({
  props: { ...args },
  template: PRIMARY_LOGO_TEMPLATE,
  moduleMetadata: {
    imports: [ ButtonModule, AvatarModule],
    providers: [ThemingService]
  },
});

WithLogoAsPrimary.args = {
  action: Actions.primary, 
  elevation: BoxShadows.raised
};

WithLogoAsPrimary.parameters = {
  docs: {
    source: {
      code: PRIMARY_LOGO_TEMPLATE,
    },
  },
};

const SECONDARY_LOGO_TEMPLATE = `
  <atlas-app-bar [background]="background" [action]="action || Actions.default" [elevation]="elevation || BoxShadows.raised">
    <atlas-icon-button
      [size]="'medium'"
      [action]="actionBtn || 'default'"
      [icon]="'icon-menu-24'"
      [customClass]="'app-bar-secondary-icon-button'"
    ></atlas-icon-button>
    <img src="./atlas-logos/Mercer_R.png" height="20px" class="padding-left-8"/>
    <span class="app-bar-separator"></span>
    <atlas-icon-button
      [size]="'medium'"
      [action]="actionBtn || 'default'"
      [icon]="'icon-search-24'"
      [customClass]="'app-bar-secondary-icon-button'"
    ></atlas-icon-button>
    <atlas-avatar
      [action]="actionBtn || 'default'"
      typography="typographyStyles-body-largeAlt"
      [grouped]="false"
      [indicator]="false"
      class="padding-left-2"
      [avatarCustomClass]="'app-bar-secondary-avatar'"
    >CF</atlas-avatar>
  </atlas-app-bar>
`;

export const WithLogoAsSecondary: Story<any> = (args: any) => ({
  props: { ...args },
  template: SECONDARY_LOGO_TEMPLATE,
  moduleMetadata: {
    imports: [ ButtonModule, AvatarModule],
    providers: [ThemingService]
  },
});

WithLogoAsSecondary.args = {
  action: Actions.primary, 
  elevation: BoxShadows.raised
};

WithLogoAsSecondary.parameters = {
  docs: {
    source: {
      code: SECONDARY_LOGO_TEMPLATE,
    },
  },
};