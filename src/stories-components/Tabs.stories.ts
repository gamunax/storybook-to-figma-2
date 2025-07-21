
import { Meta, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { BADGES } from '.storybook/constants';

import { TabGroupComponent } from 'atlas-tabs';
import { TabsModule } from 'atlas-tabs';
import { IconModule } from 'atlas-icon';
import { Actions, CdkModule, Colors, TabVariants } from 'atlas-cdk';

export default {
  title: 'Adopters/Components/Tabs',
  component: TabGroupComponent,
  decorators: [
    withDesign,
  ],
  parameters: {
    badges: [BADGES.BETA],
    controls: { sort: 'requiredFirst' },
    options: {
      isToolshown: true
    },
  },
  argTypes: {
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [Actions.default, Actions.primary, Actions.secondary, Actions.error, Actions.warning, Actions.info, Actions.success],
      control: { type: 'select' },
      defaultValue: Actions.primary,
    },
    color: {
      description: 'Select the color of the button.',
      options: [Colors.neutral, Colors.brand ],
      control: { type: 'select' },
      defaultValue: Colors.brand,
    },
    variant: {
      description: 'Set the variant of the tabs',
      options: [ TabVariants.empty ],
      control: { type: 'select' },
      defaultValue: TabVariants.empty,
    },
    useSideScroll: {
      table: {
        disable: true
      }
    },
    centered: {
      table: {
        disable: true
      }
    },
    handleOverflow: {
      table: {
        disable: true
      }
    },
    overflowDropdownMaxHeight: {
      table: {
        disable: true
      }
    },
  }
} as Meta<TabGroupComponent>;

