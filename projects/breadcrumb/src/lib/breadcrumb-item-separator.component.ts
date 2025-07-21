import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Actions } from 'atlas-cdk';
import { Subscription } from 'rxjs';

import { BreadcrumbService } from './breadcrumb.service';

@Component({
  selector: 'atlas-breadcrumb-item-separator',
  template: `
    <div
      *ngIf="isFirstItem || !isLastItem"
      [ngClass]="[
      'atlas-breadcrumb-item-separator',
      'atlas-breadcrumb-item-separator-'+action,
      customClass
    ]"
    >
      <ng-content></ng-content>           
    </div>        
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbItemSeparatorComponent implements OnInit, OnDestroy {
  /** Create a custom class that gets added to the breadcrumb elem */
  @Input() customClass?: string = '';

  /** @internal */
  index: number = 0;
  /** @internal */
  isFirstItem: boolean = false;
  /** @internal */
  isLastItem: boolean = false;
  /** @internal */
  action: Actions = Actions.default;
  private subscriptions: Subscription = new Subscription();

  constructor(
    private _breadcrumbService: BreadcrumbService,
    private _changeDetectorRef: ChangeDetectorRef) {
    this.index = this._breadcrumbService.getSeparatorIndex();
  }

  /** 
   * @internal
   * Used to listen for state changes
   */
  ngOnInit(): void {
    this.subscriptions.add(
      this._breadcrumbService.totalItems$.subscribe((countTotalItems) => {
        this.isFirstItem = this.index === 1;
        this.isLastItem = this.index === countTotalItems;
        this._changeDetectorRef.detectChanges();
      })
    );

    this.subscriptions.add(
      this._breadcrumbService.collapsedItems$.subscribe(() => {
        this._changeDetectorRef.detectChanges();
      })
    );

    this.subscriptions.add(
      this._breadcrumbService.action$.subscribe((action) => {
        this.action = action;
        this._changeDetectorRef.detectChanges();
      })
    );
  }

  /** 
   * @internal 
   * Destroy all subscriptions
  */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
