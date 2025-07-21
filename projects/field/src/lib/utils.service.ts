import { Injectable } from '@angular/core';
import { Actions } from 'atlas-cdk';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private currentAction: Actions | undefined = undefined;
  private actionSource = new BehaviorSubject<Actions>(Actions.default);
  private elementSource = new BehaviorSubject<string>('text');
  public selectedAction$ = this.actionSource.asObservable();
  public selectedTypeofElem$ = this.elementSource.asObservable();

  constructor() { }

  /** @internal */
  setAction(action: Actions): void {
      this.currentAction = action;
      this.actionSource.next(this.currentAction);
  }   

  /** @internal */
  setTypeofElem(type: string): void {
      this.elementSource.next(type);
  }   
}