const BASIC = `
<atlas-tab-group [color]="color" [variant]="variant">
    <atlas-tab>
      <ng-template atlas-tab-label>
        <div class="demo-tab-label" style="display: flex; flex-direction: column; align-items: center;">
          <atlas-icon icon="icon-home-24"></atlas-icon>
          <span class="padding-top-4 typographyStyles-button-medium"> Tab 1</span>
        </div>
      </ng-template>

      <atlas-tab-content>
        <p class="typographyStyles-body-medium">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto rem ab commodi distinctio magnam odit est consequatur, quidem cupiditate esse quos modi omnis ad excepturi, in ex libero. Non, nam!
      </p>
      </atlas-tab-content>
    </atlas-tab>
    <atlas-tab [disabled]="true">
      <ng-template atlas-tab-label>
        <div class="demo-tab-label" style="display: flex; flex-direction: column; align-items: center;">
          <atlas-icon icon="icon-lock-24"></atlas-icon>
          <span class="padding-top-4 typographyStyles-button-medium"> Tab 2</span>
        </div>
      </ng-template>

      <atlas-tab-content>
        <p class="typographyStyles-body-medium">
        Hodor. Hodor hodor, hodor. Hodor hodor hodor hodor hodor. Hodor. Hodor! Hodor hodor, hodor; hodor hodor hodor. Hodor. Hodor hodor; hodor hodor - hodor, hodor, hodor hodor. Hodor, hodor. Hodor. Hodor, hodor hodor hodor; hodor hodor; hodor hodor hodor! Hodor hodor HODOR! Hodor hodor... Hodor hodor hodor...
        </p>
      </atlas-tab-content>
    </atlas-tab>
    <atlas-tab>
      <ng-template atlas-tab-label>
        <div class="demo-tab-label" style="display: flex; flex-direction: column; align-items: center;">
          <atlas-icon icon="icon-file-upload-24"></atlas-icon>
          <span class="padding-top-4 typographyStyles-button-medium"> Tab 3</span>
        </div>
      </ng-template>

      <atlas-tab-content>
        <p class="typographyStyles-body-medium">
        hello world 3
        </p>
      </atlas-tab-content>
    </atlas-tab>

  </atlas-tab-group>`;

  const ICONS = `
<atlas-tab-group [color]="color" [variant]="variant">
    <atlas-tab>
      <ng-template atlas-tab-label>
        <div class="demo-tab-label" style="display: flex; flex-direction: column; align-items: center;">
          <atlas-icon icon="icon-home-24"></atlas-icon>
        </div>
      </ng-template>

      <atlas-tab-content>
        <p class="typographyStyles-body-medium">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto rem ab commodi distinctio magnam odit est consequatur, quidem cupiditate esse quos modi omnis ad excepturi, in ex libero. Non, nam!
      </p>
      </atlas-tab-content>
    </atlas-tab>
    <atlas-tab [disabled]="true">
      <ng-template atlas-tab-label>
        <div class="demo-tab-label" style="display: flex; flex-direction: column; align-items: center;">
          <atlas-icon icon="icon-lock-24"></atlas-icon>
        </div>
      </ng-template>

      <atlas-tab-content>
        <p class="typographyStyles-body-medium">
        Hodor. Hodor hodor, hodor. Hodor hodor hodor hodor hodor. Hodor. Hodor! Hodor hodor, hodor; hodor hodor hodor. Hodor. Hodor hodor; hodor hodor - hodor, hodor, hodor hodor. Hodor, hodor. Hodor. Hodor, hodor hodor hodor; hodor hodor; hodor hodor hodor! Hodor hodor HODOR! Hodor hodor... Hodor hodor hodor...
        </p>
      </atlas-tab-content>
    </atlas-tab>
    <atlas-tab>
      <ng-template atlas-tab-label>
        <div class="demo-tab-label" style="display: flex; flex-direction: column; align-items: center;">
          <atlas-icon icon="icon-file-upload-24"></atlas-icon>
        </div>
      </ng-template>

      <atlas-tab-content>
        <p class="typographyStyles-body-medium">
        hello world 3
        </p>
      </atlas-tab-content>
    </atlas-tab>

  </atlas-tab-group>`;

  const TEXT = `
<atlas-tab-group [color]="color" [variant]="variant">
    <atlas-tab>
      <ng-template atlas-tab-label>
        <div class="demo-tab-label" style="display: flex; flex-direction: column; align-items: center;">
          <span class="padding-top-4 typographyStyles-button-medium"> Tab 1</span>
        </div>
      </ng-template>

      <atlas-tab-content>
        <p class="typographyStyles-body-medium">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto rem ab commodi distinctio magnam odit est consequatur, quidem cupiditate esse quos modi omnis ad excepturi, in ex libero. Non, nam!
      </p>
      </atlas-tab-content>
    </atlas-tab>
    <atlas-tab [disabled]="true">
      <ng-template atlas-tab-label>
        <div class="demo-tab-label" style="display: flex; flex-direction: column; align-items: center;">
          <span class="padding-top-4 typographyStyles-button-medium"> Tab 2</span>
        </div>
      </ng-template>

      <atlas-tab-content>
        <p class="typographyStyles-body-medium">
        Hodor. Hodor hodor, hodor. Hodor hodor hodor hodor hodor. Hodor. Hodor! Hodor hodor, hodor; hodor hodor hodor. Hodor. Hodor hodor; hodor hodor - hodor, hodor, hodor hodor. Hodor, hodor. Hodor. Hodor, hodor hodor hodor; hodor hodor; hodor hodor hodor! Hodor hodor HODOR! Hodor hodor... Hodor hodor hodor...
        </p>
      </atlas-tab-content>
    </atlas-tab>
    <atlas-tab>
      <ng-template atlas-tab-label>
        <div class="demo-tab-label" style="display: flex; flex-direction: column; align-items: center;">
          <span class="padding-top-4 typographyStyles-button-medium"> Tab 3</span>
        </div>
      </ng-template>

      <atlas-tab-content>
        <p class="typographyStyles-body-medium">
        hello world 3
        </p>
      </atlas-tab-content>
    </atlas-tab>

  </atlas-tab-group>`;


const TabsEmpty: Story<any> = (args: any) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [TabsModule, IconModule, CdkModule]
  },
  template: BASIC,
});

export const Basic = TabsEmpty.bind({});
Basic.args = {
  color: Colors.brand,
  variant: TabVariants.empty
};

Basic.parameters = {
  docs: {
    source: {
      code: BASIC,
    },
  },
};

const Text: Story<any> = (args: any) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [TabsModule, IconModule, CdkModule]
  },
  template: TEXT,
});

export const TabsText = Text.bind({});
TabsText.args = {
  color: Colors.brand,
  variant: TabVariants.empty
};

const Icon: Story<any> = (args: any) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [TabsModule, IconModule, CdkModule]
  },
  template: ICONS,
});

export const TabsIcon = Icon.bind({});
TabsIcon.args = {
  color: Colors.brand,
  variant: TabVariants.empty
};
