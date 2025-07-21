import { Pipe, PipeTransform, NgModule } from '@angular/core';

export function isArray(value: any): boolean {
    return Array.isArray(value);
  }

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform(input: any, character: string = ''): any {
    if (!isArray(input)) {
      return input;
    }

    return input.join(character);
  }
}
