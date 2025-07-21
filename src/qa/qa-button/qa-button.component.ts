import { Component, OnInit } from '@angular/core';
import { Radii, Actions, ButtonSizings, ButtonVariants } from 'atlas-cdk';
import { ThemingService, defaultConfig } from 'atlas-cdk';
import { QaButton } from './qa-button.const';

@Component({
  selector: 'qa-badge',
  templateUrl: './qa-button.component.html',
  styleUrls: ['./qa-button.component.scss']
})
export class QaButtonComponent implements OnInit {

  constructor(themingService: ThemingService) {
    themingService.applyConfig(defaultConfig)
   }

   buttons: QaButton[] = [
       {
           id: '1',
           action: Actions.default,
            disabled: false,
            expand: false,
            radius: Radii.rounded,
            size: ButtonSizings.small,
            variant: ButtonVariants.contained
       },
       {
        id: '2',
        action: Actions.primary,
         disabled: false,
         expand: true,
         radius: Radii.none,
         size: ButtonSizings.medium,
         variant: ButtonVariants.outlined
    },
    {
        id: '3',
        action: Actions.secondary,
         disabled: false,
         expand: false,
         radius: Radii.soft,
         size: ButtonSizings.large,
         variant: ButtonVariants.text
    },
    {
        id: '4',
        action: Actions.default,
         disabled: true,
         expand: true,
         radius: Radii.softer,
         size: ButtonSizings.xsmall,
         variant: ButtonVariants.contained
    },
    {
        id: '5',
        action: Actions.primary,
         disabled: false,
         expand: true,
         radius: Radii.none,
         size: ButtonSizings.xlarge,
         variant: ButtonVariants.contained
    }
   ]

  ngOnInit(): void {
  }
}