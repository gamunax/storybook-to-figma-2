import { Component, OnInit } from '@angular/core';
import { ColumnDef } from 'atlas-table';

@Component({
  selector: 'qa-tabs',
  templateUrl: './qa-table.component.html',
  styleUrls: ['./qa-table.component.scss']
})
export class QaTableComponent implements OnInit {

  constructor() { }

  columns: ColumnDef[] = [
    {
      displayLabel: 'Age',
      fieldKey: 'age',
      sortable: true
    },
    {
      displayLabel: 'Name',
      fieldKey: 'name',
      sortable: true
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
    }
  ]

  public rows = [
    {
      age: '1',
      name: 'Kevin',
      birthplace: 'New York',
      cars: 'Ford',
      id: 'row1',
      selected: false
    },
    {
      age: '12',
      name: 'Helen',
      birthplace: 'California',
      cars: 'Infiniti',
      id: 'row2',
      selected: true
    },
    {
      age: '35',
      name: 'Matt',
      birthplace: 'Florida',
      cars: 'Toyota',
      selected: false,
      id: 'row3'
    },
    {
      age: '42',
      name: 'Robert',
      birthplace: 'Connecticut',
      cars: 'Subaru',
      selected: false,
      id: 'row4'
    }
  ]

  ngOnInit(): void {
  }

}
