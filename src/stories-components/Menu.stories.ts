// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { BADGES } from '.storybook/constants';
import { IconComponent } from 'projects/icon/src/public-api';
import { Story, Meta } from '@storybook/angular';
import { ButtonComponent } from 'projects/button/src/public-api';
import { ListComponent, ListItemComponent } from 'projects/list/src/public-api';
import { MenuComponent, MenuTriggerDirective } from 'projects/menu/src/public-api';
import { BoxShadows } from 'atlas-cdk/';


 export default {
  title: 'Adopters/Components/Menu',
  component: MenuComponent,
  subcomponents: {MenuTriggerDirective},
  parameters: {
    options: {
      isToolshown: true
    },
    badges: [ BADGES.ALPHA ],
  },
  argTypes: {
     elevation: {
      options: [BoxShadows.flat, BoxShadows.raised, BoxShadows.elevated, BoxShadows.floating, BoxShadows.lifted],
      control: { type: 'select' },
      defaultValue: BoxShadows.raised
    },
  }
} as Meta;

const BasicTemplate = `  
<atlas-menu #demoMenu [menuOpen]="true" [elevation]="elevation">
  <div class="row align-center">
    <div class="column align-center">
      <h1>Content</h1>
    </div>
  </div>
</atlas-menu>`;

const Template: Story<any> = (args: MenuComponent) => ({
  props: args,
  moduleMetadata: {
    declarations: [MenuComponent, ButtonComponent, MenuTriggerDirective],
  },
  template: BasicTemplate,
});

const MenuListTemplate = `  
<atlas-button menuTrigger (triggered)="demoMenu.toggleMenu($event)" action="primary">Open Menu</atlas-button>
  <div class="row">
    <div class="column small-4">
    <atlas-menu #demoMenu [elevation]="elevation" [menuOpen]="true">
    <atlas-list>
      <atlas-list-item *ngFor="let item of items" [item]="item">
        <atlas-avatar *ngIf="item.avatar" style="margin-right: 16px;" [imgSrc]="item.avatar"></atlas-avatar>
        <atlas-icon *ngIf="item.icon" style="margin-right: 34px;" size="medium" [icon]="item.icon"></atlas-icon> 
        <div>
          {{ item.label }} 
          <div *ngIf="item.secondary" class="typographyStyles-body-small">{{item.secondary}}</div>
        </div>
      </atlas-list-item>
    </atlas-list>
    </atlas-menu>
    </div>
  </div>`;

const TemplateList: Story<any> = (args: MenuComponent) => ({
  props: args,
  moduleMetadata: {
    declarations: [MenuComponent, ButtonComponent, MenuTriggerDirective, ListComponent, ListItemComponent, IconComponent],
  },
  template: MenuListTemplate,
});

export const Standard = Template.bind({});
Standard.args = {
};

Standard.parameters = {
  docs: {
    source: {
      code: BasicTemplate,
    },
  },
}

export const MenuList = TemplateList.bind({});
MenuList.args = {
  items: [
    {
        value: 'option_ONE',
        label: 'Home',
        icon: 'icon-home-24',
    },
    {
        value: 'option_TWO',
        label: 'Timesheets',
        icon: 'icon-clock-24',
    },
    {
        value: 'option_S',
        label: 'Uploads',
        icon: 'icon-cloud-upload-24',
    },
]
};

MenuList.parameters = {
  docs: {
    source: {
      code: MenuListTemplate,
    },
  },
}

