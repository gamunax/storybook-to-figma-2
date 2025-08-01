/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig, OverlayContainer, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType, TemplatePortal } from '@angular/cdk/portal';
import { Location } from '@angular/common';
import {
  Directive,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
  Optional,
  SkipSelf,
  StaticProvider,
  TemplateRef,
  Type,
} from '@angular/core';
import { defer, Observable, of as observableOf, Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { ThemingService } from '../theme/theming.service';
import { DialogConfig } from './dialog-config';
import { _DialogContainerBase, DialogContainer } from './dialog-container';
import { DialogRef } from './dialog-ref';
import { DialogSizings } from './dialog.const';
import { config } from './dialog.theming';

 
 /** Injection token that can be used to access the data that was passed in to a dialog. */
 export const HALO_DIALOG_DATA = new InjectionToken<any>('DialogData');
 
 /** Injection token that can be used to specify default dialog options. */
 export const HALO_DIALOG_DEFAULT_OPTIONS =
     new InjectionToken<DialogConfig>('atlas-dialog-default-options');
 
 /** Injection token that determines the scroll handling while the dialog is open. */
 export const HALO_DIALOG_SCROLL_STRATEGY =
     new InjectionToken<() => ScrollStrategy>('atlas-dialog-scroll-strategy');
 
 /** @docs-private */
 export function HALO_DIALOG_SCROLL_STRATEGY_FACTORY(overlay: Overlay): () => ScrollStrategy {
   return () => overlay.scrollStrategies.block();
 }
 
 /** @docs-private */
 export function HALO_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
   () => ScrollStrategy {
   return () => overlay.scrollStrategies.block();
 }
 
 /** @docs-private */
 export const HALO_DIALOG_SCROLL_STRATEGY_PROVIDER = {
   provide: HALO_DIALOG_SCROLL_STRATEGY,
   deps: [Overlay],
   useFactory: HALO_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
 };
 
 /**
  * Base class for dialog services. The base dialog service allows
  * for arbitrary dialog refs and dialog container components.
  */
 @Directive()
 export abstract class _DialogBase<C extends _DialogContainerBase> implements OnDestroy {
   private _openDialogsAtThisLevel: DialogRef<any>[] = [];
   private readonly _afterAllClosedAtThisLevel = new Subject<void>();
   private readonly _afterOpenedAtThisLevel = new Subject<DialogRef<any>>();
   private _ariaHiddenElements = new Map<Element, string|null>();
   private _scrollStrategy: () => ScrollStrategy;
 
   /** Keeps track of the currently-open dialogs. */
   get openDialogs(): DialogRef<any>[] {
     return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
   }
 
   /** Stream that emits when a dialog has been opened. */
   get afterOpened(): Subject<DialogRef<any>> {
     return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpenedAtThisLevel;
   }
 
   _getAfterAllClosed(): Subject<void> {
     const parent = this._parentDialog;
     return parent ? parent._getAfterAllClosed() : this._afterAllClosedAtThisLevel;
   }
 
   /**
    * Stream that emits when all open dialog have finished closing.
    * Will emit on subscribe if there are no open dialogs to begin with.
    */
   readonly afterAllClosed: Observable<void> = defer(() => this.openDialogs.length ?
       this._getAfterAllClosed() :
       this._getAfterAllClosed().pipe(startWith(undefined))) as Observable<any>;
 
   constructor(
       private _overlay: Overlay,
       private _injector: Injector,
       private _defaultOptions: DialogConfig|undefined,
       private _parentDialog: _DialogBase<C>|undefined,
       private _overlayContainer: OverlayContainer,
       scrollStrategy: any,
       private _dialogRefConstructor: Type<DialogRef<any>>,
       private _dialogContainerType: Type<C>,
       private _dialogDataToken: InjectionToken<any>) {
     this._scrollStrategy = scrollStrategy;
   }
   private _destroyed$ = new Subject<void>();
   /**
    * Opens a modal dialog containing the given component.
    * @param component Type of the component to load into the dialog.
    * @param config Extra configuration options.
    * @returns Reference to the newly-opened dialog.
    */
   open<T, D = any, R = any>(component: ComponentType<T>,
                             config?: DialogConfig<D>): DialogRef<T, R>;
 
   /**
    * Opens a modal dialog containing the given template.
    * @param template TemplateRef to instantiate as the dialog content.
    * @param config Extra configuration options.
    * @returns Reference to the newly-opened dialog.
    */
   open<T, D = any, R = any>(template: TemplateRef<T>,
                             config?: DialogConfig<D>): DialogRef<T, R>;
 
   open<T, D = any, R = any>(template: ComponentType<T> | TemplateRef<T>,
                             config?: DialogConfig<D>): DialogRef<T, R>;
 
   open<T, D = any, R = any>(componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
                             config?: DialogConfig<D>): DialogRef<T, R> {
     config = _applyConfigDefaults(config, this._defaultOptions || new DialogConfig());
 
     if (config.id && this.getDialogById(config.id)) {
       throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
     }
 
     const overlayRef = this._createOverlay(config);
     const dialogContainer = this._attachDialogContainer(overlayRef, config);
     const dialogRef = this._attachDialogContent<T, R>(componentOrTemplateRef,
                                                       dialogContainer,
                                                       overlayRef,
                                                       config);
 
     // If this is the first dialog that we're opening, hide all the non-overlay content.
     if (!this.openDialogs.length) {
       this._hideNonDialogContentFromAssistiveTechnology();
     }
 
     this.openDialogs.push(dialogRef);
     
     dialogRef.afterClosed().pipe(takeUntil(this._destroyed$)).subscribe(() => this._removeOpenDialog(dialogRef));
     this.afterOpened.next(dialogRef);
 
     // Notify the dialog container that the content has been attached.
     dialogContainer._initializeWithAttachedContent();
 
     return dialogRef;
   }
 
   /**
    * Closes all of the currently-open dialogs.
    */
   closeAll(): void {
     this._closeDialogs(this.openDialogs);
   }
 
   /**
    * Finds an open dialog by its id.
    * @param id ID to use when looking up the dialog.
    */
   getDialogById(id: string): DialogRef<any> | undefined {
     return this.openDialogs.find(dialog => dialog.id === id);
   }
 
   ngOnDestroy() {
     // Only close the dialogs at this level on destroy
     // since the parent service may still be active.
     this._closeDialogs(this._openDialogsAtThisLevel);
     this._afterAllClosedAtThisLevel.complete();
     this._afterOpenedAtThisLevel.complete();
     this._destroyed$.next();
     this._destroyed$.complete();
   }
 
   /**
    * Creates the overlay into which the dialog will be loaded.
    * @param config The dialog configuration.
    * @returns A promise resolving to the OverlayRef for the created overlay.
    */
   private _createOverlay(config: DialogConfig): OverlayRef {
     const overlayConfig = this._getOverlayConfig(config);
     return this._overlay.create(overlayConfig);
   }
 
   /**
    * Creates an overlay config from a dialog config.
    * @param dialogConfig The dialog configuration.
    * @returns The overlay configuration.
    */
   private _getOverlayConfig(dialogConfig: DialogConfig): OverlayConfig {
     const state = new OverlayConfig({
       positionStrategy: this._overlay.position().global(),
       scrollStrategy: dialogConfig.scrollStrategy || this._scrollStrategy(),
       panelClass: dialogConfig.panelClass,
       hasBackdrop: dialogConfig.hasBackdrop,
       direction: dialogConfig.direction,
       minWidth: dialogConfig.minWidth,
       minHeight: dialogConfig.minHeight,
       maxWidth: dialogConfig.maxWidth,
       maxHeight: dialogConfig.maxHeight,
       disposeOnNavigation: dialogConfig.closeOnNavigation
     });
 
     if (dialogConfig.backdropClass) {
       state.backdropClass = dialogConfig.backdropClass;
     }
 
     return state;
   }
 
   /**
    * Attaches a dialog container to a dialog's already-created overlay.
    * @param overlay Reference to the dialog's underlying overlay.
    * @param config The dialog configuration.
    * @returns A promise resolving to a ComponentRef for the attached container.
    */
   private _attachDialogContainer(overlay: OverlayRef, config: DialogConfig): C {
     const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
     const injector = Injector.create({
       parent: userInjector || this._injector,
       providers: [{provide: DialogConfig, useValue: config}]
     });
 
     const containerPortal = new ComponentPortal(this._dialogContainerType,
         config.viewContainerRef, injector, config.componentFactoryResolver);
     const containerRef = overlay.attach<C>(containerPortal);
 
     return containerRef.instance;
   }
 
   /**
    * Attaches the user-provided component to the already-created dialog container.
    * @param componentOrTemplateRef The type of component being loaded into the dialog,
    *     or a TemplateRef to instantiate as the content.
    * @param dialogContainer Reference to the wrapping dialog container.
    * @param overlayRef Reference to the overlay in which the dialog resides.
    * @param config The dialog configuration.
    * @returns A promise resolving to the DialogRef that should be returned to the user.
    */
   private _attachDialogContent<T, R>(
       componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
       dialogContainer: C,
       overlayRef: OverlayRef,
       config: DialogConfig): DialogRef<T, R> {
 
     // Create a reference to the dialog we're creating in order to give the user a handle
     // to modify and close it.
     const dialogRef = new this._dialogRefConstructor(overlayRef, dialogContainer, config.id);
 
     if (componentOrTemplateRef instanceof TemplateRef) {
       dialogContainer.attachTemplatePortal(
         new TemplatePortal<T>(componentOrTemplateRef, null!,
           <any>{$implicit: config.data, dialogRef}));
     } else {
       const injector = this._createInjector<T>(config, dialogRef, dialogContainer);
       const contentRef = dialogContainer.attachComponentPortal<T>(
           new ComponentPortal(componentOrTemplateRef, config.viewContainerRef, injector));
       dialogRef.componentInstance = contentRef.instance;
     }
 
     dialogRef
       .updateSize(config.width, config.height)
       .updatePosition(config.position);
 
     return dialogRef;
   }
 
   /**
    * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
    * of a dialog to close itself and, optionally, to return a value.
    * @param config Config object that is used to construct the dialog.
    * @param dialogRef Reference to the dialog.
    * @param dialogContainer Dialog container element that wraps all of the contents.
    * @returns The custom injector that can be used inside the dialog.
    */
   private _createInjector<T>(
       config: DialogConfig,
       dialogRef: DialogRef<T>,
       dialogContainer: C): Injector {
 
     const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
 
     // The dialog container should be provided as the dialog container and the dialog's
     // content are created out of the same `ViewContainerRef` and as such, are siblings
     // for injector purposes. To allow the hierarchy that is expected, the dialog
     // container is explicitly provided in the injector.
     const providers: StaticProvider[] = [
       {provide: this._dialogContainerType, useValue: dialogContainer},
       {provide: this._dialogDataToken, useValue: config.data},
       {provide: this._dialogRefConstructor, useValue: dialogRef}
     ];
 
     if (config.direction &&
         (!userInjector || !userInjector.get<Directionality | null>(Directionality, null))) {
       providers.push({
         provide: Directionality,
         useValue: {value: config.direction, change: observableOf()}
       });
     }
 
     return Injector.create({parent: userInjector || this._injector, providers});
   }
 
   /**
    * Removes a dialog from the array of open dialogs.
    * @param dialogRef Dialog to be removed.
    */
   private _removeOpenDialog(dialogRef: DialogRef<any>) {
     const index = this.openDialogs.indexOf(dialogRef);
 
     if (index > -1) {
       this.openDialogs.splice(index, 1);
 
       // If all the dialogs were closed, remove/restore the `aria-hidden`
       // to a the siblings and emit to the `afterAllClosed` stream.
       if (!this.openDialogs.length) {
         this._ariaHiddenElements.forEach((previousValue, element) => {
           if (previousValue) {
             element.setAttribute('aria-hidden', previousValue);
           } else {
             element.removeAttribute('aria-hidden');
           }
         });
 
         this._ariaHiddenElements.clear();
         this._getAfterAllClosed().next();
       }
     }
   }
 
   /**
    * Hides all of the content that isn't an overlay from assistive technology.
    */
   private _hideNonDialogContentFromAssistiveTechnology() {
     const overlayContainer = this._overlayContainer.getContainerElement();
 
     // Ensure that the overlay container is attached to the DOM.
     if (overlayContainer.parentElement) {
       const siblings = overlayContainer.parentElement.children;
 
       for (let i = siblings.length - 1; i > -1; i--) {
         let sibling = siblings[i];
 
         if (sibling !== overlayContainer &&
           sibling.nodeName !== 'SCRIPT' &&
           sibling.nodeName !== 'STYLE' &&
           !sibling.hasAttribute('aria-live')) {
 
           this._ariaHiddenElements.set(sibling, sibling.getAttribute('aria-hidden'));
           sibling.setAttribute('aria-hidden', 'true');
         }
       }
     }
   }
 
   /** Closes all of the dialogs in an array. */
   private _closeDialogs(dialogs: DialogRef<any>[]) {
     let i = dialogs.length;
 
     while (i--) {
       // The `_openDialogs` property isn't updated after close until the rxjs subscription
       // runs on the next microtask, in addition to modifying the array as we're going
       // through it. We loop through all of them and call close without assuming that
       // they'll be removed from the list instantaneously.
       dialogs[i].close();
     }
   }
 
 }
 
 /**
  * Service to open modal dialogs.
  */
 @Injectable()
 export class Dialog extends _DialogBase<DialogContainer> {
   constructor(
       overlay: Overlay,
       injector: Injector,      
       @Optional() location: Location,
       @Optional() @Inject(HALO_DIALOG_DEFAULT_OPTIONS) defaultOptions: DialogConfig,
       @Inject(HALO_DIALOG_SCROLL_STRATEGY) scrollStrategy: any,
       @Optional() @SkipSelf() parentDialog: Dialog,
       overlayContainer: OverlayContainer,
       private _themingService: ThemingService) {
     super(overlay, injector, defaultOptions, parentDialog, overlayContainer, scrollStrategy,
         DialogRef, DialogContainer, HALO_DIALOG_DATA);
         this._themingService.applyConfig(config);
   }
 }
 
 /**
  * Applies default options to the dialog config.
  * @param config Config to be modified.
  * @param defaultOptions Default options provided.
  * @returns The new configuration object.
  */
 function _applyConfigDefaults(
     config?: DialogConfig, defaultOptions?: DialogConfig): DialogConfig {
      config.width = config.size ?? DialogSizings.small;
         return {...defaultOptions, ...config};
 }