import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private denseStateSource = new BehaviorSubject<boolean>(false);
  public dense$ = this.denseStateSource.asObservable();
  
  constructor() { }

  setDense(value: boolean): void {
    this.denseStateSource.next(value);
  }
}
