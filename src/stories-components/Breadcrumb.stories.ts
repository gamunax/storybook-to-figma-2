// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import {
  BreadcrumbComponent,
  BreadcrumbItemComponent,
  BreadcrumbItemSeparatorComponent,
  BreadcrumbModule,
} from 'atlas-breadcrumb';
import { IconComponent, IconModule } from 'atlas-icon';
import { Actions, Colors } from 'atlas-cdk';
import { LinkComponent, LinkModule } from 'atlas-link';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { applicationConfig, Meta, moduleMetadata, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { importProvidersFrom } from '@angular/core';



export default {
  title: 'Adopters/Components/Breadcrumb',
  component: BreadcrumbComponent,
  subcomponents: { BreadcrumbItemComponent, BreadcrumbItemSeparatorComponent, IconComponent },
  decorators: [
    withDesign,
    applicationConfig({
      providers: [
        importProvidersFrom(
          RouterModule.forRoot([], { useHash: true })
        ),
      ],
    }),
    moduleMetadata({
      declarations: [],
      imports: [RouterModule],
    }),
  ],
  parameters: {
    controls: { sort: 'requiredFirst' },
    options: {
      isToolshown: true
    },
  },
  argTypes: {
    collapsed: {
      options: [true, false],
      control: { type: 'boolean' }
    },    
    underline: {
      description: 'Underline style option for the link component',
      options: [true, false],
      control: { type: 'boolean' }
    },    
    external: {
      description: 'Select if the link is external or not, this determines if the component uses an href attribute or routerLink.',
      options: [true, false],
      control: { type: 'boolean' }
    },
    color: {
      description: 'Style for the link component',
      options: [Colors.neutral, Colors.brand],
      control: { type: 'select' },
      default: Colors.neutral
    },     
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [Actions.default, Actions.primary, Actions.secondary],
      control: { type: 'select' },
      default: Actions.default
    },    
  },
  moduleMetadata: {
    imports: [IconModule],
  },
} as Meta<BreadcrumbComponent>;

const routes: Routes = [{ path: '', component: BreadcrumbComponent }];

const BASIC = `
<atlas-breadcrumb [collapsed]="collapsed" [color]="color" [breadcrumbs]="items" ></atlas-breadcrumb>
`;

const BreadcrumbBasic: Story<BreadcrumbComponent> = (args: BreadcrumbComponent) => ({
  props: { ...args },
  moduleMetadata: {
    declarations: [LinkComponent],
    imports: [BreadcrumbModule, IconModule],
  },
  template: BASIC,
});

export const Basic = BreadcrumbBasic.bind({});
Basic.args = {
  items: [
    {
      label: "Level 1",
      path: "/level1",
      disabled: true
    },
    {
      label: "Level 2",
      path: "/level1/level2",
      active: false,
    },
    {
      label: "Level 3",
      path: "/level1/level2/level3",
      active: true,
    },
  ],
  action: Actions.default
};

Basic.parameters = {
  docs: {
    source: {
      code: BASIC,
    },
  },
};


const ROUTER = `
<atlas-breadcrumb [collapsed]="collapsed" [color]="color" [breadcrumbs]="breadcrumbs">
</atlas-breadcrumb>`;

const BreadcrumbByRouter: Story<BreadcrumbComponent> = (args: BreadcrumbComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [BreadcrumbModule, IconModule],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: '',
        },
    ],
  },
  template: ROUTER,
});


export const ByRouter = BreadcrumbByRouter.bind({});
ByRouter.args = {
  breadcrumbs: [
    {
      displayName: 'home',
      lastElement: false,
      url: '/', 
      disabled: false,
    },
    {
      displayName: 'first',
      lastElement: false,
      url: '/lazy',
      disabled: false,
    },
    {
      displayName: 'second',
      lastElement: false,
      url: '/second',
      disabled: true,
    },
    {
      displayName: 'last',
      lastElement: true,
      url: '/last',
      disabled: false,
    },
  ],
  action: Actions.default,
};

ByRouter.parameters = {
  docs: {
    source: {
      code: ROUTER,
    },
  },
};

const WITHICONS = `
<atlas-breadcrumb [collapsed]="collapsed" [icon]="icon" [iconSize]="iconSize" [color]="color" [breadcrumbs]="items">
</atlas-breadcrumb>`;

const BreadcrumbWithIcons: Story<BreadcrumbComponent> = (args: BreadcrumbComponent) => ({
  props: { ...args },
  moduleMetadata: {
    declarations: [LinkComponent],
    imports: [BreadcrumbModule, IconModule]
  },
  template: WITHICONS,
});

export const WithIcons = BreadcrumbWithIcons.bind({});
WithIcons.args = {
  items: [
    {
      label: "Level 1",
      path: "/level1",
      disabled: true,
    },
    {
      label: "Level 2",
      path: "/level1/level2",
      active: false,
    },
    {
      label: "Level 3",
      path: "/level1/level2/level3",
      active: true,
    },
  ],
  icon: "icon-caret-circle-up-24",
  iconSize: "small",
  color: Colors.neutral
};

WithIcons.parameters = {
  docs: {
    source: {
      code: WITHICONS,
    },
  },
};

