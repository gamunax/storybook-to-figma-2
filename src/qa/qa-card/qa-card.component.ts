import { Component, OnInit } from '@angular/core';
import { ButtonVariants, ButtonSizings } from 'atlas-button';
import { Actions, ThemingService, defaultConfig } from 'atlas-cdk';

import { QaCard } from './qa-card.const';

@Component({
    selector: 'card',
    templateUrl: './qa-card.component.html',
    styleUrls: ['./qa-card.component.scss']
})

export class QaCardComponent implements OnInit {

    constructor(themingService: ThemingService) {
        themingService.applyConfig(defaultConfig)
       }

    ngOnInit(): void {
        
    }

    cards: QaCard[] = [
        {
            size: ButtonSizings.small,
            imgSrc: './atlas-docs/Avatar.png',
            variant: ButtonVariants.text,
            action: Actions.primary,
            avatar: true,
            id: 'TC1'
        },
        {
            size: ButtonSizings.small,
            variant: ButtonVariants.text,
            action: Actions.primary,
            avatar: false,
            id:'TC2'
        },
    ]
}