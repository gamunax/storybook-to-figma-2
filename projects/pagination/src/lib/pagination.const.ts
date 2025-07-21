export interface PaginationInfo {
  page: number;
  itemsByPage: number;
  total: number;
}

export enum PaginationSizings {
  small = 'small',
  medium = 'medium',
  large = 'large',
  xlarge = 'xlarge',
}

export enum PaginationVariants {
  outlined = 'outlined',
  text = 'text',  
}

export enum PaginationRadius { 
  round = 'round',
  rounded = 'rounded'
}