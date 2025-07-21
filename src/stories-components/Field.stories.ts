// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Actions, Colors, Styles } from 'atlas-cdk';
import {
  FieldComponent,
  FieldErrorComponent,
  FieldHintComponent,
  FieldLabelComponent,
  FieldModule,
  FieldPrefixComponent,
  FieldSize,
  FieldSuffixComponent,
  FieldVariants,
  AtlasInput,
} from 'atlas-field';
import { IconModule, IconSizes } from 'atlas-icon';
import { Meta, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';

const TEMPLATE = `
<atlas-field [color]="color" [size]="size" [style]="style" [fullWidth]="fullWidth">
  <input type="text" atlasInput [required]="true" placeholder="Type here..." [disabled]="disabled"/>
</atlas-field>`;

const TEMPLATE_TEXTAREA = `
<atlas-field [color]="color" [size]="size" [style]="style" [fullWidth]="fullWidth">
  <textarea atlasInput [required]="true" placeholder="Ex. Halo" [disabled]="disabled"></textarea>
</atlas-field>`;

const TEMPLATE_VALIDATIONS = `
<atlas-field [color]="color" [size]="size" [style]="style" [fullWidth]="fullWidth">
  <atlas-field-label>Label</atlas-field-label>
  <atlas-field-prefix>
    <atlas-icon
      [icon]="'icon-home-24'"
      [size]="iconSize">
    </atlas-icon>
  </atlas-field-prefix>
  <input type="text"  
    atlasInput
    [required]="true"
    placeholder="E.g. me@mmc.com"
    [formControl]="emailFormControl"
    [disabled]="disabled"/>
  <atlas-field-error *ngIf="emailFormControl.hasError('email')">Email is wrong</atlas-field-error>
  <atlas-field-hint>This is a hint, write a wrong email to get an error</atlas-field-hint>
</atlas-field>`;

const TEMPLATE_PREFIX_SUFFIX = `
<atlas-field [color]="color" [size]="size" [style]="style" [fullWidth]="fullWidth">
  <atlas-field-label>Label</atlas-field-label>
  <atlas-field-prefix>
    <atlas-icon
      [icon]="'icon-home-24'"
      [size]="iconSize">
    </atlas-icon>
  </atlas-field-prefix>
  <input type="text" atlasInput [required]="true" placeholder="Type here..." [disabled]="disabled"/>
  <atlas-field-suffix>
    <atlas-icon
      [icon]="'icon-eye-24'"
      [size]="iconSize">
    </atlas-icon>
  </atlas-field-suffix>
</atlas-field>`;

export default {
  title: "Adopters/Components/Field/Input",
  component: FieldComponent,
  subcomponents: {
    AtlasInput,
    FieldLabelComponent,
    FieldSuffixComponent,
    FieldPrefixComponent,
    FieldErrorComponent,
    FieldHintComponent,
  },
  decorators: [withDesign],
  parameters: {
    docs: {
      source: {
        code: TEMPLATE,
      },
    },
    options: {
      isToolshown: true,
    },
    badges: [BADGES.BETA],
    controls: { sort: "requiredFirst" }, 
  },
  argTypes: {
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [Actions.default, Actions.primary, Actions.secondary, Actions.error, Actions.warning, Actions.info, Actions.success],
      control: false,
      defaultValue: Actions.primary,
    },
    color: {
      description: 'Select the color of the field.',
      options: [Colors.neutral, Colors.brand, Colors.caution, Colors.danger, Colors.success, Colors.info ],
      control: { type: 'select' },
      defaultValue: Colors.brand,
    },
    size: {
      options: [FieldSize.small, FieldSize.medium, FieldSize.large],
      control: { type: "select" },
      defaultValue: FieldSize.medium,
    },
    variant: {
      description: 'This property is deprecated and will be removed in a future version. Please use `style` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [FieldVariants.outlined, FieldVariants.filled],
      control: false,
      defaultValue: FieldVariants.outlined,
    },
    style: {
      description: 'Set the field style',
      options: [Styles.outlined, Styles.filled ],
      control: { type: 'select' },
      defaultValue: Styles.filled
    },
    disabled: {
      options: [true, false],
      control: { type: 'boolean' },
      defaultValue: false
    },
    fullWidth: {
      description: 'Removes the max-width set on the field.',
      options: [true, false],
      control: { type: 'boolean' },
      defaultValue: false
    }    
  },
} as Meta;

export const Text: Story<FieldComponent> = (args: FieldComponent) => ({
  moduleMetadata: {
    imports: [FieldModule, IconModule],
  },
  props: args,
  template: TEMPLATE,
});

Text.args = {
 style: Styles.outlined,
 size: FieldSize.medium,
 color:  Colors.brand,
 fullWidth: false,
};

Text.parameters = {
  docs: {
    source: {
      code: TEMPLATE,
    },
  },
};

export const WithValidations: Story<FieldComponent> = (args: { disabled: boolean } & FieldComponent) => {
  const emailFormControl = new FormControl({ value: '', disabled: args.disabled }, [Validators.email]);
  const iconSize = IconSizes.medium;
  return {
    moduleMetadata: {
      imports: [FieldModule, IconModule, ReactiveFormsModule],
    },
    props: {
      ...args,
      emailFormControl,
      iconSize,
    },
    template: TEMPLATE_VALIDATIONS,
  };
};

WithValidations.args = {
  style: Styles.outlined,
  size: FieldSize.medium,
  color:  Colors.brand,
  fullWidth: false,
};

WithValidations.parameters = {
  docs: {
    source: {
      code: TEMPLATE_VALIDATIONS,
    },
  },
};

export const WithPrefixAndSuffix: Story<FieldComponent> = (
  args: FieldComponent
) => {
  const iconSize = IconSizes.medium;
  return {
    moduleMetadata: {
      imports: [FieldModule, IconModule],
    },
    props: {
      ...args,
      iconSize,
    },
    template: TEMPLATE_PREFIX_SUFFIX,
  };
};

WithPrefixAndSuffix.args = {
  style: Styles.outlined,
  size: FieldSize.medium,
  color:  Colors.brand,
  fullWidth: false,
};

WithPrefixAndSuffix.parameters = {
  docs: {
    source: {
      code: TEMPLATE_PREFIX_SUFFIX,
    },
  },
};

export const Textarea: Story<FieldComponent> = (
  args: FieldComponent
) => {
  
  const iconSize = IconSizes.medium;
  return {
    moduleMetadata: {
      imports: [FieldModule, IconModule],
    },
    props: {
      ...args,
      iconSize,
    },
    template: TEMPLATE_TEXTAREA,
  };
};

Textarea.args = {
  style: Styles.outlined,
  size: FieldSize.medium,
  color:  Colors.brand,
  fullWidth: false,
};

// Hide the size control in the Storybook UI for Textarea since it is not applicable
Textarea.argTypes = {
  size: { table: { disable: true } }
};

Textarea.parameters = {
  docs: {
    source: {
      code: TEMPLATE_TEXTAREA,
    },
  },
};

