
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Actions, ThemingService, Density } from 'atlas-cdk';
import { config } from './drawer.theming';

@Component({
  selector: 'atlas-drawer',
  template: `
    <div
      [ngClass]="[
        'drawer',
        'drawer-'+action,
        'drawer-'+density,
        'typographyStyles-heading-small'
      ]"

      *ngIf="_isOpen || isAlwaysOpen"
     >
      <div class="drawer-content-wrapper">
        <ng-content></ng-content>
      </div>
      <div class="drawer-overlay" (click)="toggleDrawer()" *ngIf="_isOpen && !ignoreOutsideClicks">
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class DrawerComponent {
  /**
   * The action color.
   */
  @Input() action: Actions = Actions.default;

  /**
  * The navigation size.
  */

  @Input() density: Density = Density.expanded;

  // Is drawer always open
  @Input() isAlwaysOpen: boolean = true;

  // Drawer can be closed on outside click
  @Input() ignoreOutsideClicks: boolean = true;

  // On close drawer event emitter
  @Output() drawerClose: EventEmitter<void> = new EventEmitter<void>();

  // On open drawer event emitter
  @Output() drawerOpen: EventEmitter<void> = new EventEmitter<void>();

  /** @internal */
  _isOpen = false;

  constructor(
    private themingService: ThemingService,
  ) {
    this.themingService.applyConfig(config);
  }

  public toggleDrawer(): void {
    this._isOpen ? this.close() : this.open();
  }

  public close(): void {
    this._isOpen = false;
    this.drawerClose.emit();
  }

  public open(): void {
    this._isOpen = true;
    this.drawerOpen.emit();
  }
}

