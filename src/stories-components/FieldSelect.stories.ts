// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Actions } from 'atlas-cdk';
import {
  FieldModule,
  HaloSelectChange,
  HaloSelectComponent,
  HaloSelectTypeaheadChange,
  OptionComponent,
} from 'atlas-field';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'atlas-button';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

/** Select Component */

@Component({
  selector: 'launcher-select',
  template: `
    <atlas-field [action]="action">
      <atlas-field-label>Language Single Select</atlas-field-label>
        <atlas-select [placeholder]="'Choose a language'" #languages>
          <atlas-option [value]="'EN'">English</atlas-option>
          <atlas-option [value]="'GE'">German</atlas-option>
          <atlas-option [value]="'ES'">Spanish</atlas-option>
          <atlas-option [value]="'FR'">French</atlas-option>
          <atlas-option [value]="'DE'">German</atlas-option>
          <atlas-option [value]="'IT'">Italian</atlas-option>
          <atlas-option [value]="'PT'">Portuguese</atlas-option>
          <atlas-option [value]="'JA'">Japanese</atlas-option>
          <atlas-option [value]="'KO'">Korean</atlas-option>
          <atlas-option [value]="'ZH'">Chinese</atlas-option>
          <atlas-option [value]="'RU'">Russian</atlas-option>
          <atlas-option [value]="'AR'">Arabic</atlas-option>
          <atlas-option [value]="'HI'">Hindi</atlas-option>
          <atlas-option [value]="'PL'">Polish</atlas-option>
          <atlas-option [value]="'TR'">Turkish</atlas-option>
          <atlas-option [value]="'NL'">Dutch</atlas-option>
          <atlas-option [value]="'SV'">Swedish</atlas-option>
          <atlas-option [value]="'DA'">Danish</atlas-option>
          <atlas-option [value]="'FI'">Finnish</atlas-option>
          <atlas-option [value]="'HU'">Hungarian</atlas-option>
          <atlas-option [value]="'EL'">Greek</atlas-option>
          <atlas-option [value]="'CS'">Czech</atlas-option>
          <atlas-option [value]="'SK'">Slovak</atlas-option>
          <atlas-option [value]="'HE'">Hebrew</atlas-option>
          <atlas-option [value]="'VI'">Vietnamese</atlas-option>
          <atlas-option [value]="'TH'">Thai</atlas-option>
          <atlas-option [value]="'MS'">Malay</atlas-option>
          <atlas-option [value]="'ID'">Indonesian</atlas-option>
        </atlas-select>
      <atlas-field-hint>This is a hint</atlas-field-hint>
    </atlas-field>
  `
})
class SelectComponent {

   /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
   @Input() panelClass: string;
 
   /** Enables clear button */
   @Input() clear = false;
 
   /** Toggles the arrow display  */
   @Input() showArrows = true;
 
   /** Unique id of the element. */
   @Input() id: string;
 
   /** Placeholder to be shown if no value has been selected. */
   @Input() placeholder: string;
 
   /** Whether the component is required. */
   @Input() required: boolean;
  
   /** Whether the user should be allowed to select multiple options. */
   @Input() multiple: boolean;
 
   /** Whether the user should be disabled. */
   @Input() disabled: boolean;
 
   /** Whether the user should be readonly. */
   @Input() readonly: boolean;
 
   /** Value of the select control. */
   @Input() value: any;
 
   /** Aria label of the select. If not specified, the placeholder will be used as label. */
   @Input('aria-label') ariaLabel = '';
 
   /** Input that can be used to specify the `aria-labelledby` attribute. */
   @Input('aria-labelledby') ariaLabelledby: string;
 
   /** Whether or not typeahead search is enabled. */
   @Input() typeahead: boolean;
 
   /** Time to wait in milliseconds after the last keystroke before moving focus to an item. */
   @Input() typeaheadDebounceInterval: number;
 
   /**
    * Function used to sort the values in a select in multiple mode.
    * Follows the same logic as `Array.prototype.sort`.
    */
   @Input() sortComparator: (a: OptionComponent, b: OptionComponent, options: OptionComponent[]) => number;
 
   /** Set the option action */
   @Input() action: Actions = Actions.default;
 
   /** Event emitted when the select panel has been toggled. */
   @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
 
   /** Event emitted when the select has been opened. */
   // tslint:disable-next-line: no-output-rename
   @Output('opened') readonly _openedStream: Observable<void> = this.openedChange.pipe(filter(o => o), map(() => {}));
 
