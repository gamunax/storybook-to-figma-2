// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { BADGES } from '.storybook/constants';
import { Story, Meta } from '@storybook/angular';
import { Actions, Colors } from 'projects/cdk/src/public-api';
import { ListComponent, ListItemComponent } from 'projects/list/src/public-api';
import { IconComponent } from 'projects/icon/src/public-api';
import { AvatarComponent } from 'projects/avatar/src/public-api';

export default {
  title: 'Adopters/Components/List',
  component: ListItemComponent,
  subcomponents: {ListComponent},
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: 'var(--semanticColor-layer-neutral-01)' },
        { name: 'dark', value: 'var(--semanticColor-layer-brand-00)' },
      ],
    },
    options: {
      isToolshown: true
    },
    badges: [ BADGES.ALPHA ],
  },
  argTypes: {
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [Actions.default, Actions.primary, Actions.secondary, Actions.error, Actions.warning, Actions.info, Actions.success],
      control: { type: 'select' },
      defaultValue: Actions.primary,
    },
    color: {
      description: 'Select the color of the button, for now this property do not have functionality',
      options: [Colors.neutral, Colors.brand, Colors.caution, Colors.danger, Colors.success, Colors.info ],
      control: { type: 'select' },
      defaultValue: Colors.brand,
    },
    items: {
      table:{
        disable: true
      }
    }
  }
} as Meta;

const BasicListTemplate =  `
<atlas-list>
  <atlas-list-item [color]="color"[item]="{value: 'option 1'}">
    <div>
      Option 1
      <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">sub option 1</div>
    </div>
  </atlas-list-item>
  <atlas-list-item [color]="color"[item]="{value: 'option 2'}">
    <div>
      Option 2
      <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">sub option 2</div>
    </div>
  </atlas-list-item>
  <atlas-list-item [color]="color"[item]="{value: 'option 3'}">
    <div>
      Option 3
      <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">sub option 3</div>
    </div>
  </atlas-list-item>
</atlas-list>`;

const ListTemplate =  `
<atlas-list>
  <atlas-list-item *ngFor="let item of items" [item]="item" [action]="action">
    <atlas-avatar *ngIf="item.avatar" style="margin-right: 16px;" [imgSrc]="item.avatar"></atlas-avatar>
    <atlas-icon [color]="colors-action-default-content-dark" *ngIf="item.icon" style="margin-right: 32px;" size="medium" [icon]="item.icon"></atlas-icon> 
    <div>
      {{ item.label }} 
      <div *ngIf="item.secondary" style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">{{item.secondary}}</div>
    </div>
  </atlas-list-item>
</atlas-list>`;

const BasicTemplate: Story<any> = (args: ListItemComponent) => ({
  props: args,
  moduleMetadata: {
    declarations: [ListComponent, ListItemComponent, IconComponent, AvatarComponent],
  },
  template: BasicListTemplate,
});

export const Basic = BasicTemplate.bind({});
Basic.args = {
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
            selected: false,
        },
        {
            value: 'option_S',
            label: 'List item  4',
            icon: 'icon-arrow-counterclockwise-time-24',
        },
        {
            value: 'option_S',
            label: 'List item  5',
            icon: 'icon-eye-24',
        },
        {
            value: 'option_S',
            label: 'List item  6',
            icon: 'icon-lock-24',
        },
        {
            value: 'option_S',
            label: 'List item 7 (Selected)',
            icon: 'icon-cloud-upload-24',
            selected: true,
        },
  ]
};

Basic.parameters = {
  docs: {
    source: {
      code: BasicListTemplate,
    },
  },
};

const Template: Story<any> = (args: ListItemComponent) => ({
  props: args,
  moduleMetadata: {
    declarations: [ListComponent, ListItemComponent, IconComponent, AvatarComponent],
  },
  template: ListTemplate,
});


export const ListReverse = Template.bind({});
ListReverse.parameters = {
  backgrounds: { default: 'dark' },
  docs: {
    source: {
      code: ListTemplate,
    },
  },
};

