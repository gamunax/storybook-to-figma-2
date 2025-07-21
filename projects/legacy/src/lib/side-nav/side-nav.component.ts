import { DrawerComponent, DrawerModule } from 'atlas-drawer';
import { NavigationAllowedTargets } from '../app-nav/app-nav-items.interfaces';
import {
  Component,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  ChangeDetectorRef,
} from '@angular/core';
import { IconModule, IconSizes } from 'atlas-icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'legacy-side-nav-logo',
  template: '<ng-content></ng-content>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, IconModule],
  encapsulation: ViewEncapsulation.None,
})
export class SideNavLogoComponent { }

@Component({
  selector: 'legacy-side-nav-group',
  styleUrls: ['side-nav.component.scss'],
  templateUrl: 'side-nav-group.component.html',
  standalone: true,
  imports: [IconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavGroupComponent {
  @Input() public groupTitle: string;
}

@Component({
  selector: 'legacy-side-nav-group-item',
  styleUrls: ['side-nav.component.scss'],
  templateUrl: 'side-nav-group-item.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, IconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideNavGroupItemComponent {
  @Input() public itemTitle: string;
  @Input() public icon: string;
  @Input() public collection: string;
  @Input() public sideNavVisible = false;
  @Input() public active = false;
  /**
   * Sets target attribute of anchor to specified value.
   * Note: '_self' is required for non-fullpage reload when using internal links.
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target
   * @memberof SideNavGroupItemComponent
   */
  @Input() public linkTarget: NavigationAllowedTargets = '_self';

  public iconSize: IconSizes = IconSizes.large;
  public isExternalLink = false;
  private _link: string;

  @Input()
  get link(): string {
    return this._link;
  }
  set link(v: string) {
    if (v) {
      // has scheme
      this.isExternalLink = v.indexOf('//') > -1;
      this._link = v;
    }
  }
}

@Component({
  selector: 'legacy-side-nav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['side-nav.component.scss'],
  standalone: true,
  imports: [CommonModule, DrawerModule, IconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class SideNavComponent implements OnDestroy {

  @Input() publicrawer;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onOpen: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onClose: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() public onDestroy: EventEmitter<any> = new EventEmitter();

  public closeIconSize: IconSizes = IconSizes.large;
  public isOpen: boolean = false;

  constructor (private changeDetector: ChangeDetectorRef) {}

  ngOnDestroy() {
    this.onDestroy.emit(true);
  }

  public open() {
    if (!this.isOpen) {
      this.isOpen = true;
      this.changeDetector.detectChanges()
    }
  }

  public close() {
    if (this.isOpen) {
      this.isOpen = false;
      this.changeDetector.detectChanges();
    } 
  }
}