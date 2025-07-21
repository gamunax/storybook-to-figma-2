import { Story, Meta } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs'
import { Actions, Colors, Styles } from 'atlas-cdk';

import { BADGES } from '.storybook/constants';
import { FiledropComponent, FiledropModule } from 'atlas-filedrop';
import { ButtonModule } from 'atlas-button';
import { IconModule } from 'atlas-icon';

export default {
  title: 'Adopters/Components/Filedrop',
  component: FiledropComponent,
  decorators: [withDesign],
  parameters: {
    options: {
      isToolshown: true,
    },
    badges: [BADGES.BETA],
    controls: { sort: 'requiredFirst' },
  },
  argTypes: {
    typographyContent: { defaultValue: 'typographyStyles-body-medium', control: { type: 'text' } },
    multipleFiles: { option: false, control: 'boolean' },
    fullWidth: { option: false, control: 'boolean' },
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [Actions.primary, Actions.secondary, Actions.default, Actions.error, Actions.success],
      control: 'select',
      defaultValue: Actions.primary,
    },
    color: {
      description: 'Select the color of the button.',
      options: [Colors.neutral, Colors.brand, Colors.caution, Colors.danger, Colors.success, Colors.info ],
      control: { type: 'select' },
      defaultValue: Colors.brand,
    },
    style: {
      description: 'Set the button styles',
      options: [Styles.strong, Styles.soft, Styles.outlined, Styles['no-fill']],
      control: { type: 'select' },
      defaultValue: Styles.strong
    },
    content: { defaultValue: 'Drop files here to upload...', control: { type: 'text' } },
    captionButton: { defaultValue: 'Browse files', control: { type: 'text' } },
    cancelButton: { defaultValue: 'Cancel', control: { type: 'text' } },
    accept: { defaultValue: '', control: { type: 'text' } },
    disabled: { option: false, control: 'boolean' },
    onSelectedFilesToUpload: { action: 'writeValue' },
  },
} as Meta;

const BASIC_TEMPLATE_DOC = `
    <atlas-filedrop 
      (selectedFiles)="onSelectedFilesToUpload($event)" 
      [multipleFiles]="multipleFiles" 
      [accept]="accept"
      [disabled]="disabled"
      [fullWidth]="fullWidth"
      [color]="color"
      [style]="style"
      [content]="content"
      [captionButton]="captionButton"
      [cancelButton]="cancelButton"
      [typographyContent]="typographyContent"
      (canceledUpload)="onCanceledUpload()"
    ></atlas-filedrop>
`;

const BASIC_TEMPLATE= `
    <atlas-filedrop 
      (selectedFiles)="onSelectedFilesToUpload($event)" 
      [multipleFiles]="multipleFiles" 
      [accept]="accept"
      [disabled]="disabled"
      [fullWidth]="fullWidth"
      [color]="color"
      [style]="style"
      [content]="content"
      [captionButton]="captionButton"
      [cancelButton]="cancelButton"
      [typographyContent]="typographyContent"
      (canceledUpload)="onCanceledUpload()"
    ></atlas-filedrop>
`;

const ACCEPT_TEMPLATE= `
    <atlas-filedrop 
      (selectedFiles)="onSelectedFilesToUpload($event)" 
      [multipleFiles]="multipleFiles" 
      [accept]="accept"
      [disabled]="disabled"
      [fullWidth]="fullWidth"
      [color]="color"
      [content]="content"
      [captionButton]="captionButton"
      [cancelButton]="cancelButton"
      [typographyContent]="typographyContent"
      (canceledUpload)="onCanceledUpload()"
    ></atlas-filedrop>
`;


const Template: Story<FiledropComponent> = (args: FiledropComponent) => ({
  props: {...args},
  moduleMetadata: {
    imports: [FiledropModule, ButtonModule, IconModule]
  },
  template: BASIC_TEMPLATE,
});

export const Filedrop = Template.bind({});

Filedrop.args = {
  color: Colors.neutral,  
  style: Styles.strong,  
  content: 'Drop files here to upload...',
  captionButton: 'Browse files',
  cancelButton: 'Cancel',
  accept: 'Accept',
  disabled: false,
  typographyContent: 'typography-desktop-body-2',
};

const AcceptTemplate: Story<FiledropComponent> = (args: FiledropComponent) => ({
  props: {...args},
  moduleMetadata: {
    imports: [FiledropModule, ButtonModule, IconModule]
  },
  template: ACCEPT_TEMPLATE,
});

export const FiledropAccept = AcceptTemplate.bind({});

FiledropAccept.args = {
  color: Colors.neutral,  
  content: 'Drop files here to upload...',
  captionButton: 'Browse files',
  cancelButton: 'Cancel',
  accept: '.png, .jpg, .jpeg, .gif, .pdf, .docx, .xlsx',
  disabled: false,
  multipleFiles: true,
  typographyContent: 'typography-desktop-body-2',
};

Filedrop.parameters = {
  docs: {
    source: {
      code: BASIC_TEMPLATE_DOC,
    },
  },
};

