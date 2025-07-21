import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AvatarComponent } from 'atlas-avatar';
import { Actions, ChipSizings, ChipVariants, Colors, Styles, AvatarSizes, IndicatorLocation } from 'atlas-cdk';
import { IconComponent, IconSizes } from 'atlas-icon';

@Component({
  selector: 'atlas-chip',
  template: `
    <div [ngClass]="[
        'atlas-chip',        
          !light ? 'atlas-chip-color-' + (action ? action : color) + '-' + (variant ? variant: style) : '',
          light ? 'atlas-chip-light--' + (action ? action : color) : '',
        'atlas-chip-size-' + size,          
          disabled ? 'atlas-chip-disabled': '']"
          *ngIf="!hidden">
      <div *ngIf="flag" class="padding-left-4">
        <img [src]="_flagSrc" [alt]="flag" width="24" height="24"/>
      </div>

      <span *ngIf="indicator && indicatorLocation === 'left'" 
      [ngClass]="[
      'atlas-chip-indicator',
      'atlas-chip-indicator--' + indicatorColor,
      'atlas-chip-indicator--' + indicatorLocation]"></span>

      <span (click)="select($event)" [ngClass]="[
        'atlas-chip-wrapper',
        'atlas-chip-size-' + size + '-wrapper',            
        'atlas-chip-size-' + size + '-mode-' + 
        (textOnly ? 'text-only' : 
        reTextOnly ? 're-text-only' : 
        withIcon ? 'with-icon' : 
        reWithIcon ? 're-with-icon' : 
        withAvatar ? 'with-avatar' : 
        reWithAvatar ? 're-with-avatar' : ''),
        typography,
        customClass]">
        <ng-content></ng-content>
      </span>

      <span *ngIf="indicator && indicatorLocation === 'right'" 
        [ngClass]="[
          'atlas-chip-indicator',
          'atlas-chip-indicator--' + indicatorColor,
          'atlas-chip-indicator--' + indicatorLocation
        ]">
      </span>

      <atlas-icon
        *ngIf="removable" icon="icon-remove-circle-24" 
        (click)="remove($event)" [size]="iconSize"
        [ngClass]="['atlas-chip-size-' + size + '-close-icon']">
      </atlas-icon>        
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipComponent),
      multi: true
    },
  ],
})
export class ChipComponent implements OnChanges, AfterContentInit {
  /** Set the chip typography class */
  @Input() typography = 'typographyStyles-label-medium';
  /** Create a custom class that gets added to the chip elem */
  @Input() customClass?: string = '';
  /** Select the size of the chip */
  @Input() size: ChipSizings = ChipSizings.medium;  
  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `style` instead.
   */
  @Input() variant: ChipVariants;

  /** Select which variant to display, ie: contained, text, etc */
  @Input() style: Styles = Styles.filled;

  /**
   * @deprecated This property is deprecated and will be removed in a future version.
   * Use `color` instead.
   * Set the checkbox action 
   */
  @Input() action: Actions;

  /** Select the color of the chip */
  @Input() color: Colors = Colors.neutral;
  /** Whether the chip is disabled. */
  @Input() disabled = false;
  /** Determines whether or not the chip displays the remove styling and emits (removed) events. */
  @Input() removable = false;  
  /** Whether the chip has an indicator dot */
  @Input() indicator = false;
  /** Location of the indicator */
  @Input() indicatorLocation = IndicatorLocation.right;
  /** Color of the indicator */
  @Input() indicatorColor = Colors.neutral;
  /** The light style displays the corresponding action's highlight-hover-background color value */
  @Input() light = false;
  /** @set the flag of chip */
  @Input() flag: string;

  /** Emitted when the chip is selected or deselected. */
  @Output() readonly selectionChange: EventEmitter<Event> =
    new EventEmitter<Event>();
  /** Emitted when a chip is to be removed. */
  @Output() readonly removed: EventEmitter<Event> = new EventEmitter<Event>();

  /** @internal */
  @ContentChild(IconComponent, {static: true}) icon!: IconComponent;
  /** @internal */
  @ContentChild(AvatarComponent, {static: true}) avatar!: AvatarComponent;
  /** @internal */
  get _flagSrc(): string {
    if (!this.flag) {
      return '';
    }
    return `./atlas-icons/${this.flag.toLocaleLowerCase()}.svg`;
  }
  /** @internal */
  iconSize: IconSizes = IconSizes.medium;
  /** @internal */
  avatarSize?: AvatarSizes;
  /** @internal */
  textOnly = false;
  /** @internal */
  reTextOnly = false;
  /** @internal */
  withIcon = false;
  /** @internal */
  reWithIcon = false;
  /** @internal */
  withAvatar = false;
  /** @internal */
  reWithAvatar = false;
  /** @internal */
  hidden = false;

  chipChange: any = () => {};
  onTouch: any = () => {};

  
  constructor( 
    private cdr: ChangeDetectorRef) {
   }


  /** @internal */
  writeValue(value) {
    // this.value = value;
  }

  onModelChange(e) {
    // this.value = e
  }

   /** @internal */
  registerOnChange(fn: any): void {
    this.chipChange = fn;
  }

  /** @internal */
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  /** @internal */
  setCurrentColor(color) {
    this.color = color;
    this.cdr.detectChanges();
  }

  /** @internal */
  setAsDisabled(disabled) {
    this.disabled = disabled;
    this.cdr.detectChanges();
  }

    
  /** @internal */
  ngAfterContentInit(): void {
   this._updateSize();   
  }

  /** @internal */
  ngOnChanges(changes: SimpleChanges): void {    
    switch (this.size) {
      case ChipSizings.medium:
        this.iconSize = IconSizes.medium;
        // this.avatarSize = AvatarSizes.medium;
        break;    
      default:
        this.iconSize = IconSizes.xsmall;
        // this.avatarSize =AvatarSizes.small;
        break;
    }
    this._updateSize();
  }
  
  /** @internal */
  select(event: Event): void {
    console.log('event', event);
    this.selectionChange.emit(event);
  }

  /** @internal */
  remove(event: Event): void{
    this.removed.emit(event);
    this.hidden = true;
    this.cdr.detectChanges();
  }

  /** @internal */
  private _updateSize(): void {    
    this.textOnly = !this.avatar && !this.icon && !this.removable;
    this.reTextOnly = !this.avatar && !this.icon && this.removable;
    this.withIcon = !!this.icon && !this.removable;
    this.reWithIcon = !!this.icon && this.removable;
    this.withAvatar = !!this.avatar && !this.removable;
    this.reWithAvatar = !!this.avatar && this.removable;
  }
}
