import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonSizings, ButtonVariants } from 'atlas-button';
import { Actions, BoxShadows, Density, Radii } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { ChipSizings } from 'atlas-chips';
import { CheckboxComponent } from 'atlas-checkbox';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultsComponent implements OnInit {
    /** Set the logo for the sample template */
    public logoUrl = '/atlas-logos/Mercer.png';
    /** Set the primary action across the sample template. */
    action = Actions.primary;
    action_chips = Actions.info;
    /** Set the primary reverse action across the sample template. */
    reverse_action = Actions['primary-reverse'];
    /** Set the size of the inputs. */
    input_size = 'default';
    /** Set the variant of the login button in the sample template. */
    button_variant = ButtonVariants.contained;
    /** text variant for button */
    text_variant = ButtonVariants.text;
    /** outlined variant for button */
    outlined_variant = ButtonVariants.outlined;
    /** Set the size of the icons in the sample template. */
    iconSize =IconSizes.medium;
    /** Set the size of the buttons. */
    button_size = ButtonSizings.medium;
    /** Set the size of the reset button. */
    reset_size = ButtonSizings.xsmall;
    chip_size = ChipSizings.small;
    /** Set the radius for the components in the sample template. */
    radius = Radii.rounded;
    /** set boolean var open */
    open = false;
    /** Set the density for the components in the sample template. */
    density = Density.condensed;
    /** small variant of icon size */
    smallIconSize = IconSizes.small;
    /** success variant of actions */
    success = Actions.success;
    /** primary variant of action for drawer component */
    drawerPrimary = Actions.primary;
    /** density boolean var for table */
    tableDense = true;
    /** accordion icons */
    icon_arrow_down = 'icon-chevron-down-24';
    icon_arrow_up = 'icon-chevron-up-24';
    /** filters */
    filtersStatus = {
      filter1: {
        active: false,
        icon: this.icon_arrow_down
      },
      filter2: {
        active: false,
        icon: this.icon_arrow_down
      },
      filter3: {
        active: false,
        icon: this.icon_arrow_down
      }
    };
    /** size of icons in filter section */
    filter_icon_size = IconSizes.small;
    /** Box shadows */
    elevation = BoxShadows.elevated;
    /** items for breadcrumb */
    public breadItems = [
      {
        label: "Home",
        path: "/level1",
        active: false,
      },
      {
        label: "Search Results",
        path: "/level1/level2",
        active: true,
      },
    ];
    /** profile data */
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
    /** sidebar items */
    public items = [
      {
          value: '/',
          label: 'Home',
          icon: 'icon-home-24',
          reverse: true,
      },
      {
        value: '/form',
        label: 'Form',
        icon: 'icon-document-2-24',
        reverse: true,
      },
      {
        value: '/data',
        label: 'Data Display',
        icon: 'icon-document-copy-24',
        reverse: true,
      },
      {
          value: '/results',
          label: 'Search',
          icon: 'icon-search-24',
          reverse: true,
          selected: true,
      },
      {
          value: '/login',
          label: 'Sign out',
          icon: 'icon-logout-24',
          reverse: true,
      },
    ];

    public nationalityList: any[] = [
      {
        id: 1,
        description: 'American',
        checked: false,
      },
      {
        id: 2,
        description: 'Argentinian',
        checked: false,
      },
      {
        id: 3,
        description: 'Cuban',
        checked: false,
      },
      {
        id: 4,
        description: 'Uruguayan',
        checked: false,
      },
      {
        id: 5,
        description: 'Other',
        checked: false,
      },
    ];

    public jobList: any[] = [
      {
        id: 1,
        description: 'DevOps',
        checked: false,
      },
      {
        id: 2,
        description: 'FullStack',
        checked: false,
      },
      {
        id: 3,
        description: 'Frontend',
        checked: false,
      },
      {
        id: 4,
        description: 'Backend',
        checked: false,
      },
      {
        id: 5,
        description: 'Design',
        checked: false,
      },
      {
        id: 6,
        description: 'Other',
        checked: false,
      },
    ];
    public results = [
      {
        "id": 1,
        "firstName": "Mike",
        "lastName": "Fortuna",
        "email": "m42na@halopowered.com",
        "country": "USA",
        "languages": [
          "English",
          "German"
        ],
        "nationality": "American",
        "remoteJob": "yes",
        "jobs": [
          "DevOps",
          "FullStack"
        ]
      },  
      {
        "id": 2,
        "firstName": "Pablo",
        "lastName": "Viana",
        "email": "pablo.viana@halopowered.com",
        "country": "URUGUAY",
        "languages": [
          "English",
          "Spanish"
        ],
        "nationality": "Uruguayan",
        "remoteJob": "yes",
        "jobs": [
          "Design",
          "Other"
        ]
      },  
      {
        "id": 3,
        "firstName": "Osvaldo",
        "lastName": "Morgan",
        "email": "osvaldo.morgan@halopowered.com",
        "country": "CUBA",
        "languages": [
          "Spanish"
        ],
        "nationality": "Cuban",
        "remoteJob": "yes",
        "jobs": [
          "Frontend"
        ]
      }  
    ]
    resultsBackup = [];

    @ViewChild('filter1') filter1: TemplateRef<any>;
    @ViewChildren('checkboxFilter') checkboxFilter: QueryList<CheckboxComponent>;

  constructor(public _router: Router, private change_detector: ChangeDetectorRef) { }
  /** @internal */
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  /** on collapse event */
  public onCollapsed(event: any) {
    console.log('collapsed' + event);
  }

  /** open menu event */
  public openMenu(event: any) {
    this.open = !this.open;
    if (this.open) {
      this.density = Density.expanded;
    } else {
      this.density = Density.condensed;
    }
  }

  /** sign out event */
  public signOut(event: any) {
    console.log('sign out' + event);
    this._router.navigateByUrl('login');
  }

  changeExpandStatus(filterName) {
    const itemFilter = this.filtersStatus[filterName];
    itemFilter.active = !itemFilter.active;
    if (itemFilter.active) {
      itemFilter.icon = this.icon_arrow_up
    } else {
      itemFilter.icon = this.icon_arrow_down
    }
  }

  resetSearch() {
    if(this.results.length < this.resultsBackup.length) {
      this.results = this.resultsBackup;
    } else {
      this.resultsBackup = this.results;
    }
    console.log('filter-childer', this.checkboxFilter);
    this.checkboxFilter.forEach((checkbox: CheckboxComponent) => checkbox.reset());
    this.change_detector.detectChanges()
  }

  checkboxChange(e, filterName) {
    const checked = e.target.checked;
    const value = e.target.value;
    for ( let nationality of this.nationalityList) {
      if (nationality.value === value) {
        nationality.checked = checked;
      }
    }
    if(this.results.length < this.resultsBackup.length) {
      this.results = this.resultsBackup;
    } else {
      this.resultsBackup = this.results;
    }
    if(checked) {
      this.resultsBackup = this.results;
      if( filterName === 'nationality' ) {
        this.results = this.results.filter(item => item.nationality === value);
      }
      if( filterName === 'job' ) {
        this.results = this.results.filter(item => item.jobs.includes(value));
      }
    } else {
      this.results = this.resultsBackup;
    }
    return this.results;
  }

}
