import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule, ButtonSizings, ButtonVariants } from 'atlas-button';
import { Actions, CdkModule, Density, Radii } from 'atlas-cdk';
import { ChipSizings, ChipVariants, ChipsModule } from 'atlas-chips';
import { FieldModule, FieldSize, HaloSelectTypeaheadChange } from 'atlas-field';
import { IconModule, IconSizes } from 'atlas-icon';
import { LinkModule, LinkTargets } from 'atlas-link';
import { ModalComponent, ModalModule } from 'atlas-modal';
import { RatingModule, RatingSizings } from 'atlas-rating';
import { SnackbarModule, SnackbarService } from 'atlas-snackbar';
import { SwitchModule, SwitchSizings } from 'atlas-switch';
import { BehaviorSubject } from 'rxjs';
import { Meta, Story, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppBarModule } from 'atlas-app-bar';
import { AvatarModule } from 'atlas-avatar';
import { BreadcrumbModule } from 'atlas-breadcrumb';
import { CheckboxModule } from 'atlas-checkbox';
import { DrawerModule } from 'atlas-drawer';
import { FiledropModule } from 'atlas-filedrop';
import { ListModule } from 'atlas-list';
import { MenuModule } from 'atlas-menu';
import { RadioModule } from 'atlas-radio';
import { SliderModule } from 'atlas-slider';
import { TabsModule } from 'atlas-tabs';
import {FormPatternComponent} from '../form-pattern/form-pattern.component';

