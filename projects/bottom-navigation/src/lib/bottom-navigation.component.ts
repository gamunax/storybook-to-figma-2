
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnChanges, Output, QueryList, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ButtonVariants } from 'atlas-button';
import { Actions, ThemingService } from 'atlas-cdk';
import { config } from './bottom-navigation.theming';

@Component({
  selector: 'atlas-bottom-navigation-action',
  template: `
    <div class="bottom-nav-action" [class.bottom-nav-action-disabled]="disabled">
      <button class="bottom-nav-action-link" [disabled]="disabled" (click)="selectNavAction()">
        <ng-content></ng-content>
      </button>
    </div> 
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BottomNavigationActionComponent {
  /** Event triggered when the selected navigation link is clicked */
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  /** Set the disabled state for the navigation link */
  @Input() disabled: boolean = false;
  
  constructor(private cdr: ChangeDetectorRef){}

  /** @internal */
  selectNavAction() {
    this.onSelect.emit()
  }
}

/** 
 * The Bottom Navigation component is deprecated and will be removed in a future version.
 * Bottom navigation bars allow movement between primary destinations in an app. 
*/
@Component({
  selector: 'atlas-bottom-navigation',
  template: `
    <div [ngClass]="['bottom-nav']">
     <div #bottomNavigationActionContent class="bottom-nav-content" *ngIf="_bottomNavigationActionContentChildren.length > 0">
       <ng-content select="atlas-bottom-navigation-action"></ng-content>
     </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class BottomNavigationComponent  {
   /**
   * @internal
   * Used to determine if any children exists from ng-content
   */
    @ContentChildren(BottomNavigationActionComponent, {descendants: true}) _bottomNavigationActionContentChildren: QueryList<BottomNavigationActionComponent> | undefined;
   
  constructor(
    private themingService: ThemingService,
  ) {
    this.themingService.applyConfig(config);
    
  }
}

