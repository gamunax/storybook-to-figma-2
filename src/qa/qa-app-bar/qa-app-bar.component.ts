import { Component, OnInit } from '@angular/core';
import { ButtonVariants } from 'atlas-button';
import { Actions, defaultConfig, ThemingService } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { QaAppBar } from './qa-app-bar.const';

@Component({
  selector: 'app-bar',
  templateUrl: './qa-app-bar.component.html',
  styleUrls: ['./qa-app-bar.component.scss']
})
export class QaAppBarComponent implements OnInit {

  constructor(themingService: ThemingService,) {
    themingService.applyConfig(defaultConfig);
   }

  appBarButton: QaAppBar[] = [
    {
      action: Actions.default,      
      size: IconSizes.xsmall,
      variant: ButtonVariants.text,
      actionBtn: Actions.primary,
      id: 'TC1'
    },
    {
      action: Actions.secondary,
      size: IconSizes.small,
      variant: ButtonVariants.text,
      actionBtn: Actions.default,
      id: 'TC2'
    },
    {
      action: Actions.primary,
      size: IconSizes.medium,
      variant: ButtonVariants.text,
      actionBtn: Actions['primary-reverse'],
      id: 'TC3'
    },
    {
      action: Actions.default,
      size: IconSizes.large,
      variant: ButtonVariants.text,
      actionBtn: Actions.secondary,
      id: 'TC4'
    },
    {
      action: Actions.secondary,
      size: IconSizes.xsmall,
      variant: ButtonVariants.text,
      actionBtn: Actions['secondary-reverse'],
      id: 'TC5'
    },
  ]

  appBarIcon: QaAppBar[] = [
    {
      action: Actions.secondary,      
      size: IconSizes.xsmall,
      variant: ButtonVariants.text,
      actionBtn: Actions.secondary,
      src: './atlas-logos/Mercer_R.png',
      id: 'TC6',
      customClass: 'app-bar-secondary-avatar'
    },
    {
      action: Actions.default,
      size: IconSizes.small,
      variant: ButtonVariants.contained,
      actionBtn: Actions.primary,
      src: './atlas-logos/Mercer.png',
      id: 'TC7',
      customClass: 'app-bar-default-avatar'
    },
    {
      action: Actions.primary,
      size: IconSizes.medium,
      variant: ButtonVariants.outlined,
      actionBtn: Actions.default,
      src: './atlas-logos/Mercer_R.png',
      id: 'TC8',
      customClass: 'app-bar-primary-avatar'
    }
  ]

  appBarIB: QaAppBar[] = [
    {
      action: Actions.default,
      size: IconSizes.medium,
      variant: ButtonVariants.text,
      actionBtn: Actions.primary,
      id: 'TC9',
      src: './atlas-logos/Mercer.png'
    }
  ]
  ngOnInit(): void {
  }

}
