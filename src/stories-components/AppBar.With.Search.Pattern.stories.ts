// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { AppBarComponent, AppBarModule } from 'atlas-app-bar';
import { ButtonModule, ButtonVariants } from 'atlas-button';
import { Actions, BackgroundColors, BoxShadows, ThemingService, defaultConfig } from 'atlas-cdk';
import { IconModule, IconSizes } from 'atlas-icon';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';
import { AvatarModule } from 'atlas-avatar';
import { ChangeDetectorRef, Component, ElementRef, HostBinding, ViewChild } from '@angular/core';
import { FieldModule, FieldSize, AtlasInput } from 'atlas-field';
import { CdkConnectedOverlay, ConnectedPosition, Overlay, OverlayModule, ScrollStrategy } from '@angular/cdk/overlay';
import { Subject, takeUntil } from 'rxjs';
import { AccordionModule } from 'atlas-accordion';
import { ListModule } from 'atlas-list';
import { MenuModule } from 'atlas-menu';

@Component({
  selector: 'app-bar-search',
  template: `
      <atlas-app-bar [background]="background" [action]="actionAppBarPrimary" [background]="primaryBackground">
      <atlas-icon-button
        [size]="iconAppBar"
        [action]="actionAppBarPrimary"
        [icon]="'icon-menu-24'"
        [dense]="false"
        [customClass]="'app-bar-primary-icon-button'"
      ></atlas-icon-button>
      <img src="./atlas-logos/Mercer_R.png" height="20px" class="padding-left-2"/>
      <span class="app-bar-separator"></span>
      <atlas-field cdkOverlayOrigin 
                  #origin="cdkOverlayOrigin" 
                  id="search_input"  
                  #trigger 
                  [fullWidth]="false"  
                  [ngClass]="[
                    'search-field', 
                    isShown ? 'show-input' :  isShown !== null ? 'hide-input' : 'default-input-state'
                  ]" 
                  [size]="fieldSize">
        <input  #typeahead 
                type="text" 
                atlasInput 
                [required]="true" 
                [placeholder]="placeholder" 
                (input)="_handleInput($event)"
                (click)="open()"
        />
        <atlas-field-prefix>
         <atlas-icon
           [icon]="'icon-search-24'"
           [size]="iconAppBar">
         </atlas-icon>
       </atlas-field-prefix>
        <atlas-field-suffix class="close-icon" (click)="showSearchInput(false)">
         <atlas-icon
           [icon]="'icon-remove-circle-24'"
           [size]="iconAppBar"
          >
         </atlas-icon>
       </atlas-field-suffix>
       <ng-template
          cdkConnectedOverlay
          cdkConnectedOverlayLockPosition
          [cdkConnectedOverlayHasBackdrop]="true"
          cdkConnectedOverlayBackdropClass="select-backdrop"
          [cdkConnectedOverlayScrollStrategy]="_scrollStrategy"
          [cdkConnectedOverlayOrigin]="origin"
          [cdkConnectedOverlayOpen]="panelOpen"
          [cdkConnectedOverlayPositions]="_positions"
          [cdkConnectedOverlayWidth]="origin.elementRef.nativeElement.offsetWidth"
          (backdropClick)="close()"
          (detach)="close()">
          <div class="atlas-select-panel box-shadow-elevation-elevated">
            <div #panel class="atlas-select-panel-content" style="background: #ffffff;">
              <atlas-menu [menuOpen]="true">
                <div  [ngTemplateOutlet]="contentTemplate"></div>
              </atlas-menu>
            </div>
          </div>
        </ng-template>
      </atlas-field>
      <atlas-icon-button
        *ngIf="!isShown"
        [size]="iconAppBar"
        [action]="actionAppBarPrimary"
        [icon]="'icon-search-24'"
        [dense]="false"
        [customClass]="'app-bar-primary-icon-button'"
        [ngClass]="[
          isShown? 'hide-button' :  isShown!== null? 'show-button' : ''
        ]"
        (onClick)="showSearchInput(true)"
      ></atlas-icon-button>
      <atlas-avatar
        [action]="actionAppBarPrimary"
        typography="typographyStyles-body-largeAlt"
        [grouped]="false"
        [indicator]="false"
        class="padding-left-2"
        [avatarCustomClass]="'app-bar-primary-avatar'"
      >CF</atlas-avatar>
    </atlas-app-bar>


<ng-template #contentTemplate>
  <div class="typographyStyles-body-largeAlt padding-x-5 padding-y-8">
    <atlas-icon [icon]="'icon-search-content-24'"></atlas-icon><span class="padding-left-4">Searching Results</span>
  </div>
  <atlas-accordion>
    <atlas-accordion-item (onExpand)="changeStatus('filter2')">
      <atlas-accordion-heading>
        <div class="padding-y-6 typographyStyles-body-smallAlt">Top Search</div>
      </atlas-accordion-heading>
      <atlas-accordion-content>
        <div class="padding-y-10 padding-x-8">
          <atlas-list *ngIf="topResults.length > 0; else emptyTemplate">
            <atlas-list-item *ngFor="let item of topResults; let i = index" [item]="{value: 'option 2'}">
              <div>
                {{item.title}}
                <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Tags: {{item.tags}}</div>
              </div>
            </atlas-list-item>
          </atlas-list>
        </div>
      </atlas-accordion-content>
      <atlas-accordion-expand>
        <div>
          <atlas-icon-button [size]="filter_icon_size" [dense]="true" [icon]="filtersStatus.filter2.icon"></atlas-icon-button>
        </div>
      </atlas-accordion-expand>
    </atlas-accordion-item>
  </atlas-accordion>
  <atlas-accordion>
    <atlas-accordion-item (onExpand)="changeStatus('filter3')">
      <atlas-accordion-heading>
        <div class="padding-y-6 typographyStyles-body-smallAlt">Other results</div>
      </atlas-accordion-heading>
      <atlas-accordion-content>
        <div class="padding-y-10 padding-x-8">
          <atlas-list *ngIf="otherResults.length > 0; else emptyTemplate">
            <atlas-list-item *ngFor="let item of otherResults; let i = index" [item]="{value: 'option 2'}">
              <div>
                {{item.title}}
                <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Tags: {{item.tags}}</div>
              </div>
            </atlas-list-item>
          </atlas-list>
        </div>
      </atlas-accordion-content>
      <atlas-accordion-expand>
        <div>
          <atlas-icon-button [size]="filter_icon_size" [dense]="true" [icon]="filtersStatus.filter3.icon"></atlas-icon-button>
        </div>
      </atlas-accordion-expand>
    </atlas-accordion-item>
  </atlas-accordion>
  <ng-template #emptyTemplate>
     <div style="text-align: center; color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Sorry, no results were found for your search.</div>
  </ng-template>
</ng-template>
  `,
  styleUrls: ['../playground/playground.component.scss']
})
class AppBarSearchComponent {
  /** App bar icons */
  iconAppBar = IconSizes.medium;
  /** App bar primary action */
  actionAppBarPrimary = Actions.primary;
  /** App bar primary background */
  primaryBackground = BackgroundColors[ 'background-primary-main' ];
  /** menu shadow */
  elevation = BoxShadows.elevated;
  /** @internal */
  _tempPlaceholder = '';
  /** Search input's placeholder */
  placeholder = 'Search by name or tags...';
  /** @internal */
  typeaheadSelectedOption = false;
  /** 
   * @internal
   *  Trigger that opens the select. 
   * */
  @ViewChild('trigger') trigger: ElementRef;

