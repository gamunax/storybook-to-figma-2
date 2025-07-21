import { ButtonGroupComponent, ButtonModule, ButtonSizings, ButtonVariants, Radii } from 'atlas-button';
import { IconModule } from 'atlas-icon';
import { Meta, Story } from '@storybook/angular';
import { Actions, BoxShadows, Colors, Styles } from 'atlas-cdk';

export default {
  title: 'Adopters/Components/Button/Button Group',
  component: ButtonGroupComponent,  
  parameters: {
    options: {
      isToolshown: true,      
    },
    controls: { sort: 'requiredFirst'},
  },
  argTypes: {
    style: {
      description: 'Select which style to display',
      options: [ Styles.strong, Styles.soft, Styles.outlined, Styles['no-fill']],
      control: { type: 'select' },   
      defaultValue: Styles.strong
    },
    variant: {
      description:
        'This property is deprecated and will be removed in a future version. Please use `style` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      control: false,
    },
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      control: false,
    },
    color: {
      description: 'Select the action color of the button',
      options: [ Colors.neutral, Colors.brand, Colors.caution, Colors.danger, Colors.success, Colors.info],
      control: { type: 'select' },
      defaultValue: Colors.brand
    },
    size: {
      options: [ButtonSizings.xsmall, ButtonSizings.small, ButtonSizings.medium, ButtonSizings.large, ButtonSizings.xlarge],
      control: { type: 'select' },
      defaultValue: ButtonSizings.medium
    },
    radius: {
      options: [Radii.soft, Radii.softer, Radii.none, Radii.rounded],
      control: { type: 'select' }
    },
    vertical: {
      options: [true, false],
      control: { type: 'select' }
    },
  },
  moduleMetadata: {
    imports: [ButtonModule, IconModule],
  },
} as Meta;

const BasicTemplate =  `
  <div style="width: max-content">
    <atlas-button-group [vertical]="vertical" [buttonsConfig]="buttonsConfig"  [style]="style" [color]="color" [size]="size" [radius]="radius" [disabled]="disabled"></atlas-button-group>
  </div>  
`;

const DocTemplate =  `
    <atlas-button-group [vertical]="vertical" [buttonsConfig]="buttonsConfig"  [style]="style" [color]="color" [size]="size" [radius]="radius" [disabled]="disabled"></atlas-button-group>
`;


const Template: Story<ButtonGroupComponent> = (args: ButtonGroupComponent) => ({
  props: {...args},
  moduleMetadata: {
    imports: [ButtonModule, IconModule],
  },
  template: BasicTemplate,
});

export const Basic = Template.bind({});
Basic.args = {
  vertical: false,
  color: Colors.brand,
  style: Styles.outlined, 
  size: ButtonSizings.medium,
  buttonsConfig: [
    { content: 'Button 1', disabled: false,  event: () => console.log('clicked 1')},
    { content: 'Button 2', disabled: false,  event: () => console.log('clicked 2')},
    { content: 'Button 3', disabled: false,  event: () => console.log('clicked 3')},
  ] 
};

Basic.parameters = {
  docs: {
    source: {
      code: DocTemplate,
    },
  },
}


const HTMLTemplate =  `
    <atlas-button-group [vertical]="vertical" [style]="style" [color]="color" [size]="size" [radius]="radius" [disabled]="disabled">
      <a href="" #buttonGroup>Button 1</a>
      <a href="" #buttonGroup>Button 2</a>
      <a href="" #buttonGroup>Button 3</a>
    </atlas-button-group>
`;

const TemplateHTMLButton: Story<ButtonGroupComponent> = (args: ButtonGroupComponent) => ({
  props: {...args},
  moduleMetadata: {
    imports: [ButtonModule, IconModule],
  },
  template: HTMLTemplate,
});

export const HTMLButton = TemplateHTMLButton.bind({});
HTMLButton.args = {
  vertical: false,
  color: Colors.brand,
  style: Styles.soft, 
  size: ButtonSizings.medium,
};


HTMLButton.parameters = {
  docs: {
    source: {
      code: HTMLTemplate,
    },
  },
}