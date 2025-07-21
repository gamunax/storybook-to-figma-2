import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { Component, OnInit } from '@angular/core';
import { ButtonModule, ButtonSizings, ButtonVariants } from 'atlas-button';
import { Actions, CdkModule, Density, Radii } from 'atlas-cdk';
import { IconModule, IconSizes } from 'atlas-icon';
import { CommonModule } from '@angular/common';
import { AppBarModule } from 'atlas-app-bar';
import { AvatarModule } from 'atlas-avatar';
import { CheckboxModule } from 'atlas-checkbox';
import { DrawerModule } from 'atlas-drawer';
import { FieldModule } from 'atlas-field';
import { LinkModule } from 'atlas-link';
import { ListModule } from 'atlas-list';
import { MenuModule } from 'atlas-menu';
import { TableModule } from 'atlas-table';
import { PaginationInfo, PaginationModule, PaginationSizings, PaginationVariants  } from 'atlas-pagination';
import { DataUploadsComponent } from '../data-uploads/data-uploads.component';

@Component({
  selector: 'app-data-uploads',
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
    <div class="column"
        style="padding: 24px; height: 100vh;">
        <h1 class="typographyStyles-display-small" style="margin: 0; color: var(--semanticColor-text-default);">Data Uploads</h1>
        <div class="row" style="
        background: var(--semanticColor-layer-neutral-00);
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.16);
        border-radius: 4px;
        padding: 16px;  
      ">    
            <div class="column medium-6 shrink">
                <atlas-field [action]="action">
                    <atlas-field-label>File type</atlas-field-label>
                    <atlas-select [placeholder]="'Select a File Type &nbsp;'">
                      <atlas-option [value]="'DLL'">Dynamic Link Libraries (DLL)</atlas-option>
                      <atlas-option [value]="'EXE'">Executable (EXE)</atlas-option>
                    </atlas-select>
                  </atlas-field>
            </div>
            <div class="column medium-6 shrink">
                <atlas-field>
                    <atlas-field-label>&nbsp;</atlas-field-label>
                    <input type="text" atlasInput placeholder="Search"/>
                    <atlas-field-suffix>
                        <atlas-icon
                        [icon]="'icon-search-24'"
                        [size]="iconSize">
                        </atlas-icon>
                    </atlas-field-suffix>
                </atlas-field>
            </div>
            <div class="column medium-12">
            <atlas-table [dense]="tableDense">
                <thead atlas-table-header #header>
                    <tr atlas-table-row>
                        <th atlas-table-header-cell *ngFor="let col of columnDef" [columnDef]="col">
                        {{ col.displayLabel }}
                        </th>
                    </tr>
                </thead>
                
                <tbody atlas-table-body>
                    <tr atlas-table-row *ngFor="let row of paginatedRows | sort:header.sortOption; let i = index">
                    <td atlas-table-cell>
                        <atlas-checkbox #chk
                        [checkboxId]="'chk' + i"
                        [isChecked]="row.checked"
                        [action]="action"
                     >
                    </atlas-checkbox>
                    </td>
                    <td atlas-table-cell>
                        {{ row.name }}
                    </td>
                    <td atlas-table-cell>
                        {{ row.type }}
                    </td>
                    <td atlas-table-cell>
                        {{ row.year }}
                    </td>
                    <td atlas-table-cell>
                        {{ row.country }}
                    </td>
                    </tr>
                    </tbody>
                </atlas-table>

                <div style="
                  display: flex;
                  justify-content: center;
                  padding-top: 22px;">
                  <atlas-pagination 
                    [maxSize]="5"
                    [paginationInfo]="paginationInfo"
                    [size]="size"
                    [variant]="variant"
                    [radius]="radius"
                    [action]="action"
                    [disabled]="disabled"
                    [limitOptions]="limitOptions"
                    [showLimitOptions]="true"
                    (paginationInfoRequest)="loadPaginationInfoRequest($event)">
                  </atlas-pagination>
              </div>
            </div>
        </div>
    </div>
</div>
<div>
</div>
  `,
  styleUrls: ['../data-uploads/data-uploads.component.scss']
})
class DisplayDataComponent implements OnInit {
    /** Set the logo for the sample template */
    public logoUrl = '/atlas-logos/Mercer.png';
    /** Set the primary action across the sample template. */
    action = Actions.primary;
    /** Set the size of the inputs. */
    input_size = 'default';
    /** Set the variant of the login button in the sample template. */
    button_variant = ButtonVariants.contained;
    /** text variant for button */
    text_variant = ButtonVariants.text;
    /** Set the size of the icons in the sample template. */
    iconSize =IconSizes.medium;
    /** Set the size of the buttons. */
    button_size = ButtonSizings.xlarge;
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
    /** items for breadcrumb */
    public breadItems = [
      {
        label: "Home",
        path: "/level1",
        active: false,
      },
      {
        label: "Data Uploads",
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
          value: '/data',
          label: 'Home',
          icon: 'icon-home-24',
          reverse: true,
      },
      {
        value: '/data',
        label: 'Sample Data Display',
        icon: 'icon-cloud-upload-24',
        reverse: true,
        selected: true,
     },
      {
          value: '/data',
          label: 'Timesheet',
          icon: 'icon-clock-24',
          reverse: true,
      },
      {
          value: '/data',
          label: 'My Uploads',
          icon: 'icon-file-upload-24',
          reverse: true,
          selected: false,
      },
      {
          value: '/data',
          label: 'Time & Space',
          icon: 'icon-arrow-counterclockwise-time-24',
          reverse: true,
      },
      {
          value: '/login',
          label: 'Sign out',
          icon: 'icon-logout-24',
          reverse: true,
      },
    ];
    /** column data */
    public columnDef = [
        {
            displayLabel: '',
            fieldKey: 'select',
            sortable: false,
        },
        {
          displayLabel: 'File Name',
          fieldKey: 'name',
        },
        {
          displayLabel: 'File type',
          fieldKey: 'type',
        },
        {
          displayLabel: 'Year',
          fieldKey: 'year',
        },
        {
          displayLabel: 'Country',
          fieldKey: 'country',
        },
      ];
      /** row data */
      public rows = [
        { name: 'XPTLEx.dll', type: 'DLL', year: '2024', country: 'USA', checked: true },
        { name: 'QWZKEx.dll', type: 'DLL', year: '2024', country: 'Italy', checked: false },
        { name: 'LMNTEx.dll', type: 'DLL', year: '2024', country: 'Uruguay', checked: false },
        { name: 'GHYREx.dll', type: 'DLL', year: '2024', country: 'Japan', checked: false },
        { name: 'TRFJEx.dll', type: 'DLL', year: '2023', country: 'Canada', checked: false },
        { name: 'BXCZEx.dll', type: 'DLL', year: '2023', country: 'Germany', checked: false },
        { name: 'MVPQEx.dll', type: 'DLL', year: '2023', country: 'Brazil', checked: false },
        { name: 'WYXKEx.dll', type: 'DLL', year: '2022', country: 'Spain', checked: true },
        { name: 'KJHGEx.dll', type: 'DLL', year: '2022', country: 'Mexico', checked: false },
        { name: 'ZPLDEx.dll', type: 'DLL', year: '2022', country: 'Argentina', checked: false },
        { name: 'DFGVEx.dll', type: 'DLL', year: '2021', country: 'Chile', checked: false },
        { name: 'VBNMEx.exe', type: 'EXE', year: '2021', country: 'France', checked: false },
        { name: 'LKJHEx.exe', type: 'EXE', year: '2021', country: 'UK', checked: false },
        { name: 'QWEREx.exe', type: 'EXE', year: '2020', country: 'USA', checked: false },
        { name: 'UIOPEx.exe', type: 'EXE', year: '2020', country: 'Italy', checked: true },
        { name: 'ASDFEx.exe', type: 'EXE', year: '2020', country: 'Germany', checked: false },
        { name: 'ZXCVEx.exe', type: 'EXE', year: '2019', country: 'Spain', checked: false },
        { name: 'POIUEx.exe', type: 'EXE', year: '2019', country: 'Japan', checked: false },
        { name: 'MNBVEx.exe', type: 'EXE', year: '2019', country: 'Brazil', checked: false },
        { name: 'TYUIEx.exe', type: 'EXE', year: '2018', country: 'Argentina', checked: false },
        { name: 'QAZWEx.exe', type: 'EXE', year: '2018', country: 'Chile', checked: false },
        { name: 'EDCREx.exe', type: 'EXE', year: '2018', country: 'Canada', checked: false },
        { name: 'FVGBEx.exe', type: 'EXE', year: '2017', country: 'Uruguay', checked: false },
      ];

      size = PaginationSizings.medium;
      variant = PaginationVariants.text;
      disabled = false;
      limitOptions = [5, 10, 20];
      paginationInfo = {
        page: 1,
        itemsByPage: 5,
        total: this.rows.length,
      };

      paginatedRows = this.rows.slice(0, this.paginationInfo.itemsByPage);

  constructor() { }
  /** @internal */
  ngOnInit(): void {
  }

  public loadPaginationInfoRequest(paginationInfoRequested: PaginationInfo) {
    console.log("🎾 paginationInfoRequested:", paginationInfoRequested);

    this.paginationInfo = {
      ...this.paginationInfo,
        page: paginationInfoRequested.page,
        itemsByPage: paginationInfoRequested.itemsByPage,
        total: this.rows.length
    };

    const start = (paginationInfoRequested.page - 1) * paginationInfoRequested.itemsByPage;
    this.paginatedRows = [...this.rows.slice(start, start + paginationInfoRequested.itemsByPage)];
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

}

export default {
  title: 'Adopters/Templates/Data',
  component: DisplayDataComponent,
  decorators: [
    moduleMetadata({
      declarations: [
        DisplayDataComponent,
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
        DrawerModule,
        LinkModule,
        PaginationModule
      ],
    }),
  ],
} as Meta;

export const Data: Story = (args: DisplayDataComponent) => {
  /** Set the logo for the sample template */
  let logoUrl = '/atlas-logos/Mercer.png';
  /** Set the primary action across the sample template. */
  let action = Actions.primary;
  /** Set the size of the inputs. */
  let input_size = 'default';
  /** Set the variant of the login button in the sample template. */
  let button_variant = ButtonVariants.contained;
  /** text variant for button */
  let text_variant = ButtonVariants.text;
  /** Set the size of the icons in the sample template. */
  let iconSize =IconSizes.medium;
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
  /** density boolean var for table */
  let tableDense = true;
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
        value: '/data',
        label: 'Home',
        icon: 'icon-home-24',
        reverse: true,
    },
    {
      value: '/data',
      label: 'Sample Data Display',
      icon: 'icon-cloud-upload-24',
      reverse: true,
      selected: true,
   },
    {
        value: '/data',
        label: 'Timesheet',
        icon: 'icon-clock-24',
        reverse: true,
    },
    {
        value: '/data',
        label: 'My Uploads',
        icon: 'icon-file-upload-24',
        reverse: true,
        selected: false,
    },
    {
        value: '/data',
        label: 'Time & Space',
        icon: 'icon-arrow-counterclockwise-time-24',
        reverse: true,
    },
    {
        value: '/login',
        label: 'Sign out',
        icon: 'icon-logout-24',
        reverse: true,
    },
  ];
  /** column data */
  let columnDef = [
      {
          displayLabel: '',
          fieldKey: 'select',
          sortable: false,
      },
      {
        displayLabel: 'File Name',
        fieldKey: 'name',
      },
      {
        displayLabel: 'File type',
        fieldKey: 'type',
      },
      {
        displayLabel: 'Year',
        fieldKey: 'year',
      },
      {
        displayLabel: 'Country',
        fieldKey: 'country',
      },
    ];
    /** row data */
    let rows = [
      { name: 'XPTLEx.dll', type: 'DLL', year: '2024', country: 'USA', checked: true },
      { name: 'QWZKEx.dll', type: 'DLL', year: '2024', country: 'Italy', checked: false },
      { name: 'LMNTEx.dll', type: 'DLL', year: '2024', country: 'Uruguay', checked: false },
      { name: 'GHYREx.dll', type: 'DLL', year: '2024', country: 'Japan', checked: false },
      { name: 'TRFJEx.dll', type: 'DLL', year: '2023', country: 'Canada', checked: false },
      { name: 'BXCZEx.dll', type: 'DLL', year: '2023', country: 'Germany', checked: false },
      { name: 'MVPQEx.dll', type: 'DLL', year: '2023', country: 'Brazil', checked: false },
      { name: 'WYXKEx.dll', type: 'DLL', year: '2022', country: 'Spain', checked: true },
      { name: 'KJHGEx.dll', type: 'DLL', year: '2022', country: 'Mexico', checked: false },
      { name: 'ZPLDEx.dll', type: 'DLL', year: '2022', country: 'Argentina', checked: false },
      { name: 'DFGVEx.dll', type: 'DLL', year: '2021', country: 'Chile', checked: false },
      { name: 'VBNMEx.exe', type: 'EXE', year: '2021', country: 'France', checked: false },
      { name: 'LKJHEx.exe', type: 'EXE', year: '2021', country: 'UK', checked: false },
      { name: 'QWEREx.exe', type: 'EXE', year: '2020', country: 'USA', checked: false },
      { name: 'UIOPEx.exe', type: 'EXE', year: '2020', country: 'Italy', checked: true },
      { name: 'ASDFEx.exe', type: 'EXE', year: '2020', country: 'Germany', checked: false },
      { name: 'ZXCVEx.exe', type: 'EXE', year: '2019', country: 'Spain', checked: false },
      { name: 'POIUEx.exe', type: 'EXE', year: '2019', country: 'Japan', checked: false },
      { name: 'MNBVEx.exe', type: 'EXE', year: '2019', country: 'Brazil', checked: false },
      { name: 'TYUIEx.exe', type: 'EXE', year: '2018', country: 'Argentina', checked: false },
      { name: 'QAZWEx.exe', type: 'EXE', year: '2018', country: 'Chile', checked: false },
      { name: 'EDCREx.exe', type: 'EXE', year: '2018', country: 'Canada', checked: false },
      { name: 'FVGBEx.exe', type: 'EXE', year: '2017', country: 'Uruguay', checked: false },
    ];

  return {
    props: {
      ...args,
      logoUrl,
      action,
      input_size,
      button_variant,
      text_variant,
      button_size,
      iconSize,
      radius,
      open,
      smallIconSize,
      density,
      success,
      tableDense,
      drawerPrimary,
      itemsUser,
      items,
      columnDef,
      rows,
      paginatedRows: rows.slice(0, 5),
      paginationInfo: {
        page: 1,
        itemsByPage: 5,
        total: rows.length,
      },
    },
  }
};

const tsContent = DataUploadsComponent;
const htmlContent = require('../data-uploads/data-uploads.component.html') as HTMLAllCollection;

const DOC = `
/** data-pattern.component.html **/

${htmlContent['default']}

/** end of html code **/

/** data-pattern.component.ts **/

${tsContent}

/** end of ts code **/

`;

Data.parameters = {
  docs: {
    source: {
      code: DOC,
    },
  },
};
