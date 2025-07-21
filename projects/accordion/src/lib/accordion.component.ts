import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  QueryList,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ThemingService, BoxShadows } from "atlas-cdk";
import { config } from './accordion.theming';


/**
 * @ignore
 */
 @Component({
  selector: 'atlas-accordion-heading',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionHeadingComponent { }

/**
 * @ignore
 */
 @Component({
  selector: 'atlas-accordion-subheading',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionSubHeadingComponent { }

/**
 * @ignore
 */
 @Component({
  selector: 'atlas-accordion-expand',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionExpandComponent { }

/**
 * @ignore
 */
@Component({
  selector: 'atlas-accordion-content',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionContentComponent { }

/**
 * The accordion item is use as part of the accordion component, can be used as a single element too.
 */
@Component({
  selector: 'atlas-accordion-item',
  template: `
    <div [class]="['atlas-accordion-item', typographyClass]"
    [class.atlas-accordion-item-disabled]="disabled"
    >
      <div [ngClass]="['atlas-accordion-item-head', 'padding-y-4', 'padding-x-8']">
          <div #accordionHeading [class.atlas-accordion-item-heading]="!disabled">
            <ng-content select="atlas-accordion-heading"></ng-content>
          </div>
          <div #accordionSubHeading [class.atlas-accordion-item-subheading]="!disabled">
              <ng-content select="atlas-accordion-subheading"></ng-content>
          </div>
          <div class="atlas-accordion-item-icon-alignment"
            [class.atlas-accordion-item-icon-container]="!disabled" 
            [class.atlas-accordion-item-icon-container-disabled]="disabled" 
            (click)="switchExpanded(!this.expanded)">
            <ng-content select="atlas-accordion-expand"></ng-content>
          </div>
      </div>

      <div #accordionContent 
          *ngIf="expanded"
          [ngClass]="['atlas-accordion-item-content']"
          [class.atlas-accordion-item-content-disabled]="disabled">
        <ng-content select="atlas-accordion-content"></ng-content>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent implements OnChanges {
  /**
   * @internal
   * Used to determine if any children exists from ng-content
   */
  @ContentChildren(AccordionHeadingComponent, {descendants: true}) _accordionHeadingChildren: QueryList<AccordionHeadingComponent> | undefined;
  
  /**
   * @internal
   * Used to determine if any children exists from ng-content
   */
  @ContentChildren(AccordionSubHeadingComponent, {descendants: true}) _accordionSubHeadingChildren: QueryList<AccordionSubHeadingComponent> | undefined;
  
  /**
   * @internal
   */
  @ContentChildren(AccordionContentComponent, {descendants: true}) _accordionContentChildren: QueryList<AccordionContentComponent> | undefined;

  /**
   * @internal
   */
  @ContentChildren(AccordionExpandComponent, {descendants: true}) _accordionExpandChildren: QueryList<AccordionExpandComponent> | undefined;

  /** Set disabled state of accordion */
  @Input() disabled: boolean = false;

  /** Set typography of accordion */
  @Input() typographyClass: string = 'typographyStyles-body-medium';

  /**
   * Sets if accordion item is expanded or not.
   */
  @Input() expanded: boolean = false;

  /**
   * Emits on expand.
   */
  @Output() onExpand: EventEmitter<any> = new EventEmitter();


 

  constructor(
    private themingService: ThemingService,
    private _changeDetectorRef: ChangeDetectorRef) {
    this.themingService.applyConfig(config);
  }

  /**
   * @internal
   */
  ngOnChanges(changes: SimpleChanges): void {
    this._changeDetectorRef.detectChanges();
  }

  /** 
   * Method used to expand or not the accordion item.
  */
  switchExpanded (value) {
   this.expanded = value;
   this.onExpand.emit(value);
   this._changeDetectorRef.detectChanges();  
  }
  
}

/**
 * The accordion consists of two regions. One is displayed when the component loads and the other is hidden until an interaction occurs. 
 */
 @Component({
  selector: 'atlas-accordion',
  template: `<div [class]="['atlas-accordion-group', 'box-shadow-elevation-' + elevation]" *ngIf="_accordionItemChildren.length > 0">
              <ng-content select="atlas-accordion-item"></ng-content>
             </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements AfterContentInit, OnChanges {

  /** Expand all the accordion items */
  @Input() expandedAll: boolean = false;

  /** Shadow elevation of the accordion group */
  @Input() elevation = BoxShadows.flat;

  /**
   * @internal
   */
  @ContentChildren(AccordionItemComponent, {descendants: true}) _accordionItemChildren: QueryList<AccordionItemComponent> | undefined;

  constructor( private _changeDetectorRef: ChangeDetectorRef ) {}

  /** @internal */
  ngAfterContentInit() {
    if(this.expandedAll) {
      this.expandAll()
    } 
    this._changeDetectorRef.detectChanges();
  }

  /** @internal */
  ngOnChanges(changes) {
    if(changes.expandedAll?.currentValue && !changes.expandedAll.firstChange){
      this.expandAll();
    } else {
      this.collapseAll();
    }
  }

  /**
   * Used to expand all items in the accordion
  */
  expandAll() {
    this._accordionItemChildren?.forEach(child => child.switchExpanded(true));
    this._changeDetectorRef.detectChanges();
    
  }

   /**
   * Used to collapse all items in the accordion
  */
  collapseAll() {
    this._accordionItemChildren?.forEach(child => child.switchExpanded(false));
  }

 }
