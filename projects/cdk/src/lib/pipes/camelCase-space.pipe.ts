import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelspace'
})
export class CamelCaseSpacePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }
    return value
      .split(/(?=[A-Z])/)
      .map(word => word.trim())
      .join(' ');
  }
}
