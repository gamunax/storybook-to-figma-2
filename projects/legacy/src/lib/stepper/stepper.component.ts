import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Host,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';

import { TooltipPosition } from 'atlas-tooltip';
import { IconSizes } from 'atlas-icon';
import { HaloWindowResizeService } from 'atlas-cdk';

export interface LegacyStepperResponsiveOptions {
  md: boolean;
  lg: boolean;
}

/**
 * Default responsive options
 * Small(excluded): Always Vertical Stepper Layout
 * Medium: Vertical Stepper Layout
 * Large: Horizontal Stepper Layout
 */
const DEFAULT_RESPONSIVE_OPTIONS: LegacyStepperResponsiveOptions = {
  md: true,
  lg: false,
};

@Component({
  selector: 'legacy-stepper',
  styleUrls: ['stepper.component.scss'],
  templateUrl: 'stepper-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LegacyStepperGroupComponent implements OnChanges, AfterViewInit, OnDestroy {
  stepperDeletedCount: number;
  /**
   * Allow navigating between steps
   **/
  @Input() allowNavigation = false;
  /**
   * Set the stepper to be locked to sequential order. The user must compelete step 1 before moving to step 2.
   **/
  @Input() isSequential = true;
  /**
   * Set the steps to be to equal width
   **/
  @Input() isEqualWidth = false;
  /**
   * Show the inline stepper
   **/
  @Input() isInline = false;
  /**
   * Set the theme of the stepper. Values: primary, secondary, tertiary, accent1, accent2,
   *  primary-alt, secondary-alt, tertiary-alt, accent1-alt, accent2-alt, black, white
   **/
  @Input() theme = '';
  /**
   * Set the background theme of the stepper. Values: primary, secondary, tertiary, accent1, accent2,
   *  primary-alt, secondary-alt, tertiary-alt, accent1-alt, accent2-alt, black, white
   **/
  @Input() bgTheme = '';
  /**
   * Set the persistent theme of stepper. This theme stays persistent regardless of the state of the step.
   **/
  @Input() persistentTheme = '';
  /**
   * Set the text used for completed steps
   **/
  @Input() completeTitleText = 'Complete';
  /**
   * Show active step UX
   **/
  @Input() toggleActive = true;
  /**
   * Set the header side padding
   **/
  @Input() stepperHeaderSidePadding = 0;
  /**
   * Set the stepper padding
   **/
  @Input() stepperPadding = true;
  /**
   * Display the vertical stepper collapsed mode. Only one step displays at a time.
   **/
  @Input() collapsedVerticalStepper = false;
  /**
   * Use responsive stepper mode, allows per-breakpoint configuration of vertical or horizontal stepper display.
   **/
  @Input() responsiveConfiguration: LegacyStepperResponsiveOptions = DEFAULT_RESPONSIVE_OPTIONS;
  /**
   * Allow labels to wrap
   */
  @Input() allowLabelWrapping = false;
  /**
   * Add color to the bar
   */
  @Input() coloredBar = false;
  /**
   * Persists tooltip that is currently active
   */
  @Input() persistentTooltipOnActiveStep = false;

  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectedIndexChange = new EventEmitter<number>();

  @ContentChildren(forwardRef(() => LegacyStepComponent)) steps: QueryList<LegacyStepComponent>;
  @ViewChild('headerRef') headerEl: ElementRef;
  @ViewChild('horizontalBar') horizontalBar: ElementRef;
  @ViewChildren('verticalBarRef') verticalBars: QueryList<ElementRef>;
  @ViewChildren('stepperButtonsRef') stepperButtons: QueryList<ElementRef>;

  activeStepIndex = 0;
  activeStep: LegacyStepComponent;
  activeStepDeleted = false;
  stepsDeletedCount = 0;
  stepDestroyDelay: any;
  firstStepWidth: number;
  headerWidth: number;
  horizontalBarLeft: number;
  toolTipTop = TooltipPosition.top;
  sizeMedium = IconSizes.medium;

  private _isViewInit = false;
  private _initialRedrawLinesTimeout: any;
  private _redrawLinesTimer: any;
  private _resizeSubscription: Subscription;
  private _stepperListSubscription: Subscription;
  private _betweenSteppersLinePercentages = [];
  private _completePercentage = 0;
  private _activePercentage = 0;
  private _activeColor = '#005C96';
  private _completeColor = '#9FDD79';

  @Input()
  set isVertical(v: boolean) {
    if (v) {
      this.responsiveConfiguration = {
        md: true,
        lg: true,
      };
    } else {
      this.responsiveConfiguration = DEFAULT_RESPONSIVE_OPTIONS;
    }
  }
  get isVertical() {
    if (window.innerWidth > 1024) {
      return this.responsiveConfiguration.lg;
    } else {
      return true;
    }
  }

  @Input()
  set selectedIndex(value: number) {
    if (this.activeStepIndex === value) {
      return;
    }
    this.activeStepIndex = value;
    this.selectStep(value);
  }
  get selectedIndex(): number {
    return this.activeStepIndex;
  }

  constructor(
    private _renderer: Renderer2,
    private _cdr: ChangeDetectorRef,
    private _resizeService: HaloWindowResizeService,
    private _el: ElementRef,
  ) {
    this._resizeSubscription = this._resizeService.resizeObservable$.subscribe(() => this.redrawLines());
  }

  ngOnChanges(changes: SimpleChanges) {
    /**
     * This is to prevent using isVertical & responsiveConfiguration together.
     * responsiveConfiguration will override the values set from isVertical.
     * If responsiveConfiguration is provided and not the same as default value
     * then reassign values.
     */
    if (
      changes.responsiveConfiguration &&
      changes.responsiveConfiguration.currentValue !== DEFAULT_RESPONSIVE_OPTIONS
    ) {
      this.responsiveConfiguration = changes.responsiveConfiguration.currentValue;
    }
  }

  ngOnDestroy() {
    clearTimeout(this._initialRedrawLinesTimeout);
    clearTimeout(this._redrawLinesTimer);
    this._unsubscribeResizeSubscription();
    this._unsubscribeStepperListSubscription();
  }

  ngAfterViewInit() {
    this._isViewInit = true;
    this.selectStep(this.activeStepIndex);
    this._initialRedrawLinesTimeout = setTimeout(() => {
      this._organizeSteppers();
      // grabs the active and complete color scheme from the hidden elements
      const activeBarEl = this._el.nativeElement.querySelector('.mos-c-stepper__bar--active');
      const completeBarEl = this._el.nativeElement.querySelector('.mos-c-stepper__bar--complete');
      //this._activeColor = window.getComputedStyle(activeBarEl).getPropertyValue('background-color');
      //this._completeColor = window.getComputedStyle(completeBarEl).getPropertyValue('background-color');
    });
    this._stepperListSubscription = this.steps.changes.subscribe(() => {
      // need to reassign activeStep due to the changed steps list and the original activeStep object is destroyed
      this.activeStep = null;
      this.selectStep(this.activeStepIndex);
      this._organizeSteppers();
    });
  }

  selectStep(index) {
    if (this._isViewInit) {
      const stepsArray = this.steps.toArray();
      if (index >= 0 && index < stepsArray.length && stepsArray[index].isDisabled === false) {
        const stepArr = this.steps.toArray();

        if (this.activeStep) {
          this.activeStep.hide();
        }
        this.activeStepIndex = index;
        this.activeStep = stepArr[index];
        this.activeStep.show();
        this._cdr.markForCheck();

        // colors the bar based on progress
        if (this.coloredBar && !this.isVertical && this.isSequential) {
          // determines the completion percentage
          if (index > 0) {
            /**
             * if the current active step is a substep, and it's parent is not the first step,
             * then the step before the parent is the latest complete
             */
            if (stepArr[index].isSubStep && stepArr[index]._parentStepper && stepArr[index]._parentStepper.index > 0) {
              this._completePercentage = this._betweenSteppersLinePercentages[stepArr[index]._parentStepper.index - 1];
              // if the current active step is a main ste and not the first step, the step before is the latest complete
            } else if (!stepArr[index].isSubStep) {
              this._completePercentage = this._betweenSteppersLinePercentages[stepArr[index].index - 1];
              // catch if the parent of a substep is the first step, then no step is complete
            } else {
              this._completePercentage = 0;
            }
          } else {
            this._completePercentage = 0;
          }
          // determines the active percentage
          if (index > 0 && this._activeCheck(stepArr[index], index)) {
            this._activePercentage = this._betweenSteppersLinePercentages[index - 1];
          } else if (index === 0) {
            this._activePercentage = 0;
          }

          this._renderer.removeStyle(this.horizontalBar.nativeElement, 'background');

          this._renderer.setStyle(
            this.horizontalBar.nativeElement,
            'background',
            `linear-gradient(to right,
              ${this._completeColor} 0%, ${this._completeColor} ${this._completePercentage}%,
              ${this._activeColor} 0%, ${this._activeColor} ${this._activePercentage}%,
              #CCCCCC 0%, #CCCCCC 100%)`,
          );
        }

        this.onChange.emit(true);
        this.selectedIndexChange.emit(this.activeStepIndex);
      }
    }
  }

  redrawLines() {
    clearTimeout(this._redrawLinesTimer);
    this._calculateLines();
    this._doStepComponentChangeDetection();
    this._cdr.markForCheck();
  }

  /**
   * checks to see if the stepper and all the sub steppers after it is finished
   * @internal
   */
  _completionCheck(step) {
    if (this.steps.length) {
      if (step.isSubStep && step._parentStepper) {
        return this.activeStepIndex > step._parentStepper._completionIndex;
      } else if (!step.isSubStep) {
        return this.activeStepIndex > step._completionIndex;
      }
    }

    return false;
  }

  /**
   * checks to see if stepper is active
   * @internal
   */
  _activeCheck(step, i) {
    if (this.isSequential && this.steps.length) {
      if (step.isSubStep && step._parentStepper) {
        return this.activeStepIndex <= step._parentStepper._completionIndex && this.activeStepIndex >= i;
      } else if (!step.isSubStep) {
        return this.activeStepIndex <= step._completionIndex && this.activeStepIndex >= i;
      }
      return false;
    }

    return !this.isSequential && this.activeStepIndex === i;
  }

  /**
   * @internal
   */
  public _updateStepBars() {
    if (this.verticalBars) {
      this.verticalBars.forEach((_el, idx) => {
        // (height of circle) + (line padding) = 52
        this._renderer.setStyle(_el.nativeElement, 'height', `${this._distanceToNextStep(idx) - 52}px`);
      });
    }
  }

  private _distanceToNextStep(currStepIdx: number) {
    const steps = this.steps.toArray();
    const currentStep = steps[currStepIdx];
    const nextStep = steps[currStepIdx + 1];
    return nextStep.currentOffsetTop - currentStep.currentOffsetTop;
  }

  private _calculateLines() {
    this._redrawLinesTimer = setTimeout(() => {
      if (this.stepperButtons.length && !this.isVertical) {
        // if the stepper-group is inline, just need to find the width between first and last steps
        if (this.isInline) {
          const firstStep = this.stepperButtons.first.nativeElement;
          const lastStep = this.stepperButtons.last.nativeElement;
          const firstBoundingClientRect = firstStep?.getBoundingClientRect();
          const lastBoundingClientRect = lastStep?.getBoundingClientRect();
          this.headerWidth = lastBoundingClientRect.left - firstBoundingClientRect.right;
          this.horizontalBarLeft = +this.stepperHeaderSidePadding + firstBoundingClientRect.width;
        } else {
          // if the stepper-group is not inline, we need to find the width between the first and last circle
          const firstContainerBoundingClientRect = this.stepperButtons.first.nativeElement?.getBoundingClientRect();
          const firstStep = this.stepperButtons.first.nativeElement.getElementsByClassName(
            'mos-c-stepper--circle-container',
          )[0];
          const lastStep = this.stepperButtons.last.nativeElement.getElementsByClassName(
            'mos-c-stepper--circle-container',
          )[0];
          const firstBoundingClientRect = firstStep?.getBoundingClientRect();
          const lastBoundingClientRect = lastStep?.getBoundingClientRect();

          if (!firstBoundingClientRect || !lastBoundingClientRect) {
            this.headerWidth = 0; // Default value or handle the undefined case appropriately
          } else {
            this.headerWidth = lastBoundingClientRect.left - firstBoundingClientRect.right;
          }
          // value got by adding half the step container with the rest of the circle and the right margin
          this.horizontalBarLeft =
            +this.stepperHeaderSidePadding + firstContainerBoundingClientRect.width / 2 + 16 + 10;
        }
        if (this.coloredBar) {
          this._getInBetweenStepPercentages();
        }
        this._cdr.detectChanges();
      }
    }, 100);
  }

  // Do Change Detection on each legacy-step element to update value of isVertical when resizing
  private _doStepComponentChangeDetection() {
    if (this.steps) {
      this.steps.forEach((step) => {
        step.ngAfterContentChecked();
        step._callChangeDetectorRef();
      });
    }
  }

  private _unsubscribeResizeSubscription() {
    if (this._resizeSubscription) {
      this._resizeSubscription.unsubscribe();
    }
  }

  private _unsubscribeStepperListSubscription() {
    if (this._stepperListSubscription) {
      this._stepperListSubscription.unsubscribe();
    }
  }

  private _organizeSteppers() {
    // the number that shows up in the main steppers
    let mainIndex = 1;
    let currentParent = null;
    this.redrawLines();
    this.steps.forEach((step, i) => {
      if (!step.isSubStep) {
        step.mainIndex = mainIndex++;
        if (currentParent !== step) {
          // check to make sure currentParent exists before setting _completionIndex to it
          if (currentParent) {
            currentParent._completionIndex = i - 1;
          }
          // set new main step as currentParent
          currentParent = step;
          // makes sure the last main step has a _completionIndex
          currentParent._completionIndex = i;
        }
      } else {
        // adds the substep to the currentParent's list of stepper children
        currentParent._stepperChildren.push(step);
        // add reference of the parent stepper to substepper
        step._parentStepper = currentParent;
      }
      step.index = i;
      step.ngAfterContentChecked();
    });
    this._cdr.markForCheck();
  }

  // function that collects the percentage points from the first step to every other step
  private _getInBetweenStepPercentages() {
    this._betweenSteppersLinePercentages = [];
    const horizontalBarWidth = this.headerWidth;
    const stepperButtonArr = this.stepperButtons.toArray();
    let firstValue = 0;

    const percentageGenerator = (element, index) => {
      const elementRect = element?.getBoundingClientRect();
      if (index > 0) {
        this._betweenSteppersLinePercentages.push(
          (Math.ceil(elementRect.left + 10 - firstValue) / horizontalBarWidth) * 100,
        );
      } else {
        firstValue = elementRect.right;
      }
    };

    /**
     * if inline, we calculate the right of the first step and the left of every other step.
     * if not inline, we calculate the right of the first step's circle and the left of every other step's circle
     */
    for (let x = 0; x < this.stepperButtons.length; x++) {
      this.isInline
        ? percentageGenerator(stepperButtonArr[x].nativeElement, x)
        : percentageGenerator(
            stepperButtonArr[x].nativeElement.getElementsByClassName('mos-c-stepper--circle-container')[0],
            x,
          );
    }
  }
}

@Component({
  selector: 'legacy-step',
  template: `
    <div *ngIf="(title || tooltipText) && stepperGroup.isVertical" class="mos-c-stepper__title">
      {{ title || tooltipText }}
    </div>
    <ng-content *ngIf="visible || (stepperGroup.isVertical && _showStepContent)"></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class LegacyStepComponent implements AfterContentInit, AfterContentChecked, OnChanges, OnDestroy {
  /**
   * Set the title of the Step
   **/
  @Input() title: string;
  /**
   * Set the description of the Step
   **/
  @Input() description: string;
  /**
   * Set the Step to be disabled
   **/
  @Input() isDisabled = false;
  /**
   * Set the Step to be complete
   **/
  @Input() isComplete = false;
  /**
   * Makes the Step a sub-step
   */
  @Input() isSubStep = false;
  /**
   * Adds tooltip to Step
   */
  @Input() tooltipText = '';
  /**
   * Determine tooltip position
   */
  @Input() tooltipPosition = TooltipPosition.top;
  /**
   * Determines persisting tooltip position
   */
  @Input() persistingTooltipPosition = TooltipPosition.top;
  /**
   * Determine tooltip delay
   */
  @Input() tooltipDelay = 100;

  visible = false;
  currentOffsetTop;
  mainIndex: number;
  index: number;

  private _debounceTime = 100;
  private _debouncer = new Subject<MutationRecord[]>();
  private _debounceSubscription: Subscription;
  private _windowResizeSubscription: Subscription;

  /**
   * A reference to the main stepper for a sub-stepper
   * @internal
   */
  _parentStepper: LegacyStepComponent;

  /**
   * An array of sub-steppers that's connected to a main stepper
   * @internal
   */
  _stepperChildren: LegacyStepComponent[] = [];

  /**
   * The index when a group of main and sub steppers can be considered complete
   * @internal
   */
  _completionIndex: number;

  /**
   * Collapse step content on vertical stepper to hide content
   * @internal
   */
  _showStepContent = true;

  constructor(
    @Host()
    // tslint:disable-next-line
    @Inject(forwardRef(() => LegacyStepperGroupComponent))
    public stepperGroup: LegacyStepperGroupComponent,
    private _cdr: ChangeDetectorRef,
    private _el: ElementRef,
    private _ngZone: NgZone,
    private _resizeService: HaloWindowResizeService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.title || changes.description) {
      this.stepperGroup.redrawLines();
    }
  }

  ngAfterContentInit() {
    this._windowResizeSubscription = this._resizeService.resizeObservable$.subscribe(() =>
      this._debouncer.next(undefined),
    );

    this._ngZone.runOutsideAngular(() => {
      this._debounceSubscription = this._debouncer.pipe(debounceTime(this._debounceTime)).subscribe(() => {
        this.stepperGroup._updateStepBars();
      });
    });

    this._showStepContent = !this.stepperGroup.collapsedVerticalStepper;
  }

  ngAfterContentChecked() {
    // vertical position handling
    if (!this.stepperGroup.isVertical || this.currentOffsetTop === this._el.nativeElement.offsetTop) {
      return;
    }
    this.currentOffsetTop = this._el.nativeElement.offsetTop;
    this.stepperGroup._updateStepBars();
  }

  ngOnDestroy() {
    this._debouncer.complete();
    this._unsubscribeDebounceSubscription();
    this._removeWindowResizeSubscription();
  }

  show() {
    this.visible = true;
    this._cdr.detectChanges();
  }

  hide() {
    this.visible = false;
    this._cdr.detectChanges();
  }

  /**
   * @internal
   */
  _callChangeDetectorRef() {
    this._cdr.markForCheck();
  }

  private _unsubscribeDebounceSubscription() {
    if (this._debounceSubscription) {
      this._debounceSubscription.unsubscribe();
    }
  }

  private _removeWindowResizeSubscription() {
    if (this._windowResizeSubscription) {
      this._windowResizeSubscription.unsubscribe();
    }
  }
}
