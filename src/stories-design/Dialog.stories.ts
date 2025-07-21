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
  template:`
  <div dialogTitle>{{data.title}}</div>
  <div dialogContent>{{data.content}}</div>
  <div dialogActions align="end">
    <atlas-button [variant]="variantText" [action]="actions.primary" (click)="onNoClick()">Action</atlas-button>
    <atlas-button [variant]="variantText" [action]="actions.primary" [dialogClose]="'Ok'" cdkFocusInitial>Action</atlas-button>    
  </div>` 
  ,
})
class DialogTest {

  variantText:ButtonVariants = ButtonVariants.text;
  actions = Actions;

  constructor(
    public dialogRef: DialogRef<DialogTest>,
    @Inject(HALO_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close({data: 'Close'});
  }

}
/** Finish Dialog Test */

/** LaunchDialogComponent launch DialogTest component as a modal dialog */
@Component({
  selector: 'launcher',
  template: `
     <atlas-button (click)="launch()">Open dialog</atlas-button>
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
  @Input() hasBackdrop: boolean = true;
  /** Whether the user can use escape or clicking on the backdrop to close the modal. */
  @Input() disableClose: boolean = false;
  constructor(private _dialog: Dialog) { }

  launch(): void {
      this._dialog.open(DialogTest, {
          autoFocus: this.autofocus,
          size: this.size,
          hasBackdrop: this.hasBackdrop,
          disableClose: this.disableClose,
          data: {
              title: this.title,
              content: this.content
          }
      });
  }
}
/** Finish LaunchDialogComponent  */

export default {
  title: 'Adopters/Components/Modal/Dialog',
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
  template:\`
  <div dialogTitle>{{data.title}}</div>
  <div dialogContent>{{data.content}}</div>
  <div dialogActions align="end">
    <atlas-button [variant]="variantText" [action]="actions.primary" (click)="onNoClick()">Action</atlas-button>
    <atlas-button [variant]="variantText" [action]="actions.primary" [dialogClose]="'Ok'" cdkFocusInitial>Action</atlas-button>    
  </div>\` 
  ,
})
class DialogTest {

  variantText:ButtonVariants = ButtonVariants.text;
  actions = Actions;

  constructor(
    public dialogRef: DialogRef<DialogTest>,
    @Inject(HALO_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close({data: 'Close'});
  }

}
/** Finish Dialog Test */

/** LaunchDialogComponent launch DialogTest component as a modal dialog */
@Component({
  selector: 'launcher',
  template: \`
     <atlas-button (click)="launch()">Open dialog</atlas-button>
  \`
})
class LaunchDialogComponent {
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() size: DialogSizings = DialogSizings.medium;
  @Input() autofocus: boolean = false;
  @Input() hasBackdrop: boolean = true;
  @Input() disableClose: boolean = false;
  
  constructor(private _dialog: Dialog) { }

  launch(): void {
      this._dialog.open(DialogTest, {
          autoFocus: this.autofocus,
          size: this.size,
          hasBackdrop: this.hasBackdrop,
          disableClose: this.disableClose,
          data: {
              title: this.title,
              content: this.content
          }
      });
  }
}
/** Finish LaunchDialogComponent  */
`;

export const Basic = DialogBasic.bind({});
Basic.args = {
  title: 'Dialog Title',
  content: 'Content...',
  size: DialogSizings.small,
  autofocus: false,
};
Basic.parameters = {
  docs: {
    source: {
      code: DOC,
    },
  },
};

