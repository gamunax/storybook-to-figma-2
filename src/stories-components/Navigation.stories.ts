
import { Meta, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { BADGES } from '.storybook/constants';

import { IconModule } from 'atlas-icon';
import { Actions, CdkModule } from 'atlas-cdk';
import { NavigationComponent, NavigationItemComponent, NavigationMenuComponent, NavigationMenuContentAreaComponent, NavigationMenuCustomAreaComponent, NavigationMenuModule } from 'atlas-navigation';
import { ListModule } from 'atlas-list';
import { ButtonModule, ButtonSizings, ButtonVariants } from 'atlas-button';
import { DividerModule } from 'atlas-divider';

export default {
  title: 'Adopters/Components/Navigation',
  component: NavigationComponent,
  decorators: [
    withDesign,
  ],
  parameters: {
    badges: [BADGES.BETA],
    controls: { sort: 'requiredFirst' },
    // TODO [AG]: I need to keep this code, we are going to fixed in a different ticket
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/x74LhhNgStoUDZtMqGjGhg/Foundation-0.0.2?node-id=593%3A14257',
    //   allowFullscreen: true,
    // },
    options: {
      isToolshown: true
    },
  },
  argTypes: {
    action: {
      options: [
        Actions.default, 
        Actions.primary, 
        Actions.secondary,       
      ],
      control: { type: 'select' },
      defaultValue: Actions.primary
    },
    buttonVariant: {
      options: [
        ButtonVariants.contained,
        ButtonVariants.text,
        ButtonVariants.outlined,
      ],
      control: { type: 'select' },
      defaultValue: ButtonVariants.text,
    },
    buttonSize: {
      options: [
        ButtonSizings.small,
        ButtonSizings.medium,
        ButtonSizings.large
      ],
      control: { type: 'select' },
      defaultValue: ButtonSizings.medium,
    },
    optionalSection: {
      options: [true, false],
      control: {type: 'select'},
      defaultValue: true
    },
    customTitle: {
      name: 'customTitle',
      description: 'Custom area title'
    },
    navItemAction: {
      description: 'Action theme for navigation item',
      options: [
        Actions.default, 
        Actions.primary, 
        Actions.secondary,       
      ],
      control: { type: 'select' },
      defaultValue: Actions.default
    }
  }
} as Meta;

const BASIC = `
<div class="row">
  <div class="column">
    <atlas-navigation [title]="title" [optionalSection]="optionalSection" [optionalBtnLabel]="optionalBtnLabel">
      <atlas-nav-item [action]="navItemAction" (click)="navigationItem1.toggleMenu()" #navigationItem1>
        Category
        <atlas-nav-menu [navigationItem]="navigationItem1">
          <atlas-nav-custom-area [title]="customTitle">
            <span>Brief description of the line of business goes here.</span>
          </atlas-nav-custom-area>
          <atlas-nav-content style="width: 600px">
            <section style="flex-basis: calc(50% - 12px);">
              <atlas-list>
                <atlas-list-item [item]="{value: 'option 1'}">
                  <div class="typographyStyles-body-largeAlt">
                    Title Link
                  </div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 2'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 3'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 4'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 5'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
              </atlas-list>
            </section>
            <section style="flex-basis: calc(50% - 12px);">
              <atlas-list>
                <atlas-list-item [item]="{value: 'option 1'}">
                  <div class="typographyStyles-body-largeAlt">
                    Title Link
                  </div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 2'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 3'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 4'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 5'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
              </atlas-list>
            </section>
            <section style="flex-basis: calc(50% - 12px);">
              <atlas-list>
                <atlas-list-item [item]="{value: 'option 1'}">
                  <div class="typographyStyles-body-largeAlt">
                    Title Link
                  </div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 2'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 3'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 4'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 5'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
              </atlas-list>
            </section>
          </atlas-nav-content>
        </atlas-nav-menu>
      </atlas-nav-item>
      <atlas-nav-item [action]="navItemAction" (click)="navigationItem2.toggleMenu()" #navigationItem2>
        Tags
        <atlas-nav-menu [navigationItem]="navigationItem2">
          <atlas-nav-custom-area [title]="customTitle">
            <span>Brief description of the line of business goes here.</span>
          </atlas-nav-custom-area>
          <atlas-nav-content style="width: 600px">
            <section style="flex-basis: calc(50% - 12px);">
              <atlas-list>
                <atlas-list-item [item]="{value: 'option 1'}">
                  <div class="typographyStyles-body-largeAlt">
                    Title Link
                  </div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 2'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 3'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 4'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 5'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
              </atlas-list>
            </section>
            <section style="flex-basis: calc(50% - 12px);">
              <atlas-list>
                <atlas-list-item [item]="{value: 'option 1'}">
                  <div class="typographyStyles-body-largeAlt">
                    Title Link
                  </div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 2'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 3'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 4'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 5'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
              </atlas-list>
            </section>
            <section style="flex-basis: calc(50% - 12px);">
              <atlas-list>
                <atlas-list-item [item]="{value: 'option 1'}">
                  <div class="typographyStyles-body-largeAlt">
                    Title Link
                  </div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 2'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 3'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 4'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 5'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
              </atlas-list>
            </section>
          </atlas-nav-content>
        </atlas-nav-menu>
      </atlas-nav-item>
      <atlas-nav-item [action]="navItemAction" (click)="navigationItem3.toggleMenu()" #navigationItem3>
        Section
        <atlas-nav-menu [navigationItem]="navigationItem3">
          <atlas-nav-custom-area [title]="customTitle">
            <span>Brief description of the line of business goes here.</span>
          </atlas-nav-custom-area>
          <atlas-nav-content style="width: 600px">
            <section style="flex-basis: calc(50% - 12px);">
              <atlas-list>
                <atlas-list-item [item]="{value: 'option 1'}">
                  <div class="typographyStyles-body-largeAlt">
                    Title Link
                  </div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 2'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 3'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 4'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 5'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
              </atlas-list>
            </section>
            <section style="flex-basis: calc(50% - 12px);">
              <atlas-list>
                <atlas-list-item [item]="{value: 'option 1'}">
                  <div class="typographyStyles-body-largeAlt">
                    Title Link
                  </div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 2'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 3'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 4'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 5'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
              </atlas-list>
            </section>
            <section style="flex-basis: calc(50% - 12px);">
              <atlas-list>
                <atlas-list-item [item]="{value: 'option 1'}">
                  <div class="typographyStyles-body-largeAlt">
                    Title Link
                  </div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 2'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 3'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 4'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
                <atlas-list-item [item]="{value: 'option 5'}">
                    <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Item Link</div>
                </atlas-list-item>
              </atlas-list>
            </section>
          </atlas-nav-content>
        </atlas-nav-menu>
      </atlas-nav-item>
    </atlas-navigation>  
  </div>
</div>`;

const NavigationTemplate: Story<NavigationComponent> = (args: NavigationComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [NavigationMenuModule, DividerModule, ButtonModule, ListModule, CdkModule]
  },
  template: BASIC,
});

export const Basic = NavigationTemplate.bind({});
Basic.args = {
  title: 'Navigation Menu',
  action: Actions.default,
  optionalSection: true,
  optionalBtnLabel: 'View All',
  customTitle: '39 solutions'
};

Basic.parameters = {
  docs: {
    source: {
      code: BASIC,
    },
  },
};
