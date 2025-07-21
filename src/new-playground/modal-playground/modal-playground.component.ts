import { Component, Inject } from '@angular/core';
import { Actions, BoxShadows, Dialog, HALO_DIALOG_DATA, IconSizes } from 'atlas-cdk';
import { DialogTest } from '../new-playground.component';

@Component({
  selector: 'modal-playground',
  templateUrl: './modal-playground.component.html',
  styleUrls: ['./modal-playground.component.scss'],
})
export class ModalPlayground {
  actionsCdk = Actions;
  collapsed = false;
  iconSizes = IconSizes;
  elevation = BoxShadows.flat;
  dialogRef = null;
  private switchValueOn: Number = 0;
  constructor(public dialog: Dialog, @Inject(HALO_DIALOG_DATA) public data: any) {
    data.count = data.count++;
  }

  public onCancelClick(): void {
    console.log('cancel');
  }


  public onOkClick(): void {
    console.log('ok');
  }
  openDialog(): void {
    this.dialogRef = this.dialog.open(DialogTest, {
      disableClose: true,
      autoFocus: false,
      data: {
        title: `Data Title - ${this.data.count}`,
        content: `Data Content - ${this.data.count}`,
        count: this.data.count ?? 1,
      },
    });
  }
  public increase(): void {
    this.switchValueOn = 1;
  }

  public decrease(): void {
    this.switchValueOn = 0;
  }
  public get getSwitchValue(): boolean {
    return !!this.switchValueOn;
  }
  ngOnDestroy(): void {
    this.dialogRef.close();
  }

  openUserDeleteConfirm(event, infoTemplate?) {
    console.log('openUserDeleteConfirm', event);
  }
}
