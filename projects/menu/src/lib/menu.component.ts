// Import the core angular services.
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  Component
} from '@angular/core';
import { BoxShadows, ThemingService } from 'atlas-cdk';
import { config } from './menu.theming';


/**
 * A menu displays content on a temporary surface and allow users to interact with that content.It appears when a user interacts with a button or other control.
 */
@Component({
  selector: 'atlas-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div *ngIf="menuOpen"
    [ngClass]="['atlas-menu', 'menu', customClass, 'box-shadow-elevation-' + elevation]"
    (click)="onMenuClicked($event)"
    (clickOutside)="closeMenu()"
  >
    <ng-content></ng-content>
  </div>
  `
})
export class MenuComponent {
  /** Sets the status of the menu  */
  @Input() menuOpen = false;
  /** Create a custom class that gets added to the menu elem */
  @Input() customClass?: string = '';
  /** Shadow elevation of the accordion group */
  @Input() elevation = BoxShadows.flat;
  /** Emitted when the menu is clicked */
  @Output() onMenuClick = new EventEmitter<Event>();
  /** Emitted when the menu is opened */
  @Output() menuOpened = new EventEmitter<Event>();
  /** Emitted when the menu is closed */
  @Output() menuClosed = new EventEmitter<Event>();

  constructor(
    private cd: ChangeDetectorRef,
    private themingService: ThemingService,
  ) {
    this.themingService.applyConfig(config);
  }

  /** Toggles the menu between open and closed */
  public toggleMenu(event: Event) {
    if (this.menuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
    this.cd.markForCheck();
  }

  /** Explicitly opens the menu */
  public openMenu(event?: Event) {
    this.menuOpen = true;
    this.menuOpened.emit();
  }
  
  /** Explicitly closes the menu */
  public closeMenu(event?: Event) {
    this.menuOpen = false;
    this.menuClosed.emit();
  }

  /** Fired when anywhere within the menu is clicked */
  public onMenuClicked(event: Event) {
    this.onMenuClick.emit(event);
  }
}
