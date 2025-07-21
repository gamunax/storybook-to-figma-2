import {
  Injectable,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HaloWindowClickService {
  clickObservable$: any;

  constructor() {
    this.clickObservable$ = fromEvent(window, 'click');
  }
}