  /** 
   * @internal 
   * Panel containing the select options. 
   * */
  @ViewChild('panel') panel: ElementRef;

  /**  
   * @internal 
   * Input element for typeahead search. 
   * */
  @ViewChild('typeahead') typeaheadElement: AtlasInput;
   /**
    * @internal
    * Overlay pane containing the options.
    */
   @ViewChild(CdkConnectedOverlay) private _overlayDir: CdkConnectedOverlay;
   /** boolean variable to manually set the menu open or closed */
  panelOpen: boolean = false;
  /** @internal */
  _scrollStrategy: ScrollStrategy;
  /** @internal */
  _triggerRect: ClientRect;
  /** @internal */
  _positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetX: 0,
      offsetY: 8,
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetX: 0,
      offsetY: 8,
    },
  ];
   /** 
    * @internal
    * Emits whenever the component is destroyed. 
    * */
   private readonly _destroyed$ = new Subject<void>();
   /** @internal */
   value = '';
    /** @internal */
   topResults: any;
    /** @internal */
   otherResults: any;
    /** @internal */
   @ViewChild('contentTemplate') newContent: ElementRef;
   /** 
    * @internal
    * accordion icons 
    * */
   icon_arrow_down = 'icon-chevron-down-24';
   /** 
    * @internal 
    * accordion icons
    * */
   icon_arrow_up = 'icon-chevron-up-24';
   /** 
    * @internal 
    * filters 
    * */
   filtersStatus = {
     filter1: {
       active: false,
       icon: this.icon_arrow_down
     },
     filter2: {
       active: false,
       icon: this.icon_arrow_down
     },
     filter3: {
       active: false,
       icon: this.icon_arrow_down
     }
   };
   /** size of icons in filter section */
   filter_icon_size = IconSizes.small;
   /** size of input field */
   fieldSize: FieldSize = FieldSize.small;
   /** @internal */
   isShown = null;
   /** @internal */
   results: any[] = []; 

  private openSubject = new Subject<void>();
  private closeSubject = new Subject<void>();


  constructor(
    themingService: ThemingService,
    private _overlay: Overlay,
    private _changeDetectorRef: ChangeDetectorRef,
  ) {
    this._scrollStrategy = this._overlay.scrollStrategies.reposition();
    themingService.applyConfig(defaultConfig);
    this.firstsResults();
  }

  ngAfterViewInit(): void {
    this.openSubject.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(() => this.handleOpen());

    this.closeSubject.pipe(
      takeUntil(this._destroyed$)
    ).subscribe(() => this.handleClose());

    this._changeDetectorRef.detectChanges()
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();

    this._changeDetectorRef.detectChanges()
  }
  /** @internal */
  firstsResults() {
    this.results = [
      {
        id: 1,
        title: 'Assurance',
        tags: ['top', 'finance']
      },
      {
        id: 2,
        title: 'Quality Assurance',
        tags: ['finance']
      },
      {
        id: 3,
        title: 'ATM',
        tags: ['top', 'withdrawal', 'banking']
      },
      {
        id: 4,
        title: 'Credit',
        tags: ['top', 'banking']
      },
      {
        id: 5,
        title: 'Debit',
        tags: ['banking']
      },
      {
        id: 6,
        title: 'Loans and credits',
        tags: ['top','banking']
      },
     ];
    this.topResults = this.results.filter(item => item.tags.includes('top'));
    this.otherResults = this.results.filter(item => !item.tags.includes('top'));
  }

  /** @internal */
  showSearchInput(value) {
    this.isShown = value;
    
    if(!this.isShown) {
      this.close();
      this.firstsResults();
    }
  }

  handleOpen(): void {
    if ( this.panelOpen || this.typeaheadSelectedOption ) {
      return;
    }
    this._triggerRect = this.trigger['_elementRef'].nativeElement.getBoundingClientRect();
    this.panelOpen = true;
    this._changeDetectorRef.detectChanges();

    if(this.typeaheadElement) {
      this.typeaheadElement['nativeElement']?.focus();
      this._tempPlaceholder = this.placeholder;
      this.placeholder = '';
    }
  }

  handleClose(): void {
    if (this.panelOpen) {
      this.panelOpen = false;
      this.typeaheadElement['nativeElement'].value = '';
      this.placeholder = this._tempPlaceholder;
      this.firstsResults();
      this.resetFilters();
      this._changeDetectorRef.markForCheck();
    }
  }

  handleBackdropClick(event: MouseEvent) {
    if (event.target !== this.typeaheadElement['nativeElement']) {
      this.close();
    } else {
      return;
    }
  }

  open(): void {
    this.openSubject.next();
    this._changeDetectorRef.detectChanges()
  }

  close(): void {
    document.addEventListener('click', (event: MouseEvent) => {
      // Get the position of the text box
      const rect = this.typeaheadElement['nativeElement'].getBoundingClientRect();
      // Check if click occurred within the text box
      if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom) {
        // If click occurred within the text box, focus on the text box but do not clear the text
        this.typeaheadElement['nativeElement'].focus();
      } else {
        this.closeSubject.next();
      }
    }, { once: true });
    this._changeDetectorRef.detectChanges()
  }

  resetFilters() {
    for (let filter in this.filtersStatus) {
      if (this.filtersStatus.hasOwnProperty(filter)) {
        this.filtersStatus[filter].active = false;
        this.filtersStatus[filter].icon = this.icon_arrow_down;
      }
    }
  }

  /** @internal */
  _handleInput(event: any): void {
    const target = event.target as HTMLInputElement;
    const value: number | string | null = target.value;
    this.value = value;
    this.firstsResults();
    if( this.value.length > 0) {
      this.topResults = this.topResults.filter(item => {
        let titleMatch = item.title.toLowerCase().includes(value.toLowerCase());
        let tagMatch = item.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()));
        return titleMatch || tagMatch;
     });
      this.otherResults = this.otherResults.filter(item => {
        let titleMatch = item.title.toLowerCase().includes(value.toLowerCase());
        let tagMatch = item.tags.some(tag => tag.toLowerCase().includes(value.toLowerCase()));
        return titleMatch || tagMatch;
     });
    }
  }

  /** @internal */
  changeStatus(filterName) {
    const itemFilter = this.filtersStatus[filterName];
    itemFilter.active = !itemFilter.active;
    if (itemFilter.active) {
      itemFilter.icon = this.icon_arrow_up
    } else {
      itemFilter.icon = this.icon_arrow_down
    }
  }
}

