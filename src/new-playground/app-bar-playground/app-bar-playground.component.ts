import { ConnectedPosition, Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { Actions, BackgroundColors, ButtonSizings, ButtonVariants, Dialog, FieldSize, IconSizes } from 'atlas-cdk';
import { AtlasInput } from 'atlas-field';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-bar-playground',
  templateUrl: './app-bar-playground.component.html',
  styleUrls: ['./app-bar-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppBarPlayground {
  /** Trigger that opens the select. */
  @ViewChild('trigger') trigger: ElementRef;
  /** Panel containing the select options. */
  @ViewChild('panel') panel: ElementRef;
  /** Input element for typeahead search. */
  @ViewChild('typeahead') typeaheadElement: AtlasInput;

  private openSubject = new Subject<void>();
  private closeSubject = new Subject<void>();
  /** Emits whenever the component is destroyed. */
  private readonly _destroyed$ = new Subject<void>();
  private _tempPlaceholder = '';
  _triggerRect: ClientRect;
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
  fieldSize: FieldSize = FieldSize.small;
  primaryBackground = BackgroundColors['background-primary-main'];
  isShown = false;
  panelOpen = false;
  value = '';
  placeholder = 'Type here';
  topResults: any;
  otherResults: any;
  _scrollStrategy: ScrollStrategy;
  typeaheadSelectedOption = false;
  sizeIconAppBar = IconSizes.xsmall;
  buttonSizeAppBar = ButtonSizings.xsmall;
  iconAppBar = IconSizes.medium;
  actionAppBar = Actions.default;
  actionAppBarPrimary = Actions.primary;
  variantAppBar = ButtonVariants.text;
  /** size of icons in filter section */
  filter_icon_size = IconSizes.small;
  /** accordion icons */
  icon_arrow_down = 'icon-chevron-down-24';
  icon_arrow_up = 'icon-chevron-up-24';
  /** filters */
  filtersStatus = {
    filter1: {
      active: false,
      icon: this.icon_arrow_down,
    },
    filter2: {
      active: false,
      icon: this.icon_arrow_down,
    },
    filter3: {
      active: false,
      icon: this.icon_arrow_down,
    },
  };
  items: any[] = [];
  results: any[] = [];

  constructor(public dialog: Dialog, private _overlay: Overlay, private _changeDetectorRef: ChangeDetectorRef) {
    this._scrollStrategy = this._overlay.scrollStrategies.reposition();
    this.items.push(
      {
        label: 'Stores',
        path: '/stores',
        active: true,
      },
      {
        label: "McDonald's",
        path: '/stores/mc',
        active: false,
      },
      {
        label: 'XVMC',
        path: '/stores/mc',
        disabled: true,
      },
      {
        label: 'Texas',
        path: '/stores/mc/tx',
        active: true,
      },
    );
  }
  ngAfterViewInit(): void {
    this.openSubject.pipe(takeUntil(this._destroyed$)).subscribe(() => this.handleOpen());
    this.closeSubject.pipe(takeUntil(this._destroyed$)).subscribe(() => this.handleClose());
    this.firstsResults();
    this._changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();

    this._changeDetectorRef.detectChanges();
  }

  showSearchInput(value: boolean): void {
    this.isShown = value;

    if (!this.isShown) {
      this.close();
      this.firstsResults();
    }
  }

  handleOpen(): void {
    if (this.panelOpen || this.typeaheadSelectedOption) {
      return;
    }
    this._triggerRect = this.trigger['_elementRef'].nativeElement.getBoundingClientRect();
    this.panelOpen = true;
    this._changeDetectorRef.detectChanges();

    if (this.typeaheadElement) {
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

  /* Other class methods */

  handleBackdropClick(event: MouseEvent): void {
    if (event.target !== this.typeaheadElement['nativeElement']) {
      this.close();
    } else {
      return;
    }
  }

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

  private firstsResults(): void {
    this.results = [
      {
        id: 1,
        title: 'Assurance',
        tags: ['top', 'finance'],
      },
      {
        id: 2,
        title: 'Quality Assurance',
        tags: ['finance'],
      },
      {
        id: 3,
        title: 'ATM',
        tags: ['top', 'withdrawal', 'banking'],
      },
      {
        id: 4,
        title: 'Credit',
        tags: ['top', 'banking'],
      },
      {
        id: 5,
        title: 'Debit',
        tags: ['banking'],
      },
      {
        id: 6,
        title: 'Loans and credits',
        tags: ['top', 'banking'],
      },
    ];
    this.topResults = this.results.filter((item) => item.tags.includes('top'));
    this.otherResults = this.results.filter((item) => !item.tags.includes('top'));
  }

  resetFilters(): void {
    for (const filter in this.filtersStatus) {
      if (this.filtersStatus.hasOwnProperty(filter)) {
        this.filtersStatus[filter].active = false;
        this.filtersStatus[filter].icon = this.icon_arrow_down;
      }
    }
  }

  changeStatus(filterName: string): void {
    const itemFilter = this.filtersStatus[filterName];
    itemFilter.active = !itemFilter.active;
    itemFilter.icon = itemFilter.active ? this.icon_arrow_up : this.icon_arrow_down;
  }

  open(): void {
    this.openSubject.next();
    this._changeDetectorRef.detectChanges();
  }

  close(): void {
    document.addEventListener(
      'click',
      (event: MouseEvent) => {
        // Get the position of the text box
        const rect = this.typeaheadElement['nativeElement'].getBoundingClientRect();
        // Check if click occurred within the text box
        if (
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          // If click occurred within the text box, focus on the text box but do not clear the text
          this.typeaheadElement['nativeElement'].focus();
        } else {
          this.closeSubject.next();
        }
      },
      { once: true },
    );
    this._changeDetectorRef.detectChanges();
  }
}
