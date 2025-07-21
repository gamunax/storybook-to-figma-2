// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs'
import { Actions, Density } from 'projects/cdk/src/public-api';
import { ListModule } from 'atlas-list';
import { IconModule } from 'atlas-icon';
import { BADGES } from '.storybook/constants';
import { DrawerModule, DrawerComponent } from 'atlas-drawer';
export default {
  title: 'Adopters/Components/Drawer',
  component: DrawerComponent,
  decorators: [withDesign],
  parameters: {
    options: {
      isToolshown: true
    },
    badges: [ BADGES.ALPHA ],
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
      options: [ Actions.default, Actions.primary, Actions.secondary ],
      control: { type: 'select' },
      defaultValue: Actions.default,

    },
    density: {
      options: [ Density.expanded, Density.dense, Density.condensed ],
      control: { type: 'select' },
      defaultValue: Density.expanded,
    },
    isAlwaysOpen: {
      options: [true, false],
      control: { type: 'select' },
      defaultValue: true,
    },
    ignoreOutsideClicks: {
      options: [true, false],
      control: { type: 'select' },
    },
  }
} as Meta;

const STANDARD_TEMPLATE = `
<atlas-drawer
isAlwaysOpen="isAlwaysOpen" ignoreOutsideClicks="ignoreOutsideClicks"
[action]="action || Actions.default"
[density]="density || Density.condensed"
>
<h3 *ngIf="density !== 'condensed'" style="padding: 12px 10px; margin: 0px 5px"> Drawer List </h3>
  <atlas-list class="padding-bottom-6">
    <atlas-list-item *ngFor="let item of items" [item]="item">
      <atlas-icon *ngIf="item.icon" style="margin-right: 34px;" size="medium" [icon]="item.icon"></atlas-icon> 
      <div>
        {{  density !== 'condensed' ? item.label : '' }} 
        <div *ngIf="item.secondary" class="typographyStyles-body-small">{{item.secondary}}</div>
      </div>
    </atlas-list-item>
  </atlas-list>
</atlas-drawer>`;

const BASIC_TEMPLATE = `
<atlas-drawer
isAlwaysOpen="isAlwaysOpen" ignoreOutsideClicks="ignoreOutsideClicks"
[action]="action || Actions.default"
[density]="density || Density.expanded"
>
<h3 style="padding: 12px 10px; margin: 0px 5px"> Normal Example </h3>
  <atlas-list class="padding-bottom-6">
    <atlas-list-item [item]="{value: 'opt 1'}">
      <div>
        Option 1
      </div>
    </atlas-list-item>
    <atlas-list-item [item]="{value: 'opt 2'}">
      <div>
        Option 2
      </div>
    </atlas-list-item>
    <atlas-list-item [item]="{value: 'opt 3'}">
      <div>
        Option 3
      </div>
    </atlas-list-item>
  </atlas-list>
</atlas-drawer>`;

export const Basic: Story<DrawerComponent> = (args: DrawerComponent) => ({
  props: args,
  moduleMetadata: {
    imports: [DrawerModule, ListModule, IconModule]
  },
  template: BASIC_TEMPLATE,
});

Basic.args = {
  action: Actions.default,
  density: Density.expanded,
  ignoreOutsideClicks: false
}

Basic.parameters = {
  docs: {
    source: {
      code: BASIC_TEMPLATE,
    },
  },
};

export const ListNormal: Story<any> = (args: any) => ({
  props: {...args},
  moduleMetadata: {
    imports: [DrawerModule, ListModule, IconModule]
  },
  template: STANDARD_TEMPLATE,
});

ListNormal.args = {
  items: [
    {
      value: 'option_ONE',
      label: 'List item 1',
  },
  {
      value: 'option_TWO',
      label: 'List item 2',
  },
  {
      value: 'option_D',
      label: 'List item 3',
  },
],
  action: Actions.default,
  density: Density.expanded,
  ignoreOutsideClicks: false
}

ListNormal.parameters = {
  docs: {
    source: {
      code: STANDARD_TEMPLATE,
    },
  },
};


export const ListIcons: Story<any> = (args: any) => ({
  props: {...args},
  moduleMetadata: {
    imports: [DrawerModule, ListModule, IconModule]
  },
  template: STANDARD_TEMPLATE,
});
ListIcons.args = {
    items: [
      {
        value: 'option_ONE',
        label: 'List item 1',
        icon: 'icon-home-24',

    },
    {
        value: 'option_TWO',
        label: 'List item 2',
        icon: 'icon-clock-24',

    },
    {
        value: 'option_D',
        label: 'List item 3',
        icon: 'icon-lock-24',

    },
  ],
  action: Actions.default,
  density: Density.condensed,
  ignoreOutsideClicks: false
};

ListIcons.parameters = {
  docs: {
    source: {
      code: STANDARD_TEMPLATE,
    },
  },
};