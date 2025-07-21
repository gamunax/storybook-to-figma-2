// Import the core angular services.
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Actions, Radii, ThemingService, AvatarSizes, Colors } from 'atlas-cdk';
import { config } from './avatar.theming';

/**
 * The avatar component displays image, icon or text data 
 */
@Component({
  selector: 'atlas-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div (click)="onAvatarClicked($event)"
  [id]="id" [ngClass]="['atlas-avatar', typography, 'avatar', avatarCustomClass, 'avatar-' +  (action ? action : color), 'avatar-radius-' +  radius, 'avatar-size-' +  size,
  grouped ? 'atlas-avatar-grouped' : '', imgSrc ? 'avatar-image' : '']"
    [ngStyle]="{'background-image': imgSrc ? 'url(' + imgSrc + ')' : ''}">
    <ng-content></ng-content>
    <div class="atlas-avatar-indicator" 
    [ngStyle]="{'background-color': 'var(--semanticColor-background-' + (indicatorAction ? indicatorAction : indicatorColor ) + '-strong-rest)'}"
    *ngIf="indicator">&nbsp;</div>
</div>
  `,
  styleUrls: ['./avatar.component.scss'],
})

export class AvatarComponent {
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead. 
   * Set the avatar action */
  @Input() action: Actions;

  /** Set the avatar color */
  @Input() color: Colors = Colors.brand;

  /** Set the avatar id */
  @Input() id: string | undefined;;
  /** Set the imgSrc for photo mode */
  @Input() imgSrc: string | undefined;
  /** Set the imgAlt for photo mode */
  @Input() imgAlt?: string | undefined;
  /** Set the avatar text typography */
  @Input() typography = 'typographyStyles-body-largeAlt';
  /** Set the avatar to grouped mode */
  @Input() grouped = false;
  /** Set the avatar indicator */
  @Input() indicator = false;
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `indicatorColor` instead. 
   * Set the avatar variant 
  */
  @Input() indicatorAction: Actions;
  /** Set the avatar variant */
  @Input() indicatorColor: Colors = Colors.success;
  /** Create a custom class that gets added to the avatar elem */
  @Input() avatarCustomClass?: string = '';
  /** Select the border radius of the avatar */
  @Input() radius: Radii = Radii.rounded;
  /** Select the size of the avatar */
  @Input() size: AvatarSizes = AvatarSizes.medium;
  /** Emitted when the avatar is clicked */
  @Output() onClick = new EventEmitter<Event>();

  constructor(
    private themingService: ThemingService,
  ) {
    this.themingService.applyConfig(config);
  }

  onAvatarClicked(event: Event) {
    this.onClick.emit(event);
  }

}
