import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Subscription, BehaviorSubject } from 'rxjs';
import { processNavigationItems } from './app-nav.utilities';
import { AtlasLegacyNavigationItem, _AtlasLegacyNavigationItem, AtlasLegacyTieredNavigationItem, NavigationAllowedTargets, ShowHideState } from './app-nav-items.interfaces';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import { TooltipModule, TooltipPosition } from 'atlas-tooltip';
import { IconModule, IconSizes } from 'atlas-icon';
import { ButtonModule } from 'atlas-button';

@Component({
  selector: 'legacy-app-nav-horizontal-content',
  template: '<ng-content></ng-content>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavHorizontalContentComponent {
}

@Component({
  selector: 'legacy-app-nav-header-content',
  template: '<ng-content></ng-content>',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppNavHeaderContentComponent {
}

@Component({
  selector: 'legacy-app-nav',
  styleUrls: ['app-nav.component.scss'],
  templateUrl: 'app-nav.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, TooltipModule, IconModule, ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class AppNavComponent implements OnChanges, AfterViewInit, OnDestroy {
  /**
   * Top navigation items
   */
  @Input() topNavigation: AtlasLegacyNavigationItem[] | AtlasLegacyTieredNavigationItem[];
  /**
   * Bottom navigation items
   */
  @Input() bottomNavigation: AtlasLegacyNavigationItem[] | AtlasLegacyTieredNavigationItem[];
  /**
   * Top section link
   */
  @Input() sectionLinkNavigation: AtlasLegacyNavigationItem[] | AtlasLegacyTieredNavigationItem[];

  /**
   * Default link handling
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target}
   */
  @Input() defaultPathTarget: NavigationAllowedTargets = '_self';

  /**
   * Menu title text
   */
  @Input() menuTitle = 'Menu';

  /**
   * Section title text
   */
  @Input() sectionTitle = '';
  /**
   * App nav link text shown on hover in tooltip
   */
  @Input() iconTooltips = false;

  /**
   * Ignore automatic route detection and force showing app nav
   */
  @Input() forceState: ShowHideState | undefined;

  /**
   * Ignore automatic route detection and force hiding app nav
   */
  @Input() forceHide = false;

  /**
   * Set the navigation to vertical by default.
   */
  @Input() verticalNavigation = true;

  /**
   * Set the navigation to tierMode. This allows for collapsable multi level navigation.
   */
  @Input() tierMode = false;

  /**
   * @deprecated
   * Show the settings icon - currently only usable in tierMode
   */
  @Input() settingsIcon = true;

  /**
   * Show the tierMode header border
   */
  @Input() tierModeHeaderBorder = true;

  /**
   * Back link label - currently only usable in tierMode
   */
  @Input() backLinkLabel: string;

  /**
   * Back label icon - currently only usable in tierMode
   */
  @Input() backLinkIcon: string;

  /**
   * Show the left arrow in the back link - currently only usable in tierMode
   */
  @Input() showLeftArrow = true;

  /**
   * Set the left arrow icon in the back link - currently only usable in tierMode
   */
  @Input() leftArrowIcon = 'icon-chevron-right-24';

  /**
   * Set the base level for the tierMode app-nav - items with a level greater than this number will not show when collapsed
   */
  @Input() setBaseLevel = '0';

  /**
   * Set the padding for the tier Mode app-nav header - in pixels
   */
  @Input() tierModeHeaderPadding: string;

  /**
   * Set the height for the tier Mode app-nav header - in pixels
   */
  @Input() tierModeHeaderHeight: string;

  /**
   * Completely hide app nav from display
   */
  @Input() hidden = false;

  /**
   * Close app-nav if a click is detected away the opened side menu
   */
  @Input() closeOffNavClick = false;

  /**
   * Whether or not app-nav tier mode is expanded. Default is true.
   */
  @Input()
  get tierModeExpanded(): boolean { return this._tierModeExpanded; }
  set tierModeExpanded(value) { this._tierModeExpanded = coerceBooleanProperty(value); }
  private _tierModeExpanded = true;

  /**
   * On nav bar close
   */
  @Output() navClose = new EventEmitter();

  /**
   * On nav bar open
   */
  @Output() navOpen = new EventEmitter();

  /**
   * On click of settingsIcon
   */
  @Output() settingsClick = new EventEmitter();

  /**
   * On click of backLink
   */
  @Output() backAction = new EventEmitter();

  /**
   * On click of parent item of tier mode
   */
  @Output() itemToggled = new EventEmitter<{ index: number }>();

  /**
   * Convenience input for controlling app nav from input
   *
   */
  @Input()
  set sideNavExpanded(v: boolean) {
    if (this._expanded !== v) {
      this._expanded = v;
      this._changeDetectorRef.markForCheck();
    }
  }

  get sideNavExpanded() {
    return this._expanded;
  }

  tooltipsPositions = TooltipPosition;
  iconSizes = IconSizes;

  fixedHeights = new BehaviorSubject(0);

  /** @internal */
  _active: boolean;

  /** @internal */
  _checkHeaderFooter: any;

  /** @internal */
  _expanded = false;

  /** @internal */
  _headerHeight = 0;

  /** @internal */
  _footerHeight = 0;

  /** @internal */
  _topNavigation: _AtlasLegacyNavigationItem[] | AtlasLegacyNavigationItem[] | AtlasLegacyTieredNavigationItem[] = [];

  /** @internal */
  _bottomNavigation: _AtlasLegacyNavigationItem[] | AtlasLegacyNavigationItem[] | AtlasLegacyTieredNavigationItem[] = [];

  /** @internal */
  _sectionLinkNavigation: _AtlasLegacyNavigationItem[] | AtlasLegacyNavigationItem[] | AtlasLegacyTieredNavigationItem[] = [];

  /** @internal */
  _itemExpanded = true;

  /**
   * @internal
   * Reference to the level spacing in px
   */
  _levelSpacing = 50;

  /** @internal Truncated sectionTitle w/ ellipsis */
  _sectionTitleTruncated: string;

  /** @internal */
  get _heightCalc() {
    return `calc(100vh - ${this._headerHeight}px - ${this._footerHeight}px)`;
  }

  private _subscription: Subscription;

  /** Current active node */
  private _activeNode: AtlasLegacyTieredNavigationItem;
  /** Current active node index */
  private _activeNodeIndex: number;

  constructor(
    private _elementRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
  ) {
    this._subscription = _router.events.subscribe((s: any) => {
      if (s instanceof NavigationEnd) {
        this._update();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.topNavigation || changes.bottomNavigation || changes.sectionLinkNavigation || changes.forceState) {
      this._updateNavigationItems();
    }
    if (this.tierMode && changes.tierModeExpanded) {
      if (changes.tierModeExpanded.currentValue) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  ngAfterViewInit() {
    // wait a tick for header and footer to load
    this._checkHeaderFooter = setTimeout(() => {
      const el = this._elementRef.nativeElement as HTMLElement;
      // detect header and footer
      const header = el.parentElement.querySelector('mercer-header') || el.parentElement.querySelector('mercer-header2');
      // const footer = el.parentElement.querySelector('mercer-footer');
      if (header) {
        this._headerHeight = header.getBoundingClientRect().height;
        this.fixedHeights.next(this.fixedHeights.value + this._headerHeight);
      }
      // NOTE: remove footer height calc for now, awaiting UX for handling of footer
      // if (footer) {
      //   this._footerHeight = footer.getBoundingClientRect().height;
      // }
      const innerHeader = el.querySelector('.atlas-app-nav__title-bar');
      if (innerHeader) {
        this.fixedHeights.next(this.fixedHeights.value + innerHeader.getBoundingClientRect().height);
      }

      if (this.tierMode) {
        if (this.tierModeExpanded) {
          this.open();
        }
        this._truncateSectionTitle();
      }

      this._changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy() {
    clearTimeout(this._checkHeaderFooter);
    this._subscription.unsubscribe();
  }

  /**
   * Opens the app nav or does nothing if the app nav is already open
   */
  open() {
    if (this._expanded) {
      return;
    }
    this._expanded = true;
    this.navOpen.emit();
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Closes the app nav or does nothing if the app nav is already closed.
   */
  close() {
    if (!this._expanded) {
      return;
    }
    this._expanded = false;
    this.navClose.emit();
    this._changeDetectorRef.markForCheck();
  }

  /**
   * Toggles the appnav open/close depending on the current state.
   */
  toggle() {
    this._expanded = !this._expanded;
    if (this._expanded) {
      this.navOpen.emit();
    } else {
      this.navClose.emit();
    }
    this._changeDetectorRef.markForCheck();
  }

  /** @internal */
  _closeAction($event?) {
    this.toggle();
  }


  /**
   * Toggles item collapse in tierMode
   */
  toggleItem(itemIndex) {
    const currentToggledItem = this._topNavigation[itemIndex] as AtlasLegacyTieredNavigationItem;

    const isPerformOpen = !currentToggledItem.expanded;
    currentToggledItem.expanded = isPerformOpen;

    if (isPerformOpen) {
      this._toggleDescendantVisiblity(itemIndex, currentToggledItem, false);
    } else {
      this._toggleDescendantVisiblity(itemIndex, currentToggledItem, true);
    }
    this.itemToggled.emit({ index : itemIndex });
    this._changeDetectorRef.markForCheck();
  }

  /**
   * @internal
   * Determines whether or not the sectionTitle should be truncated
   * @returns Whether or not sectionTitle was truncated
   */
  _truncateSectionTitle(): boolean {
    if (this.sectionTitle) {
      if (this.sectionTitle.split(' ').length > 3) {
        this._sectionTitleTruncated = `${this.sectionTitle.split(' ').slice(0, 3).join(' ')}...`;
      }
      if (this.sectionTitle.length > 50) {
        this._sectionTitleTruncated = `${this.sectionTitle.substring(0, 50)}...`;
      }
      return this.sectionTitle.split(' ').length > 3 || this.sectionTitle.length > 50;
    }
    return false;
  }

  /**
   * Toggle descendants of expanded and descendant's visibility of current tree node and
   * @param startIndex Current index to start usually the current tree node index
   * @param currentNode Current tree node
   * @param hidden Used to toggle visibility true = hidden, false = visible
   * @returns
   * @memberof AppNavComponent
   */
  private _toggleDescendantVisiblity(startIndex: number, currentNode: AtlasLegacyTieredNavigationItem, hidden: boolean) {
    for (let idx = startIndex + 1; idx < this._topNavigation.length; idx++) {
      const curr = this._topNavigation[idx] as AtlasLegacyTieredNavigationItem;
      // If reached sibling node of the current tree node
      // Check if other siblings is expanded if so then close
      // then break
      if (curr.level <= currentNode.level) {
        // Loop through items above the current node
        for (let i = startIndex - 1; i >= 0; i--) {
          const current = (this._topNavigation[i] as AtlasLegacyTieredNavigationItem);
          if (current.level === currentNode.level && current.expanded) {
            current.expanded = false;
          } else if (current.level === 0 && current.expanded) {
            break;
          } else if (current.level > currentNode.level) {
            current.isInvisible = true;
          }
        }

        // Loop through items below the current node
        for (let i = startIndex + 1; i < this._topNavigation.length; i++) {
          const current = this._topNavigation[i] as AtlasLegacyTieredNavigationItem;
          // If reached root and not the same level of the current node then break to avoid touching other nodes above
          if (current.level === 0 && currentNode.level > 0) {
            break;
          }

          // If sibling and expanded then close the node along with its childs
          if (current.level === currentNode.level && current.expanded) {
           current.expanded = false;

            // Loop through all the childs of the expanded sibling node
            for (let j = i + 1; j < this._topNavigation.length; j++) {
              const currentInner = this._topNavigation[j] as AtlasLegacyTieredNavigationItem;
              if (currentInner.level > currentNode.level) {
                currentInner.isInvisible = true;
              }
              if (currentInner.level === currentNode.level) {
                break;
              }
            }
          }
        }

        break;
      }
      // Set visibility of all the child nodes of the current node
      if (curr.level === currentNode.level + 1) {
        curr.isInvisible = hidden;
        // Recursively apply to descendants of expanded as well
        if (curr.expanded) {
          this._toggleDescendantVisiblity(idx, curr, hidden);
        }
      }
    }
    return;
  }

  private _updateNavigationItems() {
    if (this.topNavigation) {
      this._topNavigation = processNavigationItems(
        this.topNavigation
      );
      if (this.tierMode) {
        this._initTieredItems(this._topNavigation as AtlasLegacyTieredNavigationItem[]);
      }

    }

    if (this.bottomNavigation) {
      this._bottomNavigation = processNavigationItems(
        this.bottomNavigation
      );
      if (this.tierMode && this._expanded) {
        this._initTieredItems(this._bottomNavigation as AtlasLegacyTieredNavigationItem[]);
      }
    }

    if (this.sectionLinkNavigation) {
      this._sectionLinkNavigation = processNavigationItems(
        this.sectionLinkNavigation
      );
    }
    this._update();
  }

  private _update(): any {
    let activeCheck;
    if (this.forceState === ShowHideState.Show) {
      activeCheck = true;
    } else if (this.forceState === ShowHideState.Hide) {
      activeCheck = false;
    } else {
      // check if there is some active link in this app nav
      activeCheck = [...this._topNavigation, ...this._bottomNavigation].some(
        (navItem: _AtlasLegacyNavigationItem) => {
          return this._router.isActive(navItem.path, navItem.exact);
        }
      );
    }
    if (this._active !== activeCheck) {
      this._active = activeCheck;
      this._changeDetectorRef.markForCheck();
    }
  }

  private _initTieredItems(tieredNavigationItems: AtlasLegacyTieredNavigationItem[]) {
    tieredNavigationItems.forEach((navItem: AtlasLegacyTieredNavigationItem) => {
      navItem.expanded = false;
      navItem.isInvisible = navItem.level > 0;
    });

    if (this.tierMode) {
      [...this._topNavigation, ...this._bottomNavigation].forEach((navItem: _AtlasLegacyNavigationItem, index: number) => {
        if (this._router.isActive(navItem.path, true)) {
          this._activeNode = navItem as any as AtlasLegacyTieredNavigationItem;
          this._activeNodeIndex = index;
        }
      });

      const activeNodeIndex = tieredNavigationItems.indexOf(this._activeNode);

      this._setTopLevelActive(activeNodeIndex, this._topNavigation[activeNodeIndex] as AtlasLegacyTieredNavigationItem);

      if (this._activeNode) {
        this._activeNode.isInvisible = false;

        for (let i = 0; i < this._topNavigation.length; i++) {
          const current = this._topNavigation[i] as AtlasLegacyTieredNavigationItem;
          // If node is top hierarchy of active node then set all childs to visible
          if (current.level < this._activeNode.level && current._containsActiveChild) {
            current.expanded = true;
            // Set all childs to visible
            this._toggleDescendantVisiblity(i, current, false);
          }
        }
      }
    }
  }

  /**
   * Set the top level hierarchy to have _containsActiveChild: true
   * Indicate which nodes contains the active node
   */
  private _setTopLevelActive(startIndex: number, currentNode: AtlasLegacyTieredNavigationItem) {
    for (let idx = startIndex - 1; idx >= 0; idx--) {
      const current = this._topNavigation[idx] as AtlasLegacyTieredNavigationItem;

      if (current.level < currentNode.level) {
        current._containsActiveChild = true;
        this._setTopLevelActive(idx, current);
        break;
      }
    }
    return;
  }
}