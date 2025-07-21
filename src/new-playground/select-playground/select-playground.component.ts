import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, UntypedFormControl, Validators } from '@angular/forms'; // Import Angular forms modules
import { Actions, ChipVariants, ChipSizings, FieldSize, FieldVariants, IconSizes } from 'atlas-cdk'; // Import atlas-cdk items
import { HaloSelectComponent, HaloSelectTypeaheadChange } from 'atlas-field';
import { AutocompleteOption } from 'atlas-legacy';
import { Subject, tap } from 'rxjs';

export enum SelectControllers {
  sections = 'sections',
  countries = 'countries',
  industries = 'industries',
}

type AttachmentsArray = {
  name: FormControl<string | null>;
  isChecked: FormControl<boolean | null>;
  cars: FormControl<string | null>;
  birthplace: FormControl<string | null>;
  age: FormControl<string | null>;
  f: FormControl<string | null>;
}; 

@Component({
  selector: 'select-playground',
  templateUrl: './select-playground.component.html',
  styleUrls: ['./select-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SelectPlayground {
  isCheckedSelectAll = false;
  fieldSize = FieldSize;
  FieldVariants = FieldVariants;
  Actions = Actions;
  iconSizes = IconSizes;
  countries = [
    { name: 'Argentina', code: 'AR' },
    { name: 'Australia', code: 'AU' },
    { name: 'Belgium', code: 'BE' },  
    { name: 'Brazil', code: 'BR' },
    { name: 'Canada', code: 'CA' },
    { name: 'China', code: 'CN' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Italy', code: 'IT' },
    { name: 'Japan', code: 'JP' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Russia', code: 'RU' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'Spain', code: 'ES' },
    { name: 'United Kingdom', code: 'GB' },
    { name: 'United States', code: 'US' }
  ];

  listItems: AutocompleteOption[] = [{label:'item1',value:'item',type:'option',id:'1'}, {label:'item2',value:'item2',type:'option',id:'2'}, {label:'item3',value:'item3',type:'option',id:'3'}, {label:'item4',value:'item4',type:'option',id:'4'}];
  countryList : any = [
    { label: 'Argentina', code: 'AR' },
    { label: 'Australia', code: 'AU' },
    { label: 'Austria', code: 'AT' },
    { label: 'Belgium', code: 'BE' },
    { label: 'Belarus', code: 'BY' },
    { label: 'Brazil', code: 'BR' },
    { label: 'Canada', code: 'CA' },
    { label: 'Chile', code: 'CL' },
    { label: 'China', code: 'CN' },
    { label: 'Colombia', code: 'CO' },
    { label: 'Denmark', code: 'DK' },
    { label: 'Egypt', code: 'EG' },
    { label: 'Finland', code: 'FI' },
    { label: 'France', code: 'FR' },
    { label: 'Germany', code: 'DE' },
    { label: 'Greece', code: 'GR' },
    { label: 'Hungary', code: 'HU' },
    { label: 'India', code: 'IN' },
    { label: 'Italy', code: 'IT' },
    { label: 'Japan', code: 'JP' },
    { label: 'Mexico', code: 'MX' },
    { label: 'Netherlands', code: 'NL' },
    { label: 'Norway', code: 'NO' },
    { label: 'Poland', code: 'PL' },
    { label: 'Portugal', code: 'PT' },
    { label: 'Russia', code: 'RU' },
    { label: 'South Africa', code: 'ZA' },
    { label: 'South Korea', code: 'KR' },
    { label: 'Spain', code: 'ES' },
    { label: 'Sweden', code: 'SE' },
    { label: 'Switzerland', code: 'CH' },
    { label: 'Turkey', code: 'TR' },
    { label: 'Ukraine', code: 'UA' },
    { label: 'United Kingdom', code: 'GB' },
    { label: 'United States', code: 'US' }
  ];
  provincesList = [
    {
      label: 'Santa Fe',
      code: 'S',
    },
    {
      label: 'Buenos Aires',
      code: 'B',
    },
    {
      label: 'Catamarca',
      code: 'K',
    },
    {
      label: 'Chaco',
      code: 'H',
    },
    {
      label: 'Chubut',
      code: 'U',
    },
    {
      label: 'Cordoba',
      code: 'X',
    },
    {
      label: 'Corrientes',
      code: 'W',
    },
    {
      label: 'Entre Rios',
      code: 'E',
    },
    {
      label: 'Formosa',
      code: 'P',
    },
    {
      label: 'Jujuy',
      code: 'Y',
    },
    {
      label: 'La Pampa',
      code: 'L',
    },
    {
      label: 'La Rioja',
      code: 'F',
    },
    {
      label: 'Mendoza',
      code: 'M',
    },
    {
      label: 'Misiones',
      code: 'N',
    },
    {
      label: 'Neuquen',
      code: 'Q',
    },
    {
      label: 'Rio Negro',
      code: 'R',
    },
    {
      label: 'Salta',
      code: 'A',
    },
    {
      label: 'San Juan',
      code: 'J',
    },
    {
      label: 'San Luis',
      code: 'D',
    },
    {
      label: 'Santa Cruz',
      code: 'Z',
    },
    {
      label: 'Santiago del Estero',
      code: 'G',
    },
    {
      label: 'Tierra del Fuego',
      code: 'V',
    },
    {
      label: 'Tucuman',
      code: 'T',
    },
  ];
  public rows = [
    {
      age: '1',
      name: 'Kevin',
      birthplace: 'New York',
      cars: 'Ford',
      f: 'f',
      isChecked: true,
    },
    {
      age: '12',
      name: 'Helen',
      birthplace: 'California',
      cars: 'Infiniti',
      f: 'k',
      isChecked: false,
    },
    {
      age: '35',
      name: 'Matt',
      birthplace: 'Florida',
      cars: 'Toyota',
      f: 'p',
      isChecked: true,
    },
    {
      age: '42',
      name: 'Robert',
      birthplace: 'Connecticut',
      cars: 'Subaru',
      f: 'u',
      isChecked: false,
    },
  ];
  provincesFiltered = this.provincesList;
  readonly chipSizings = ChipSizings;
  readonly chipVariants = ChipVariants;
  readonly selectControllers = SelectControllers;
  chipList = [];
  countriesFiltered = this.countryList;
  provincesControl: FormControl = new FormControl();
  provincesControlDisabled: FormControl = new FormControl();
  simpleForm: FormGroup;
  v2ArrowsForm: FormGroup;
  attachmentListForm = new FormGroup({
    attachmentsArray: new FormArray<FormGroup<AttachmentsArray | null>>([]),
  });

  @ViewChild('selectHtmlCountries1') selectHtmlCountries;
  @ViewChild('selectCountries') selectCountries: HaloSelectComponent;

  constructor(private _cf: ChangeDetectorRef, private fb: FormBuilder) {
    this.provincesControl.setValue(['Santa Fe']);
    this.provincesControlDisabled.setValue(['Santa Fe']);
    this.provincesControlDisabled.disable();
     this.v2ArrowsForm = this.fb.group({
      arrowOnly: [''],
      cancelAlso: [''],
      cancelAlso1: [''],
    });
    this.simpleForm = this.fb.group({
      selectCountryFrom: this.fb.control([])
    });
    this.simpleForm.valueChanges
      .pipe(
        tap(() => console.log('Subscription log')),
      )
      .subscribe(() => {
        console.log('Subscription log')
      });
    
    this.rows?.forEach((row: any) => {
      this.attachmentsArray.push(
        new FormGroup({
          age: new FormControl(row.age),
          name: new FormControl(row.name),
          birthplace: new FormControl(row.birthplace),
          cars: new FormControl(row.cars),
          f: new FormControl(row.f),
          isChecked: new FormControl(row.isChecked),
        }),
      );
    });
  }

  protected get attachmentsArray(): FormArray {
    return this.attachmentListForm.get('attachmentsArray') as FormArray;
  }

  onSelect(value: unknown[]): void {
    
    this.chipList= value;
    console.log(this.chipList);
  }

  chipRemoved(index: number): void {
    const removedCountry = this.chipList[index];
    const countryToDeselect = [...this.simpleForm.get('selectCountryFrom').value].find(
      (country) => country.code === removedCountry.code,
    );

    this.selectCountries.deselectOption(countryToDeselect);
  }

  filterCountry(event: HaloSelectTypeaheadChange) {
    const filterValue = event.value.toLowerCase();
    this.countriesFiltered = this.countryList.filter(option => option.label?.toLowerCase().includes(filterValue));
    this._cf.markForCheck();
  }
  filterProvinces(event: HaloSelectTypeaheadChange) {
    const filterValue = event.value?.toLowerCase();
    this.provincesFiltered = this.provincesList.filter((option) => option.label?.toLowerCase().includes(filterValue));
    this._cf.markForCheck();
  }

  removeSelectedProvinces(): void {
    this.provincesControl.reset();
  }

  provincesSelectOpened(): void {
    console.log('The provinces select has been opened');
  }

  provincesSelectClosed(): void {
    console.log('The provinces select has been closed');
  }

  provincesSelectOpenedChange(): void {
    console.log('The provinces select opened has been changed');
  }
  saveValue(stream : string): void {
    console.log('Save value called for stream:', stream);
  }
}
