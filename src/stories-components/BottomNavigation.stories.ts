
import { Meta, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { TabGroupComponent } from 'atlas-tabs';
import { IconModule, IconSizes } from 'atlas-icon';
import { CdkModule } from 'atlas-cdk';

import { FieldModule } from 'atlas-field';
import { BadgeModes, BadgeModule, BadgePositions } from 'atlas-badge';
import { BottomNavigationActionComponent, BottomNavigationComponent, BottomNavigationModule } from 'atlas-bottom-navigation';

export default {
  title: 'Adopters/Components/Bottom Navigation',
  component: BottomNavigationComponent,
  subcomponents:{ BottomNavigationActionComponent },
  decorators: [
    withDesign,
  ],
  parameters: {
    controls: { sort: 'requiredFirst' },
    options: {
      isToolshown: true
    },
  },
  argTypes: {
    iconSize: {
      options: [IconSizes.small, IconSizes.medium, IconSizes.large],
      defaultValue: IconSizes.medium,
      description: 'Set the icon size for the bottom navigation link',
      control: { type: 'select'}
    }
  }
} as Meta<TabGroupComponent>;

const BASIC = `
<div class='margin-top-8'>
  <atlas-bottom-navigation>
    <atlas-bottom-navigation-action>
        <atlas-icon
          [icon]="'icon-calendar-24'"
          [size]="iconSize"
        >
        </atlas-icon>
        <atlas-field-label class="typographyStyles-body-small">Calendar</atlas-field-label>
    </atlas-bottom-navigation-action>
    <atlas-bottom-navigation-action [disabled]="true">
        <atlas-icon
          [icon]="'icon-warning-24'"
          [size]="iconSize"
        >
        </atlas-icon>
        <atlas-field-label class="typographyStyles-body-small">Warnings</atlas-field-label> 
    </atlas-bottom-navigation-action>
    <atlas-bottom-navigation-action> 
        <atlas-icon
          [icon]="'icon-notification-24'"
          [size]="iconSize"
        >
        </atlas-icon>
        <atlas-field-label class="typographyStyles-body-small">Notifications</atlas-field-label>
    </atlas-bottom-navigation-action>
  </atlas-bottom-navigation>
</div>
`;

  const NO_LABEL = `
  <div class='margin-top-8'>
    <atlas-bottom-navigation>
      <atlas-bottom-navigation-action>
          <atlas-icon
            [icon]="'icon-calendar-24'"
            [size]="iconSize"
          >
          </atlas-icon>
      </atlas-bottom-navigation-action>
      <atlas-bottom-navigation-action [disabled]="true">
          <atlas-icon
            [icon]="'icon-warning-24'"
            [size]="iconSize"
          >
          </atlas-icon>
      </atlas-bottom-navigation-action>
      <atlas-bottom-navigation-action> 
          <atlas-icon
            [icon]="'icon-notification-24'"
            [size]="iconSize"
          >
          </atlas-icon>
      </atlas-bottom-navigation-action>
    </atlas-bottom-navigation>
  </div>  
`;

  const LIST = `
  <div class='margin-top-8'>
    <atlas-bottom-navigation>
      <atlas-bottom-navigation-action *ngFor="let nav of navs, let i = index">
         <atlas-icon [icon]="nav.icon" [size]="iconSize"></atlas-icon>
         <atlas-field-label class="typographyStyles-body-small">{{nav.label}}</atlas-field-label> 
      </atlas-bottom-navigation-action>
    </atlas-bottom-navigation>
  </div>  
`;

  const LIST_BADGES = `
  <div class='margin-top-8'>
    <atlas-bottom-navigation>
      <atlas-bottom-navigation-action *ngFor="let nav of navs, let i = index">
         <atlas-icon [icon]="nav.icon" 
            [size]="iconSize"
            [badgePosition]="badgePositions"
            [badgeMode]="badgeModes"
            [badge]="nav.badgeCount"
          ></atlas-icon>
         <atlas-field-label class="typographyStyles-body-small">{{nav.label}}</atlas-field-label> 
      </atlas-bottom-navigation-action>
    </atlas-bottom-navigation>
  </div>  
`;

const Default: Story<any> = (args: any) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [ BottomNavigationModule, FieldModule, IconModule, CdkModule]
  },
  template: BASIC,
});

export const Basic = Default.bind({});
Basic.args = {
  iconSize: IconSizes.medium,
};

Basic.parameters = {
  docs: {
    source: {
      code: BASIC,
    },
  },
};

const NoLabel: Story<any> = (args: any) => ({
  props: { ...args },
  moduleMetadata: {
    imports:  [BottomNavigationModule, FieldModule, IconModule, CdkModule]
  },
  template: NO_LABEL,
});

export const OnlyIcons = NoLabel.bind({});
OnlyIcons.args = {
  iconSize: IconSizes.medium,
};

NoLabel.args = {
  iconSize: IconSizes.medium,
};


const AsList: Story<any> = (args: any) => ({
  props: { ...args },
  moduleMetadata: {
    imports:  [BottomNavigationModule, FieldModule, IconModule, CdkModule]
  },
  template: LIST,
});

export const ListOfItems = AsList.bind({});
ListOfItems.args = {
  iconSize: IconSizes.medium,
  navs: [
    { 
      label: 'Recent',
      icon: 'icon-calendar-24'
    },
    { 
      label: 'Shared',
      icon: `icon-cloud-upload-24`
    },
    { 
      label: 'Stored',
      icon: 'icon-file-download-24'
    },
    { 
      label: 'Section',
      icon: 'icon-home-24'
    },
  ]
};

const Badges: Story<any> = (args: any) => ({
  props: { ...args },
  moduleMetadata: {
    imports:  [BottomNavigationModule, FieldModule, IconModule, BadgeModule, CdkModule]
  },
  template: LIST_BADGES,
});

export const WithBadge = Badges.bind({});
WithBadge.args = {
  iconSize: IconSizes.medium,
  navs: [
    { 
      label: 'Recent',
      icon: 'icon-calendar-24',
      badgeCount: '7'
    },
    { 
      label: 'Shared',
      icon: `icon-cloud-upload-24`,
      badgeCount: '1'
    },
    { 
      label: 'Stored',
      icon: 'icon-file-download-24',
      badgeCount: '0'
    },
    { 
      label: 'Section',
      icon: 'icon-home-24',
      badgeCount: '99'
    },
  ],
  badgeModes: BadgeModes.numbers,
  badgePositions: BadgePositions.topRight
};

WithBadge.parameters = {
  docs: {
    source: {
      code: LIST_BADGES,
    },
  },
};
