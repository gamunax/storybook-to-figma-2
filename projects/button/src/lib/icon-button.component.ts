import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { Actions, ThemingService, ElementState, Colors } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { config } from './button.theming';

function getDominantState(state: any): ElementState {
  return (
    (state && ElementState.disabled) ||
    (state && ElementState.active) ||
    (state && ElementState.focus) ||
    (state && ElementState.hover)
  );
}

/**
 * The icon button component handles standard button functionality but with an icon instead of an usual button.
 */
@Component({
  selector: 'atlas-icon-button',
  template: `
    <button
      [ngClass]="[
        'atlas-icon-button',
        dense ? 'atlas-icon-button-size-' + size + '-dense' : 'atlas-icon-button-size-' + size,
        'atlas-icon-button-color-' + (action ? action: color),
        customClass
      ]"
      [class.atlas-icon-button-color-disabled]="disabled"
      [attr.alt]="alt"
      (click)="onButtonClicked($event)"
      [disabled]="disabled"
    >
      <atlas-icon
        [ngClass]="['atlas-icon-size', 'atlas-icon-color-' + (action ? action: color), customClass]"
        [class.atlas-icon-color-disabled]="disabled"
        [size]="size"
        [icon]="icon"
        [collection]="collection" [iconSheetUrl]="iconSheetUrl"></atlas-icon>
    </button>
  `,
  host: {
    '[class.atlas-icon-button-color-disabled]': 'disabled',
    '(mouseenter)': '_hover = true',
    '(mouseleave)': '_hover = false',
    '(mousedown)': '_active = true',
    '(window:mouseup)': '_active = false; true', // return true to propagate default mouseup events
    '(blur)': '_focus = false',
    '(focus)': '_focus = true',
    '[attr.disabled]': 'disabled || null',
  },
  encapsulation: ViewEncapsulation.None,
})
export class IconButtonComponent {
  /** Set the button to disabled state */
  @Input() disabled: boolean = false;
  /** Set the button to dense class state */
  @Input() dense: boolean = false;
  /** Select the size of the icon button */
  @Input() size: IconSizes = IconSizes.medium;
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * Select the action color of the icon button
   */
  @Input() action: Actions | Colors;  

  /** Select the color of the icon button */
  @Input() color: Colors | Actions = Colors.neutral;  
  /** Select the icon of the button */
  @Input() icon: string = 'icon-home-24';
  /** Create a custom class that gets added to the button elem */
  @Input() customClass?: string = '';
  /** Customize the alt text added to the button elem */
  @Input() alt?: string = '';
  /** Used to select the particular collection of icons (/atlas-icons/):
  * system (default functional)*/
  @Input() collection = 'system';
  /** External link url icon sheets */
  @Input() iconSheetUrl: string | undefined;

  /** Emitted when the button is clicked */
  @Output() onClick = new EventEmitter<Event>();

  _state: ElementState | undefined;

  _hover = false;

  _active = false;

  _focus = false;

  private get _dominantState() {
    return getDominantState(this._state);
  }

  constructor(private themingService: ThemingService) {
    this.themingService.applyConfig(config);
  }

  onButtonClicked(event: Event) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }
}
