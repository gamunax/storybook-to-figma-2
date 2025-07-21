import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ViewChildren,
  ViewChild,
  HostListener,
} from '@angular/core';
import { Subscription, zip } from 'rxjs';
import { Actions, HaloWindowResizeService, ThemingService, TabVariants, Colors } from 'atlas-cdk';
import { config } from './tabs.theming';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'atlas-tab-label',
})
export class TabLabelDirective {
}
/**
 * @ignore
 */
@Component({
  selector: 'atlas-tab-content',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabContentComponent {
  @ContentChild(TemplateRef) template: TemplateRef<any>;
}
/**
 * Tab-group can be used to split multiple tabs to present a swappable interface for a user in an application.
 */
@Component({
  selector: 'atlas-tab-group',
  templateUrl: 'tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabGroupComponent implements AfterViewInit, OnChanges, OnDestroy {
  /** Use to set the overflow dropdown's max-height */
  @Input() overflowDropdownMaxHeight = '350';
  
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead. 
   * Set the action of the tabs 
   */
  @Input() action: Actions;

  /*
   * Set the color of the tabs 
  */
  @Input() color: Colors = Colors.brand;

  /** Set the variant of the tabs */
  @Input() variant: TabVariants = TabVariants.empty;

  /** Use to fill the width of the viewport with the tab labels and take up equal amounts of space across.  */
  @Input() fullWidth = true;

  /** Use to center the tabs in the viewport */
  @Input() centered = true;

  /** Use to add a side-scroller to tabs when tab labels overflow.  */
  @Input() useSideScroll = false;

  /** Set the min width to help with side scroll in pixels */
  @Input() labelMinWidth = '100';

  /** Collapse overflowing tabs to a dropdown */
  @Input() handleOverflow = false;

  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `scrollArrowColor` instead.
   * Set the action of the scroll icons 
  */
  @Input() scrollArrowAction: Actions;

  /** Set the action of the scroll icons */
  @Input() scrollArrowColor: Colors = Colors.brand

  /** Use this to prevent tab switching */
  @Input() tabSwitch: (index: number) => boolean;

  /** Set the event emitted when the tab changes */
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /** Use this to emit changes when the selected index changes */
  @Output() selectedIndexChange = new EventEmitter<number>();

  /** @internal */
  @ContentChildren(forwardRef(() => TabComponent)) tabs: QueryList<TabComponent>;
  /**
   *
   * @internal
   */
  @ViewChildren('_hiddenTabs') _hiddenTabs: QueryList<ElementRef>;
  /**
   *
   * @internal
   */
  @ViewChild('_labelContainer') _labelContainer: ElementRef;
  /**
   *
   * @internal
   */
  @ViewChild('_moreButton') _moreButton: ElementRef;
  /**
   *
   * @internal
   */
  @ViewChild('scrollContainer') scrollContainer: ElementRef;

  /** scrollContainer is overflowing */
  isOverflow: boolean;

  /** Active tab index */
  activeTabIndex = 0;

  /** Active tab*/
  activeTab: TabComponent;

  /** Active tab deleted */
  activeTabDeleted = false;

  /** Count of deleted tabs  */
  tabsDeletedCount = 0;

  /** Delay time to destroy the change of the tab */
  tabDestroyDelay: any;

  /** @internal */
  _visibleTabs = 0;
  private _isViewInit = false;
  private _subscription: Subscription = new Subscription();
  private _overflowSubscription?: Subscription;
  private _overflowAnimationFrame: any;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _resize: HaloWindowResizeService,
    private themingService: ThemingService,
  ) { 
    this.themingService.applyConfig(config);
    this.checkOverflow();
  }

  /** Set the selected index of the tab */
  @Input()
  set selectedIndex(value: number) {
    this.activeTabIndex = value;
    this.selectTab();
  }
  get selectedIndex(): number {
    return this.activeTabIndex;
  }

  get showMenu() {
    if (!this.handleOverflow) {
      return false;
    }
    return this._visibleTabs < this.tabs.length;
  }

  ngAfterViewInit() {
    this._isViewInit = true;
    this.selectTab();
    this.checkOverflow();
    this._subscription.add(this.tabs.changes.subscribe(this._cdr.detectChanges.bind(this._cdr)));
    this._cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.handleOverflow) {
      this._destroyOverflowSubscription();
      if (changes.handleOverflow.currentValue) {
        this._initOverflowSubscription();
      }
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
    this._destroyOverflowSubscription();
    cancelAnimationFrame(this._overflowAnimationFrame);
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkOverflow();
  }

  /** This method is used by the left and right arrows to scroll the tabs when useSideScroll is true */
  scrollTabs(direction: 'left' | 'right'): void {
    const scrollAmount = Number(this.labelMinWidth); // Convert scrollAmount to a number
    const scrollOptions = {
      left: direction === 'left' ? -scrollAmount : 0,
      top: 0,
      behavior: 'smooth'
    };

    if (direction === 'right') {
      scrollOptions.left = scrollAmount;
    }

    this.scrollContainer.nativeElement.scrollBy(scrollOptions);
  }

  checkOverflow(): boolean {
    if (this.scrollContainer && this.scrollContainer.nativeElement) {
      this.isOverflow = this.scrollContainer.nativeElement.scrollWidth > this.scrollContainer.nativeElement.clientWidth;
    } else {
      this.isOverflow = false;
    }
    return this.isOverflow;

  }

  /** This method is used to select the tab */
  selectTab(index = this.activeTabIndex) {
    if (this._isViewInit) {
      if ((this.tabSwitch && !this.tabSwitch(index))) {
        return;
      }
      const tabArr = this.tabs?.toArray();
      const currTab = tabArr ? tabArr[index] : null;
      if (currTab && !(currTab.disabled)) {
        if (this.activeTab) {
          this.activeTab.hide();
        }
        this.activeTabIndex = index;
        this.activeTab = currTab;
        if (this.activeTab) {
          this.activeTab.show();
        }
        this.onChange.emit(true);
        this.selectedIndexChange.emit(this.activeTabIndex);
      }
    }
  }

  /** This method can be used to refresh visible tab count after external changes not cought by default listeners. */
  refresh() {
    if (!this.handleOverflow) {
      return;
    }
    const oldLength = this._visibleTabs;
    const labelBox = this._labelContainer.nativeElement.getBoundingClientRect();
    const moreBox = this._moreButton.nativeElement.getBoundingClientRect();
    if (this._calculateVisibleTabs(labelBox.right) === this.tabs.length) {
      this._visibleTabs = this.tabs.length;
    } else {
      this._visibleTabs = this._calculateVisibleTabs(labelBox.right - moreBox.width);
    }
    if (this._visibleTabs !== oldLength) {
      this._cdr.detectChanges();
    }
  }

  /** @internal */
  _shouldShowVisible(index: number): boolean {
    if (!this.handleOverflow) {
      return true;
    }
    return index < this._visibleTabs;
  }

  /** @internal */
  _shouldShowHidden(index: number): boolean {
    if (!this.handleOverflow) {
      return false;
    }
    return index >= this._visibleTabs;
  }

  private _initOverflowSubscription() {
    this._visibleTabs = this.tabs ? this.tabs.length : 0;
    this._overflowAnimationFrame = requestAnimationFrame(() => {
      this.refresh();
      if (this._hiddenTabs && typeof this._hiddenTabs.changes.subscribe === 'function') {
        this._subscription.add(zip(
          this._resize.resizeObservable$,
          this._hiddenTabs.changes
        ).subscribe(() => {
          this.refresh();
        }));
      }
    });
  }

  private _destroyOverflowSubscription() {
    this._visibleTabs = 0;
    if (this._overflowSubscription) {
      this._overflowSubscription.unsubscribe();
      delete this._overflowSubscription;
    }
  }

  private _calculateVisibleTabs(maxRight: number) {
    return this._hiddenTabs
      .map(x => x.nativeElement.getBoundingClientRect())
      .filter(x => x.right < maxRight)
      .length;
  }
}

/**
 * @ignore
 */
@Component({
  selector: 'atlas-tab',
  templateUrl: 'tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnDestroy {
  @Input() state: string;
  @ContentChild(TemplateRef) label: TemplateRef<TabLabelDirective>;
  @ContentChild(TabContentComponent) content: TabContentComponent;

  visible = false;
  private _isDisabled = false;

  @Input()
  set disabled(disabled: boolean) {
    this._isDisabled = disabled;
    // needed to reflect dynamic changes in disabled
    this._TabGroupComponent.selectTab();
  }
  get disabled(): boolean {
    return this._isDisabled;
  }

  constructor(
    public elementRef: ElementRef,
    private _cdr: ChangeDetectorRef,
    // tslint:disable-next-line
    @Inject(TabGroupComponent)
    private _TabGroupComponent: TabGroupComponent
  ) {
  }

  hide() {
    this.visible = false;
    this._cdr.markForCheck();
  }

  show() {
    this.visible = true;
    this._cdr.detectChanges();
  }

  ngOnDestroy() {
    this._cdr.detach();
    // Timeout is cleared each time to ensure it only runs on the final destroyed tab
    clearTimeout(this._TabGroupComponent.tabDestroyDelay);

    // if all tabs in group haven't been destroyed
    if (this._TabGroupComponent.tabs
      && this._TabGroupComponent.tabsDeletedCount < this._TabGroupComponent.tabs.toArray().length - 1) {
      // if the current tab being destroyed is also the active tab

      if (!this._TabGroupComponent.activeTab || this._TabGroupComponent.activeTab.elementRef === this.elementRef) {
        this._TabGroupComponent.activeTabDeleted = true;
      }
      this._TabGroupComponent.tabDestroyDelay = setTimeout(
        // On the final destroyed tab
        // if the active tab was deleted, select the first tab in new group, otherwise reselct the previously active tab in new group
        () => this._TabGroupComponent.activeTabDeleted ? this.findTab(0) : this.findTab(this._TabGroupComponent.activeTab)
      );
    }
    this._TabGroupComponent.tabsDeletedCount++;
  }

  private findTab(tab: number | TabComponent) {
    const newIndex = typeof tab === 'number'
      ? tab
      : this._TabGroupComponent.tabs.toArray().indexOf(tab);
    this._TabGroupComponent.selectTab(newIndex);
  }
}

