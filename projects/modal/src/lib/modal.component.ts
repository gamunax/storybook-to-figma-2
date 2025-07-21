import { Component, EventEmitter, Inject, Input, Output, TemplateRef } from '@angular/core';
import { ButtonVariants } from 'atlas-button';
import { Actions, Colors, Dialog, DialogRef, DialogSizings, HALO_DIALOG_DATA, Styles } from 'atlas-cdk';

import { IData } from './modal.const';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'modal',
  template: ` <div dialogTitle>
      <ng-container *ngIf="!data.headerRef; else HeaderCustomTemplate">
        {{ data.title }}
      </ng-container>
      <ng-template #HeaderCustomTemplate>
        <ng-container *ngTemplateOutlet="data.headerRef"></ng-container>
      </ng-template>
    </div>
    <div dialogContent>
      <ng-container *ngIf="!data.contentRef; else ContentCustomTemplate">
        {{ data.content }}
      </ng-container>
      <ng-template #ContentCustomTemplate>
        <ng-container *ngTemplateOutlet="data.contentRef"></ng-container>
      </ng-template>
    </div>
    <ng-container *ngIf="data.showDialogActions; else FooterCustomTemplate">
      <div dialogActions align="end">
        <atlas-button
          [style]="data?.variantAction ? data?.variantAction : data?.styleAction"
          [color]="data.cancelAction"
          (click)="onCancelClick()"
          >{{ data.cancelLabel }}</atlas-button
        >
        <atlas-button
          [style]="data?.variantAction ? data?.variantAction : data?.styleAction"
          [color]="data.okAction"
          (click)="onOkClick()"
          cdkFocusInitial
          >{{ data.okLabel }}</atlas-button
        >
      </div>
    </ng-container>
    <ng-template #FooterCustomTemplate>
        <ng-container *ngTemplateOutlet="data.footerRef"></ng-container>
    </ng-template>`,
})
export class Modal {
  constructor(public dialogRef: DialogRef<Modal>, @Inject(HALO_DIALOG_DATA) public data: IData) {}

  onOkClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }
}

@Component({
  selector: 'atlas-modal',
  template: ` <div (click)="launch()"><ng-content></ng-content></div> `,
})
export class ModalComponent {
  /** Title of dialog */
  @Input() title: string = '';
  /** Content string of dialog */
  @Input() content: string = '';
  /** Sizings of dialog*/
  @Input() size: DialogSizings = DialogSizings.small;
  /** Whether the dialog should focus the first focusable element on open. */
  @Input() autofocus: boolean = false;
  /** Whether the dialog has a backdrop. */
  @Input() hasBackdrop: boolean = true;
  /** Whether the user can use escape or clicking on the backdrop to close the modal. */
  @Input() disableClose: boolean = false;
  /** Label of Ok action */
  @Input() okLabel: string = 'Accept';
  /** Label of Cancel action */
  @Input() cancelLabel: string = 'Cancel';
  /** Action type for Ok action */
  @Input() okAction: Actions | Colors = Colors.brand;
  /** Action type for Cancel action */
  @Input() cancelAction: Actions | Colors = Actions.default;

  /**
   *  @deprecated This property is deprecated and will be removed in a future version.
   *  Use `styleAction` instead.
   *  Select which variant to display, 
   */
  @Input() variantAction: ButtonVariants;

  /** Style of buttons */
  @Input() styleAction: Styles = Styles['no-fill'];
   /** Custom Template References for header */
  @Input() headerRef?: TemplateRef<HTMLObjectElement>;
  /** Custom Template References for content */
  @Input() contentRef?: TemplateRef<HTMLObjectElement>;
  /** Custom Template References for footer */
  @Input() footerRef?: TemplateRef<HTMLObjectElement>;
  /** Emitted event when Ok action is clicked */
  @Output() onOkClick = new EventEmitter();
  /** Emitted event when Cancel action is clicked */
  @Output() onCancelClick = new EventEmitter();
  /** Show DialogActions from modal. */
  @Input() showDialogActions: boolean = true;
  /** Show DialogRef from modal. */
  private _dialogRef:  DialogRef<any>;
  private _destroyed$ = new Subject<void>();

  constructor(private _dialog: Dialog) {}

  /** @internal */
  launch(): void {
    const data: IData = {
      title: this.title,
      content: this.content,
      okLabel: this.okLabel,
      cancelLabel: this.cancelLabel,
      okAction: this.okAction,
      cancelAction: this.cancelAction,
      variantAction: this.variantAction,
      styleAction: this.styleAction,
      headerRef: this?.headerRef,
      contentRef: this?.contentRef,
      footerRef: this?.footerRef,
      showDialogActions: this.showDialogActions,
    };
    this._dialogRef = this._dialog.open(Modal, {
      autoFocus: this.autofocus,
      size: this.size,
      hasBackdrop: this.hasBackdrop,
      disableClose: this.disableClose,
      data,
    });

    this._dialogRef
      .afterClosed()
      .pipe(takeUntil(this._destroyed$))
      .subscribe((result: boolean) => {
        result ? this.onOkClick.emit() : this.onCancelClick.emit();
      });
  }

  /** close modal when dialogActions are hidden */
  closeModal(): void {
    this._dialogRef.close();
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}
