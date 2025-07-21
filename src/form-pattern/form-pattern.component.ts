import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnChanges, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonSizings, ButtonVariants } from 'atlas-button';
import { Actions, Density, Radii } from 'atlas-cdk';
import { ChipSizings, ChipVariants } from 'atlas-chips';
import { HaloSelectComponent, HaloSelectTypeaheadChange } from 'atlas-field';
import { IconSizes } from 'atlas-icon';
import { LinkTargets } from 'atlas-link';
import { ModalComponent } from 'atlas-modal';
import { RatingSizings } from 'atlas-rating';
import { SnackbarService } from 'atlas-snackbar';
import { SwitchSizings } from 'atlas-switch';
import { BehaviorSubject } from 'rxjs';
import { CheckboxComponent } from 'atlas-checkbox';
import { RadioGroupComponent } from 'atlas-radio';

@Component({
  selector: 'app-form-pattern',
  templateUrl: './form-pattern.component.html',
  styleUrls: ['./form-pattern.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormPatternComponent implements OnInit, OnChanges, AfterViewInit {
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
    @ViewChild('radio') radioGroup!: RadioGroupComponent;
    @ViewChildren('jobs') jobList: QueryList<HaloSelectComponent>;
    @ViewChildren('sportsCheckbox') sportsCheck: QueryList<CheckboxComponent>;
    
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
    /** Set the all countries list. */
    countries: any[] = [
        {
          name: 'India',
          value: 'IN',
        },
        {
          name: 'Belarus',
          value: 'BY',
        },
        {
          name: 'Canada',
          value: 'CA',
        },
        {
          name: 'Japan',
          value: 'JP',
        },
        {
          name: 'Denmark',
          value: 'DK',
        },
        {
          name: 'Egypt',
          value: 'EG',
        },
        {
          name: 'France',
          value: 'FR',
        },
        {
          name: 'Argentina',
          value: 'AR',
        },
        {
          name: 'Germany',
          value: 'DE',
        },
        {
          name: 'Hungary',
          value: 'HU',
        },
        {
          name: 'India',
          value: 'IN',
        },
        {
          name: 'Belarus',
          value: 'BY',
        },
        {
          name: 'Canada',
          value: 'CA',
        },
        {
          name: 'Japan',
          value: 'JP',
        },
        {
          name: 'Denmark',
          value: 'DK',
        },
        {
          name: 'Egypt',
          value: 'EG',
        },
        {
          name: 'France',
          value: 'FR',
        },
        {
          name: 'Argentina',
          value: 'AR',
        },
        {
          name: 'Germany',
          value: 'DE',
        },
        {
          name: 'Hungary',
          value: 'HU',
        },
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
    private router: Router, 
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

  public signOut(event: any) {
    console.log('sign out' + event);
    this.router.navigateByUrl('login');
  }

  public onSelectedRoute(item: any): void {
    this.router.navigateByUrl(item.path);
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
      actionClick: () =>  {
        this.form.reset();
        this.sportsCheck.forEach(sport => sport.reset());
        this.radioGroup.clear();
      },
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
    } else {
      return;
    }
   
  }

  public chipRemoved(index: number, e: any): void {
    this.jobList.forEach((option: HaloSelectComponent) => {
      const value = option.value[index];
      option.deselectOption(value);
    });
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
