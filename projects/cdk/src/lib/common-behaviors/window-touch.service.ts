import {
  Injectable,
} from '@angular/core';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HaloWindowTouchService {
  touchstartObservable$: any;
  touchmoveObservable$: any;
  touchendObservable$: any;

  constructor() {
    this.touchstartObservable$ = fromEvent(window, 'touchstart');
    this.touchmoveObservable$ = fromEvent(window, 'touchmove');
    this.touchendObservable$ = fromEvent(window, 'touchend');
  }
}
