// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Actions } from 'atlas-cdk';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FieldModule, HaloSelectChange, HaloSelectComponent, HaloSelectTypeaheadChange, OptionComponent } from 'atlas-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'atlas-button';
import { filter, map } from 'rxjs/operators';
/** Select with typeahead Component */

@Component({
  selector: 'launcher',
  template: `
     <atlas-field [action]="action" [fullWidth]="false">
        <atlas-field-label>Country</atlas-field-label>
        <atlas-select id="select"
                     [typeahead]="typeahead" 
                     (typeaheadChange)="filterCountry($event)" 
                     [placeholder]="'Select a country'" 
                     [(ngModel)]="country"
                     [action]="action"
                     [disabled]="disabled">
          <atlas-option *ngFor="let country of countriesFiltered | async" [value]="country.value">{{ country.name }}</atlas-option>
        </atlas-select>
      </atlas-field>
  `
})
class TypeaheadComponent implements OnInit {

   /** Classes to be passed to the select panel. Supports the same syntax as `ngClass`. */
   @Input() panelClass: string;
 
   /** Enables clear button */
   @Input() clear = true;
 
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

  /** @internal */
  country: string = '';

  /** @internal */
  countries: any[] = [
    { name: 'Argentina', value: 'AR'},
    { name: 'Cuba', value: 'CU'},
    { name: 'United States', value: 'US'},
    { name: 'Uruguay', value: 'UY'},
    { name: 'Brazil', value: 'BR' },
    { name: 'Canada', value: 'CA' },
    { name: 'Mexico', value: 'MX' },
    { name: 'Colombia', value: 'CO' },
    { name: 'Chile', value: 'CL' },
    { name: 'Peru', value: 'PE' },
    { name: 'Bolivia', value: 'BO' },
    { name: 'Ecuador', value: 'EC' },
    { name: 'Paraguay', value: 'PY' },
    { name: 'Venezuela', value: 'VE' },
    { name: 'Guatemala', value: 'GT' },
    { name: 'Honduras', value: 'HN' },
    { name: 'El Salvador', value: 'SV' },
    { name: 'Nicaragua', value: 'NI' },
    { name: 'Costa Rica', value: 'CR' },
    { name: 'Panama', value: 'PA' },
    { name: 'Dominican Republic', value: 'DO' },
    { name: 'Haiti', value: 'HT' },
    { name: 'Jamaica', value: 'JM' },
    { name: 'Trinidad and Tobago', value: 'TT' },
  ];

  /** @internal */
  countriesFiltered= new BehaviorSubject<any[]>([]);
  
  constructor() { }

  /** @internal */
  ngOnInit(): void {
    this.countriesFiltered.next(this.countries);
   }

  /** @internal */ 
  filterCountry(event: HaloSelectTypeaheadChange) {
    const filterValue = event.value.toLowerCase();
    console.log('before', this.countriesFiltered);
    this.countriesFiltered.next(this.countries.filter(option => option.name.toLowerCase().includes(filterValue)));
    console.log('after', this.countriesFiltered);
    console.log('country', this.country);
  }
}
/** Finish Select with typeahead Component  */


export default {
  title: "Adopters/Components/Field/Select/Typeahead",
  component: HaloSelectComponent,
  decorators: [
    moduleMetadata({
      imports:[FieldModule, BrowserAnimationsModule, ButtonModule]
    }),
    withDesign,
  ],
  subcomponents: {
    TypeaheadComponent,
    HaloSelectComponent,
    OptionComponent,
  },
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
    typeahead: {
      options: [true, false],
      control: { type: 'boolean' },
      defaultValue: true
    },
  },
} as Meta;

const typeAhead = `
  <atlas-field>
    <atlas-field-label>Country</atlas-field-label>
    <atlas-select [typeahead]="typeahead" (typeaheadChange)="filterCountry($event)" [placeholder]="'Select a country'" [(ngModel)]="country">
      <atlas-option *ngFor="let country of countriesFiltered | async" [value]="country.value">{{ country.name }}</atlas-option>
    </atlas-select>
  </atlas-field>
`;

const Typeahead: Story<TypeaheadComponent> = (args: TypeaheadComponent) => ({
  props: { ...args }, 
  template: typeAhead,
});

export const Select = Typeahead.bind({});
Select.args = {
  typeahead: true,
  typeaheadDebounceInterval: null,
};
Select.parameters = {
  docs: {
    source: {
      code: typeAhead,
    },
  }
}
