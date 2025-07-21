// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Actions, Colors, DATE_FORMATS, DATE_LOCALE, FieldVariants, Styles, } from 'atlas-cdk';
import {
  CalendarBodyComponent,
  CalendarComponent,
  CalendarHeaderComponent,
  CalendarMonthComponent,
  CalendarMultiYearComponent,
  CalendarYearComponent,
  DatepickerComponent,
  DatepickerContentComponent,
  DatepickerInputDirective,
  DatepickerToggleComponent,
  DateRangeInputComponent,
  DateRangePickerComponent,
  EndDateDirective,
  FieldComponent,
  FieldModule,
  FieldSize,
  AtlasInput,
} from 'atlas-field';
import { IconModule, IconSizes } from 'atlas-icon';
import { applicationConfig, Meta, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const TEMPLATE_DATEPICKER = `
<atlas-field [color]="color" [size]="size" [style]="style">
  <input [Datepicker]="picker" atlasInput placeholder="Choose a date" />
  <atlas-field-suffix>
    <datepicker-toggle [datepicker]="picker"></datepicker-toggle>
  </atlas-field-suffix>
  <datepicker #picker></datepicker>
</atlas-field>
`;

const TEMPLATE_EXAMPLE_DATEPICKER = `
<p class="typographyStyles-body-mediumAlt">
This example demonstrates how to configure a datepicker component to display dates in the Spanish Argentina (es-AR) locale, using the format "21/03/2024":
</p>
<p class="typographyStyles-body-smallAlt">
For customizing the format or locale:
Refer to the "Locale-Based Date Formatting" section in the Readme for detailed instructions.
The default locale is en-US (English United States).
</p>
`;

const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'M/d/yyyy',
  },
  display: {
    ateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    dateInput: {year: 'numeric', month: '2-digit', day: '2-digit'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'},
    monthYearLabel: {year: 'numeric', month: 'short'},
  },
};


export default {
  title: 'Adopters/Components/Datepicker',
  component: DatepickerComponent,
  subcomponents: { 
    CalendarBodyComponent,
    DatepickerInputDirective,
    CalendarComponent,
    CalendarHeaderComponent,
    CalendarMonthComponent,
    CalendarMultiYearComponent,
    CalendarYearComponent,
    DatepickerContentComponent,
    DatepickerToggleComponent,
    DateRangeInputComponent,
    DateRangePickerComponent,
    EndDateDirective,
  },
  decorators: [
    withDesign,
    applicationConfig({
      providers: [
        { provide: DATE_LOCALE, useValue: 'en-US'},
        { provide: DATE_FORMATS, useValue: MY_DATE_FORMAT },
      ],
    }),
  ],
  parameters: {
    docs: {
      source: {
        code: TEMPLATE_DATEPICKER,
      },
    },
    options: {
      isToolshown: true
    },
    badges: [ BADGES.BETA ],
    controls: { sort: 'requiredFirst' },
  },  
  argTypes: {
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [Actions.default, Actions.primary, Actions.secondary, Actions.error, Actions.success, Actions.warning, Actions.info],
      control: { type: 'select' },    
      defaultValue: Actions.default
    },
    color: {
      description: 'Set the color',
      options: [Colors.neutral, Colors.brand, Colors.danger, Colors.success, Colors.caution, Colors.info],
      control: { type: 'select' },    
      defaultValue: Colors.neutral
    },  
    size: {
      options: [
        FieldSize.small,
        FieldSize.medium,
        FieldSize.large,
      ],
      control: { type: 'select' },
      defaultValue: FieldSize.medium,
    },
    variant: {
      description: 'This property is deprecated and will be removed in a future version. Please use `style` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [
        FieldVariants.outlined,
        FieldVariants.filled,
      ],
      control: { type: 'select' },
      defaultValue: FieldVariants.outlined,
    },
    style: {
      description: 'Set the style',
      options: [Styles.outlined, Styles.filled],
      control: { type: 'select' },
      defaultValue: Styles.outlined
    },
  }
} as Meta;

export const Basic: Story<FieldComponent> = (args: FieldComponent) => {
  const iconSize = IconSizes.medium;
  return {
    moduleMetadata: {
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FieldModule,
        IconModule,
      ],
    },
    props: {
      ...args,
      iconSize,
    },
    template: TEMPLATE_DATEPICKER,
  }
};

Basic.args = {
  color: Colors.neutral,
  size: FieldSize.medium,
  style: Styles.outlined,
}

Basic.parameters = {
  docs: {
    source: {
      code: TEMPLATE_DATEPICKER,
    }
  }
}


export const DatepickerExample: Story<FieldComponent> = (args: FieldComponent) => {
  const iconSize = IconSizes.medium;
  return {
    moduleMetadata: {
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FieldModule,
        IconModule,
      ],
    },
    props: {
      ...args,
      iconSize,
    },
    template: TEMPLATE_EXAMPLE_DATEPICKER,
  }
};

DatepickerExample.args = {
  color: Colors.neutral,
  size: FieldSize.medium,
  style: Styles.outlined,
}

DatepickerExample.parameters = {
  docs: {
    source: {
      code: TEMPLATE_EXAMPLE_DATEPICKER,
    }
  }
}
