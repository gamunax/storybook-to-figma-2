/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive, ElementRef, Input, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';

import { Dialog } from './dialog';
import { _closeDialogVia, DialogRef } from './dialog-ref';


/** Counter used to generate unique IDs for dialog elements. */
let dialogElementUid = 0;

/**
 * Button that will close the current dialog.
 */
@Directive({
  selector: '[atlas-dialog-close], [dialogClose]',
  exportAs: 'dialogClose',
  host: {
    '(click)': '_onButtonClick($event)',
    '[attr.aria-label]': 'ariaLabel || null',
    '[attr.type]': 'type',
  }
})
export class DialogClose implements OnInit, OnChanges {
  /** Screenreader label for the button. */
  @Input('aria-label') ariaLabel: string;

  /** Default to "button" to prevents accidental form submits. */
  @Input() type: 'submit' | 'button' | 'reset' = 'button';

  /** Dialog close input. */
  @Input('atlas-dialog-close') dialogResult: any;

  @Input('dialogClose') _dialogClose: any;

  constructor(
    // The dialog title directive is always used in combination with a `DialogRef`.
    // tslint:disable-next-line: lightweight-tokens
    @Optional() public dialogRef: DialogRef<any>,
    private _elementRef: ElementRef<HTMLElement>,
    private _dialog: Dialog) {}

  ngOnInit() {
    if (!this.dialogRef) {
      // When this directive is included in a dialog via TemplateRef (rather than being
      // in a Component), the DialogRef isn't available via injection because embedded
      // views cannot be given a custom injector. Instead, we look up the DialogRef by
      // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
      // be resolved at constructor time.
      this.dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs)!;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const proxiedChange = changes['_dialogClose'] || changes['_dialogCloseResult'];

    if (proxiedChange) {
      this.dialogResult = proxiedChange.currentValue;
    }
  }

  _onButtonClick(event: MouseEvent) {
    // Determinate the focus origin using the click event, because using the FocusMonitor will
    // result in incorrect origins. Most of the time, close buttons will be auto focused in the
    // dialog, and therefore clicking the button won't result in a focus change. This means that
    // the FocusMonitor won't detect any origin change, and will always output `program`.
    _closeDialogVia(this.dialogRef,
        event.screenX === 0 && event.screenY === 0 ? 'keyboard' : 'mouse', this.dialogResult);
  }
}

/**
 * Title of a dialog element. Stays fixed to the top of the dialog when scrolling.
 */
@Directive({
  selector: '[atlas-dialog-title], [dialogTitle]',
  exportAs: 'dialogTitle',
  host: {
    'class': 'atlas-dialog-title',
    '[id]': 'id',
    '[class]': 'typography'
  },
})
export class DialogTitle implements OnInit {
  @Input() id: string = `atlas-dialog-title-${dialogElementUid++}`;
  @Input() typography: string = 'typographyStyles-heading-small';

  constructor(
      // The dialog title directive is always used in combination with a `DialogRef`.
      // tslint:disable-next-line: lightweight-tokens
      @Optional() private _dialogRef: DialogRef<any>,
      private _elementRef: ElementRef<HTMLElement>,
      private _dialog: Dialog) {}

  ngOnInit() {
    if (!this._dialogRef) {
      this._dialogRef = getClosestDialog(this._elementRef, this._dialog.openDialogs)!;
    }

    if (this._dialogRef) {
      Promise.resolve().then(() => {
        const container = this._dialogRef._containerInstance;

        if (container && !container._ariaLabelledBy) {
          container._ariaLabelledBy = this.id;
        }
      });
    }
  }
}


/**
 * Scrollable content container of a dialog.
 */
@Directive({
  selector: `[atlas-dialog-content], atlas-dialog-content, [dialogContent]`,
  host: {
    'class': 'atlas-dialog-content',
    '[class]': 'typography'
  }
})
export class DialogContent {
  @Input() typography: string = 'typographyStyles-mobile-body-small';
}


/**
 * Container for the bottom action buttons in a dialog.
 * Stays fixed to the bottom when scrolling.
 */
@Directive({
  selector: `[atlas-dialog-actions], atlas-dialog-actions, [dialogActions]`,
  host: {'class': 'atlas-dialog-actions'}
})
export class DialogActions {}


/**
 * Finds the closest DialogRef to an element by looking at the DOM.
 * @param element Element relative to which to look for a dialog.
 * @param openDialogs References to the currently-open dialogs.
 */
function getClosestDialog(element: ElementRef<HTMLElement>, openDialogs: DialogRef<any>[]) {
  let parent: HTMLElement | null = element.nativeElement.parentElement;

  while (parent && !parent.classList.contains('atlas-dialog-container')) {
    parent = parent.parentElement;
  }

  return parent ? openDialogs.find(dialog => dialog.id === parent!.id) : null;
}