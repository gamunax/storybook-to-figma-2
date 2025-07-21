import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  QueryList,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { Actions, Colors, ThemingService } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';

import { BreadcrumbItemComponent } from './breadcrumb-item.component';
import { BreadcrumbService } from './breadcrumb.service';
import { config } from './breadcrumb.theming';

@Component({
  selector: 'atlas-breadcrumb',
  template: `
    <div>
      <div #template>
        <ng-content></ng-content>                
      </div>
      <div class="atlas-breadcrumb" *ngIf="template.children.length == 0">
        <atlas-breadcrumb-item
          *ngFor="let item of breadcrumbs"
          [active]="item.active || item.lastElement"
          [disabled]="item.disabled"
          (onSelect)="onSelectedItem(item)"
          (onCollapsed)="onCollapsed(item)"
        >
          <a
            [routerLink]="[item.url]"
            [ngClass]="[
              'atlas-breadcrumb-link',
              typography,
              underline ? 'atlas-breadcrumb-item-link-underline-' + (action ? action : color) : 'atlas-breadcrumb-item-link-' + (action ? action : color),
              item.disabled ? 'atlas-breadcrumb-item--disabled': '',
            ]"  
          >
            <atlas-icon
              *ngIf="icon"
              [size]="iconSize"
              [icon]="icon"
              [collection]="iconCollection"
              [iconSheetUrl]="iconSheetUrl"
            ></atlas-icon>
            {{ item?.displayName ?? item?.label }}
          </a>
          <atlas-breadcrumb-item-separator *ngIf="!item.lastElement" >/</atlas-breadcrumb-item-separator>
          <atlas-icon class="atlas-breadcrumb-item-icon"
            *ngIf="iconSeparator && !item.lastElement" 
            [icon]="iconSeparator"
            [size]="iconSize"
            [collection]="iconSeparatorCollection"
            [iconSheetUrl]="iconSeparatorSheetUrl"
          ></atlas-icon>
        </atlas-breadcrumb-item>
      </div> 
    </div>
  `,  
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BreadcrumbComponent implements  OnChanges, AfterContentInit {
  /** Set the breadcrumb to collapsed state */
  @Input() collapsed: boolean = false;
  /** Create a custom class that gets added to the breadcrumb elem */
  @Input() customClass?: string = '';
  /** Wether to use or not the breadcrumb by router component. It allows to add a basic configuration and a breadcrumb list */
  /** Set the icon item */
  @Input() icon?: string;
  /** Set the icon collection */
  @Input() iconCollection?: string = 'system';
  /** Set the icon sheet url */
  @Input() iconSheetUrl?: string | undefined;
  /** Set the icon separator item */
  @Input() iconSeparator?: string;
  /** Set the icon separator collection */
  @Input() iconSeparatorCollection?: string = 'system';
  /** Set the icon separator sheet url */
  @Input() iconSeparatorSheetUrl?: string | undefined;
  /** Breadcrumb element list used for the "byRouter" option */
  @Input() breadcrumbs = [];
  /** Sizes of the icons for the "byRouter" option */
  @Input() iconSize = IconSizes.small;
  /**
   * @deprecated
   * This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   *   
   * Color action for link.
   */
  @Input() action: Actions;
  /** Color for link.*/
  @Input() color: Colors = Colors.brand;
  /** Typography for the link.*/
  @Input() typography: string = 'typographyStyles-body-medium';
  /** Set the underline style for the link */
  @Input() underline?:boolean = false;
  /** Emits when selects the item in the "byRouter" option */
  @Output() onSelectsItem = new EventEmitter();
  /** Emits when collapse the item in the "byRouter" option */
  @Output() onCollapseItem = new EventEmitter();
  /** 
   * @internal
   * Create a queryList to obtain breadcrumb items */
  @ContentChildren(BreadcrumbItemComponent, {descendants: true}) _fieldPrefixChildren?: QueryList<BreadcrumbItemComponent>;
  
  constructor(  
    private _breadcrumbService: BreadcrumbService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _themingService: ThemingService ) {
      this._themingService.applyConfig(config);
  }

  /**
   * @internal
   * Used to determine the number of children from ng-content
   */
  ngAfterContentInit(): void {
    const totalItems = this.breadcrumbs.length;
    this._breadcrumbService.setTotalItems(totalItems);

    if (totalItems < 3) {
      this._breadcrumbService.setCollapsed(false);
    }
  }
  
  /**
   * @internal
   * Used to determine if items are collapsing
   */
  ngOnChanges(changes: SimpleChanges): void {
    this._breadcrumbService.setCollapsed(this.collapsed);
    this._changeDetectorRef.detectChanges();
  }

  /** @internal */
  onSelectedItem(value): void {
    this.onSelectsItem.emit(value);
  }

  /** @internal */
  onCollapsed(value): void {
    this.onCollapseItem.emit(value);
  }
}
