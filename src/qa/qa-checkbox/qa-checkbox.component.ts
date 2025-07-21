import { Component, OnInit } from '@angular/core';
import { ThemingService, defaultConfig, Actions } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { QaCheckbox } from './qa-checkbox.const';

@Component({
    selector: 'qa-checkbox',
    templateUrl: './qa-checkbox.component.html',
    styleUrls: ['./qa-checkbox.component.scss']
})
export class QaCheckboxComponent implements OnInit {

    constructor(themingService: ThemingService) {
        themingService.applyConfig(defaultConfig)
    }

    checkboxes: QaCheckbox[] = [
      {
        checkboxId: '1',
        action: Actions.default,
        checkboxName: 'TC1',
        disabled: false,
        indeterminate: true,
        isChecked: false,
        size: IconSizes.xsmall,
        value: 'TC1',
      },
      {
        checkboxId: '2',
        action: Actions.primary,
        checkboxName: 'TC2',
        disabled: false,
        indeterminate: false,
        isChecked: true,
        size: IconSizes.small,
        value: 'TC2',
        labelCustomClass: 'TC2'
      },
      {
        checkboxId: '3',
        action: Actions.secondary,
        checkboxName: 'TC3',
        disabled: false,
        indeterminate: false,
        isChecked: false,
        size: IconSizes.medium,
        value: 'TC3',
      },
      {
        checkboxId: '4',
        action: Actions.error,
        checkboxName: 'TC4',
        disabled: true,
        indeterminate: true,
        isChecked: true,
        size: IconSizes.large,
        value: 'TC4',
      },
      {
        checkboxId: '5',
        action: Actions.warning,
        checkboxName: 'TC5',
        disabled: false,
        indeterminate: true,
        isChecked: true,
        size: IconSizes.xlarge,
        value: 'TC5'
      },
      {
        checkboxId: '6',
        action: Actions.info,
        checkboxName: 'TC6',
        disabled: false,
        indeterminate: false,
        isChecked: true,
        size: IconSizes.medium,
        value: 'TC6',
      }

    ]

    ngOnInit(): void { }

}