ListReverse.args = {
    items: [
        {
            value: 'option_ONE',
            label: 'List item 1',
            icon: 'icon-home-24',
            reverse: true,
        },
        {
            value: 'option_TWO',
            label: 'List item 2',
            icon: 'icon-clock-24',
            reverse: true,
        },
        {
            value: 'option_D',
            label: 'List item 3',
            icon: 'icon-lock-24',
            reverse: true,
            selected: false,
        },
        {
            value: 'option_S',
            label: 'List item  4',
            icon: 'icon-arrow-counterclockwise-time-24',
            reverse: true,
        },
        {
            value: 'option_S',
            label: 'List item  5',
            icon: 'icon-eye-24',
            reverse: true,
        },
        {
            value: 'option_S',
            label: 'List item  6',
            icon: 'icon-lock-24',
            reverse: true,
        },
        {
            value: 'option_S',
            label: 'List item 7 (Selected)',
            icon: 'icon-cloud-upload-24',
            reverse: true,
            selected: true,
        },
  ]
};


export const ListItem = Template.bind({});
ListItem.args = {
    items: [
     {
        value: 'option_ONE',
        label: 'List item',
    },
  ]
};

ListItem.parameters = {
  docs: {
    source: {
      code: ListTemplate,
    },
  },
}

export const ListItemIcon = Template.bind({});
ListItemIcon.args = {
    items: [
    {
        value: 'option_ONE',
        label: 'List item 1',
        icon: 'icon-lock-24',
    },
  ]
};

ListItemIcon.parameters = {
  docs: {
    source: {
      code: ListTemplate,
    },
  },
}

export const DenseListItems = Template.bind({});
DenseListItems.args = {
    items: [
        {
            value: 'option_ONE',
            label: 'List item 1',
            dense: true,
            icon: 'icon-home-24',
        },
        {
            value: 'option_TWO',
            label: 'List item 2',
            dense: true,
            icon: 'icon-clock-24',
        },
        {
            value: 'option_D',
            label: 'List item 3',
            dense: true,
            icon: 'icon-lock-24',
            selected: false,
        },
        {
            value: 'option_S',
            label: 'List item  4',
            dense: true,
            icon: 'icon-arrow-counterclockwise-time-24',
        },
        {
            value: 'option_S',
            label: 'List item  5',
            dense: true,
            icon: 'icon-eye-24',
        },
        {
            value: 'option_S',
            label: 'List item  6',
            dense: true,
            icon: 'icon-lock-24',
        },
        {
            value: 'option_S',
            label: 'List item 7 (Selected)',
            dense: true,
            icon: 'icon-cloud-upload-24',
            selected: true,
        },
  ]
};

DenseListItems.parameters = {
  docs: {
    source: {
      code: ListTemplate,
    },
  },
}


export const ListNesting = Template.bind({});
ListNesting.args = {
    items: [
        {
            value: 'option_ONE',
            label: 'List item 1',
            icon: 'icon-home-24',
        },
        {
            value: 'option_TWO',
            label: 'List item level 2',
            icon: 'icon-clock-24',
            level: 2
        },
        {
          value: 'option_Oadad',
          label: 'List item level 2',
          icon: 'icon-home-24',
          level: 2
        },
        {
            value: 'option_D',
            label: 'List item level 2',
            icon: 'icon-lock-24',
            selected: false,
            level: 2
        },
        {
            value: 'option_S',
            label: 'List item level 3',
            icon: 'icon-arrow-counterclockwise-time-24',
            level: 3
        },
        {
            value: 'option_JJDO',
            label: 'List item level 3',
            icon: 'icon-eye-24',
            level: 3
        },
        {
          value: 'option_SAS',
          label: 'List item level 4',
          icon: 'icon-arrow-counterclockwise-time-24',
          level: 4
        },
        {
            value: 'option_SSA',
            label: 'List item level 4',
            icon: 'icon-eye-24',
            level: 4
        },
        {
            value: 'option_S',
            label: 'List item',
            icon: 'icon-lock-24',
        },
        {
            value: 'option_S',
            label: 'List item',
            icon: 'icon-cloud-upload-24',
        },
  ]
};

ListNesting.parameters = {
  docs: {
    source: {
      code: ListTemplate,
    },
  },
}

export const ListItemAvatar = Template.bind({});
ListItemAvatar.args = {
    items: [
    {
        value: 'option_ONE',
        label: 'List item 1',
        avatar: 'https://images.pexels.com/photos/7709022/pexels-photo-7709022.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
    },
  ]
};

ListItemAvatar.parameters = {
  docs: {
    source: {
      code: ListTemplate,
    },
  },
}

