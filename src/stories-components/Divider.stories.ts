// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { DividerComponent, DividerModule } from 'atlas-divider';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ListModule } from 'projects/list/src/public-api';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';

export default {
  title: 'Adopters/Components/Divider',
  component: DividerComponent,
  decorators: [
    withDesign,
  ],
  parameters: {
    badges: [BADGES.ALPHA],
    controls: { sort: 'requiredFirst' },
    // TODO [AG]: I need to keep this code, we are going to fixed in a different ticket
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/x74LhhNgStoUDZtMqGjGhg/Foundation-0.0.2?node-id=12412%3A23460',
    //   allowFullscreen: true,
    // },
    options: {
      isToolshown: true
    },
  },  
} as Meta;

const TEMPLATE = `
<div style="width: 200px;">  
  <atlas-list>    
      <atlas-list-item>Item A</atlas-list-item>
      <atlas-divider [vertical]="vertical" [style]="vertical ? 'height: 24px' : '' "></atlas-divider>
      <atlas-list-item>Item B</atlas-list-item>
      <atlas-divider [vertical]="vertical" [style]="vertical ? 'height: 24px' : '' "></atlas-divider>
      <atlas-list-item>Item C</atlas-list-item>
      <atlas-divider [vertical]="vertical" [style]="vertical ? 'height: 24px' : '' "></atlas-divider>
    </atlas-list>
</div>
`;

const TEMPLATE_VERTICAL = `
<div style="display:flex; flex-direction: row">
  <div>
    <span class="typographyStyles-body-medium">Item A</span>
  </div>
  <atlas-divider [vertical]="true" style="height: 24px; margin: 0 8px"></atlas-divider>
  <div>
    <span class="typographyStyles-body-medium">Item B</span>
  </div>
</div>
`;

const Horizontal: Story<DividerComponent> = (args: DividerComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [DividerModule, ListModule],
  },
  template: TEMPLATE,
});

export const HorizontalDivider = Horizontal.bind({});
Horizontal.args = {
 vertical: false,
};
Horizontal.parameters = {
  docs: {
    source: {
      code: TEMPLATE,
    },
  },
};

const Vertical: Story<DividerComponent> = (args: DividerComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [DividerModule, ListModule],
  },
  template: TEMPLATE_VERTICAL,
});

export const VerticalDivider = Vertical.bind({});
Vertical.args = {
  vertical: true,  
};
Vertical.parameters = {
  docs: {
    source: {
      code: TEMPLATE_VERTICAL,
    },
  },
};


