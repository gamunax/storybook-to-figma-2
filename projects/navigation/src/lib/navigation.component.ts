import { Component, Input, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { ButtonSizings, ButtonVariants } from 'atlas-button';
import { Actions, ThemingService } from 'atlas-cdk';
import { config } from './navigation.theming';


/** List of links to other pages, usually internal pages. Appearing primarily in the site’s sidebars or page headers. */
@Component({
  selector: 'atlas-navigation',
  template: `
    <div class="atlas-navigation-container">
      <div class="typographyStyles-body-small atlas-navigation-title" [ngClass]="['atlas-navigation-title-' + action]">{{title}}</div>
      <div>
        <ng-content select="atlas-nav-item"></ng-content>
      </div>
      <atlas-divider *ngIf="optionalSection" [vertical]="true" style="height: 24px; margin: 0 24px 0 0"></atlas-divider>
      <div *ngIf="optionalSection">
        <atlas-button [variant]="buttonVariant" [action]="action" [size]="buttonSize" (onClick)="eventSection($event)">{{optionalBtnLabel}}</atlas-button>
      </div>
    </div>
  `,
  styleUrls: ['./navigation.component.scss'],
})

export class NavigationComponent {
  /** Optional title */
  @Input() title?: string;
  /** Label for the optional section's button */
  @Input() optionalBtnLabel?: string;
  /** Set visible or not the optional section */
  @Input() optionalSection: boolean = false;
  /** Action color theme */
  @Input() action: Actions = Actions.default;
  /** Optional Section's button variant */
  @Input() buttonVariant: ButtonVariants = ButtonVariants.text;
  /** Optional Section's button size */
  @Input() buttonSize: ButtonSizings = ButtonSizings.medium;

  /** Emitted when the optional section's button is clicked */
  @Output() clickOption = new EventEmitter();

  constructor( private _themingService: ThemingService) {
    this._themingService.applyConfig(config);
  }

  /** @internal */
  eventSection(ev) {
    this.clickOption.emit(ev);
  }
}
@Component({
  selector: 'atlas-nav-item',
  template: `
    <atlas-label cdkOverlayOrigin 
          #overlayOrigin="cdkOverlayOrigin" 
          class="atlas-navigation-label typographyStyles-button-large"  
          [ngClass]="[
            'atlas-navigation-label-' + action,
            isOpen ? 'atlas-navigation-label-bottom-active atlas-navigation-label-bottom-active-' + borderAction : ''
          ]">
      <ng-content></ng-content>
    </atlas-label>

    <ng-template 
        cdkConnectedOverlay 
        cdkConnectedOverlayLockPosition
        cdkConnectedOverlayHasBackdrop
        cdkConnectedOverlayBackdropClass="cdk-overlay-transparent-backdrop"
        [cdkConnectedOverlayOrigin]="overlayOrigin" 
        [cdkConnectedOverlayOpen]="isOpen"
        (backdropClick)="close()">
      <ng-content select="atlas-nav-menu"></ng-content>
    </ng-template> 
  `,
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationItemComponent {
  /** @internal */
  isOpen = false;
  /** @internal */
  overlayRef: OverlayRef;
  /** Action theme for navigation item */
  @Input() action: Actions = Actions.default;
  /** Action theme for active border */
  @Input() borderAction: Actions = Actions.primary;

  constructor(private overlay: Overlay) { }

  toggleMenu() {
    if(this.overlayRef) {
      this.overlayRef.dispose;
      this.overlayRef = null;
    }
    this.isOpen = !this.isOpen;
  }

  close() {
      this.overlayRef?.dispose();
      this.overlayRef = null;
      this.isOpen = false;
  }
}

@Component({
  selector: 'atlas-nav-menu',
  template: `
    <div class="atlas-navigation-megamenu box-shadow-elevation-elevated" [ngClass]="{'atlas-navigation-megamenu-open': navigationItem.isOpen}">
      <ng-content select="atlas-nav-custom-area"></ng-content>
      <ng-content select="atlas-nav-content"></ng-content>
    </div>
  `,
  styleUrls: ['./navigation.component.scss']
})
export class NavigationMenuComponent {
  /** @internal */
  @Input() navigationItem: NavigationItemComponent;
}
@Component({
  selector: 'atlas-nav-custom-area',
  template: `
    <div class="atlas-navigation-custom-area typographyStyles-body-large" [ngClass]="['atlas-navigation-custom-area-'+action]">
      <div *ngIf="title && title.length > 0" class="atlas-navigation-content-title typographyStyles-body-smallAlt">{{title}}</div>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./navigation.component.scss']
})
export class NavigationMenuCustomAreaComponent {
  /** Custom area title */
  @Input() title?: string;
  /** Action theme for custom area */
  @Input() action: Actions = Actions.default;
}
@Component({
  selector: 'atlas-nav-content',
  template: `
    <div class="atlas-navigation-content-area">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./navigation.component.scss']
})
export class NavigationMenuContentAreaComponent {
}