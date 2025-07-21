import { Component, Inject, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Actions, ButtonVariants } from 'atlas-button';
import {
  Actions as CdkActions,
  BoxShadows,
  defaultConfig,
  Dialog,
  DialogRef,
  DialogSizings,
  HALO_DIALOG_DATA,
  ThemingService,
} from 'atlas-cdk';
import { SnackbarService } from 'atlas-snackbar';
import { TooltipPosition } from 'atlas-tooltip';

@Component({
  selector: 'app-lazy-module',
  templateUrl: './lazy-module.component.html',
  styleUrls: ['./lazy-module.component.scss']
})
export class LazyModuleComponent implements OnInit {
  haloTooltipPosition = TooltipPosition;
  variant = 'primary';
  barStyle = 'simple';
  labeled = true;
  type = 'circular';
  valueProgress: any = new FormControl('');
  action: Actions = Actions.primary;
  isChecked: boolean = true;
  actions = CdkActions;
  model = 'apples';
  elevation: BoxShadows = BoxShadows.elevated;
  initialData = [
    {
      name: 'File: 1',
      subFiles: [
        {
          name: 'File 1-1',
          subFiles: [
            {
              name: 'File 1-1-1',
            },
            {
              name: 'File 1-1-2',
            }
          ]
        },
        {
          name: 'File 1-2',
        },
        {
          name: 'File 1-3',
        }
      ]
    }
  ];
  indexTracker = [];
  currentList: any;


  constructor(
    themingService: ThemingService,
    public dialog: Dialog,
    public _snackbar: SnackbarService
  ) {
    themingService.applyConfig(defaultConfig);
    this._snackbar.create({
      message: "Hi!! this is a snackbar component",
      variant: 'dark',
      elevation: 'elevated',
      enableAction: true,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      actionLabel: 'Accept',
      actionClick:  (event) => {
            console.log('clicked action', event);
            event.stopPropagation()
      },
      closeClick: () => this.snackbarClicks()
    });

 }

  ngOnInit(): void {
    this.currentList = this.initialData;
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onOkClick() {
    console.log('onOkClick');
  }
  onCancelClick() {
    console.log('onCancelClick');
  }

 labeledChange() {
  this.labeled = !this.labeled
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogLazyTest, {
      size: DialogSizings.small,
      autoFocus: false,
      data: { title: 'Dialog Title', content: 'Content...' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result:', result);
    })
  }

  onChange(e) {
    console.log('checkbox event', e)
  }

  onCanceledUpload(): void {
    this.files = [];
    console.log('canceled upload');
  }

  files: Array<any> = [];

  onSelectedFilesToUpload(files: Array<any>): void {      
    files.forEach(file => {
      const ref = setInterval(x=> {
        file.progress += 10;
        this.files = [...files];    
        if(file.progress >= 100){
          console.log('files', this.files);
          clearInterval(ref);
        }      
      }, 500); 
    });
  }

  goForward(event: MouseEvent, idx: number) {
    event.stopPropagation();
    this.indexTracker.push(idx);
    this.currentList = this.currentList[idx].subFiles;
  }

  goBack() {
    this.indexTracker.pop();
    this.currentList = this.indexTracker.length
      ? this.indexTracker.reduce((acc, index) => acc[index].subFiles, this.initialData)
      : this.initialData;
  }

  setModel(e) {
    console.log('event', e);
  }

  snackbarClicks() {
    console.log('give some click')
  }

}

@Component({
  selector: 'dialog-lazy',
  template: `
  <div dialogTitle>{{data.title}}</div>
  <div dialogContent>{{data.content}}</div>
  <div dialogActions align="end">
    <atlas-button [variant]="variantText" [action]="actions.primary" (onClick)="openDialog()">Open Other</atlas-button>      
    <atlas-button [variant]="variantText" [action]="actions.primary" (onClick)="onNoClick()">Close</atlas-button>
    <atlas-button [variant]="variantText" [action]="actions.primary" (onClick)="closeAll()">Close All</atlas-button>
  </div>`
  ,
})
export class DialogLazyTest {
  variantText: ButtonVariants = ButtonVariants.text;
  actions = Actions;

  constructor(
    public dialog: Dialog,
    public dialogRef: DialogRef<DialogLazyTest>,
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
      this.dialog.open(DialogLazyTest, 
        {
          disableClose:true, 
          autoFocus: false, 
          data: {title: `Data Title - ${this.data.count}`, content: `Data Content - ${this.data.count}`, count: this.data.count }}
      );
  }
}
