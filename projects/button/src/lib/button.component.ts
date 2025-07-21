import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { Actions, BoxShadows, ThemingService, ButtonVariants, Radii, Styles, Colors } from 'atlas-cdk';

import { ButtonSizings, ElementState } from './button.const';
import { config } from './button.theming';


function getDominantState(state: any): ElementState {
  return (state && ElementState.disabled) || (state && ElementState.active) || (state && ElementState.focus) || (state && ElementState.hover);
}
@Component({
  selector: 'atlas-button',
  template: `
    <button
      [ngClass]="[
        'atlas-button', 
        'button-' + (action ? action : color) + '-' + (variant ? variant: style), 
        'button-radius-' + radius, 
        radius === 'full' ? 'button-size-full-' + size : 'button-size-' + size, 
        customClass, 
        expand ? 'atlas-button--expand' : '',
        'box-shadow-elevation-' + elevation,
        typographyClass
      ]"
      [attr.alt]="alt"
      (click)="onButtonClicked($event)"
      [disabled]="disabled"
      [attr.aria-label]="ariaLabel"
      [attr.tabindex]="tabIndex">
      <span #buttonContainer>
        <ng-content></ng-content>
      </span>
    </button>
  `,
  host: {
    '[class.atlas-button--disabled]': 'disabled',
    '(mouseenter)': '_hover = true',
    '(mouseleave)': '_hover = false',
    '(mousedown)': '_active = true; _focus = false',
    '(blur)': '_focus = false',
    '(focus)': '_focus = true',
    '[attr.disabled]': 'disabled || null',
  },
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent {
  /** Set the button to disabled state */
  @Input() disabled: boolean = false;
  /** Set the button to expanded state */
  @Input() expand: boolean = false;
  /** Select the size of the button */
  @Input() size: ButtonSizings = ButtonSizings.medium;

  /**
   *  @deprecated This property is deprecated and will be removed in a future version.
   *  Use `style` instead.
   *  Select which variant to display, ie: contained, text, etc
   */
  @Input() variant: ButtonVariants;

  /** Select which style to display */
  @Input() style: Styles | ButtonVariants | string = Styles.outlined;

  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead. 
   * Select the action color of the button */
  @Input() action: Actions;

  /** Select the color of the button */
  @Input() color: Colors | Actions = Colors.brand;

  /** Select the border radius of the button */
  @Input() radius: Radii = Radii.soft;
  /** Create a custom class that gets added to the button elem */
  @Input() customClass?: string = '';
  /** Customize the alt text added to the button elem */
  @Input() alt?: string = '';
  /** tabindex  */
  @Input('tabindex') tabindex: number = 0;
  /** @internal */
  @HostBinding('attr.tabindex') get tabIndex(): string {
    return this.disabled ? '-1' : `${this.tabindex}`;
  };
  /** Set typography of button */
  @Input() typographyClass: string = 'typographyStyles-button-medium';
  /** aria-label */
  @Input('aria-label') ariaLabel: string = '';
   /** Shadow elevation of the accordion group */
   @Input() elevation = BoxShadows.flat;
  /** Emitted when the button is clicked */
  @Output() onClick = new EventEmitter<Event>();

  
  _state: ElementState | undefined;
  
  
  _hover = false;

  
  _active = false;

  
  _focus = false;

  /** The size of the button */
  private _size!: ButtonSizings;

  
  private get _dominantState() {
    return getDominantState(this._state);
  }

  constructor(
    private themingService: ThemingService,
  ) {
    this.themingService.applyConfig(config);
  }

  onButtonClicked(event: Event) {
    if (!this.disabled) {
      this.onClick.emit(event);
    }
  }



}