export default {
  title: 'Adopters/Components/AppBar',
  component: AppBarSearchComponent,
  decorators: [
    withDesign,
    moduleMetadata({
      imports: [
        AppBarModule, 
        AccordionModule, 
        AvatarModule, 
        ButtonModule, 
        IconModule, 
        FieldModule, 
        OverlayModule,
        ListModule,
        MenuModule
      ],
    })
  ],
  parameters: {
    options: {
      isToolshown: true,
    },
    badges: [BADGES.ALPHA],
    controls: { sort: 'requiredFirst' },
    // TODO [AG]: I need to keep this code, we are going to fixed in a different ticket
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/Yzrgj31BciBNyvrN4BJUNR/Foundation-0.0.1?node-id=12412%3A23532',
    //   allowFullscreen: true,
    // },
  },
  argTypes: {
    action: {
      options: [Actions.default, Actions.primary, Actions.secondary],
      control: { type: 'select' },
      defaultValue: Actions.default
    },
    actionBtn: {
      options: [Actions.default, Actions.primary, Actions.secondary],
      control: { type: 'select' },
      description: 'The action color for avatar and icon button components',
      defaultValue: Actions.default
    },
    size: {
      table: {
        disable: true
      }
    },
    elevation: {
      options: [BoxShadows.flat, BoxShadows.raised, BoxShadows.elevated, BoxShadows.floating, BoxShadows.lifted],
      control: { type: 'select' },
      defaultValue: BoxShadows.raised
    },
  },
} as Meta<AppBarComponent>;

