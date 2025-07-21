import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})

export class SortPipe implements PipeTransform {

  transform(value: Array<any>, ...args: any[]): Array<any> {
    let sortedValue: Array<any> = value;

    if (sortedValue !== null && args[0].direction !== 'initial') {
      if (args[0].direction === 'asc') {
        sortedValue = value.sort((a, b) => {
          if (a[args[0].field] > b[args[0].field]) {
            return 1;
          }
          if (a[args[0].field] < b[args[0].field]) {
            return -1;
          }
          return 0;
        });
      } else {
        sortedValue = value.sort((a, b) => {
          if (a[args[0].field] < b[args[0].field]) {
            return 1;
          }
          if (a[args[0].field] > b[args[0].field]) {
            return -1;
          }
          return 0;
        });
      }
    }

    return sortedValue;
  }
}
