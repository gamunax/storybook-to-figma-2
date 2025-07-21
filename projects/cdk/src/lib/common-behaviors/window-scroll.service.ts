import {
  Injectable,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HaloWindowScrollService {
  scrollObservable$: any;

  constructor() {
    this.scrollObservable$ = fromEvent(window, 'scroll');
  }
}