@Component({
  selector: 'app-form-pattern',
  template: `
  
<div class="row expanded collapse page-bg">
  <div class="column small-12">
    <atlas-app-bar>
      <span class="app-bar-logo">
        <img height="20px" [src]="logoUrl" alt="Mercer" />
        <h3 class="typographyStyles-body-largeAlt">|</h3>
        <h3 class="typographyStyles-body-smallAlt">Acme Admin</h3>
      </span>
      <span class="app-bar-separator"></span>
      <atlas-avatar menuTrigger (triggered)="demoMenu.toggleMenu($event)" [action]="action" [indicatorAction]="success"
        [radius]="radius">OP</atlas-avatar>
      <div class="app-bar-dropdown">
        <atlas-menu #demoMenu action="primary">
          <atlas-list>
            <atlas-list-item>Original Poster</atlas-list-item>
          </atlas-list>
          <hr class="app-bar-logo-line" />
          <atlas-list>
            <atlas-list-item *ngFor="let item of itemsUser" [item]="item">
              <atlas-icon *ngIf="item.icon" style="margin-right: 12px" [size]="smallIconSize" [icon]="item.icon">
              </atlas-icon>
              <div>
                {{ item.label }}
              </div>
            </atlas-list-item>
          </atlas-list>
        </atlas-menu>
      </div>
    </atlas-app-bar>
  </div>
  <div class="column" style="padding: 16px 24px;">
    <div class="container" >
      <h1 class="typographyStyles-display-small" style="margin: 0; color: var(--semanticColor-text-default)">
        Form pattern
      </h1>
      <p>An example form using <atlas-link [external]="true" url="https://angular.io/guide/reactive-forms" [target]="target">Angular Reactive Forms <atlas-icon [icon]="'icon-share-24'" [size]="smallIconSize"></atlas-icon></atlas-link>.</p>
      <form autocomplete="off" novalidate [formGroup]="form">       
        <div class="row">
          <div class="column medium-6">
            <atlas-field [fullWidth]="true">
              <atlas-field-label>First name</atlas-field-label>
              <input id="first-name" type="text" atlasInput placeholder="John" formControlName="firstName" [required]="true" aria-label="first name" [tabindex]="1" />
              <atlas-field-error *ngIf="form.get('firstName').errors?.required">First name is required</atlas-field-error>
            </atlas-field>
          </div>
          <div class="column medium-6">
            <atlas-field [fullWidth]="true">
              <atlas-field-label>Last name</atlas-field-label>
              <input type="text" atlasInput placeholder="Doe" formControlName="lastName" [required]="true" aria-label="last name" [tabindex]="2"/>
              <atlas-field-error *ngIf="form.get('lastName').errors?.required">Last name is required</atlas-field-error>
            </atlas-field>
          </div>
        </div>
        <div class="row">
          <div class="column medium-12">
            <atlas-field [fullWidth]="true">
              <atlas-field-prefix>
                <atlas-icon [icon]="'icon-home-24'" [size]="iconSize">
                </atlas-icon>
              </atlas-field-prefix>
              <atlas-field-label>E-mail</atlas-field-label>
              <input type="email" atlasInput placeholder="jhon@doe.com" formControlName="email" [required]="true" aria-label="email" [tabindex]="3"/>
              <atlas-field-error *ngIf="form.get('email').errors?.required">Email is required</atlas-field-error>
              <atlas-field-error *ngIf="form.get('email').errors?.pattern">Email is wrong</atlas-field-error>
            </atlas-field>
          </div>
        </div>
        <div class="row">
          <div class="column medium-6">
            <atlas-field [fullWidth]="true">
              <atlas-field-label>Enter password</atlas-field-label>
              <input type="password" atlasInput formControlName="password" [required]="true" autocomplete="new-password" aria-label="Enter password" [tabindex]="4"/>
              <atlas-field-error *ngIf="form.get('password').errors?.required">Password is required</atlas-field-error>
              <atlas-field-error *ngIf="form.get('password').errors?.minlength">Minimun 8 characters required</atlas-field-error>
            </atlas-field>
          </div>
          <div class="column medium-6">
            <atlas-field [fullWidth]="true">
              <atlas-field-label>Confirm password</atlas-field-label>
              <input type="password" atlasInput formControlName="confirmPassword" [required]="true" aria-label="Confirm password" [tabindex]="5"/>
              <atlas-field-error *ngIf="form.get('confirmPassword').errors?.required">Confirm Password is required</atlas-field-error>
              <atlas-field-error *ngIf="form.get('confirmPassword').errors?.mustMatch">Passwords must match</atlas-field-error>
            </atlas-field>
          </div>
        </div>
        <div class="row">
          <div class="column medium-6">
            <atlas-field [fullWidth]="true">
              <atlas-field-label>Date of birth</atlas-field-label>
              <input [Datepicker]="picker" atlasInput placeholder="Choose a date" formControlName="dob" aria-label="birth date" [tabindex]="6"/>
              <atlas-field-suffix>
                <datepicker-toggle [datepicker]="picker"></datepicker-toggle>
              </atlas-field-suffix>
              <datepicker #picker></datepicker>              
              <atlas-field-error *ngIf="form.get('dob').errors?.required">Date of birth is required</atlas-field-error>
            </atlas-field>
          </div>
          <div class="column medium-6">
            <atlas-field [fullWidth]="true">
              <atlas-field-label>Time of birth</atlas-field-label>
              <input formControlName="time" [Timepicker]="timepicker" atlasInput placeholder="Choose a time" #input aria-label="time of birth" [tabindex]="7"/>
              <atlas-field-suffix>
                <timepicker-toggle [timepicker]="timepicker"></timepicker-toggle>
              </atlas-field-suffix>
              <timepicker #timepicker [defaultTime]="input.value"></timepicker>
            </atlas-field>
          </div>
        </div>
        <div class="row">
          <div class="column medium-6">
            <atlas-field [action]="action" [fullWidth]="true">
              <atlas-field-label>Country</atlas-field-label>
              <atlas-select [typeahead]="true" (typeaheadChange)="filterCountry($event)" [placeholder]="'Select a country'" formControlName="country" aria-label="Country" [tabindex]="7">
                <atlas-option *ngFor="let country of countriesFiltered | async" [value]="country.value">{{ country.name }}</atlas-option>
              </atlas-select>
            </atlas-field>
          </div>
          <div class="column medium-6">
            <atlas-field [action]="action" [fullWidth]="true">
              <atlas-field-label>Languages</atlas-field-label>
              <atlas-select [placeholder]="'Select languages'" #languages (valueChange)="onSelectedLanguages($event)"
                [multiple]="true" formControlName="languages" aria-label="Languages" [tabindex]="8">
                <atlas-option [value]="'EN'">English</atlas-option>
                <atlas-option [value]="'GE'">German</atlas-option>
                <atlas-option [value]="'ES'">Spanish</atlas-option>
              </atlas-select>
              <atlas-field-hint *ngIf="languages.value">Selected languages: {{languages.value}}</atlas-field-hint>
            </atlas-field>
          </div>
        </div>
        <div class="row">
          <div class="column medium-6">
            <p class="typographyStyles-label-small" style="color: var(--semanticColor-text-secondary)">
              Nationality
            </p>
            <atlas-radio-group formControlName="nationality" [action]="action" (onChange)="onNationalityChange($event)" >
              <atlas-radio *ngFor="let nationality of nationalityList; let i = index" [radioId]="'radioId-' + nationality.id"
                [action]="action" 
                [value]="nationality.description"
                [tabindex]="9"
                aria-label={{nationality.description}}>
                {{nationality.description}}
              </atlas-radio>     
            </atlas-radio-group>       
          </div>
          <div class="column medium-6" formArrayName="sports">
            <p class="typographyStyles-label-small" style="color: var(--semanticColor-text-secondary)">
              Sports
            </p>
            <atlas-checkbox 
              [tabindex]="10"
              aria-label={{sport.description}}
              [checkboxId]="'checkbox-' + sport.id" 
              *ngFor="let sport of sportsList; let i = index" 
              [value]="sport.description" 
              [action]="action" 
              [isChecked]="sport.checked" 
              (onChange)="onSportChange($event)">
              {{sport.description}}
            </atlas-checkbox>
          </div>
        </div>
        <div class="row">
          <div class="column medium-6">
            <p class="typographyStyles-label-small" style="color: var(--semanticColor-text-secondary)">
              Remote Work System
            </p>
            <atlas-switch formControlName="remote" [action]="action" [size]="switchSize" aria-label="remote" [tabindex]="11">
              Yes
            </atlas-switch>
            <p class="typographyStyles-label-small" style="color: var(--semanticColor-text-secondary)">
              Hourly Rate
            </p>
            <atlas-slider [action]="action" formControlName="slider" aria-label="hourly rate" [tabindex]="12"></atlas-slider>
            <p class="typographyStyles-body-medium" style="color: var(--semanticColor-text-default-contained); margin-top: -24px;">
              {{ form.value.slider }} $
            </p>
          </div>
          <div class="column medium-6">
            <atlas-field [action]="action">
              <atlas-field-label>Select Jobs</atlas-field-label>
              <atlas-select aria-label="jobs" [tabindex]="13" formControlName="jobs" [placeholder]="'Select items'" [multiple]="true" (valueChange)="onSelectJob($event)" (selectionChange)="jobChanged($event)">
                <atlas-option *ngFor="let job of allJobs" [value]="job" (selectionChange)="onSelectJob($event)">{{ job }}</atlas-option>
              </atlas-select>
              <atlas-field-hint>{{form.value.jobs}}</atlas-field-hint>
            </atlas-field>
            <p class="typographyStyles-label-small" style="color: var(--semanticColor-text-secondary)">
              Preferred job positions
            </p>
            <atlas-chip-list>
              <atlas-chip
                [removable]="false"
                (removed)="chipRemoved(i, $event)"
                [action]="actionChip"
                [variant]="chipVariants"
                [size]="chipSize"
                *ngFor="let chip of chipList; index as i"
              >
              <atlas-icon [icon]="'icon-check-double-24'"></atlas-icon>
                {{ chip }}
              </atlas-chip>
            </atlas-chip-list>
            <p class="typographyStyles-label-small" style="color: var(--semanticColor-text-secondary)">
              Rating
            </p>
            <atlas-rating 
              [rating]="initialRating"
              [readOnly]="false" 
              [size]="ratingSize"
              [showLabel]="true"
              name="rating"
              aria-label="rating"
              [tabIndex]="14">
            </atlas-rating>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <p class="typographyStyles-label-small" style="color: var(--semanticColor-text-secondary)">
              Resume upload
            </p>
            <atlas-filedrop 
            ngDefaultControl
            [fullWidth]="true"
            formControlName="files"
            (canceledUpload)="onCanceledUpload($event)" 
            (selectedFiles)="onFilesSelected($event)"
            [tabindex]="15"
            aria-label="Resume"></atlas-filedrop>
          </div>
        </div>
        <div class="row">
          <div class="column align-right">
            <atlas-button
              [size]="button_size" [action]="cancelAction" (onClick)="onCancel()" aria-label="cancel" [tabindex]="16">Cancel
            </atlas-button>&#160;
            <atlas-button
              [size]="button_size"
                (click)="onSubmit()"
                [disabled]="!form.valid"
                [action]="action"
                aria-label="save"
                [tabindex]="17">Save
            </atlas-button>
          </div>
        </div>
      </form>
      <atlas-modal
        [title]="'Saved data'" 
        #modal
        content="{{ form.value | json }}"
        [autofocus]="false"
        [okLabel]="'Ok'"
        [cancelLabel]="'Cancel'"   
        (onOkClick)="onOkClick()">    
      </atlas-modal>
    </div>
  </div>
</div>



  `,
  styleUrls: ['../form-pattern/form-pattern.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
class SampleFormPatternComponent implements OnInit, OnChanges, AfterViewInit {
  /** Set logo url for the template */
  public logoUrl = '/atlas-logos/Mercer.png';
  /** Set the action theme across the sample template. */
  public action = Actions.primary;
  /** Set the action for cancel button. */
  public cancelAction = Actions.default;
   /** Set the variant of the login button in the sample template. */
  public input_size = 'default';
   /** Set the variant of the login button in the sample template. */
  public button_variant = ButtonVariants.contained;
  /** text variant for button */
  public text_variant = ButtonVariants.text;
  /** Set the size of the icons in the sample template. */
  public iconSize = IconSizes.medium;
   /** Set the size of the switch in the sample template. */
  public switchSize = SwitchSizings.medium;
  /** Set the size of the buttons. */
  public button_size = ButtonSizings.xlarge;
  /** Set the radius for the components in the sample template. */
  public radius = Radii.rounded;
  /** set boolean var open */
  public open = false;
  /** Set the density for the components in the sample template. */
  public density = Density.condensed;
  /** small variant of icon size */
  public smallIconSize = IconSizes.small;
  /** success variant of actions */
  public success = Actions.success;
  /** primary variant of action for drawer component */
  public drawerPrimary = Actions.primary;
  /** Set the size of the rating. */
  public ratingSize = RatingSizings.medium;
  /** Set the initial rating. */
  public initialRating = 0;
  /** Set the target of the link. */
  public target = LinkTargets.blank;

  @ViewChild('modal') modal!: ModalComponent;
  /** Set the breadcrumb items. */
  public breadItems = [
    {
      label: 'Home',
      path: '/login',
      active: false,
    },
    {
      label: 'Data Uploads',
      path: '/data',
      active: false,
    },
    {
      label: 'Form',
      path: '/form',
      active: true,
    },
  ];
  /** Set the items for user's menu. */
  public itemsUser = [
    {
      value: '/data',
      label: 'Profile',
      icon: 'icon-home-24',
      dense: true,
    },
    {
      value: '/data',
      label: 'Preferences',
      icon: 'icon-edit-24',
      dense: true,
    },
    {
      value: '/data',
      label: 'Uploads',
      icon: 'icon-file-upload-24',
      dense: true,
    },
  ];
  sportsList: any[] = [
    {
      id: 1,
      description: 'Tennis',
      checked: false,
    },
    {
      id: 2,
      description: 'Soccer',
      checked: false,
    },
    {
      id: 3,
      description: 'Swimming',
      checked: false,
    },
  ];
  /** Set the sports list. */
  nationalityList: any[] = [
    {
      id: 1,
      description: 'American',
    },
    {
      id: 2,
      description: 'Argentinian',
    },
    {
      id: 3,
      description: 'Cuban',
    },
    {
      id: 4,
      description: 'Uruguayan',
    },
    {
      id: 5,
      description: 'Other',
    },
  ];
  /** Set the nationality list. */
  allJobs: string[] = [
    'DevOps',
    'FullStack',
    'Frontend',
    'Backend',
    'Design',
    'Other',
  ];
  /** Set the all jobs list. */
  countries: any[] = [
    { name: 'ARGENTINA', value: 'AR'},
    { name: 'CUBA', value: 'CU'},
    { name: 'UNITED STATES', value: 'US'},
    { name: 'URUGUAY', value: 'UY'},
  ];
  /** Set the countries list. */
  actionChip: Actions = Actions.info;
  /** Set the chip variants. */
  public chipVariants = ChipVariants.filled;
  /** Set the chip size. */
  public chipSize = ChipSizings.medium;
  /** Set the form. */
  public form: UntypedFormGroup;
  /** Set the chip list. */
  public chipList: any = [];
  /** Set the countries filtered. */
  public countriesFiltered= new BehaviorSubject<any[]>([]);
  /** Set the email pattern. */
  public PAT_EMAIL = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$';

  constructor( 
    private fb: UntypedFormBuilder,
    private _cdr: ChangeDetectorRef,
    private _snackbar: SnackbarService) {
    const PAT_EMAIL = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$';
    this.form = fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['asdasdasd@asd1', [Validators.required, Validators.pattern(PAT_EMAIL)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
        dob: [''],
        languages: [''],
        country: [''],
        zipCode: [''],
        nationality: [''],
        sports: fb.array([]),
        remote: [ 'No' ],
        slider: ['0'],
        rating: [2.5],
        files: [''],
        time: [''],
        jobs: [[]]
      },
      {
        validator: this.mustMatch('password', 'confirmPassword'),
      }
    );
    this.initialRating = this.form.controls['rating'].value;
    this.countriesFiltered.next(this.countries);
  }

  get nationality() {
    return this.form.get('nationality');
  }

  get jobs() {
    return this.form.get('jobs');
  }

  get sports() {
    return this.form.get('sports') as UntypedFormArray;
  }

  onCanceledUpload(event) {
    console.log('cancel upload', event);
  }

  onFilesSelected(filesSelected: any[]) {
    if( filesSelected) {
      if (filesSelected.length > 1) {
        console.log('error');
        return;
      } else {
        console.log('file selected ', filesSelected) 
        this.form.get('files').setValue(filesSelected); 
      }
    }
   
  }

  ngOnInit(): void {
    this.countriesFiltered.next(this.countries);
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control.updateValueAndValidity();
    });

   }
  ngOnChanges(): void { 
    
  }

  ngAfterViewInit(): void {
    this.form.get('email').updateValueAndValidity();
  }

  public onCollapsed(event: any) {
    console.log('collapsed' + event);
  }

  public openMenu(event: any) {
    this.open = !this.open;
    if (this.open) {
      this.density = Density.expanded;
    } else {
      this.density = Density.condensed;
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.modal.launch();

  }

  public onCancel(): void {

    const message = `
    <p class="snackbar-success">The form will be reset.<strong> Are you sure?</strong></p>
  `

    this._snackbar.create({
      message: message,
      variant: 'light',
      elevation: 'elevated',
      enableAction: true,
      horizontalPosition: 'right',
      verticalPosition:'top',
      actionLabel: 'Reset Form',
      actionClick: () =>  this.form.reset(),
      closeClick: () => console.log( 'closed snackbar')
    });
  }

  public onOkClick(): void {

    const message = `
    <p class="snackbar-success">Form received!<strong> Thank you.</strong></p>
  `

    this._snackbar.create({
      message: message,
      variant: 'dark',
      elevation: 'elevated',
      enableAction: true,
      horizontalPosition: 'right',
      verticalPosition:'top',
      actionLabel: 'Ok',
      actionClick: () =>  this.form.reset(),
      closeClick: () => console.log( 'closed snackbar')
    });

  }

  public onSelectedLanguages(value): void {
    console.log(value);
  }

  public onSportChange(e: any): void {
    if (e.target.checked) {
      this.sports.push(new UntypedFormControl(e.target.value));
    } else {
      const index = this.sports.controls.findIndex(
        (x) => x.value === e
      );
      this.sports.removeAt(index);
    }
  }

  public onNationalityChange(e: any): void {
   console.log('value', this.nationality.value)
  }

  public mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public changeSwitch(e) {
    if(e) {
      this.form.controls['remote'].setValue('Yes')
    } else {
      this.form.controls['remote'].setValue('No')
    }
  }

  public onSelectJob(e: any): void {
    this.chipList = e;
    if (e.length > 0) {
      this.form.get('jobs').setValue(e); 
      console.log('select changed', e);
    } else {
      return;
    }
  }

  public chipRemoved(index: number, e: any): void {
    const curr = this.form.controls['jobs'].value;
    const newArr = curr.filter(curr => (curr[index]));
    // (<FormArray>this.form.controls['jobs']).removeAt(index);
    console.log('remove', index, newArr); 
  }

  public jobChanged(e: any): void { 
    this.form.get('jobs').setValue(e.value); 
  }

  filterCountry(event: HaloSelectTypeaheadChange) {
    const filterValue = event.value.toLowerCase();
    this.countriesFiltered.next(this.countries.filter(option => option.name.toLowerCase().includes(filterValue)));
  }

  // public selectionChip(e) {
  //   const index = this.jobs.controls.findIndex(
  //     (x) => x.value === e.target.value
  //   );
  //   if ( index === -1) {
  //     this.jobs.push(new FormControl(e.target.value));
  //   } else {
  //     alert('this job was previously added')
  //   } 
  // }

  // public selectChip(e) {
  //   console.log('eve', e);
  //   this.form.controls['Added'].setValue(e.target.value);
  // }
}




export default {
  title: 'Adopters/Templates/Form',
  component: SampleFormPatternComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        SampleFormPatternComponent
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        CdkModule,        
        IconModule,
        ChipsModule,
        AvatarModule,
        AppBarModule,
        ButtonModule,
        MenuModule,
        ListModule,
        LinkModule,
        CheckboxModule,
        RadioModule,
        FieldModule,
        FiledropModule,
        BreadcrumbModule,
        DrawerModule,
        ModalModule,
        SwitchModule,
        SliderModule,
        RatingModule,
        SnackbarModule,
        FormsModule,
        TabsModule
      ],
    }),
  ],
} as Meta;

