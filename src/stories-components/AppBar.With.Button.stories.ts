// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { AppBarComponent, AppBarModule } from 'atlas-app-bar';
import { ButtonModule } from 'atlas-button';
import { Actions, BoxShadows, ThemingService } from 'atlas-cdk';
import { IconModule, IconSizes } from 'atlas-icon';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';

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
    size: {
      table: {
        disable: true
      }
    },
    actionBtn: {
      options: [Actions.default, Actions.primary, Actions.secondary, Actions['primary-reverse'], Actions['secondary-reverse']],
      control: { type: 'select' },
      defaultValue: Actions.default
    },
    elevation: {
      options: [BoxShadows.flat, BoxShadows.raised, BoxShadows.elevated, BoxShadows.floating, BoxShadows.lifted],
      control: { type: 'select' },
      defaultValue: BoxShadows.raised
    },
  },
} as Meta<AppBarComponent>;

const WITH_BUTTONS_TEMPLATE = `
<atlas-app-bar [background]="background" [action]="action || Actions.default" [elevation]="elevation || BoxShadows.raised" [textColor]="textColor">
<atlas-icon-button
  [size]="'medium'"
  [action]="actionBtn || 'default'"
  [icon]="'icon-menu-24'"
></atlas-icon-button>
<div class="padding-left-8 typographyStyles-heading-medium">Example</div>
<span class="app-bar-separator"></span>
  <atlas-icon-button
  [size]="'medium'"
  [action]="actionBtn || 'default'"
  [icon]="'icon-search-24'"
></atlas-icon-button>
<atlas-button
[action]="actionBtn || 'default'"
  [variant]="'text'" >
  Medium
</atlas-button>
</atlas-app-bar>`;

export const WithButtons: Story<AppBarComponent> = (args: AppBarComponent) => ({
  props: { ...args },
  template: WITH_BUTTONS_TEMPLATE,
  moduleMetadata: {
    imports: [ ButtonModule, IconModule],
    providers: [ThemingService]
  },
});

WithButtons.args = {
  action: Actions.default,
  elevation: BoxShadows.raised,
}

WithButtons.parameters = {
  docs: {
    source: {
      code: WITH_BUTTONS_TEMPLATE,
    },
  },
};