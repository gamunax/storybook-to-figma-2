import { Injectable } from '@angular/core';
import { Actions } from 'atlas-cdk';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: "root",
})
/**
 * A class helper to obtain the number
 * of elements in the projected child components
 */ 
export class TabsService {
  private itemIndex: number;

  private totalItemsSource = new BehaviorSubject<number>(0);
  public totalItems$ = this.totalItemsSource.asObservable();

  private completedItemsSource = new BehaviorSubject<boolean>(false);
  public completedItems$ = this.completedItemsSource.asObservable();

  private actionSource = new BehaviorSubject<Actions>(Actions.default);
  public action$ = this.actionSource.asObservable();

  private indexSelectionSource = new BehaviorSubject<number>(0);
  public indexSelection$ = this.indexSelectionSource.asObservable();

  constructor() {
    this.itemIndex = 0;
  }

  /**
   * Set the total number of items
   * @param totalItems number of items projected 
   */
  setTotalItems(totalItems: number): void {
    this.totalItemsSource.next(totalItems);
  }

  /**
   * Set if the component items are collapsible
   * @param value 
   */
  setCompleted(value: boolean, index: number): void {
    // this.completedItemsSource.next(value);
  }

   /**
   * Select the selected index
   * @param action
   */
    setIndexSelected(index): void {
      this.indexSelectionSource.next(index);
    }

  /**
   * Select the action color of the button
   * @param action
   */
   setAction(action: Actions): void {
    // this.actionSource.next(action);
  }
 
  /**
   * Return the index of Stepper items 
   * @returns the index number
   */
  getItemIndex(): number {
    this.itemIndex += 1;
    return this.itemIndex;
  }
}
