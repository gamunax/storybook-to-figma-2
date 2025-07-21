
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, ViewEncapsulation,  ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { DomSanitizer} from '@angular/platform-browser';
import { Actions, BoxShadows, ThemingService } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { ButtonSizings, ButtonVariants } from 'atlas-button';
import { config } from './snackbar.theming';
import { SnackbarConfig } from './snackbar.config';
import { SnackbarService } from './snackbar.service';

/**
 * @ignore
 */
 @Component({
  selector: 'atlas-snackbar-content',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarContentComponent { }

/**
 * @ignore
 */
 @Component({
   selector: "atlas-snackbar-action",
   template: `<div>
                  <atlas-button
                    [size]="size"
                    [action]="action"
                    [variant]="variant"
                    [customClass]="customClass"
                    (onClick)="selectAction($event)"
                  >
                    <span>
                      {{ nameAction }}
                    </span>
                  </atlas-button>
              </div>`,
   changeDetection: ChangeDetectionStrategy.OnPush,
 })
 export class SnackbarActionComponent {
  @Input() size: ButtonSizings = ButtonSizings.medium;
  @Input() action: Actions = Actions.default;
  @Input() variant: ButtonVariants = ButtonVariants.text;
  @Input() nameAction: string = '';
  @Input() customClass: string = '';
   /**
    * Action event.
    */
   @Output() actionClick: EventEmitter<any> = new EventEmitter();

   selectAction(ev) {
     this.actionClick.emit(ev);
     ev.stopPropagation();
   }
 }

/**
 * The Snackbar component is deprecated and will be removed in a future version. Use the Alert component instead.
 * The Snackbar provides brief notifications and is also commonly known as a toast.
 */
@Component({
  selector: 'atlas-snackbar',
  template: `
    <div
      [ngClass]="[
        'snackbar',
        'snackbar-variant-' + snackbarConfig.variant,
        'box-shadow-elevation-' + snackbarConfig.elevation,
        'snackbar-position-' + snackbarConfig.verticalPosition + '-' + snackbarConfig.horizontalPosition
      ]"  
     >
     <ng-container *ngIf="!shouldRenderExternalComponent">
        <div [class]="[typographyContent]">
          <div [innerHtml]="snackbarConfig.message"></div>
          <ng-template #contentTemplate>
            <ng-content select="atlas-snackbar-content"></ng-content>
          </ng-template>
        </div>
        <div [class]="[
          'snackbar-action',
          typographyAction,
          'margin-left-8']"
        >
          <atlas-snackbar-action *ngIf="snackbarConfig.enableAction" [customClass]="'snackbar-variant-' + snackbarConfig.variant + '-atlas-action-button'"
          [nameAction]="snackbarConfig.actionLabel"
          (actionClick)="actionEmit($event)"></atlas-snackbar-action>
          <div>
            <atlas-icon-button [customClass]="'snackbar-variant-' + snackbarConfig.variant + '-atlas-icon-button'"
             [icon]="iconClose" [size]="iconSize" (onClick)="closeEmit($event)"></atlas-icon-button>
          </div>
        </div>
      </ng-container>
      <ng-template #externalComponent *ngIf="shouldRenderExternalComponent"></ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
    /** Shadow elevation of the accordion group */
    @Input() elevation = BoxShadows.flat;

   /**
   * @internal
   * Used to determine if any children exists from ng-content
   */
    @ContentChildren(SnackbarContentComponent, {descendants: true}) _snackbarContentChildren: QueryList<SnackbarContentComponent> | undefined;

   /**
   * @internal
   * Used to determine if any children exists from ng-content
   */
    @ContentChildren(SnackbarActionComponent, {descendants: true}) _snackbarActionChildren: QueryList<SnackbarActionComponent> | undefined;

  /**
   * The variant color.
   */
  @Input() variant: string = 'dark';

  /**
   * The size of the icon.
   */
  @Input() iconSize: IconSizes = IconSizes.medium;

  /**
   * Typography for the alert content.
   */
  @Input() typographyContent: string = 'typographyStyles-body-small';

  /**
   * Typography for the alert action.
   */
  @Input() typographyAction: string = 'typographyStyles-button-medium';

  /**
   * Icon for close alert.
   */
  @Input() iconClose: string = 'icon-remove-24';

  /**
   * Label for action button.
   */
  @Input() actionLabel: string = 'ACTION';

  /**
   * Vertical position for snackbar.
   */
  @Input() verticalPosition: string = 'top';
  /**
   * Horizontal position for snackbar.
   */
  @Input() horizontalPosition: string = 'right';
  /**
   * Autoclose property for snackbar. Set by default for 3sec (3000). Set it to 0 to disable autoclose
   */
  @Input() autoclose: number = 3000;

  /**
   * Close event.
   */
   @Output() closeClick: EventEmitter<any> = new EventEmitter;

  @ViewChild('externalComponent', { read: ViewContainerRef, static: false }) externalComponent!: ViewContainerRef;

  protected shouldRenderExternalComponent: boolean = false;

  constructor(
    private themingService: ThemingService,
    public snackbarConfig: SnackbarConfig,
    private _cdr: ChangeDetectorRef,
    private snackbarService: SnackbarService,
    private sanitizer: DomSanitizer
  ) {
    this.themingService.applyConfig(config);
  }

  setExternalComponent(componentToCreate: ComponentType<any>, parameters) {
    this.shouldRenderExternalComponent = true;
    this._cdr.detectChanges();

    if (this.externalComponent) {
      const componentRef = this.externalComponent.createComponent(componentToCreate);

      if (parameters) {
        Object.keys(parameters).forEach((key) => {
          componentRef.instance[key] = parameters[key];
        });
      }
      componentRef.changeDetectorRef.detectChanges();
    }
  }

  actionEmit(event) {
      this.snackbarConfig.actionClick(event);
      this.snackbarService.destroySnackbar();
  }

  closeEmit(event) {
      this.snackbarConfig.closeClick(event);
      this.closeClick.emit(event);
      this.snackbarService.destroySnackbar();
  }

}

