
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { Actions, BoxShadows, ThemingService, ButtonVariants, ButtonSizings, Colors, Styles } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { config } from './alert.theming';
import { AlertService } from './alert.service';

/**
 * @ignore
 */
 @Component({
  selector: 'atlas-alert-title',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertTitleComponent { }

/**
 * @ignore
 */
 @Component({
  selector: 'atlas-alert-content',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertContentComponent { }

/**
 * The alert action is the default lock up for an action button inside of the alert
 */
 @Component({
  selector: 'atlas-alert-action',
  template: `<div>
              <atlas-button
                [size]="size"
                [color]="(action ? action : color)"
                [style]="(variant ? variant: style)"
                [expand]="true"
                [customClass]="customClass"
                (onClick)="selectAction($event)"
                >
                    {{nameAction}}
              </atlas-button>
             </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertActionComponent { 
  /**
   * Size of the alert action button
   */
  @Input() size: ButtonSizings = ButtonSizings.small;

  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * Action color of the alert action button
   */
  @Input() action: Actions;

  /**
    * Action color of the alert action button
    */
  @Input() color: Colors | Actions = Colors.neutral;

  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `style` instead.
   *
   * The variant of the alert action button
   */
  @Input() variant: ButtonVariants | string; // add string type to support deprecated property

  /**
   *
   * The variant of the alert action button
   */
  @Input() style: Styles | ButtonVariants | string = Styles['no-fill']; // add string type to support deprecated property

  /**
   * The text of the alert action button
   */
  @Input() nameAction: string;
  /**
   * Set a custom class for the alert action button
   */
  @Input() customClass: string = '';
  /**
   * Typography for the alert action button.
   */
   @Input() typographyAction: string = 'typographyStyles-button-medium';
  /**
   * Alert action button output.
   */
    @Output() actionClick: EventEmitter<any> = new EventEmitter;

  selectAction(ev) {
    this.actionClick.emit(ev);
  }
}

/**
 * An alert displays a short, important message in a way that attracts the user's attention without interrupting the user's task.
 */
@Component({
  selector: 'atlas-alert',
  template: `
    <div
      *ngIf="isVisible"
      [ngClass]="[
        'alert',
        'alert-variant-' + (variant ? variant: style),
        'alert-variant-'+ (variant ? variant: style) +'-'+ (action ? action : color),
        'box-shadow-elevation-' + elevation,
        'alert-position-' + verticalPosition + '-' + horizontalPosition
      ]"  
      [ngStyle]="{ width: width }"
     >
     <div class="row">
      <div class="column shrink">
        <atlas-icon [className]="'padding-y-2 padding-right-2 alert-variant-' + (variant ? variant: style) + '-' + (action ? action : color) + '-atlas-icon'" [collection]="iconCollection" [icon]="alertIcon" [size]="iconSize" [iconSheetUrl]="iconSheetUrl"></atlas-icon>
      </div>
      <div class="column alert-center">
        <div class="alert-title-container">
          <div [class]="[
            'alert-title', 
            typographyTitle ]"
          >
            <ng-content select="atlas-alert-title"></ng-content>
          </div>
            <div [class]="[
            'alert-content',
            'padding-top-1', 
            typographyContent]"
          >
            <ng-content select="atlas-alert-content"></ng-content>
          </div>
        </div> 
      </div>
      <div class="shrink">
        <div class="alert-right-container">
           <div [class]="[
            'alert-action', alertActionPadding,
            ]"
          >
            <atlas-alert-action
            [style]="getActionButtonStyle()"
            [color]="action ? action : color"
            (actionClick)="onAction($event)"
            [nameAction]="actionLabel"
            [size]="buttonSize"
            >
          </atlas-alert-action>
          </div>
          <div *ngIf="dismissible" class="alert-close-container">
            <atlas-icon-button [customClass]="'alert-variant-' + (variant ? variant: style) + '-' + (action ? action : color) + '-atlas-icon-button'" [collection]="iconCloseCollection" [iconSheetUrl]="iconCloseSheetUrl" [icon]="iconClose" [size]="iconSize" [dense]="true" (onClick)="closeEmit($event)"></atlas-icon-button>
          </div>
        </div>
      </div>
     </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent {

   /**
   * @internal
   * Used to determine if any children exists from ng-content
   */
    @ContentChildren(AlertTitleComponent, {descendants: true}) _alertTitleChildren: QueryList<AlertTitleComponent> | undefined;

   /**
   * @internal
   * Used to determine if any children exists from ng-content
   */
    @ContentChildren(AlertContentComponent, {descendants: true}) _alertContentChildren: QueryList<AlertContentComponent> | undefined;

   /**
   * @internal
   * Used to determine if any children exists from ng-content
   */
    @ContentChildren(AlertActionComponent, {descendants: true}) _alertActionChildren: QueryList<AlertActionComponent> | undefined;

  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `style` instead.
   * 
   * The variant color.
   */
  @Input() variant: string;

  /**
   * 
   * The variant color.
   */
  @Input() style: Styles = Styles.strong;


  /**
   * The padding of the alert action region
   */
  @Input() alertActionPadding: string = 'padding-right-0';

  /**
   * This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * 
   * The action color.
   */
  @Input() action: Actions;

  /**
  * Action color of the alert action button
  */
  @Input() color: Colors = Colors.neutral;

  /**
   * The action color.
   */
  @Input() iconSize: IconSizes = IconSizes.small;

   /**
   * The action color.
   */
  @Input() buttonSize: ButtonSizings = ButtonSizings.small;

  /**
   * The typography used for the alert title.
   */
  @Input() typographyTitle: string = 'typographyStyles-body-smallAlt';

  /**
   * Typography for the alert content.
   */
  @Input() typographyContent: string = 'typographyStyles-body-small';
  /**
   * Action button label.
   */
  @Input() actionLabel: string = 'ACTION';
  /**
   * Icon for the alert.
   */
  @Input() alertIcon: string = 'icon-error-24';
  /**
   * Collection for the icon.
   */
  @Input() iconCollection: string = 'system';
  /**
   * Icon sheet url.
  */
  @Input() iconSheetUrl: string = '';

  /**
   * Icon for close alert.
   */
  @Input() iconClose: string = 'remove';
  /**
   * Collection for the icon close.
   */
  @Input() iconCloseCollection: string = 'user-interface-solid';
  /**
   * Icon sheet url for the close icon.
   */
  @Input() iconCloseSheetUrl: string = '';

  /** Custom width for alert */
  @Input() width: string = '';
  /** Allows the alert to be dismissible and displays an X button in the top right */
  @Input() dismissible: boolean = true;
  /** Shadow elevation of the accordion group */
  @Input() elevation = BoxShadows.flat;
  /**
   * Vertical position for alert.
   */
  @Input() verticalPosition: string = '';
  /**
   * Horizontal position for alert.
   */
  @Input() horizontalPosition: string = '';
  /**
   * Action event.
   */
   @Output() actionClick: EventEmitter<any> = new EventEmitter;
  /**
   * Close event.
   */
   @Output() closeClick: EventEmitter<any> = new EventEmitter;

   /**
   * Visibility of the alert.
   */

   isVisible: boolean = true;

  constructor(
    private themingService: ThemingService,
    private alertService: AlertService,
  ) {
    this.themingService.applyConfig(config);
  }

  ngAfterContentInit() {}

  getActionButtonStyle(): string {
    if (this.style === Styles.outlined || this.style === Styles.soft || this.color === Colors.caution) {
      return Styles['no-fill'];
    }
    return Styles.strong;
  }

  onAction(event) {
    this.actionClick.emit(event);
    this.alertService?.destroyAlertSnackbar();
  }

  closeEmit(event) {
    this.closeClick.emit(event);
    this.alertService?.destroyAlertSnackbar();
  }

  toggle() {
    this.isVisible = !this.isVisible;
  }

}