export const Form: Story = (args: FormPatternComponent) => {
  /** Set logo url for the template */
  let logoUrl = '/atlas-logos/Mercer.png';
  /** Set the action theme across the sample template. */
  let action = Actions.primary;
  /** Set the action for cancel button. */
  let cancelAction = Actions.default;
   /** Set the size of the inputs. */
  let input_size = 'default';
   /** Set the variant of the login button in the sample template. */
  let button_variant = ButtonVariants.contained;
  /** text variant for button */
  let text_variant = ButtonVariants.text;
   /** Set the size of the icons in the sample template. */
  let iconSize = IconSizes.medium;
   /** Set the size of the switch in the sample template. */
  let switchSize = SwitchSizings.medium;
  /** Set the size of the buttons. */
  let button_size = ButtonSizings.xlarge;
  /** Set the radius for the components in the sample template. */
  let radius = Radii.rounded;
  /** set boolean var open */
  let open = false;
  /** Set the density for the components in the sample template. */
  let density = Density.condensed;
  /** small variant of icon size */
  let smallIconSize = IconSizes.small;
  /** success variant of actions */
  let success = Actions.success;
  /** primary variant of action for drawer component */
  let drawerPrimary = Actions.primary;
  /** Set the size of the rating. */
  let ratingSize = RatingSizings.medium;
  /** Set the initial rating. */
  let initialRating = 0;
  /** Set the target of the link. */
  let target = LinkTargets.blank;
  /** Set the breadcrumb items. */
  let breadItems = [
    {
      label: 'Home',
      path: '/login',
      active: false,
    },
    {
      label: 'Data Uploads',
      path: '/data',
      active: false,
    },
    {
      label: 'Form',
      path: '/form',
      active: true,
    },
  ];
  /** Set the items for user's menu. */
  let itemsUser: any[] = [
    {
      value: '/data',
      label: 'Profile',
      icon: 'icon-home-24',
      dense: true,
    },
    {
      value: '/data',
      label: 'Preferences',
      icon: 'icon-edit-24',
      dense: true,
    },
    {
      value: '/data',
      label: 'Uploads',
      icon: 'icon-file-upload-24',
      dense: true,
    },
  ];
  /** Set the sports list. */
  let sportsList: any[] = [
    {
      id: 1,
      description: 'Tennis',
      checked: false,
    },
    {
      id: 2,
      description: 'Soccer',
      checked: false,
    },
    {
      id: 3,
      description: 'Swimming',
      checked: false,
    },
  ];
  /** Set the nationality list. */
  let nationalityList: any[] = [
    {
      id: 1,
      description: 'American',
    },
    {
      id: 2,
      description: 'Argentinian',
    },
    {
      id: 3,
      description: 'Cuban',
    },
    {
      id: 4,
      description: 'Uruguayan',
    },
    {
      id: 5,
      description: 'Other',
    },
  ];
  /** Set the all jobs list. */
  let allJobs = [
    'DevOps',
    'FullStack',
    'Frontend',
    'Backend',
    'Design',
    'Other',
  ];
  /** Set the countries list. */
  let countries = [
    { name: 'ARGENTINA', value: 'AR'},
    { name: 'CUBA', value: 'CU'},
    { name: 'UNITED STATES', value: 'US'},
    { name: 'URUGUAY', value: 'UY'},
    { name: 'ARGENTINA', value: 'AR'},
    { name: 'CUBA', value: 'CU'},
    { name: 'UNITED STATES', value: 'US'},
    { name: 'URUGUAY', value: 'UY'},
    { name: 'ARGENTINA', value: 'AR'},
    { name: 'CUBA', value: 'CU'},
    { name: 'UNITED STATES', value: 'US'},
    { name: 'URUGUAY', value: 'UY'},
    { name: 'ARGENTINA', value: 'AR'},
    { name: 'CUBA', value: 'CU'},
    { name: 'UNITED STATES', value: 'US'},
    { name: 'URUGUAY', value: 'UY'},
    { name: 'ARGENTINA', value: 'AR'},
    { name: 'CUBA', value: 'CU'},
    { name: 'UNITED STATES', value: 'US'},
    { name: 'URUGUAY', value: 'UY'},
  ];
  /** Set the action chip. */
  let actionChip: Actions = Actions.info;
  /** Set the chip variants. */
  let chipVariants = ChipVariants.filled;
  /** Set the chip size. */
  let chipSize = ChipSizings.medium;
  /** Set the form. */
  let form: UntypedFormGroup;
  /** Set the chip list. */
  let chipList: any = [];
  /** Set the countries filtered. */
  let countriesFiltered= new BehaviorSubject<any[]>([]);
  /** Set the email pattern. */
  const PAT_EMAIL = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.][a-zA-Z]{2,4}$';

  form = new FormGroup(
    {
      firstName: new UntypedFormControl('', [Validators.required]),
      lastName: new UntypedFormControl('', [Validators.required]),
      email: new UntypedFormControl('asdasdasd@asd1', [Validators.required, Validators.pattern(PAT_EMAIL)]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new UntypedFormControl('', Validators.required),
      dob: new UntypedFormControl(''),
      languages: new UntypedFormControl(''),
      country: new UntypedFormControl(''),
      zipCode: new UntypedFormControl(''),
      nationality: new UntypedFormControl(''),
      sports: new UntypedFormArray([]),
      remote: new UntypedFormControl( 'No' ),
      slider: new UntypedFormControl('0'),
      rating: new UntypedFormControl(2.5),
      files: new UntypedFormControl(''),
      time: new UntypedFormControl(''),
      jobs: new UntypedFormControl([])
    }
  );
  countriesFiltered.next(countries);

  return {
    props: {
      ...args,
      logoUrl,
      action,
      cancelAction,
      input_size,
      button_variant,
      text_variant,
      iconSize,
      switchSize,
      button_size,
      radius,
      open,
      density,
      smallIconSize,
      success,
      drawerPrimary,
      ratingSize,
      initialRating,
      target,
      breadItems,
      itemsUser,
      sportsList,
      nationalityList,
      allJobs,
      countries,
      actionChip,
      chipVariants,
      chipSize,
      form,
      chipList,
      countriesFiltered,
      PAT_EMAIL,
    },
  }
};


const tsContent = FormPatternComponent;
const htmlContent = require('../form-pattern/form-pattern.component.html') as HTMLAllCollection;

const DOC = `
/** form-pattern.component.html **/

${htmlContent['default']}

/** end of html code **/

/** form-pattern.component.ts **/

${tsContent}

/** end of ts code **/

`;


Form.parameters = {
  docs: {
    source: {
      code: DOC,
    },
  },
};