   /** Event emitted when the select has been closed. */
   // tslint:disable-next-line: no-output-rename
   @Output('closed') readonly _closedStream: Observable<void> = this.openedChange.pipe(filter(o => !o), map(() => {}));
 
   /** Event emitted when the selected value has been changed by the user. */
   @Output() readonly selectionChange: EventEmitter<HaloSelectChange> = new EventEmitter<HaloSelectChange>();
 
   /** Event emitted when the typeahead value has been changed by the user. */
   @Output() readonly typeaheadChange: EventEmitter<HaloSelectTypeaheadChange> = new EventEmitter<HaloSelectTypeaheadChange>();
 
   /**
    * Event that emits whenever the raw value of the select changes. This is here primarily
    * to facilitate the two-way binding for the `value` input.
    */
   @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }
}
/** Finish Select Component  */


export default {
  title: "Adopters/Components/Field/Select",
  component: SelectComponent,
  decorators: [
    moduleMetadata({
      imports:[FieldModule, BrowserAnimationsModule, ButtonModule]
    }),
    withDesign,
  ],
  parameters: {
    options: {
      isToolshown: true,
    },
    badges: [BADGES.BETA],
    controls: { sort: "requiredFirst" },
    // TODO [AG]: I need to keep this code, we are going to fixed in a different ticket
    // design: {
    //   type: "figma",
    //   url: "https://www.figma.com/file/kW4WgVtux0lNhfvsS4kgBh/Design-Foundation---Grandparent-(Copy)?node-id=76%3A893",
    //   allowFullscreen: true,
    // },    
  },
  argTypes: {
    action: {
      options: [
        Actions.default,
        Actions.primary,
        Actions.secondary,
        Actions.info,
        Actions.warning,
        Actions.error,
        Actions.success,
      ],
      control: { type: "select" },
      defaultValue: Actions.primary,
    },
    disabled: {
      options: [true, false],
      control: { type: 'boolean' },
      defaultValue: false
    },
  },
} as Meta;

const doc = `
<atlas-field [action]="action" [size]="size" [variant]="variant">
  <atlas-field-label>Language Single Select</atlas-field-label>
    <atlas-select [placeholder]="'Choose a language'" #languages>
      <atlas-option [value]="'EN'">English</atlas-option>
      <atlas-option [value]="'GE'">German</atlas-option>
      <atlas-option [value]="'ES'">Spanish</atlas-option>
      <atlas-option [value]="'FR'">French</atlas-option>
      <atlas-option [value]="'DE'">German</atlas-option>
      <atlas-option [value]="'IT'">Italian</atlas-option>
      <atlas-option [value]="'PT'">Portuguese</atlas-option>
      <atlas-option [value]="'JA'">Japanese</atlas-option>
      <atlas-option [value]="'KO'">Korean</atlas-option>
      <atlas-option [value]="'ZH'">Chinese</atlas-option>
      <atlas-option [value]="'RU'">Russian</atlas-option>
      <atlas-option [value]="'AR'">Arabic</atlas-option>
      <atlas-option [value]="'HI'">Hindi</atlas-option>
      <atlas-option [value]="'PL'">Polish</atlas-option>
      <atlas-option [value]="'TR'">Turkish</atlas-option>
      <atlas-option [value]="'NL'">Dutch</atlas-option>
      <atlas-option [value]="'SV'">Swedish</atlas-option>
      <atlas-option [value]="'DA'">Danish</atlas-option>
      <atlas-option [value]="'FI'">Finnish</atlas-option>
      <atlas-option [value]="'HU'">Hungarian</atlas-option>
      <atlas-option [value]="'EL'">Greek</atlas-option>
      <atlas-option [value]="'CS'">Czech</atlas-option>
      <atlas-option [value]="'SK'">Slovak</atlas-option>
      <atlas-option [value]="'HE'">Hebrew</atlas-option>
      <atlas-option [value]="'VI'">Vietnamese</atlas-option>
      <atlas-option [value]="'TH'">Thai</atlas-option>
      <atlas-option [value]="'MS'">Malay</atlas-option>
      <atlas-option [value]="'ID'">Indonesian</atlas-option>
    </atlas-select>
  <atlas-field-hint>This is a hint</atlas-field-hint>
</atlas-field>`;

const SELECT_TEMPLATE: Story<SelectComponent> = (args: SelectComponent) => ({
  props: { ...args }, 
});

export const Select = SELECT_TEMPLATE.bind({});
Select.args = {
  typeaheadDebounceInterval: null,
};
Select.parameters = {
  docs: {
    source: {
      code: doc,
    },
  }
}