export const AppBarSearchPattern: Story = (args: AppBarSearchComponent) => {
   /** App bar icons */
   let iconAppBar = IconSizes.medium;
   /** App bar primary action */
   let actionAppBarPrimary = Actions.primary;
   /** App bar primary background */
   let primaryBackground = BackgroundColors[ 'background-primary-main' ];
  /** @internal */
  let _tempPlaceholder = '';
  /** Search input's placeholder */
  let placeholder = 'Search by name or tags...';
  /** @internal */
  let typeaheadSelectedOption = false;
   /** boolean variable to manually set the menu open or closed */
  let panelOpen: boolean = false;
  /** @internal */
  let _scrollStrategy: ScrollStrategy;
  /** @internal */
  let _triggerRect: ClientRect;
  /** @internal */
  let _positions: ConnectedPosition[] = [
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'top',
      offsetX: 0,
      offsetY: 8,
    },
    {
      originX: 'center',
      originY: 'bottom',
      overlayX: 'center',
      overlayY: 'bottom',
      offsetX: 0,
      offsetY: 8,
    },
  ];
   /** @internal */
   let value = '';
   let results = [
    {
      id: 1,
      title: 'Assurance',
      tags: ['top', 'finance']
    },
    {
      id: 2,
      title: 'Quality Assurance',
      tags: ['finance']
    },
    {
      id: 3,
      title: 'ATM',
      tags: ['top', 'withdrawal', 'banking']
    },
    {
      id: 4,
      title: 'Credit',
      tags: ['top', 'banking']
    },
    {
      id: 5,
      title: 'Debit',
      tags: ['banking']
    },
    {
      id: 6,
      title: 'Loans and credits',
      tags: ['top','banking']
    },
   ]
    /** @internal */
   let topResults = results.filter(item => item.tags.includes('top'));
    /** @internal */
   let otherResults = results.filter(item => !item.tags.includes('top'));
   /** 
    * @internal
    * accordion icons 
    * */
   let icon_arrow_down = 'icon-chevron-down-24';
   /** 
    * @internal 
    * accordion icons
    * */
   let icon_arrow_up = 'icon-chevron-up-24';
   /** 
    * @internal 
    * filters 
    * */
   let filtersStatus = {
     filter1: {
       active: false,
       icon: icon_arrow_down
     },
     filter2: {
       active: false,
       icon: icon_arrow_down
     },
     filter3: {
       active: false,
       icon: icon_arrow_down
     }
   };
   /** size of icons in filter section */
   let filter_icon_size = IconSizes.small;
   /** size of input field */
   let fieldSize: FieldSize = FieldSize.small;

  return {
    props: {
      ...args,
      iconAppBar,
      actionAppBarPrimary,
      primaryBackground,
     _tempPlaceholder,
     placeholder,
     typeaheadSelectedOption,
     panelOpen,
     _scrollStrategy,
     _triggerRect,
     _positions,
     value,
     topResults,
     otherResults,
     icon_arrow_down,
     icon_arrow_up,
     filtersStatus,
     filter_icon_size,
     fieldSize,
    },
  }
};

