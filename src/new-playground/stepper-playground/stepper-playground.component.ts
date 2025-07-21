import { Component } from '@angular/core';
import { Actions, BoxShadows, Colors, TabVariants } from 'atlas-cdk';
import { TooltipPosition } from 'atlas-tooltip';

@Component({
  selector: 'stepper-playground',
  templateUrl: './stepper-playground.component.html',
  styleUrls: ['./stepper-playground.component.scss']
})
export class StepperPlayground {
  colors = Colors;
  actions = Actions;
  boxShadows = BoxShadows;
  variants = TabVariants;
  steps = [
    {
      title: 'Stepper title 1',
      description: 'Stepper description 1'
    },
    {
      title: 'Stepper title 2'
      , description: 'Stepper description 2'
    },
    {
      title: 'Stepper title 3'
      , description: 'Stepper description 3'
    },
    {
      title: 'Stepper title 4'
      , description: 'Stepper description 4'
    },
  ];
  EFAULT_RESPONSIVE_OPTIONS: any = {
    md: true,
    lg: false,
  };
  steps1 = [
    {
      title: 'Step 1',
      description: 'Step 1 description',
      isDisabled: false,
      isComplete: true,
      isSubStep: false,
      tooltipText: 'Complete step 1',
      tooltipPosition: TooltipPosition.bottom,
      persistingTooltipPosition: TooltipPosition.bottom,
      tooltipDelay: 0,
    },
    {
      title: 'Step 2',
      description: 'Step 2 description',
      isDisabled: false,
      isComplete: false,
      isSubStep: false,
      tooltipText: 'Complete step 2',
      tooltipPosition: TooltipPosition.bottom,
      persistingTooltipPosition: TooltipPosition.bottom,
      tooltipDelay: 0,
    },
    {
      title: 'Step 3',
      description: 'Step 3 description',
      isDisabled: false,
      isComplete: false,
      isSubStep: false,
      tooltipText: 'Complete step 3',
      tooltipPosition: TooltipPosition.bottom,
      persistingTooltipPosition: TooltipPosition.bottom,
      tooltipDelay: 0,
    },
    {
      title: 'Step 4',
      description: 'Step 4 description',
      isDisabled: false,
      isComplete: false,
      isSubStep: false,
      tooltipText: 'Complete step 4',
      tooltipPosition: TooltipPosition.bottom,
      persistingTooltipPosition: TooltipPosition.bottom,
      tooltipDelay: 0,
    },
  ];
  steps2 = [
    {
      title: 'Start here',
      description: 'On page load',
      detail: 'Detail On page load',
      isDisabled: false,
      isComplete: false,
      isSubStep: false,
      tooltipText: 'On page load',
      tooltipPosition: 'bottom',
      persistingTooltipPosition: false,
      tooltipDelay: 0,
    },
    {
      title: 'Step 2',
      description: 'Step 2 description',
      detail: 'Detail 2 description',
      isDisabled: false,
      isComplete: false,
      isSubStep: false,
      tooltipText: 'On page load',
      tooltipPosition: 'bottom',
      persistingTooltipPosition: false,
      tooltipDelay: 0,
    },
    {
      title: 'Step Title',
      description: 'Step 3 description',
      detail: 'Detail 3 description',
      isDisabled: false,
      isComplete: false,
      isSubStep: false,
      tooltipText: 'On page load',
      tooltipPosition: 'bottom',
      persistingTooltipPosition: false,
      tooltipDelay: 0,
    },
    {
      title: 'Always Complete',
      description: 'Step description',
      detail: 'Detail description',
      isDisabled: false,
      isComplete: true,
      isSubStep: false,
      tooltipText: 'On page load',
      tooltipPosition: 'bottom',
      persistingTooltipPosition: false,
      tooltipDelay: 0,
    },
    {
      title: 'Disabled',
      description: 'Disabled step',
      detail: 'Detail Disabled',
      isDisabled: true,
      isComplete: false,
      isSubStep: false,
      tooltipText: 'On page load',
      tooltipPosition: 'bottom',
      persistingTooltipPosition: false,
      tooltipDelay: 0,
    },
  ];
  changeStep(value): void {
    console.log('Step index', value);
  }
}