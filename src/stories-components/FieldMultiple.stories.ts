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

/** Multiple Select Component */

@Component({
  selector: 'multiple',
  template: `
    <atlas-field [action]="action">
      <atlas-field-label>Television Multiselect</atlas-field-label>
        <atlas-select [placeholder]="'Select TV Shows'" multiple="true" [disabled]="disabled" [customSelectedText]="customSelectedText">
          <atlas-option [value]="'The Last of Us'">The Last of Us</atlas-option>
          <atlas-option [value]="'Mandolorian'">Mandolorian</atlas-option>
          <atlas-option [value]="'Narcos'">Narcos</atlas-option>
          <atlas-option [value]="'Game of Thrones'">Game of Thrones</atlas-option>
        </atlas-select>
      <atlas-field-hint>This is a hint about the TV shows...</atlas-field-hint>
    </atlas-field>
  `
})
class SelectMultipleComponent {

   /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
   @Input() panelClass: string;
 
   /** Enables clear button */
   @Input() clear = false;
 
   /** Toggles the arrow display  */
   @Input() showArrows = true;

  /** Input that can be used to specify the customSelectedText attribute. */
  @Input() customSelectedText: string = '';
 
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
  title: "Adopters/Components/Field/Select/Multiple",
  component: SelectMultipleComponent,
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
    customSelectedText: {
      control: { type: 'text' }
    },
  },
} as Meta;

const doc = `
<atlas-field [action]="action" [size]="size" [variant]="variant">
  <atlas-field-label>Television Multiselect</atlas-field-label>
    <atlas-select [placeholder]="'Select TV Shows'" multiple="true" [disabled]="disabled" [customSelectedText]="customSelectedText">
      <atlas-option [value]="'The Last of Us'">The Last of Us</atlas-option>
      <atlas-option [value]="'Mandolorian'">Mandolorian</atlas-option>
      <atlas-option [value]="'Narcos'">Narcos</atlas-option>
      <atlas-option [value]="'Game of Thrones'">Game of Thrones</atlas-option>
    </atlas-select>
  <atlas-field-hint>This is a hint about the TV shows...</atlas-field-hint>
</atlas-field>`;

const MULTISELECT: Story<SelectMultipleComponent> = (args: SelectMultipleComponent) => ({
  props: { ...args }, 
});

export const Multiple = MULTISELECT.bind({});
Multiple.args = {
  Multiple: true,
  typeaheadDebounceInterval: null,
};
Multiple.parameters = {
  docs: {
    source: {
      code: doc,
    },
  }
}


