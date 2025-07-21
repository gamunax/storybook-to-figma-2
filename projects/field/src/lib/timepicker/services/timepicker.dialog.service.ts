import { ComponentType, FlexibleConnectedPositionStrategy, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { DialogConfig, HALO_DIALOG_DATA } from 'atlas-cdk';

import { TimepickerDirective } from '../directives/timepicker.directive';
import { TimepickerDialogRef } from '../utils/timepicker-dialog-ref.util';

@Injectable({
  providedIn: 'root',
})
export class TimepickerDialogService {
    private  xPosition: string = 'end';  
    private yPosition: string  = 'below';   
  
    constructor(private overlay: Overlay, private injector: Injector) {}
  
  /**
   * Open a custom component in an overlay
   */
  open<T>(component: ComponentType<T>, 
    input: TimepickerDirective,
    config?: DialogConfig): TimepickerDialogRef {
    // Globally centered position strategy
    const positionStrategy = this.overlay.position()
        .flexibleConnectedTo(input.getConnectedOverlayOrigin())
        .withTransformOriginOn('timepicker-content')
        .withFlexibleDimensions(false)
        .withViewportMargin(8)
        .withLockedPosition();

    // Create the overlay with customizable options
    const overlayRef = this.overlay.create({
      positionStrategy:this._setConnectedPositions(positionStrategy),
      hasBackdrop: true,
      backdropClass: 'overlay-backdrop',
      panelClass: 'overlay-panel',
    });

    // Create dialogRef to return
    const dialogRef = new TimepickerDialogRef(overlayRef);

    // Create injector to be able to reference the DialogRef from within the component
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: TimepickerDialogRef, useValue: dialogRef },
        { provide: HALO_DIALOG_DATA, useValue: config?.data },
      ],
    });

    // Attach component portal to the overlay
    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    overlayRef.backdropClick().subscribe(()=> overlayRef.dispose());

    return dialogRef;
  }

  private _setConnectedPositions(strategy: FlexibleConnectedPositionStrategy) {
    const primaryX = this.xPosition === 'end' ? 'end' : 'start';
    const secondaryX = primaryX === 'start' ? 'end' : 'start';
    const primaryY = this.yPosition === 'above' ? 'bottom' : 'top';
    const secondaryY = primaryY === 'top' ? 'bottom' : 'top';

    /** Offset accounts for padding on the input element and border. */
    const offsetY = 13;
    /** Offset accounts for padding on the input element, width of toggle element, and border */
    const offsetX = 65;

    return strategy.withPositions([
      {
        originX: primaryX,
        originY: secondaryY,
        overlayX: primaryX,
        overlayY: primaryY,
        offsetY: offsetY,
        offsetX: offsetX,
      },
      {
        originX: primaryX,
        originY: primaryY,
        overlayX: primaryX,
        overlayY: secondaryY,
        offsetY: 0 - offsetY,
        offsetX: offsetX,
      },
      {
        originX: secondaryX,
        originY: secondaryY,
        overlayX: secondaryX,
        overlayY: primaryY
      },
      {
        originX: secondaryX,
        originY: primaryY,
        overlayX: secondaryX,
        overlayY: secondaryY
      }
    ]);
  }
}
