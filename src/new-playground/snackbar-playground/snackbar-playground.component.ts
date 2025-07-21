import { Component, ChangeDetectorRef } from '@angular/core';
import { SnackbarService } from 'atlas-snackbar';
import { AlertService } from 'atlas-alert';
import { Actions, ButtonSizings, ButtonVariants } from 'atlas-cdk';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'snackbar-playground',
  templateUrl: './snackbar-playground.component.html',
  styleUrls: ['./snackbar-playground.component.scss'],
})
export class SnackbarPlayground {
  constructor(
    private _snackbarService: SnackbarService,
    private _alertService: AlertService,
    private _cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
  ) {}

  actions = Actions;
  buttonSizings = ButtonSizings;
  buttonVariants = ButtonVariants;

  launchSnackbar(): void {
    const message = 'This is a snackbar';

    this._snackbarService.create({
      message: message,
      variant: 'dark',
      elevation: 'elevated',
      enableAction: true,
      horizontalPosition: 'left',
      verticalPosition: 'top',
      actionLabel: 'Close',
      autoclose: 3000,
      closeClick: () => {
        console.log('Close snackbar');
      },
      actionClick: () => {
        console.log('Close snackbar');
      },
    });
    this._cdr.detectChanges();
  }

  launchCustomSnackbar(): void {
    const message = `<table class='custom-snackbar-table'>
    <tr>
      <th class='custom-snackbar-table__header'>Id</th>
      <th class='custom-snackbar-table__header'>Country</th>
      <th class='custom-snackbar-table__header'>Colleagues</th>
    </tr>
    <tr>
      <td class='custom-snackbar-table__row-column'>1</tfd>
      <td class='custom-snackbar-table__row-column'>Argentina</tfd>
      <td class='custom-snackbar-table__row-column'>114</tfd>
    </tr>
    <tr>
      <td class='custom-snackbar-table__row-column'>2</tfd>
      <td class='custom-snackbar-table__row-column'>Uruguay</tfd>
      <td class='custom-snackbar-table__row-column'>51</tfd>
    </tr>
    <tr>
      <td class='custom-snackbar-table__row-column'>3</tfd>
      <td class='custom-snackbar-table__row-column'>United States</tfd>
      <td class='custom-snackbar-table__row-column'>33</tfd>
    </tr>
    <tr>
      <td class='custom-snackbar-table__row-column'>4</tfd>
      <td class='custom-snackbar-table__row-column'>Colombia</tfd>
      <td class='custom-snackbar-table__row-column'>15</tfd>
    </tr>`;

    this._snackbarService.create(
      {
        message,
        variant: 'light',
        elevation: 'elevated',
        enableAction: true,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        actionLabel: 'Close',
        autoclose: 3000,
        closeClick: () => this._snackbarService.destroySnackbar(),
        title: 'This is a Snackbar with a table in it',
        label: 'this is a link',
        conclusion: 'to access the source of information',
        linkUrl: 'https://app.hibob.com/employeeDirectory/employee-clubs',
      },
      CustomSnackbarComponent,
    );
  }

  launchAlert1(): void {
    this._alertService.create({
      actionLabel: 'Close',
      title: 'MyTitle',
      autoclose: 5000,
      action: Actions.warning,
      variant: ButtonVariants.outlined,
      horizontalPosition: 'left',
      verticalPosition: 'top',
      alertIcon: 'icon-warning-outline-24',
    });
    this._cdr.detectChanges();
  }
  launchAlert2(): void {
    this._alertService.create({
      actionLabel: 'Close',
      title: 'MyTitle',
      autoclose: 5000,
      action: Actions.default,
      variant: ButtonVariants.outlined,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      alertIcon: 'icon-warning-outline-24',
    });
    this._cdr.detectChanges();
  }
  launchAlert3(): void {
    this._alertService.create({
      actionLabel: 'Close',
      title: 'MyTitle',
      autoclose: 5000,
      action: Actions.error,
      variant: ButtonVariants.outlined,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      alertIcon: 'icon-warning-outline-24',
    });
    this._cdr.detectChanges();
  }

  launchAlert4(): void {
    this._alertService.create({
      actionLabel: 'Close',
      title: 'MyTitle',
      autoclose: 5000,
      action: Actions.success,
      variant: ButtonVariants.outlined,
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      content: 'This is my content',
    });
    this._cdr.detectChanges();
  }
  launchAlert5(): void {
    this._alertService.create({
      actionLabel: 'Close',
      title: 'MyTitle',
      autoclose: 5000,
      action: Actions.info,
      variant: ButtonVariants.outlined,
      content: 'This is my content',
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
    this._cdr.detectChanges();
  }
}
