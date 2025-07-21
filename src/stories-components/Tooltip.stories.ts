// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'atlas-button';
import { TooltipComponent, TooltipModule, TooltipPosition } from 'atlas-tooltip';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';

export default {
  title: 'Adopters/Components/Tooltip',
  component: TooltipComponent,
  decorators: [
    withDesign,   
  ],
  parameters: {    
    badges: [BADGES.ALPHA],
    controls: { sort: 'requiredFirst' },
    options: {
      isToolshown: true,
    }
  }, 
  argTypes: {    
    haloTooltipPosition: {
      options: [TooltipPosition.top, TooltipPosition.bottom, TooltipPosition.left, TooltipPosition.right],
      control: { type: 'select' },
      defaultValue: TooltipPosition.top, 
      description: 'Where the tooltip will be displayed',
    },
    haloTooltip: {
      control: { type: 'text' },
      defaultValue: '',
      description: 'Tooltip content. It can be a string or a HTML string. <br>Example: &lt;p&gt;This is a &lt;strong&gt;HTML&lt;/strong&gt; string&lt;/p&gt;',    
    },
    haloTooltipWithArrow: {
      control: { type: 'boolean' },
      defaultValue: false,
      description: 'Set to true to display an arrow on the tooltip',
    },
  }     
} as Meta;

const TEMPLATE = `
<div style="padding: 100px 30vw">
  <atlas-button [color]="'brand'" [haloTooltip]="haloTooltip" 
    [haloTooltipPosition]="haloTooltipPosition"
    [haloTooltipWithArrow]="haloTooltipWithArrow">Button
  </atlas-button>  
<div>
`;

const TOOLTIP_TEMPLATE = `
<div style="padding: 100px 20vw; display: flex; justify-content:'space-evenly'">
  <atlas-button action="primary" #tooltip="haloTooltip" [haloTooltip]="haloTooltip" 
      [haloTooltipPosition]="haloTooltipPosition"
      [haloTooltipWithArrow]="haloTooltipWithArrow">Action
  </atlas-button>  
  <atlas-button (onClick)="tooltip.toggle()">Show</atlas-button>
  <atlas-button (onClick)="tooltip.toggle()">Hide</atlas-button>
  <atlas-button (onClick)="tooltip.toggle()">Toggle</atlas-button>
<div>
`;

const Mock: Story<TooltipComponent> = (args: TooltipComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [ TooltipModule, ButtonModule, BrowserAnimationsModule ], 
  },
  template: TEMPLATE,
});

export const Basic = Mock.bind({});
Basic.args = {
  haloTooltip: `Aliquam eget finibus ante, non facilisis lectus.`,
  haloTooltipWithArrow: false,
  haloTooltipPosition: TooltipPosition.top,
};

Basic.parameters = {
  docs: {
    source: {
      code: TEMPLATE,
    },
  },
};

const BehaviorMock: Story<TooltipComponent> = (args: TooltipComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [ TooltipModule, ButtonModule, BrowserAnimationsModule ], 
  },
  template: TOOLTIP_TEMPLATE,
});

export const TooltipBehavior = BehaviorMock.bind({});
TooltipBehavior.args = {
  haloTooltip: `Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.`, 
  haloTooltipWithArrow: false,
  haloTooltipPosition: TooltipPosition.top,
};

TooltipBehavior.parameters = {
  docs: {
    source: {
      code: TOOLTIP_TEMPLATE,
    },
  },
};


