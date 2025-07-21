import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { Dialog, HALO_DIALOG_SCROLL_STRATEGY_PROVIDER } from './dialog';
import { DialogContainer } from './dialog-container';
import { DialogActions, DialogClose, DialogContent, DialogTitle } from './dialog-content-directives';

 
 @NgModule({
    declarations: [
        DialogContainer,
        DialogClose,
        DialogTitle,
        DialogActions,
        DialogContent,
    ],
    imports: [
        OverlayModule,
        PortalModule,
    ],
    exports: [
        DialogContainer,
        DialogClose,
        DialogTitle,
        DialogContent,
        DialogActions,
    ],
    providers: [
        Dialog,
        HALO_DIALOG_SCROLL_STRATEGY_PROVIDER,
    ]
})
 export class DialogModule {}