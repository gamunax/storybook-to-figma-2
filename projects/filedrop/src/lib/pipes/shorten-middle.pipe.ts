import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenMiddle'
})
export class ShortenMiddlePipe implements PipeTransform {
  transform(value: string, maxLength: number = 30): string {
    if (!value || value.length <= maxLength) return value;

    const extMatch = value.match(/\.[^\.]+$/);
    const ext = extMatch ? extMatch[0] : '';
    const base = value.slice(0, value.length - ext.length);

    const keep = maxLength - ext.length - 3; // 3 for "..."
    const start = base.slice(0, Math.ceil(keep / 2));
    const end = base.slice(-Math.floor(keep / 2));

    return `${start}...${end}${ext}`;
  }
}