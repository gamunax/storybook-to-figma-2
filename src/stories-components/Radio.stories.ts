// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { ViewEncapsulation } from '@angular/core';
import { Actions, Colors } from 'atlas-cdk';
import { Meta, Story } from '@storybook/angular';
import { IconSizes } from 'projects/icon/src/lib/icon.const';
import { IconComponent } from 'projects/icon/src/public-api';
import { RadioComponent,  RadioGroupComponent } from 'projects/radio/src/public-api';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RadioIcons } from 'atlas-radio';


 export default {
  title: 'Adopters/Components/Radio',
  component: RadioComponent,
  subComponents: {IconComponent, RadioGroupComponent},
  encapsulation: ViewEncapsulation.None,
  decorators: [withDesign],
  parameters: {
    options: {
      isToolshown: true
    },
    badges: [ BADGES.ALPHA ],
    controls: { sort: 'requiredFirst' },
  },
  argTypes: {
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      table: {
        disable: true
      }
    },
    color: {
      description: 'Select the color of the button.',
      options: [Colors.neutral, Colors.brand, Colors.caution, Colors.danger, Colors.success, Colors.info ],
      control: { type: 'select' },
      defaultValue: Colors.brand,
    },
    size: {
      options: [IconSizes.xsmall, IconSizes.small, IconSizes.medium, IconSizes.large, IconSizes.xlarge],
      control: { type: 'select' },
      defaultValue: IconSizes.medium
    },
    disabled: {
      description: 'Disable the radio button',
      control: { type: 'boolean' },
      defaultValue: false
    },
    checked: {
      options: [true, false],
      control: { type: 'boolean' },
      defaultValue: false,
    },
    radioName: {
      control: { type: 'text' },
      defaultValue: '',
    },
    name: {
      control: { type: 'text' },
      defaultValue: '',
    },
    radioId: {
      control: { type: 'text' },
      defaultValue: '',
    },
    radioCustomClass: {
      control: { type: 'text' },
      defaultValue: '',
    },
    labelCustomClass: {
      table: {
        disable: true
      }
    },
    labelTypography: {
      control: { type: 'text' },
      defaultValue: 'typographyStyles-body-medium',
    },
    disabledColor: { // TODO: radio.component.ts should be updated to use this property
      description: 'Set the radio disabled color token.',
      table: {
        disable: true
      }
    },
    currentIcon: {
      control: { type: 'text' },
      defaultValue: RadioIcons.default,
    },
    labelPosition: { // TODO: radio.component.ts should be updated to use this property
      description: 'Position of the label relative to the radio button',
      table: {
        disable: true
      }
    },
    tabindex: {
      control: { type: 'number' },
      defaultValue: 0,
    },
    'aria-label': {
      description: 'The accessible name for the radio button.',
      table: {
        disable: true
      }
    },
    'aria-labelledby': {
      description: 'The accessible name for the radio button, derived from the element with the specified ID.',
      table: {
        disable: true
      }
    },
    'aria-describedby': {
      description: 'The accessible description for the radio button, derived from the element with the specified ID.',
      table: {
        disable: true
      }
    },
    onChange: { action: "changeState" },
  }
} as Meta;

const BasicTemplate =  `
<atlas-radio 
[color]="color"
[size]="size"
[radioName]="radioName"
[name]="name"
[disabled]="disabled"
[checked]="checked"
[value]="value"
[radioId]="radioId"
[labelTypography]="labelTypography"
[currentIcon]="currentIcon"
[tabIndex]="tabindex"
[radioCustomClass]="radioCustomClass"
(change)="change($event)">Apples</atlas-radio>
`;

const Template: Story<RadioComponent> = (args: RadioComponent) => ({
  props: args,
  moduleMetadata: {
    declarations: [RadioComponent, IconComponent],
    imports: [CommonModule, FormsModule]
  },
  template: BasicTemplate,
});

export const Basic = Template.bind({});
Basic.args = {
  color: Colors.brand,
  size: IconSizes.medium,
  radioName: 'radioName',
  name: 'name',
  disabled: false,
  checked: false,
  value: 'Apples',
  radioId: 'radioId',
  labelTypography: 'typographyStyles-body-medium',
  currentIcon: RadioIcons.default,
  change: (event) => { console.log(event) }
};

Basic.parameters = {
  docs: {
    source: {
      code: BasicTemplate,
    },
  },
}

const GroupTemplate = `
<atlas-radio-group (change)="change($event)" >
  <atlas-radio *ngFor="let nationality of nationalityList" 
    [color]="color"
    [size]="size"
    [radioId]="'radioId-' + nationality.id" 
    [radioName]="'radioName-' + nationality.id"
    [name]="name" 
    [disabled]="nationality.disabled"
    [checked]="nationality.checked"
    [labelTypography]="labelTypography"
    [currentIcon]="currentIcon"
    [tabIndex]="tabindex"
    [radioCustomClass]="radioCustomClass"
    [value]="nationality.id">
    {{nationality.description}}
  </atlas-radio>     
</atlas-radio-group>  
`;

const TemplateGroup: Story<RadioGroupComponent> = (args: RadioGroupComponent) => ({
  props: args,
  moduleMetadata: {
    declarations: [RadioGroupComponent, RadioComponent, IconComponent],
    imports: [CommonModule, FormsModule]
  },
  template: GroupTemplate
})

export const RadioGroup = TemplateGroup.bind({});
RadioGroup.args = {
  color: Colors.brand,
  size:  IconSizes.medium, 
  name: 'nationality',
  labelTypography: 'typographyStyles-body-medium',
  currentIcon: RadioIcons.default,
  nationalityList: [
    {
      id: 1,
      description: 'American',
      disabled: false,
      checked: false
    },
    {
      id: 2,
      description: 'Argentinian',
      disabled: false,
      checked: false
    },
    {
      id: 3,
      description: 'Cuban',
      disabled: false,
      checked: false
    },
    {
      id: 4,
      description: 'Uruguayan',
      disabled: false,
      checked: false
    },
    {
      id: 5,
      description: 'Other',
      disabled: true,
      checked: false
    },
  ],
  change: (event) => { console.log(event) }
}


RadioGroup.parameters = {
  docs: {
    source: {
      code: GroupTemplate,
    },
  },
}
