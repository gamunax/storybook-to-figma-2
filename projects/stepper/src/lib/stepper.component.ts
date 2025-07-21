import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Colors, ThemingService } from 'atlas-cdk';
import { Actions, Radii } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';

import { StepperService } from './stepper.service';
import { config } from './stepper.theming';
import { Step } from './stepper.const';



@Component({
  selector: 'atlas-stepper',
  template: ` 
    <ol class="atlas-stepper">
      <li class="atlas-step" *ngFor="let step of steps; let i = index">
      <div class="atlas-step-content" (click)="selectedAction(i)">
      <atlas-avatar
        [color]="color"
        [radius]="rounded"
        [action]="step.action"
        [avatarCustomClass]="'atlas-step-avatar'"
        [typography]="typographyAvatar"
      >
        <div *ngIf="step.completed else indexStep">
          <atlas-icon [icon]="iconStep" [size]="sizeIcon"></atlas-icon>
        </div>  
        <ng-template #indexStep>
         <span [class]="typographyIndex">{{ i+1 }}</span>
        </ng-template>
      </atlas-avatar>
      <span [class.atlas-step-font-content-active]="step.active || step.completed"
      [class]="[typographyStepContent, 'atlas-step-font-content', 'atlas-step-font-content-default']">
        {{step.title}}
      </span>
      </div>
      </li>
    </ol>
`,
host: {
  '[attr.role]': '"stepper"',
  '[attr.tabindex]': 'tabIndex',
  '[attr.aria-label]': 'ariaLabel',
  '[attr.aria-disabled]': 'disabled',
  '[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
},
  encapsulation: ViewEncapsulation.None, 
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepperComponent implements AfterContentInit {

    /** Set the steps configuration array  */
    @Input() steps: Step[] = [];

    /** Set the avatar typography class  */
    @Input() typographyAvatar: string = 'typographyStyles-label-medium';

    /** Set the index typography class  */
    @Input() typographyIndex: string = 'typographyStyles-label-medium';

    /** Set the step content typography class  */
    @Input() typographyStepContent: string = 'typographyStyles-button-medium';

    /** Set the step icon class  */
    @Input() iconStep: string = 'icon-check-24';

    /** Set disabled prop to step */
    @Input() disabled: boolean = false;

    /** Set the steps configuration array  */
    @Input() color: Colors = Colors.brand;

    /** Set the step event on click  */
    @Output() stepAction: EventEmitter<any> = new EventEmitter();

    /** Tab index of the component */
    @Input('tabindex') tabindex = 0;

    /** @internal */
    @HostBinding('attr.tabindex') get tabIndex(): string {
      return this.disabled ? '-1' : `${this.tabindex}`;
    };

      /** Aria label of stepper. */
     @Input('aria-label') ariaLabel = '';
   
  
    /** @internal */
    index: number = 0;
    /** @internal */
    completed: boolean = false;
    /** @internal*/
    selected: boolean = false;
    /** @internal */
    rounded: Radii = Radii.rounded;
    /** @internal */
    actions: Actions = Actions.default;
    /** @internal */
    sizeIcon: IconSizes = IconSizes.small;

  constructor(  
    private _stepperService: StepperService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _themingService: ThemingService) {
      this._themingService.applyConfig(config);
      this.actions = Actions.default;
  }

  /** @internal */
  ngAfterContentInit() {
    const totalItems = this.steps.length;
    this._stepperService.setTotalItems(totalItems); 
    if(this.steps.length > 0) {
    this.steps.map( step => { 
      step.active = false;
      step.completed = false;
      step.action = Actions.default;
    });
    this.setActive(true, 0);
    }
    this._changeDetectorRef.detectChanges();
    
  }

  /**
   *  @internal 
   * Set the selected index to change the previous state of the step.
  */
  selectedAction(index: number): void {
     const steps = this.steps;
     let prev: number = index-1;
     let next: number = index+1;
     const total: number = steps.length;
     if(index > 0 && steps[prev].active) {
      this.setActive(!steps[index].active, index)
     } 
     if(index === 0 ) {
      this.setActive(!steps[index].active, index)
     }
     let step = steps[index].active;
     switch (step) {
       case step = true:
         if(index > 0 && steps[prev].active) {
           this.setCompleted(true, prev);
           for(let i = next; i < total; i++) {
              this.setActive(false, i);
              this.setCompleted(false, i);
           } 
         }
         break;
      case step = false: 
      if( index === 0 || (index > 0 && steps[prev].completed)) {
        this.setActive(true, index);
        this.setCompleted(false, index);
        for(let i = next; i < total; i++) {
          this.setActive(false, i);
          this.setCompleted(false, i);
       }
      }
      break;
      default: step = false;    
     }
     this.stepAction.emit(index);
    this._changeDetectorRef.detectChanges();
  }
    
 
   /**
   * @internal
   * Set or unset the active state of the step
  */
    setActive(value, index) {
      let step = this.steps[index];
      step.active = value
      step.action = step.active ? this.color : Colors.neutral;
      this._changeDetectorRef.detectChanges();
    }
 
   /**
   * @internal
   * Set or unset the completed state of the step
  */
    setCompleted(value, index) {
      let step = this.steps[index];
      step.completed = value;
      if(step.completed && step.active) {
        step.action = this.color;
      } else if(!step.completed && step.active) {
        step.action = this.color;
      } else {
        step.action = Colors.neutral;
      }
      this._changeDetectorRef.detectChanges();
    }

}
