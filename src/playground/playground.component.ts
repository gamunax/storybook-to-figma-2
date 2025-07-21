import { ChangeDetectorRef, Component, ElementRef, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BadgeModes, BadgePositions } from 'atlas-badge';
import { ButtonSizings } from 'atlas-button';
import {
  Actions,
  BackgroundColors,
  BoxShadows,
  Dialog,
  DialogRef,
  DialogSizings,
  HALO_DIALOG_DATA,
  Positions,
  Radii,
  SurfaceColors,
  ButtonVariants,
  Colors
} from 'atlas-cdk';
import { Subject, takeUntil, tap } from 'rxjs';
import { FieldSize, AtlasInput, HaloSelectTypeaheadChange } from 'atlas-field';
import { CdkConnectedOverlay, ConnectedPosition, Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { ChipSizings, ChipVariants } from 'atlas-chips';
import { IconSizes } from 'atlas-icon';
import { PaginationInfo, PaginationRadius, PaginationSizings, PaginationVariants } from 'atlas-pagination';
import { TabGroupComponent, TabVariants } from 'atlas-tabs';
import { TooltipPosition } from 'atlas-tooltip';
import { RatingSizings } from 'atlas-rating';
import { Breadcrumb } from 'atlas-breadcrumb';
import { SnackbarService } from 'atlas-snackbar';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {
  public columnDef = [
    {
      fieldKey: 'age',
      displayLabel: 'age',
      sortable: true,
    },
    {
      fieldKey: 'name',
      displayLabel: 'name',
      sortable: true,
    },
    {
      fieldKey: 'birthplace',
      displayLabel: 'birthplace',
      sortable: true,
    },
    {
      fieldKey: 'cars',
      displayLabel: 'cars',
      sortable: false,
    },
    {
      fieldKey: 'f',
      displayLabel: 'f',
      sortable: true,
    }
  ];
  public rows = [
    {
      age: '1',
      name: 'Kevin',
      birthplace: 'New York',
      cars: 'Ford',
      f: 'f'
    },
    {
      age: '12',
      name: 'Helen',
      birthplace: 'California',
      cars: 'Infiniti',
      f: 'k'
    },
    {
      age: '35',
      name: 'Matt',
      birthplace: 'Florida',
      cars: 'Toyota',
      f: 'p'
    },
    {
      age: '42',
      name: 'Robert',
      birthplace: 'Connecticut',
      cars: 'Subaru',
      f: 'u'
    },
  ];
  public breadcrumbs: Breadcrumb[] =[
    {
      displayName: 'home',
      lastElement: false,
      url: '/', 
      disabled: false,
    },
    {
      displayName: 'first',
      lastElement: false,
      url: '/lazy',
      disabled: false,
    },
    {
      displayName: 'second',
      lastElement: false,
      url: '/second',
      disabled: false,
    },
    {
      displayName: 'last',
      lastElement: true,
      url: '/last',
      disabled: false,
    },

  ]; 

  items: any[] = [];
  accordion: any[] = [];
  emailFormControl = new UntypedFormControl('', [Validators.required, Validators.email]);
  iconSize = IconSizes;
  collapsed: boolean = true;
  variants = TabVariants;
  actions = Actions;
  badgeModes = BadgeModes;
  badgePositions = BadgePositions;
  buttonVariants = ButtonVariants;
  expandedAll = false;
  disabled = false;
  sizeIcon: IconSizes = IconSizes.medium;
  expanded: boolean = false;
  isChecked = false;
  ratingSizings = RatingSizings;
  appBarElevation = BoxShadows.raised;
  appBarPosition = Positions.sticky;
  countryList = [
    {
      label: 'India',
      code: 'IN',
    },
    {
      label: 'Belarus',
      code: 'BY',
    },
    {
      label: 'Canada',
      code: 'CA',
    },
    {
      label: 'Japan',
      code: 'JP',
    },
    {
      label: 'Denmark',
      code: 'DK',
    },
    {
      label: 'Egypt',
      code: 'EG',
    },
    {
      label: 'France',
      code: 'FR',
    },
    {
      label: 'Argentina',
      code: 'AR',
    },
    {
      label: 'Germany',
      code: 'DE',
    },
    {
      label: 'Hungary',
      code: 'HU',
    },
    {
      label: 'India',
      code: 'IN',
    },
    {
      label: 'Belarus',
      code: 'BY',
    },
    {
      label: 'Canada',
      code: 'CA',
    },
    {
      label: 'Japan',
      code: 'JP',
    },
    {
      label: 'Denmark',
      code: 'DK',
    },
    {
      label: 'Egypt',
      code: 'EG',
    },
    {
      label: 'France',
      code: 'FR',
    },
    {
      label: 'Argentina',
      code: 'AR',
    },
    {
      label: 'Germany',
      code: 'DE',
    },
    {
      label: 'Hungary',
      code: 'HU',
    },
  ];
  countriesFiltered = this.countryList;
  chips: any[] = [
    {
      text: 'Chip',
      removable: true,
      action: this.actions.default,
    },
    {
      text: 'Chip',
      removable: true,
      action: this.actions.primary,
    },
    {
      text: 'Chip',
      removable: true,
      action: this.actions.secondary,
    },
    {
      text: 'Chip',
      removable: true,
      action: this.actions.error,
    },
    {
      text: 'Chip',
      removable: true,
      action: this.actions.warning,
    },
    {
      text: 'Chip',
      removable: true,
      action: this.actions.info,
    },
    {
      text: 'Chip',
      removable: true,
      action: this.actions.success,
    }
  ];
  chipVariants = ChipVariants.filled;
  chipSize = ChipSizings.medium;
  chipAction = Actions;
  chipRemovable = true;
  alertAction = Actions.warning;
  variantAppBar = ButtonVariants.text;
  radius = Radii.rounded;
  sizeIconAppBar = IconSizes.xsmall;
  buttonSizeAppBar = ButtonSizings.xsmall;
  iconAppBar = IconSizes.medium;
  actionAppBar = Actions.default;
  actionAppBarPrimary = Actions.primary;
  switchV: boolean = true;
  primaryBackground = BackgroundColors[ 'background-primary-main' ];
  isShown: boolean = false;
  elevation = BoxShadows.elevated;
  colors = Colors;

  cardBackground = SurfaceColors['surface-default-main'];

  /**
   * 
   * Data range
  */
  form: UntypedFormGroup;
  steps = [
    {
      title: 'Stepper title 1'
    },
    {
      title: 'Stepper title 2'
    },
    {
      title: 'Stepper title 3'
    },
    {
      title: 'Stepper title 4'
    },
  ];


  @ViewChild('iconTemplate1') iconTemplate1: TemplateRef<any>;
  @ViewChild('iconTemplate2') iconTemplate2: TemplateRef<any>;
  @ViewChild('iconTemplate3') iconTemplate3: TemplateRef<any>;

  public btnConfig = []

  public btnVariant = ButtonVariants.outlined;


  _tempPlaceholder = '';
  placeholder = 'Type here';
  /** @internal */
  typeaheadSelectedOption = false;
  /** Trigger that opens the select. */
  @ViewChild('trigger') trigger: ElementRef;

  /** Panel containing the select options. */
  @ViewChild('panel') panel: ElementRef;

  /** Input element for typeahead search. */
  @ViewChild('typeahead') typeaheadElement: AtlasInput;
   /**
    * Overlay pane containing the options.
    */
   @ViewChild(CdkConnectedOverlay) private _overlayDir: CdkConnectedOverlay;
  panelOpen: boolean = false;
  _scrollStrategy: ScrollStrategy;
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
   /** Emits whenever the component is destroyed. */
   private readonly _destroyed$ = new Subject<void>();
   value = '';
   topResults: any;
   otherResults: any;
   @ViewChild('contentTemplate') newContent: ElementRef;
  
   /** accordion icons */
   icon_arrow_down = 'icon-chevron-down-24';
   icon_arrow_up = 'icon-chevron-up-24';
   /** filters */
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

   fieldSize: FieldSize = FieldSize.small;

   /** @internal */
   results: any[] = [];
   indexTabDemo= 1;

   testForm: FormGroup;
   radioGroupElements: any;

   private openSubject = new Subject<void>();
   private closeSubject = new Subject<void>();

   simpleForm: FormGroup;
   private switchValueOn: Number = 0;

   public model: any;

   uniqueItems: string[] = ['Tech', 'Health', 'Tech', 'Finance', 'Education', 'Health'];
   
  constructor(
    private _snackbarService: SnackbarService,
    public dialog: Dialog,
    private _overlay: Overlay,
    private _changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder
  ) {

    this.simpleForm = this.fb.group({
      select: ['']
    });

    this.subscribeToFormChanges();

    this._scrollStrategy = this._overlay.scrollStrategies.reposition();
    this.firstsResults();
    this.items.push(
      {
        label: "Stores",
        path: "/stores",
        active: true,
      },
      {
        label: "McDonald's",
        path: "/stores/mc",
        active: false,
      },
      {
        label: "XVMC",
        path: "/stores/mc",
        disabled: true,
      },
      {
        label: "Texas",
        path: "/stores/mc/tx",
        active: true,
      },
    );


    this.accordion.push(
      {
        heading: "Heading",
        subheading: "SubHeading",
        expanded: false,
        content: 'content 1',
      },
      {
        heading: "Heading",
        subheading: "SubHeading",
        expanded: false,
        disabled: false,
        content: `
        Content 2
        `
      },
      {
        heading: "Heading",
        subheading: "SubHeading",
        expanded: false,
        disabled: false,
        content: `
        Content 3
        `
      },
    )

    /** Data range */
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();


    this.form = new UntypedFormGroup({
      start: new UntypedFormControl(new Date(year, month, 1)),
      end: new UntypedFormControl(new Date(year, month, 15)),
    });
  }
  


  ngOnInit(): void {
    this.testForm = new FormGroup({
      radioElement: new UntypedFormControl([{ value: '', disabled: true}]),
    });
    this.radioGroupElements = [
      { id: 1, label: 'Option 1', value: 'option1' },
      { id: 2, label: 'Option 2', value: 'option2', checked: true },
      { id: 3, label: 'Option 3', value: 'option3' },
    ];
  }

  ngAfterViewInit(): void {

    this.btnConfig.push(
      { content: this.iconTemplate1, event: () => console.log('clicked 1')},
      { content: this.iconTemplate2, event: () => console.log('clicked 2')},
      { content: this.iconTemplate3, event: () => console.log('clicked 3')},
    );

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

  private subscribeToFormChanges(): void {
    this.simpleForm.valueChanges
      .pipe(
        tap(() => console.log('Subscription log')),
      )
      .subscribe(() => {
        console.log('Subscription log')
      });
  }

  onSelectedItem(value: any): void {
    if (!this.collapsed) {
      this.collapsed = !this.collapsed;
    }
    console.log(value);
  }

  filterCountry(event: HaloSelectTypeaheadChange) {
    const filterValue = event.value.toLowerCase();
    this.countriesFiltered = this.countryList.filter(option => option.label?.toLowerCase().includes(filterValue));
    this._changeDetectorRef.markForCheck();
  }

  onCollapsed(): void {
    this.collapsed = !this.collapsed;
  }

  onBadge(event: any): void {
    this.badgeCount = null;
  }
  badgeCount?: number = 1;
  addData() {
    setTimeout(() => {
      this.badgeCount = 21;
      setTimeout(() => {
        this.badgeCount = 1;
        setTimeout(() => {
          this.badgeCount = 979;
          setTimeout(() => {
            this.badgeCount = 2;
            setTimeout(() => {
              this.badgeCount = 22342;
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 200);

  }

  selectionChip(event: any) {
    console.log(event);
  }

  removeChip(event: any) {
    console.log(event);
  }

  changeChipStyles() {
    setTimeout(() => {
      this.chipSize = ChipSizings.small;
      setTimeout(() => {
        this.chipSize = ChipSizings.medium;
        setTimeout(() => {
          this.chipRemovable = true;
          setTimeout(() => {
            this.chipSize = ChipSizings.small;
            setTimeout(() => {
              this.chipSize = ChipSizings.medium;
              setTimeout(() => {
                this.chipRemovable = false;
                setTimeout(() => {
                  this.chipSize = ChipSizings.small;
                  setTimeout(() => {
                    this.chipSize = ChipSizings.medium;

                  }, 2000);
                }, 2000);
              }, 2000);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 200);
  }

  changeSwitch(value: boolean): void {
    this.switchV = value;
    console.log('active', this.switchV);
  }

  changeStep(value): void {
    console.log('Step index', value);
  }

  changeTab(tabGroup: TabGroupComponent): void {
    this.indexTabDemo = (this.indexTabDemo + 1 ) % tabGroup.tabs.length;
  }

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

  showSearchInput(value) {
    this.isShown = value;
    this._changeDetectorRef.detectChanges();
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

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogTest, {
      size: DialogSizings.small,
      autoFocus: false,
      data: { title: 'Dialog Title', content: 'Content...' }
    });

    dialogRef.afterClosed().pipe(takeUntil(this._destroyed$)).subscribe(result => {
      console.log('The dialog was closed with result:', result);
    })
  }

  onOkClick() {
    console.log('onOkClick');
  }
  onCancelClick() {
    console.log('onCancelClick');
  }

  changeAlert(ev) {
    console.log('action', ev.target);
  }

  actionAlert(ev) {
    console.log('close', ev.target);
  }

  closeAlert(ev) {
    console.log('close', ev.target);
  }

  changeExpandStatus(ev, index) {
    this.accordion[index].expanded = ev;
  }

  paginationInfo: PaginationInfo = {
    page: 1,
    itemsByPage: 10,
    total: 200,
  };

  paginationSizings = PaginationSizings;
  paginationVariants = PaginationVariants;
  paginationRadius = PaginationRadius;
  paginationAction = Actions;

  onLoadPageNumberRequested(pageRequested: number) {
    this.paginationInfo = { ...this.paginationInfo, page: pageRequested };
    console.log(this.paginationInfo);
  }
  
  onChangeTotalPagination(event: any): void {
    const target = event.target as HTMLInputElement;
    this.paginationInfo = { ...this.paginationInfo, total: Number(target.value) };
  }

  haloTooltipPosition = TooltipPosition;


  onStackedModalClick() {
    const count = 1;
    const dialogRef = this.dialog.open(DialogTest, {
      disableClose: true, 
      autoFocus: false, 
      data: {title: `Data Title - ${count}`, content: `Data Content - ${count}`, count,
      countryList: [
        { label: 'India', code: 'IN' },
        { label: 'Belarus', code: 'BY' },
        { label: 'Canada', code: 'CA' },
        { label: 'Japan', code: 'JP' },
        { label: 'Denmark', code: 'DK' },
        { label: 'Egypt', code: 'EG' },
        { label: 'France', code: 'FR' },
        { label: 'Argentina', code: 'AR' },
        { label: 'Germany', code: 'DE' },
        { label: 'Hungary', code: 'HU' },
      ]}});    
  }

  onCanceledUpload(): void {
    this.files = [];
    console.log('canceled upload');
  }

  files: Array<any> = [];

  onSelectedFilesToUpload(files: Array<any>): void {      
    // files.forEach(file => {
    //   const ref = setInterval(x=> {
    //     file.progress += 10;
    //     this.files = [...files];
    //     if(file.progress >= 100){
    //       clearInterval(ref);
    //     }
    //   }, 500);
    // });
  }

  check(value) {
    this.isChecked = value;
  }

  onRated(value: number): void {
    console.log('onRated', value);
  }

  inputSlider(e) {
    console.log('slider', e)
  }

  launchSnackbar() {
    const message = 'This is a snackbar'

    this._snackbarService.create({
      message: message,
      variant: 'light',
      elevation: 'elevated',
      enableAction: true,
      horizontalPosition: 'right',
      verticalPosition:'top',
      actionLabel: 'Close',
      autoclose: 3000,
      closeClick: () => console.log( 'closed snackbar')
    });
  }
}

@Component({
  selector: 'dialog-test',
  template: `
  <div dialogTitle>{{data.title}}</div>
  <div dialogContent>{{data.content}}
  <atlas-field *ngIf="data.count == 2 && data?.countryList.length">
        <atlas-field-label
          >Countries
          <span class="required-indicator">*</span></atlas-field-label
        >
        <atlas-select [placeholder]="'Select a country'">
          <atlas-option
            *ngFor="let option of data.countryList"
            [value]="option"
            >{{ option.label }}</atlas-option
          >
        </atlas-select>
      </atlas-field>
  </div>
  <div dialogActions align="end">
    <atlas-button [variant]="variantText" [action]="actions.primary" (onClick)="openDialog()">Open Other</atlas-button>      
    <atlas-button [variant]="variantText" [action]="actions.primary" (onClick)="onNoClick()">Close</atlas-button>
    <atlas-button [variant]="variantText" [action]="actions.primary" (onClick)="closeAll()">Close All</atlas-button>
  </div>`
  ,
})
export class DialogTest {
  variantText: ButtonVariants = ButtonVariants.text;
  actions = Actions;

  constructor(
    public dialog: Dialog,
    public dialogRef: DialogRef<DialogTest>,
    @Inject(HALO_DIALOG_DATA) public data: any) { 
      data.count++;
    }

  onNoClick(): void {
    this.dialogRef.close({ data: 'Close' });
  }

  closeAll(): void {
    this.dialog.closeAll();
  }

  openDialog(): void {
    const dialogRef =
      this.dialog.open(DialogTest,
        {
          disableClose:true, 
          autoFocus: false, 
          data: {title: `Data Title - ${this.data.count}`, content: `Data Content - ${this.data.count}`, count: this.data.count }}
      );
  }
}
