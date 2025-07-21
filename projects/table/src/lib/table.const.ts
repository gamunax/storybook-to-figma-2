export enum TableColumnAlignment {
    left = 'left',
    right = 'right',
  }
  
  export enum TableSortDirections {
    initial = 'initial',
    ascending = 'asc',
    descending = 'desc',
  }
  
  export interface ColumnDef {
    fieldKey: string;
    displayLabel?: string;
    align?: TableColumnAlignment;
    sortable?: | Sortable | boolean;
  }
  
  export interface Sortable {
    direction: 'asc' | 'desc' | undefined;
    sortOnLoad?: boolean;
  }