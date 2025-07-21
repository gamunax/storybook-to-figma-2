import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IconSizes, PaginationInfo } from 'atlas-cdk';
import { ColumnDef } from 'atlas-table';

@Component({
  selector: 'table-playground',
  templateUrl: './table-playground.component.html',
  styleUrls: ['./table-playground.component.scss'],
})
export class TablePlayground {
  expandedAll = false;
  iconSize = IconSizes.xsmall;
  public columnDef1: ColumnDef[] = [
    {
      fieldKey: 'age',
      displayLabel: 'age',
      sortable: true,
    },
    {
      fieldKey: 'name',
      displayLabel: 'name',
      sortable: true,
    },
    {
      fieldKey: 'birthplace',
      displayLabel: 'birthplace',
      sortable: true,
    },
    {
      fieldKey: 'cars',
      displayLabel: 'cars',
      sortable: false,
    },
    {
      fieldKey: 'f',
      displayLabel: 'f',
      sortable: false,
    },
  ];
  public rows = [
    {
      age: '1',
      name: 'Kevin',
      birthplace: 'New York',
      cars: 'Ford',
      f: 'f',
    },
    {
      age: '12',
      name: 'Helen',
      birthplace: 'California',
      cars: 'Infiniti',
      f: 'k',
    },
    {
      age: '35',
      name: 'Matt',
      birthplace: 'Florida',
      cars: 'Toyota',
      f: 'p',
    },
    {
      age: '42',
      name: 'Robert',
      birthplace: 'Connecticut',
      cars: 'Subaru',
      f: 'u',
    },
  ];


  columnDef2: ColumnDef[] = [
    {
      displayLabel: 'Age',
      fieldKey: 'age',
      sortable: false,
    },
    {
      displayLabel: 'User',
      fieldKey: 'user',
      sortable: true,
    },
    {
      displayLabel: 'City',
      fieldKey: 'city',
      sortable: true,
    },
    {
      displayLabel: 'Details',
      fieldKey: 'detail',
      sortable: false,
    },
    {
      displayLabel: 'Action',
      fieldKey: 'action',
      sortable: false,
    },
  ];

  rows2 = [
    { age: 25, user: 'Alice', city: 'NY', detail: 'Alice is a software engineer.', action: true },
    { age: 30, user: 'Bob', city: 'LA', detail: 'Bob loves hiking and photography.', action: false },
  ];
  expandedRowIndexes: Set<number> = new Set();

  toggleRowAccordion(index: number) {
    console.log('index=', index);
    if (this.expandedRowIndexes.has(index)) {
      this.expandedRowIndexes.delete(index);
    } else {
      this.expandedRowIndexes.add(index);
    }
  }
  
}
