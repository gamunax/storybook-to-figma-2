import { Injectable } from '@angular/core';
import { Actions } from 'atlas-cdk';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  private separatorIndex: number = 0;
  private itemIndex: number = 0;

  private totalItemsSource = new BehaviorSubject<number>(0);
  public totalItems$ = this.totalItemsSource.asObservable();

  private collapsedItemsSource = new BehaviorSubject<boolean>(false);
  public collapsedItems$ = this.collapsedItemsSource.asObservable();

  private actionSource = new BehaviorSubject<Actions>(Actions.default);
  public action$ = this.actionSource.asObservable();

  /**
   * Set the total number of items
   * @param totalItems number of items projected 
   */
  setTotalItems(totalItems: number): void {
    this.itemIndex = 0;
    this.separatorIndex = 0;
    this.totalItemsSource.next(totalItems);
  }

  /**
   * Set if the component items are collapsible
   * @param value 
   */
  setCollapsed(value: boolean): void {
    this.collapsedItemsSource.next(value);
  }

  /**
   * Select the action color of the button
   * @param action
   */
  setAction(action: Actions): void {
    this.actionSource.next(action);
  }

  /**
   * Return the index of breadcrumb separator
   * @returns the index number
   */
  getSeparatorIndex(): number {
    this.separatorIndex += 1;
    return this.separatorIndex;
  }

  /**
   * Return the index of breadcrumb items 
   * @returns the index number
   */
  getItemIndex(): number {
    this.itemIndex += 1;
    return this.itemIndex;
  }
}
