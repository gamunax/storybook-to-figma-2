// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { BADGES } from '.storybook/constants';
import { Story, Meta } from '@storybook/angular';
import {
  TableBodyComponent,
  TableCellComponent,
  TableComponent,
  TableHeaderCellComponent,
  TableHeaderComponent,
  TableModule,
  TableRowComponent,
} from 'atlas-table';
import { CdkModule, SortPipe } from 'atlas-cdk';
import { IconButtonComponent } from 'atlas-button';
import { IconComponent } from 'atlas-icon';
import { ButtonModule } from 'atlas-button';

export default {
  title: 'Adopters/Components/Table',
  component: TableComponent,
  subcomponents: { IconButtonComponent, IconComponent },
  argTypes: {
    dense: {
      control: 'boolean',
      description: 'Toggles dense mode for the table, reducing row and cell padding.',
    },
    /*headerBackground: {
      control: 'boolean',
      description: 'Toggles a background color for the table header.',
    },
    highlightSortedHeader: {
      control: 'boolean',
      description: 'Highlights the header cell of the currently sorted column.',
    },
    striped: {
      control: 'boolean',
      description: 'Applies striped background to table body rows.',
    },
    tableContainer: {
      control: 'boolean',
      description: 'Adds container styling to the table body.',
    },
    footerBackground: {
      control: 'boolean',
      description: 'Toggles a background color for the table footer.',
    },*/
    headerCellType: {
      control: 'text',
      description: 'CSS class for header cell typography.',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'right', 'center'],
      description: 'Alignment of cell and header content.',
    },
    iconColor: {
      control: 'text',
      description: 'Color of the sort icon in header cells.',
    },
    iconSize: {
      control: { type: 'select' },
      options: ['xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'],
      defaultValue: 'small',
      description: 'Size of the sort icon in header cells.',
    },
    icon: {
      control: 'text',
      description: 'Icon name for the sort icon in header cells.',
    },
    collection: {
      control: 'text',
      description: 'Icon collection for the sort icon in header cells.',
    },
    cellType: {
      control: 'text',
      description: 'CSS class for body cell typography.',
    },
    border: {
      control: 'boolean',
      description: 'Toggles border for table rows.',
    },
    isSelected: {
      control: 'boolean',
      description: 'Marks the row as selected (applies selected styling).',
    },
    highlightSortedHeader: {
      control: 'boolean',
      description: 'Highlights the header cell of the currently sorted column.',
    },
  },
  args: {
    dense: false,
    /*headerBackground: false,
    striped: false,
    tableContainer: false,
    footerBackground: false,*/
    highlightSortedHeader: false,
    headerCellType: 'typographyStyles-label-mediumAlt',
    align: 'center',
    iconColor: 'default',
    iconSize: 'xsmall',
    icon: 'arrow-up',
    collection: 'arrows',
    cellType: 'typographyStyles-body-small',
    border: true,
    isSelected: false,
  },
  parameters: {
    badges: [BADGES.ALPHA],
  },
} as Meta;

const TableTemplate = `
<atlas-table [dense]="dense">
  <thead atlas-table-header #header [highlightSortedHeader]="highlightSortedHeader">
    <tr atlas-table-row>
      <th
        atlas-table-header-cell
        *ngFor="let col of columnDef"
        [columnDef]="col"
        [headerCellType]="headerCellType"
        [align]="align"
        [iconColor]="iconColor"
        [iconSize]="iconSize"
        [icon]="icon"
        [collection]="collection"
      >
        {{ col.displayLabel }}
      </th>
    </tr>
  </thead>
  <tbody atlas-table-body>
    <tr atlas-table-row *ngFor="let row of rows | sort:header.sortOption" [border]="border" [isSelected]="isSelected">
      <td atlas-table-cell [cellType]="cellType" [align]="align">
        {{ row.age }}
      </td>
      <td atlas-table-cell [cellType]="cellType" [align]="align">
        {{ row.name }}
      </td>
      <td atlas-table-cell [cellType]="cellType" [align]="align">
        {{ row.birthplace }}
      </td>
      <td atlas-table-cell [cellType]="cellType" [align]="align">
        {{ row.cars }}
      </td>
      <td atlas-table-cell [cellType]="cellType" [align]="align">
        {{ row.f }}
      </td>
    </tr>
  </tbody>
  <tfoot atlas-table-footer [footerBackground]="footerBackground">
    <tr atlas-table-row>
      <td atlas-table-cell colspan="5">Footer Example</td>
    </tr>
  </tfoot>
</atlas-table>
`;
const TableTemplate2 = `
  <atlas-table>
    <thead atlas-table-header #header2 [highlightSortedHeader]="highlightSortedHeader">
      <tr atlas-table-row>
        <th atlas-table-header-cell>
        </th>
        <th atlas-table-header-cell [headerCellType]="headerCellType" *ngFor="let col of columnDef2" [columnDef]="col" [collection]="'arrows'" [icon]="'arrow-up'"
        [iconSize]="iconSize">
          {{ col.displayLabel }}
        </th>
      </tr>
    </thead>
    <tbody atlas-table-body>
      <ng-container *ngFor="let row of rows2 | sort : header2.sortOption; let i = index">
        <tr atlas-table-row>
          <td atlas-table-cell>
            <atlas-icon-button (onClick)="toggleRowAccordion(i)" [icon]="expandedRowIndexes.has(i) ? 'icon-chevron-up-24' : 'icon-chevron-down-24'"></atlas-icon-button>       
          </td>
          <td atlas-table-cell *ngFor="let col of columnDef2" [cellType]="cellType">
            <ng-container [ngSwitch]="col.fieldKey">
              <atlas-checkbox
                *ngSwitchCase="'action'"
                [isChecked]="row[col.fieldKey]"
                (checkedChange)="row[col.fieldKey] = $event"
              ></atlas-checkbox>
              <span *ngSwitchDefault>
                {{ row[col.fieldKey] }}
              </span>
            </ng-container>
          </td>
        </tr>
        <tr *ngIf="expandedRowIndexes.has(i)">
          <td [attr.colspan]="columnDef2.length + 1" style="padding: 0; background: transparent; border: none">
            <atlas-table>
              <thead atlas-table-header>
                <tr atlas-table-row>
                  <th>
                    subcolumn1
                  </th>
                  <th>
                    subcolumn2
                  </th>
                </tr>
              </thead>
              <tbody atlas-table-body>
                <tr atlas-table-row>
                  <td atlas-table-cell>Data 1A</td>
                  <td atlas-table-cell>Data 1B</td>
                </tr>
                <tr atlas-table-row>
                  <td atlas-table-cell>Data 2A</td>
                  <td atlas-table-cell>Data 2B</td>
                </tr>
              </tbody>
            </atlas-table>
          </td>
        </tr>
      </ng-container>
    </tbody>
  </atlas-table>
`;

