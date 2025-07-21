import { Component, OnInit } from '@angular/core';
import { ThemingService, defaultConfig } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { QaSnackBar } from './qa-snack-bar.const';

@Component({
    selector: 'snack-bar',
    templateUrl: './qa-snack-bar.component.html',
    styleUrls: ['./qa-snack-bar.component.scss']
})
export class QaSnackBarComponent implements OnInit {

    constructor(themingService: ThemingService) {
        themingService.applyConfig(defaultConfig)
    }

    baseSnackBar: QaSnackBar[] = [
        {
            id: 'TC1',
            variant: 'dark',
            iconSize: IconSizes.xsmall
        },
        {
            id: 'TC2',
            variant: 'dark',
            iconSize: IconSizes.small
        },
        {
            id: 'TC3',
            variant: 'light',
            iconSize: IconSizes.medium
        },
        {
            id: 'TC4',
            variant: 'dark',
            iconSize: IconSizes.large
        },
        {
            id: 'TC5',
            variant: 'light',
            iconSize: IconSizes.xlarge
        }
    ]

    noActionSnackBar: QaSnackBar[] = [
        {
            id: 'TC6',
            variant: 'light',
        },
        {
            id: 'TC7',
            variant: 'dark',
        }
    ]

    ngOnInit(): void {
    }

}
