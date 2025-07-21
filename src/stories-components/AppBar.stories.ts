// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { AppBarComponent, AppBarModule } from 'atlas-app-bar';
import { Actions, BoxShadows } from 'atlas-cdk';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';
import { ButtonModule } from 'atlas-button';

export default {
  title: 'Adopters/Components/AppBar/Basic',
  component: AppBarComponent,
  decorators: [
    withDesign,
    moduleMetadata({
      imports: [AppBarModule],
    })
  ],
  parameters: {
    options: {
      isToolshown: true,
    },
    badges: [BADGES.ALPHA],
    controls: { sort: 'requiredFirst' },
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

const BASIC_TEMPLATE = `
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

export const Basic: Story<AppBarComponent> = (args: AppBarComponent) => ({
  props: { ...args },
  template: BASIC_TEMPLATE,
  moduleMetadata: { 
    imports: [ButtonModule]
  }
});
Basic.args = {
  action: Actions.default,
  elevation: BoxShadows.raised,
}

Basic.parameters = {
  docs: {
    source: {
      code: BASIC_TEMPLATE,
    },
  },
};
