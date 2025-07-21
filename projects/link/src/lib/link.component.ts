
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Input, Output, QueryList, ViewEncapsulation } from '@angular/core';
import { Actions, ThemingService } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { Action } from 'rxjs/internal/scheduler/Action';
import { config } from './link.theming';

/**
 * link target values
 */
export enum LinkTargets {
  blank = "_blank",
  self = "_self",
  parent = "_parent",
  top = "_top",
}


/**
 * Link component is used as a basic  html link
 */
@Component({
  selector: 'atlas-link',
  template: `
    <a
      *ngIf="external; else routerTemplate"
      [href]="url"
      [target]="target"
      [ngClass]="[
        'link',
        typography,
        underline ? 'link-underline-' + action : 'link-' + action,
      ]"  
    >
      <ng-container *ngTemplateOutlet="linkTemplate"></ng-container>
    </a>
    <ng-template #routerTemplate>
    <a
      [routerLink]="[url]"
      [ngClass]="[
        'link',
        typography,
        underline ? 'link-underline-' + action : 'link-' + action,
      ]"  
    >
      <ng-container *ngTemplateOutlet="linkTemplate"></ng-container>
    </a>
    </ng-template>
    <ng-template #linkTemplate>
        <ng-content></ng-content>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class LinkComponent {
  /**
   * Underline option.
   */
  @Input() underline: boolean = false;

  /**
   * Select if the link is external or not, this determines if the component uses an href attribute or routerLink.
   */
  @Input() external: boolean = false;

  /**
   * Color action for link.
   */
  @Input() action = Actions.primary;

  /**
   * Color action for link.
   */
   @Input() target = LinkTargets.blank;

  /**
   * Typography for the link.
   */
  @Input() typography: string = 'typographyStyles-body-medium';

  /**
   * Custom url for link.
   */
  @Input() url: string = '';

  constructor(
    private themingService: ThemingService,
  ) {
    this.themingService.applyConfig(config);
  }

}