const Template: Story<TableComponent> = (args: TableComponent) => ({
  props: args,
  moduleMetadata: {
    imports: [TableModule, CdkModule],
  },
  template: TableTemplate,
});
const Template2: Story<TableComponent> = (args: TableComponent) => ({
  props: {
    ...args,
    expandedRowIndexes: new Set(),
    toggleRowAccordion(i: number) {
      if (this.expandedRowIndexes.has(i)) {
        this.expandedRowIndexes.delete(i);
      } else {
        this.expandedRowIndexes.add(i);
      }
    },
  },
  moduleMetadata: {
    imports: [TableModule, CdkModule, ButtonModule],
  },
  template: TableTemplate2,
});

export const Standard = Template.bind({});
Standard.args = {
  columnDef: [
    {
      displayLabel: 'Age',
      fieldKey: 'age',
      sortable: true,
    },
    {
      displayLabel: 'Name',
      fieldKey: 'name',
      sortable: true,
    },
    {
      displayLabel: 'Birthplace',
      fieldKey: 'birthplace',
      sortable: true,
    },
    {
      displayLabel: 'Cars',
      fieldKey: 'cars',
      sortable: false,
    },
  ],
  rows: [
    {
      age: '1',
      name: 'Kevin',
      birthplace: 'New York',
      cars: 'Ford',
    },
    {
      age: '12',
      name: 'Helen',
      birthplace: 'California',
      cars: 'Infiniti',
    },
    {
      age: '35',
      name: 'Matt',
      birthplace: 'Florida',
      cars: 'Toyota',
      selected: true,
    },
    {
      age: '42',
      name: 'Robert',
      birthplace: 'Connecticut',
      cars: 'Subaru',
    },
  ],
};

Standard.parameters = {
  docs: {
    source: {
      code: TableTemplate,
    },
  },
};

export const TableExample = Template2.bind({});
TableExample.args = {
  columnDef2: [
    {
      displayLabel: 'Age',
      fieldKey: 'age',
      sortable: true,
    },
    {
      displayLabel: 'Name',
      fieldKey: 'name',
      sortable: true,
    },
    {
      displayLabel: 'Birthplace',
      fieldKey: 'birthplace',
      sortable: true,
    },
    {
      displayLabel: 'Cars',
      fieldKey: 'cars',
      sortable: false,
    },
  ],
  rows2: [
    {
      age: '1',
      name: 'Kevin',
      birthplace: 'New York',
      cars: 'Ford',
    },
    {
      age: '12',
      name: 'Helen',
      birthplace: 'California',
      cars: 'Infiniti',
    },
    {
      age: '35',
      name: 'Matt',
      birthplace: 'Florida',
      cars: 'Toyota',
      selected: true,
    },
    {
      age: '42',
      name: 'Robert',
      birthplace: 'Connecticut',
      cars: 'Subaru',
    },
  ],
};

TableExample.parameters = {
  docs: {
    source: {
      code: TableTemplate2,
    },
    description: {
      story: `
        This is an example of a table with a row expansion logic. Copy this for TS file:
        const expandedRowIndexes = new Set&lt;number&gt;();
        function toggleRowAccordion(i: number) {
          if (expandedRowIndexes.has(i)) {
            expandedRowIndexes.delete(i);
          } else {
            expandedRowIndexes.add(i);
          }
        }
      `,
    },
  },
};
