import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ChangeDetectorRef, Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { ButtonModule, ButtonSizings, ButtonVariants } from 'atlas-button';
import { Actions, BoxShadows, CdkModule, Density, Radii } from 'atlas-cdk';
import { IconModule, IconSizes } from 'atlas-icon';
import { CommonModule } from '@angular/common';
import { UntypedFormControl, Validators } from '@angular/forms';
import { AppBarModule } from 'atlas-app-bar';
import { AvatarModule } from 'atlas-avatar';
import { BreadcrumbModule } from 'atlas-breadcrumb';
import { CheckboxComponent, CheckboxModule } from 'atlas-checkbox';
import { DrawerModule } from 'atlas-drawer';
import { FieldModule, FieldSize } from 'atlas-field';
import { LinkModule } from 'atlas-link';
import { ListModule } from 'atlas-list';
import { MenuModule } from 'atlas-menu';
import { TableModule } from 'atlas-table';
import { DataUploadsComponent } from '../data-uploads/data-uploads.component';
import { ChipSizings, ChipsModule } from 'atlas-chips';
import { CardModule } from 'atlas-card';
import { DividerModule } from 'atlas-divider';
import { AccordionModule } from 'atlas-accordion';

@Component({
  selector: 'app-search-result',
  template: `
  <div class="row expanded collapse" style="
    background: var(--semanticColor-layer-neutral-02);
  ">
    <div class="column small-12" style="padding-bottom: 0;">
        <atlas-app-bar>
            <span style="
            color: var(--semanticColor-background-brand-strong-rest);
            display: flex;
            align-items: center;
            width: 240px;
            justify-content: space-between;">
              <img height="20px" [src]="logoUrl" alt="Mercer" />
              <h3 class="typographyStyles-body-largeAlt">|</h3>
              <h3 class="typographyStyles-body-smallAlt">Acme Admin</h3>
            </span>
            <span class="app-bar-separator"></span>
            <atlas-avatar menuTrigger (triggered)="demoMenu.toggleMenu($event)" [action]="action" [indicatorAction]="success" [radius]="radius" class="data-avatar__hover">OP</atlas-avatar>
            <div style="
            position: absolute;
            right: 10px;
            top: 56px;
            width: 184px;
            ">
            <atlas-menu #demoMenu action="primary">
              <atlas-list>
                <atlas-list-item>Original Poster</atlas-list-item>
              </atlas-list>
              <hr style="
              border-color: #e5e5e5;
              border-style: solid;
              margin: 8px 0;">
                <atlas-list>
                <atlas-list-item *ngFor="let item of itemsUser" [item]="item">
                  <atlas-icon *ngIf="item.icon" style="margin-right: 12px;" [size]="smallIconSize" [icon]="item.icon"></atlas-icon> 
                  <div>
                    {{ item.label }} 
                    <!-- <div *ngIf="item.secondary" class="typographyStyles-body-small">{{item.secondary}}</div> -->
                  </div>
                </atlas-list-item>
              </atlas-list>
              <hr style="
              border-color: #e5e5e5;
              border-style: solid;
              margin: 8px 0;">
              <atlas-list>
                <atlas-list-item>
                <atlas-icon [size]="smallIconSize" icon="icon-logout-24" style="margin-right: 12px;"></atlas-icon>
                Sign out</atlas-list-item>
              </atlas-list>
              </atlas-menu>
            </div>
        </atlas-app-bar>
    </div>
    <div class="column shrink" style="padding-top: 0;">
        <atlas-drawer [density]="density" [action]="drawerPrimary">
            <atlas-button [variant]="text_variant" [action]="action" (click)="openMenu($event)" [expand]="open ? false : true">
                <atlas-icon color="colors-surface-default-main" [icon]="open ? 'icon-arrow-import-export-left-24' : 'icon-arrow-import-export-right-24'"></atlas-icon>
            </atlas-button>
            <atlas-list>
                <atlas-list-item *ngFor="let item of items" [item]="item" [action]="action">
                    <atlas-icon *ngIf="item.icon" style="margin-right: 34px;" [size]="iconSize" [icon]="item.icon">
                    </atlas-icon>
                    <div>
                        <span *ngIf="open" class="typographyStyles-body-small">{{ item.label }}</span>
                    </div>
                </atlas-list-item>
            </atlas-list>
        </atlas-drawer>
    </div>
    <div class="column" style="padding: 24px; height: 100vh;">
      <div class="search-banner">
        <h1 class="typographyStyles-display-small" style="margin: 0; color: var(--semanticColor-text-default);">Your Results</h1>
        <div class="search-inline-content">
          <p class="typographyStyles-heading-medium" style="color: var(--semanticColor-text-secondary); margin: 8px 24px 8px 0;">{{results.length}} matches</p>
          <atlas-button [variant]="outlined_variant" [action]="reverse_action">
            <atlas-icon [icon]="'icon-search-24'" [color]="reverse_action" [size]="iconSize"></atlas-icon> New Search
          </atlas-button>
        </div>
      </div>
      <atlas-divider style="margin: 40px 0 0;"></atlas-divider>
      <div class="row">
        <div class="column medium-3">
          <p class="typographyStyles-heading-medium" style="margin-bottom: 2px;"> Filter by</p>
          <section class="search-inline-content" style="justify-content: space-between;">
            <p class="typographyStyles-body-small text-secondary">0 filters selected</p>
            <atlas-button [variant]="outlined_variant" [action]="action" [size]="reset_size" (onClick)="resetSearch()">Reset</atlas-button>
          </section>
          <section id="filters">
            <atlas-accordion>
              <atlas-accordion-item (onExpand)="changeExpandStatus('filter2')">
                <atlas-accordion-heading>
                  <div class="padding-y-6 typographyStyles-body-smallAlt">Nationality</div>
                </atlas-accordion-heading>
                <atlas-accordion-content>
                  <div class="padding-y-10 padding-x-8">
                    <atlas-checkbox 
                      #checkboxFilter
                      [tabindex]="10"
                      aria-label={{nationality.description}}
                      [checkboxId]="'checkbox-' + nationality.id" 
                      *ngFor="let nationality of nationalityList; let i = index" 
                      [value]="nationality.description" 
                      [action]="action" 
                      [isChecked]="nationality.checked" 
                      (onChange)="checkboxChange($event, 'nationality')">
                      {{nationality.description}}
                    </atlas-checkbox>
                  </div>
                </atlas-accordion-content>
                <atlas-accordion-expand>
                  <div>
                    <atlas-icon-button [size]="filter_icon_size" [dense]="true" [icon]="filtersStatus.filter2.icon"></atlas-icon-button>
                  </div>
                </atlas-accordion-expand>
              </atlas-accordion-item>
            </atlas-accordion>
            <atlas-accordion>
              <atlas-accordion-item (onExpand)="changeExpandStatus('filter3')">
                <atlas-accordion-heading>
                  <div class="padding-y-6 typographyStyles-body-smallAlt">Jobs</div>
                </atlas-accordion-heading>
                <atlas-accordion-content>
                  <div class="padding-y-10 padding-x-8">
                    <atlas-checkbox 
                      #checkboxFilterJobs
                      [tabindex]="10"
                      aria-label={{job.description}}
                      [checkboxId]="'checkbox-' + job.id" 
                      *ngFor="let job of jobList; let i = index" 
                      [value]="job.description" 
                      [action]="action" 
                      [isChecked]="job.checked" 
                      (onChange)="checkboxChange($event, 'job')">
                      {{job.description}}
                    </atlas-checkbox>
                  </div>
                </atlas-accordion-content>
                <atlas-accordion-expand>
                  <div>
                    <atlas-icon-button [size]="filter_icon_size" [dense]="true" [icon]="filtersStatus.filter3.icon"></atlas-icon-button>
                  </div>
                </atlas-accordion-expand>
              </atlas-accordion-item>
            </atlas-accordion>
          </section>
        </div>
        <div class="column medium-9">
          <section id="results">
            <div class="row">
              <div *ngFor="let result of results; let i = index" class="column small-12 card-content">
                <atlas-card [avatar]="true" 
                  [elevation]="elevation" 
                  [contentPaddingClass]="'padding-top-4 padding-bottom-8 padding-x-8'"
                  [footerPaddingClass]="'padding-x-8 padding-bottom-4'">
                  <atlas-avatar [imgSrc]="'./atlas-logos/logo.png'" [avatarCustomClass]="'search-avatar'"></atlas-avatar>
                  <atlas-card-header>
                    <span>{{result.firstName + ' ' + result.lastName}}</span>
                  </atlas-card-header>
                  <atlas-card-subheader>
                    <span class="typographyStyles-body-small">{{result.email}}</span>
                    <p style="margin: 4px 0" class="typographyStyles-body-medium">{{result.country}}</p>
                    <atlas-chip-list>
                      <atlas-chip [action]="action_chips" [size]="chip_size" *ngFor="let job of result.jobs; let i = index">{{job}}</atlas-chip>
                    </atlas-chip-list>
                  </atlas-card-subheader>
                  <atlas-card-content>
                    <atlas-divider></atlas-divider>
                    <div class="row">
                      <div class="column small-12">
                        <span>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua.
                        </span>
                      </div>
                      <div class="column medium-4">
                        
                      </div>
                    </div>
                  </atlas-card-content>
                  <atlas-card-footer>
                    <atlas-button [size]="button_size" [variant]="text_variant" [action]="action">
                      View more...
                    </atlas-button>
                  </atlas-card-footer>
                </atlas-card>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
</div>
<div>
</div>
  `,
  styleUrls: ['./search-results.component.scss']
})
class SearchResultsComponent implements OnInit {
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
  @ViewChildren('checkboxFilterJobs') checkboxFilterJobs: QueryList<CheckboxComponent>;

constructor(private change_detector: ChangeDetectorRef) { }
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
  this.checkboxFilterJobs.forEach((checkbox: CheckboxComponent) => checkbox.reset());
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

export default {
  title: 'Adopters/Templates/Search UI Pattern',
  component: SearchResultsComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        SearchResultsComponent,
      ],
      imports: [
        CommonModule,
        CdkModule,
        IconModule,
        AvatarModule,
        AppBarModule,
        ButtonModule,
        MenuModule,
        ListModule,
        CheckboxModule,
        FieldModule,
        TableModule,
        BreadcrumbModule,
        DrawerModule,
        LinkModule,
        DividerModule,
        AccordionModule,
        CardModule,
        ChipsModule
      ],
    }),
  ],
} as Meta;

