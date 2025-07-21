// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Component, Inject, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule, ButtonVariants } from 'atlas-button';
import { Actions, Dialog, DialogModule, DialogRef, DialogSizings, HALO_DIALOG_DATA } from 'atlas-cdk';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';

/** Dialog Test */
@Component({
  selector: 'dialog-test',
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
class DialogTest {
  variantText: ButtonVariants = ButtonVariants.text;
  actions = Actions;

  constructor(
    public dialog: Dialog,
    public dialogRef: DialogRef<DialogTest>,
    @Inject(HALO_DIALOG_DATA) public data: any) { 
      data.count = Math.floor(Math.random() * 100);
    }

  
  onNoClick(): void {
    this.dialogRef.close({ data: 'Close' });
  }

  closeAll(): void {
    this.dialog.closeAll();
  }

  openDialog(): void {
    let size = DialogSizings.small;
    switch (Math.floor(Math.random()* 4)) {
      case 0:
        size= DialogSizings.small;
        break;
      case 1:
        size= DialogSizings.medium;
        break;
      case 2:
        size= DialogSizings.large;
        break;
      case 3:
        size= DialogSizings.xlarge;
        break;
      default:
        size= DialogSizings.small;
        break;
    }
    const dialogRef = 
      this.dialog.open(DialogTest, 
        {
          disableClose: true, 
          autoFocus: false, 
          hasBackdrop: true,
          backdropClass: 'no-class',
          size,
          data: {title: `Data Title - ${this.data.count}`, content: `Data Content - ${this.data.count}`, count: this.data.count }}
      );
  }
}
/** Finish Dialog Test */

/** LaunchDialogComponent launch DialogTest component as a modal dialog */
@Component({
  selector: 'launcher',
  template: `
     <atlas-button (click)="open()">Open dialog</atlas-button>
  `
})
class LaunchDialogComponent {
  /** Example of title */
  @Input() title: string = '';
  /** Example of content */  
  @Input() content: string = '';
  /** Sizings of dialog*/
  @Input() size: DialogSizings = DialogSizings.medium;
  /** Whether the dialog should focus the first focusable element on open. */
  @Input() autofocus: boolean = false;
  /** Whether the dialog has a backdrop. */
  @Input() hasBackdrop: boolean = false;
  /** Whether the user can use escape or clicking on the backdrop to close the modal. */
  @Input() disableClose: boolean = true;
  constructor(private _dialog: Dialog) { }

  open(): void {
    const count = Math.floor(Math.random() * 100);
    this._dialog.open(DialogTest, {
        autoFocus: this.autofocus,
        size: this.size,
        hasBackdrop: this.hasBackdrop,
        disableClose: this.disableClose,
        data: {
            title: `${this.title} - ${count}`,
            content: `${this.content} - ${count}`
        }
    });
  }
}
/** Finish LaunchDialogComponent  */

export default {
  title: 'Adopters/Components/Modal/Dialog/Stacked',
  component: LaunchDialogComponent,
  decorators: [
    moduleMetadata({
      declarations:[DialogTest],
      imports:[DialogModule, BrowserAnimationsModule, ButtonModule]
    }),
    withDesign,
  ],
  parameters: {
    badges: [BADGES.ALPHA],
    controls: { sort: 'requiredFirst' },
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/x74LhhNgStoUDZtMqGjGhg/Foundation-0.0.2?node-id=12412%3A25632',
    //   allowFullscreen: true,
    // },
    options: {
      isToolshown: true
    },
  },  
} as Meta;

const DialogBasic: Story<LaunchDialogComponent> = (args: LaunchDialogComponent) => ({
  props: { ...args }, 
});

const DOC = `

import { ButtonModule, ButtonVariants } from 'atlas-button';
import { Actions, Dialog, DialogModule, DialogRef, DialogSizings, HALO_DIALOG_DATA } from 'atlas-cdk';

/** Dialog Test */
@Component({
  selector: 'dialog-test',
  template: \`
  <div dialogTitle>{{data.title}}</div>
  <div dialogContent>{{data.content}}</div>
  <div dialogActions align="end">
    <atlas-button [variant]="variantText" [action]="actions.primary" (onClick)="openDialog()">Open Other</atlas-button>      
    <atlas-button [variant]="variantText" [action]="actions.primary" (onClick)="onNoClick()">Close</atlas-button>
    <atlas-button [variant]="variantText" [action]="actions.primary" (onClick)="closeAll()">Close All</atlas-button>
  </div>\`
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
          data: {title: \`Data Title - \${this.data.count}\`, content: \`Data Content - \${this.data.count}\`, count: this.data.count }}
      );
  }
}
/** Finish Dialog Test */

/** LaunchDialogComponent launch DialogTest component as a modal dialog */
@Component({
  selector: 'launcher',
  template: \`
     <atlas-button (click)="open()">Open dialog</atlas-button>
  \`
})
class LaunchDialogComponent {
  /** Example of title */
  @Input() title: string = '';
  /** Example of content */  
  @Input() content: string = '';
  /** Sizings of dialog*/
  @Input() size: DialogSizings = DialogSizings.medium;
  /** Whether the dialog should focus the first focusable element on open. */
  @Input() autofocus: boolean = false;
  /** Whether the dialog has a backdrop. */
  @Input() hasBackdrop: boolean = true;
  /** Whether the user can use escape or clicking on the backdrop to close the modal. */
  @Input() disableClose: boolean = true;
  constructor(private _dialog: Dialog) { }

  open(): void {
    const count = 1;
    this._dialog.open(DialogTest, {
        autoFocus: this.autofocus,
        size: this.size,
        hasBackdrop: this.hasBackdrop,
        disableClose: this.disableClose,
        data: {
            title: \`\${this.title} - \${count}\`,
            content: \`\${this.content} - \${count}\`
        }
    });
  }
}
/** Finish LaunchDialogComponent  */
`;

export const Stacked = DialogBasic.bind({});
Stacked.args = {
  ...Stacked.args,
  title: 'Data Title',
  content: 'Data Content',
  count: 1,
  size: DialogSizings.small,
  autofocus: false,
  hasBackdrop: true,
  disableClose: true,
};
Stacked.parameters = {
  docs: {
    source: {
      code: DOC,
    },
  },
};

