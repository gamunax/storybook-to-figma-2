import { Component, OnInit } from '@angular/core';
import { Actions, defaultConfig, ThemingService } from 'atlas-cdk';
import { ChipSizings, ChipVariants } from 'atlas-chips';
import { QaChip } from './qa-chip.const';

@Component({
  selector: 'chio',
  templateUrl: './qa-chip.component.html',
  styleUrls: ['./qa-chip.component.scss']
})
export class QaChipComponent implements OnInit {

  constructor(themingService: ThemingService,) {
    themingService.applyConfig(defaultConfig);
   }

  commonChip: QaChip[] = [
      {
          size: ChipSizings.small,
          action: Actions.default,
          variant: ChipVariants.filled,
          removable: false,
          disabled: false,
          customClass: 'customClass1',
          id: 'TC1'
      },
      {
        size: ChipSizings.small,
        action: Actions.primary,
        variant: ChipVariants.filled,
        removable: true,
        disabled: false,
        customClass: 'customClass2',
        id: 'TC2'
    },
    {
        size: ChipSizings.small,
        action: Actions.secondary,
        variant: ChipVariants.outlined,
        removable: false,
        disabled: false,
        id: 'TC3'
    },
    {
        size: ChipSizings.medium,
        action: Actions.error,
        variant: ChipVariants.filled,
        removable: true,
        disabled: false,
        customClass: 'customClass4',
        id: 'TC4'
    },
    {
        size: ChipSizings.medium,
        action: Actions.success,
        variant: ChipVariants.outlined,
        removable: false,
        disabled: true,
        id: 'TC5'
    },
    {
        size: ChipSizings.medium,
        action: Actions.warning,
        variant: ChipVariants.filled,
        removable: true,
        disabled: false,
        id: 'TC6'
    },
    {
        size: ChipSizings.medium,
        action: Actions.info,
        variant: ChipVariants.filled,
        removable: true,
        disabled: true,
        customClass: 'customClass1',
        id: 'TC7'
    }
  ]

  iconChips: QaChip[] = [
    {
        size: ChipSizings.small,
        action: Actions.default,
        variant: ChipVariants.filled,
        removable: true,
        disabled: true,
        customClass: 'customClass1',
        id: 'TC8'
    },
    {
        size: ChipSizings.small,
        action: Actions.primary,
        variant: ChipVariants.outlined,
        removable: false,
        disabled: false,
        id: 'TC9'
    },
    {
        size: ChipSizings.small,
        action: Actions.secondary,
        variant: ChipVariants.filled,
        removable: true,
        disabled: false,
        id: 'TC10'
    },
    {
        size: ChipSizings.small,
        action: Actions.error,
        variant: ChipVariants.filled,
        removable: false,
        disabled: false,
        id: 'TC11'
    },
    {
        size: ChipSizings.medium,
        action: Actions.success,
        variant: ChipVariants.outlined,
        removable: true,
        disabled: false,
        id: 'TC12',
        customClass: 'customclass12'
    },
    {
        size: ChipSizings.medium,
        action: Actions.info,
        variant: ChipVariants.outlined,
        removable: true,
        disabled: true,
        id: 'TC13',
        customClass: 'customclass13'
    },
    {
        size: ChipSizings.medium,
        action: Actions.warning,
        variant: ChipVariants.filled,
        removable: true,
        disabled: true,
        id: 'TC14',
        customClass: 'customclass14'
    }

  ]

  ngOnInit(): void {
  }

}