export const SearchUIPattern: Story = (args: SearchResultsComponent) => {
  /** Set the logo for the sample template */
  let logoUrl = '/atlas-logos/Mercer.png';
  /** Set the primary action across the sample template. */
  let action = Actions.primary;
  let action_chips = Actions.info;
  /** Set the primary reverse action across the sample template. */
  let reverse_action = Actions['primary-reverse'];
  /** Set the size of the inputs. */
  let input_size = 'default';
  /** Set the variant of the login button in the sample template. */
  let button_variant = ButtonVariants.contained;
  /** text variant for button */
  let text_variant = ButtonVariants.text;
  /** outlined variant for button */
  let outlined_variant = ButtonVariants.outlined;
  /** Set the size of the icons in the sample template. */
  let iconSize =IconSizes.medium;
  /** Set the size of the buttons. */
  let button_size = ButtonSizings.medium;
  /** Set the size of the reset button. */
  let reset_size = ButtonSizings.xsmall;
  let chip_size = ChipSizings.small;
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
  /** density boolean var for table */
  let tableDense = true;
  /** accordion icons */
  let icon_arrow_down = 'icon-chevron-down-24';
  let icon_arrow_up = 'icon-chevron-up-24';
  /** filters */
  let filtersStatus = {
    filter1: {
      active: false,
      icon: icon_arrow_down
    },
    filter2: {
      active: false,
      icon: icon_arrow_down
    },
    filter3: {
      active: false,
      icon: icon_arrow_down
    }
  };
  /** size of icons in filter section */
  let filter_icon_size = IconSizes.small;
  /** Box shadows */
  let elevation = BoxShadows.elevated;
  /** items for breadcrumb */
  let breadItems = [
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
  let itemsUser = [
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
  let items = [
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

  let nationalityList = [
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

  let jobList = [
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
  let results = [
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
  let resultsBackup = [];

  return {
    props: {
      ...args,
    logoUrl,
    action,
    action_chips,
    reverse_action,
    input_size,
    button_variant,
    text_variant,
    outlined_variant,
    iconSize,
    button_size,
    reset_size,
    chip_size,
    radius,
    open,
    density,
    smallIconSize,
    success,
    drawerPrimary,
    tableDense,
    icon_arrow_down,
    icon_arrow_up,
    filtersStatus,
    filter_icon_size,
    elevation,
    breadItems,
    itemsUser,
    items,
    results,
    resultsBackup,
    nationalityList,
    jobList,
    
    },
  }
};

const tsContent = SearchResultsComponent;
const htmlContent = require('../search-results/search-results.component.html') as HTMLAllCollection;

const DOC = `
/** search-pattern.component.html **/

${htmlContent['default']}

/** end of html code **/

/** search-pattern.component.ts **/

${tsContent}

/** end of ts code **/

`;

SearchUIPattern.parameters = {
  docs: {
    source: {
      code: DOC,
    },
  },
};
