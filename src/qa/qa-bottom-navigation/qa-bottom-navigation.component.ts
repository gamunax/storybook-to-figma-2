import { Component, OnInit } from '@angular/core';
import { ThemingService, defaultConfig } from 'atlas-cdk';
import { IconSizes } from 'atlas-icon';
import { QaBottomNavigation } from './qa-bottom-navigation.const';

@Component({
    selector: 'qa-bottom-navigation',
    templateUrl: './qa-bottom-navigation.component.html',
    styleUrls: ['./qa-bottom-navigation.component.scss']
})
export class QaBottomNavigationComponent implements OnInit {

    constructor(themingService: ThemingService) {
        themingService.applyConfig(defaultConfig)
    }

    bottomNavs: QaBottomNavigation[] = [
        {
            id: '1',
            icon: 'icon-calendar-24',
            size: IconSizes.small,
            label: 'Calendar'
        },
        {
            id: '2',
            icon: 'icon-warning-24',
            size: IconSizes.medium,
            label: 'Warning'
        },
        {
            id: '3',
            icon: 'icon-notification-24',
            size: IconSizes.large,
            label: 'Notification'
        }
    ]

    ngOnInit(): void { }

}