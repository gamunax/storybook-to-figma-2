import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, Renderer2, TemplateRef, ViewEncapsulation } from '@angular/core';

import { ButtonConfig, ButtonSizings, ElementState, Shadows } from './button.const';
import { config } from './button.theming';

import { Actions, BoxShadows, ThemingService, Radii, ButtonVariants, Styles, Colors } from 'atlas-cdk';

function getDominantState(state: any): ElementState {
  return (state && ElementState.disabled) || (state && ElementState.active) || (state && ElementState.focus) || (state && ElementState.hover);
}
@Component({
  selector: 'atlas-button-group',
  template: `
    <div [ngClass]="[ vertical?  'button-group-position-vertical' : 'button-group-position-horizontal']">
        <ng-container *ngIf="buttonsConfig && buttonsConfig.length; else projectedContent">
            <button *ngFor="let item of buttonsConfig; let i = index"
                [ngClass]="[
                    'atlas-button', 
                    'button-' + (action ? action : color) + '-' + (variant ? variant : style), 
                    'button-radius-' + radius, 
                    radius === 'full' ? 'button-size-rounded-' + size : 'button-size-' + size, 
                    
                ]"
                [attr.alt]="item.alt"
                (click)="item.event($event)"
                [disabled]="disabled"
                [attr.aria-label]="item.ariaLabel"
                [attr.tabindex]="disabled"
                (click)="item.event">
                <ng-container *ngIf="isStringContent(item); else templateContent">
                    {{ item.content }}
                </ng-container>
                <ng-template #templateContent>
                    <ng-container *ngTemplateOutlet="getContentTemplate(item)"></ng-container>
                </ng-template>
            </button>
        </ng-container>
        <ng-template #projectedContent>
          <ng-content></ng-content>
        </ng-template>
    </div>
  `,
  host: {
  },
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonGroupComponent implements AfterViewInit {
  @ContentChildren('buttonGroup', { descendants: true, read: ElementRef }) buttons!: QueryList<ElementRef>;

  /** Set the button group to disabled state */
  @Input() disabled: boolean = false;
  /** Select the size of the button group */
  @Input() size: ButtonSizings = ButtonSizings.medium;
   /**
   *  @deprecated This property is deprecated and will be removed in a future version.
   *  Use `style` instead.
   *  Select which variant to display, ie: contained, text, etc
   */
  @Input() variant: ButtonVariants;

  /** Select which style to display, ie: strong, text, etc */
  @Input() style: Styles = Styles.strong;
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead. 
   * Select the action color of the button */
  @Input() action: Actions;

  /** Select the action color of the button */
  @Input() color: Colors = Colors.neutral;
  /** Select the border radius of the button group */
  @Input() radius: Radii = Radii.soft;
  /** Create a custom class that gets added to the button group */
  @Input() customClass?: string = '';
  /** vertical button group position */
  @Input() vertical: boolean = false;
  /** button group configuration */
  @Input() buttonsConfig: ButtonConfig[] = []

  
  _state: ElementState | undefined;
  
  _hover = false;
  
  _active = false;
  
  _focus = false;

  /** @internal */
  isStringContent(item): boolean {
    return typeof item.content === 'string';
  }

  /** @internal */
  getContentTemplate(item): TemplateRef<any> | null {
    return item.content instanceof TemplateRef ? item.content : null;
  }

  constructor(
    private themingService: ThemingService,
    private renderer: Renderer2,
  ) {
    this.themingService.applyConfig(config);
  }

  ngAfterViewInit() {
    this.buttons?.forEach((button, index) => {
        const classNames = [
            'atlas-button', 
            `button-${this.action ? this.action : this.color}-${this.variant ? this.variant : this.style}`, 
            `button-radius-${this.radius}`, 
            this.radius === 'full' ? `button-size-rounded-${this.size}` : `button-size-${this.size}`
        ];        
        classNames.forEach(className => {
            this.renderer.addClass(button.nativeElement, className);
        });
    });
  }
}