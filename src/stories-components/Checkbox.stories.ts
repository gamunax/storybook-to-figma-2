// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, EventEmitter, forwardRef, HostBinding, Input, OnChanges, Optional, Output, Self, ViewChild, ViewEncapsulation } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import { Actions, CdkModule, Colors, IconSizes } from 'atlas-cdk';
import { Meta, Story } from '@storybook/angular';
import { IconModule } from 'atlas-icon';

import { BADGES } from '.storybook/constants';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'atlas-checkbox';

/**
 * Allow users to select one or more options or toggle an option on or off.
 */
@Component({
  selector: 'app-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
  <atlas-checkbox 
    [disabled]="disabled"
    [indeterminate]="indeterminate"
    [color]="color"
    [isChecked]="isChecked"
    [labelCustomClass]="labelCustomClass"
    [checkboxCustomClass]="checkboxCustomClass"
    [labelTypography]="labelTypography"
    [checkboxId]="checkboxId"
    [checkboxName]="checkboxName"
    [size]="size"
    [value]="value"
    (onChange)="onChange($event)">Label</atlas-checkbox>
 `,
  styleUrls: ['../../projects/checkbox/src/lib/checkbox.component.scss'],
})

class SampleCheckboxComponent {
  /** Set the checkbox color */
  @Input() color: Colors = Colors.brand;
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * Set the checkbox action 
   */
  @Input() action: Actions = Actions.secondary;
  /** Set the checkbox disabled */
  @Input() disabled = false;
  /** Create a custom class that gets added to the checkbox elem */
  @Input() checkboxCustomClass?: string = '';
  /** Sets checkbox to allow indeterminate state */
  @Input() indeterminate: boolean = false;
  /** Create a custom class that gets added to the checkbox elem */
  @Input() labelCustomClass?: string = '';
  /** Create a custom class that gets added to the checkbox elem */
  @Input() labelTypography: string = 'typographyStyles-body-medium';
  /** Set the checkbox ID */
  @Input() checkboxId = 'haloCheckbox';
  /** Set the checkbox ID */
  @Input() checkboxName = 'haloCheckbox';
  /** Set the checkbox ID */
  @Input() size: IconSizes = IconSizes.medium;
  /** Set the checkbox to checked */
  @Input() isChecked: boolean = false;
  /** Sets the current value */
  @Input() value: string | undefined;
  /** Emitted when the checkbox changes */  
  @Output() onChange = new EventEmitter<Event>();

  constructor(){}
}



 export default {
  title: 'Adopters/Components/Checkbox',
  component: SampleCheckboxComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        CdkModule,
        IconModule,
        FormsModule,
        CheckboxModule
      ],
      declarations: [
        SampleCheckboxComponent
      ],
    }),
  ],
  parameters: {
    options: {
      isToolshown: true
    },
    badges: [ BADGES.ALPHA ],
    controls: { sort: 'requiredFirst' },
  },
  argTypes: {
    color: {
      description: 'Set the checkbox color',
      options: [Colors.neutral, Colors.brand, Colors.danger, Colors.success, Colors.caution, Colors.info],
      control: { type: 'select' },
      defaultValue: Colors.brand
    },
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [Actions.default, Actions.primary, Actions.secondary, Actions.error, Actions.success, Actions.warning, Actions.info],
      control: { type: 'select' },
      defaultValue: Actions.default
    },
    size: {
      defaultValue: IconSizes.medium,
      options: [IconSizes.xsmall, IconSizes.small, IconSizes.medium, IconSizes.large],
      control: { type: 'select' }
    },
    disabled: {
      options: [false, true],
      control: { type: 'boolean' }
    },
    isChecked: {
      options: [true, false],
      control: { type: 'boolean' }
    },
    indeterminate: {
      options: [true, false],
      control: { type: 'boolean' }
    },
    labelTypography: {
      control: { type: 'text' }
    },
    checkboxCustomClass: {
      control: { type: 'text' }
    },
    labelCustomClass: {
      defaultValue: 'typographyStyles-body-medium',
      control: { type: 'text' }
    },
    checkboxId: {
      defaultValue: 'checkbox-1',
      control: { type: 'text' }
    },
    checkboxName: {
      defaultValue: 'checkbox-sample',
      control: { type: 'text' }
    },
    value: {
      defaultValue: 'sample',
      control: { type: 'text' }
    },
  }
} as Meta;

const CheckboxTemplate =  `
<atlas-checkbox 
[disabled]="disabled"
[indeterminate]="indeterminate"
[color]="color || default"
[isChecked]="isChecked"
(onChange)="onChange($event)">Label</atlas-checkbox>
`;

export const checkbox: Story = (args: SampleCheckboxComponent) => {
  /** Set the checkbox color */
  let color: Colors = args.color;
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * set the action 
   */
  let action: Actions = args.action;
  /** Set the checkbox disabled */
  let disabled: boolean = args.disabled;
  /** Create a custom class that gets added to the checkbox elem */
  let checkboxCustomClass = args.checkboxCustomClass;
  /** Create a custom class that gets added to the checkbox elem */
  let labelCustomClass = args.labelCustomClass;
  /** Create a custom class that gets added to the checkbox elem */
  let labelTypography = args.labelTypography;
  /** Set the checkbox ID */
  let checkboxId = args.checkboxId;
  /** Set the checkbox ID */
  let checkboxName = args.checkboxName;
  /** Set the checkbox ID */
  let size: IconSizes = args.size;
  /** Set the checkbox to checked */
  let isChecked: boolean = args.isChecked;
  /** Sets the current value */
  let value = args.value;
  /** Sets checkbox to allow indeterminate state */
  let indeterminate: boolean = args.indeterminate;

  return {
    props: {
      action,
      color,
      disabled,
      checkboxCustomClass,
      labelCustomClass,
      labelTypography,
      checkboxId,
      checkboxName,
      size,
      isChecked,
      value,
      indeterminate
    }
  }
}

checkbox.args = {
  color: Colors.brand,
  checkboxId: 'checkbox-1',
  labelCustomClass: 'typographyStyles-body-medium',
  labelTypography: 'typographyStyles-body-medium',
  size: IconSizes.medium,
  value: 'sample'

}

checkbox.parameters = {
  docs: {
    source: {
      code: CheckboxTemplate,
    },
  },
}