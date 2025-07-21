// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { applicationConfig, Meta, moduleMetadata, Story } from '@storybook/angular';
import { LinkComponent } from 'atlas-link';
import { Actions } from 'atlas-cdk';

import { BADGES } from '.storybook/constants';
import { RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';

export default {
  title: 'Adopters/Components/Link',
  component: LinkComponent,
  parameters: {
    options: {
      isToolshown: true
    },
    badges: [BADGES.BETA],
    controls: { sort: 'requiredFirst' },
    // TODO [AG]: I need to keep this code, we are going to fixed in a different ticket
    // design: {
    //     type: 'figma',
    //     url: 'https://www.figma.com/file/x74LhhNgStoUDZtMqGjGhg/Foundation-0.0.2?node-id=12586%3A19121',
    //     allowFullscreen: true,
    // }, 
  },
  decorators: [
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
  argTypes: {
    action: {
      options: [Actions.default, Actions.primary, Actions.secondary],
      control: { type: 'select' },
      defaultValue: Actions.primary
    },
    underline: {
      options: [true, false],
      control: { type: 'select' }
    },
    external: {
      options: [true, false],
      control: { type: 'select' }
    },
    url: {
      defaultValue: '',
      control: { type: 'text' }
    },
  }
} as Meta;

const Template: Story<LinkComponent> = (args: LinkComponent) => ({
  props: {...args},
  moduleMetadata: {
    declarations: [LinkComponent],
  },
  template: `<atlas-link [url]="url" [underline]="underline" [external]="external" [action]="action">Link</atlas-link>`,
});

export const Basic = Template.bind({});
Basic.args = {
  action: Actions.primary,
  url: ''
};