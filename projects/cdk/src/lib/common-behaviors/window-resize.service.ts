import {
  Injectable,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HaloWindowResizeService {
  resizeObservable$: any;

  constructor() {
    this.resizeObservable$ = fromEvent(window, 'resize');
  }
}