const DOC = `
<atlas-app-bar [background]="background" [action]="actionAppBarPrimary" [background]="primaryBackground">
<atlas-icon-button
  [size]="iconAppBar"
  [action]="actionAppBarPrimary"
  [icon]="'icon-menu-24'"
  [dense]="false"
  [customClass]="'app-bar-primary-icon-button'"
></atlas-icon-button>
<img src="./atlas-logos/Mercer_R.png" height="20px" class="padding-left-2"/>
<span class="app-bar-separator"></span>
<atlas-field cdkOverlayOrigin #origin="cdkOverlayOrigin"  #trigger *ngIf="isShown" [fullWidth]="true" class="search-field" [size]="fieldSize">
  <input  #typeahead 
          type="text" 
          atlasInput 
          [required]="true" 
          [placeholder]="placeholder" 
          (input)="_handleInput($event)"
          (click)="open()"
  />
  <atlas-field-prefix>
   <atlas-icon
     [icon]="'icon-search-24'"
     [size]="iconAppBar">
   </atlas-icon>
 </atlas-field-prefix>
  <atlas-field-suffix class="close-icon" (click)="showSearchInput()">
   <atlas-icon
     [icon]="'icon-remove-circle-24'"
     [size]="iconAppBar"
    >
   </atlas-icon>
 </atlas-field-suffix>
 <ng-template
    cdkConnectedOverlay
    cdkConnectedOverlayLockPosition
    [cdkConnectedOverlayHasBackdrop]="false"
    cdkConnectedOverlayBackdropClass="select-backdrop"
    [cdkConnectedOverlayScrollStrategy]="_scrollStrategy"
    [cdkConnectedOverlayOrigin]="origin"
    [cdkConnectedOverlayOpen]="panelOpen"
    [cdkConnectedOverlayPositions]="_positions"
    [cdkConnectedOverlayWidth]="origin.elementRef.nativeElement.offsetWidth"
    (detach)="close()">
    <div class="atlas-select-panel box-shadow-elevation-elevated">
      <div #panel class="atlas-select-panel-content" style="background: #ffffff;">
        <atlas-menu [menuOpen]="true">
          <div  [ngTemplateOutlet]="contentTemplate"></div>
        </atlas-menu>
      </div>
    </div>
  </ng-template>
</atlas-field>
<atlas-icon-button
  *ngIf="!isShown"
  [size]="iconAppBar"
  [action]="actionAppBarPrimary"
  [icon]="'icon-search-24'"
  [dense]="false"
  [customClass]="'app-bar-primary-icon-button'"
  (onClick)="showSearchInput()"
></atlas-icon-button>
<atlas-avatar
  [action]="actionAppBarPrimary"
  typography="typographyStyles-body-largeAlt"
  [grouped]="false"
  [indicator]="false"
  class="padding-left-2"
  [avatarCustomClass]="'app-bar-primary-avatar'"
>CF</atlas-avatar>
</atlas-app-bar>


<ng-template #contentTemplate>
  <div class="typographyStyles-body-largeAlt padding-x-5 padding-y-8">
    <atlas-icon [icon]="'icon-search-content-24'"></atlas-icon><span class="padding-left-4">Searching Results</span>
  </div>
  <atlas-accordion>
    <atlas-accordion-item (onExpand)="changeStatus('filter2')">
      <atlas-accordion-heading>
        <div class="padding-y-6 typographyStyles-body-smallAlt">Top Search</div>
      </atlas-accordion-heading>
      <atlas-accordion-content>
        <div class="padding-y-10 padding-x-8">
          <atlas-list *ngIf="topResults.length > 0; else emptyTemplate">
            <atlas-list-item *ngFor="let item of topResults; let i = index" [item]="{value: 'option 2'}">
              <div>
                {{item.title}}
                <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Tags: {{item.tags}}</div>
              </div>
            </atlas-list-item>
          </atlas-list>
        </div>
      </atlas-accordion-content>
      <atlas-accordion-expand>
        <div>
          <atlas-icon-button [size]="filter_icon_size" [dense]="true" [icon]="filtersStatus.filter2.icon"></atlas-icon-button>
        </div>
      </atlas-accordion-expand>
    </atlas-accordion-item>
  </atlas-accordion>
  <atlas-accordion>
    <atlas-accordion-item (onExpand)="changeStatus('filter3')">
      <atlas-accordion-heading>
        <div class="padding-y-6 typographyStyles-body-smallAlt">Other results</div>
      </atlas-accordion-heading>
      <atlas-accordion-content>
        <div class="padding-y-10 padding-x-8">
          <atlas-list *ngIf="otherResults.length > 0; else emptyTemplate">
            <atlas-list-item *ngFor="let item of otherResults; let i = index" [item]="{value: 'option 2'}">
              <div>
                {{item.title}}
                <div style="color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Tags: {{item.tags}}</div>
              </div>
            </atlas-list-item>
          </atlas-list>
        </div>
      </atlas-accordion-content>
      <atlas-accordion-expand>
        <div>
          <atlas-icon-button [size]="filter_icon_size" [dense]="true" [icon]="filtersStatus.filter3.icon"></atlas-icon-button>
        </div>
      </atlas-accordion-expand>
    </atlas-accordion-item>
  </atlas-accordion>
  <ng-template #emptyTemplate>
     <div style="text-align: center; color: var(--semanticColor-text-secondary);" class="typographyStyles-body-small">Sorry, no results were found for your search.</div>
  </ng-template>
</ng-template>
`;

AppBarSearchPattern.parameters = {
  docs: {
    source: {
      code: DOC,
    },
  },
};