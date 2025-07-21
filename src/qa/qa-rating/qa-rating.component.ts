import { Component, OnInit } from '@angular/core';
import { ThemingService, defaultConfig} from 'atlas-cdk';
import { RatingSizings } from 'atlas-rating';
import { QaRating } from './qa-rating.const';

@Component({
  selector: 'qa-rating',
  templateUrl: './qa-rating.component.html',
  styleUrls: ['./qa-rating.component.scss']
})
export class QaRatingComponent implements OnInit {

  constructor(themingService: ThemingService) {
    themingService.applyConfig(defaultConfig)
   }

   ratings: QaRating [] = [
    {
        id: '1',
        size: RatingSizings.small,
        disabled: false,
        rating: 1,
        numberOfItems: 3,
        readOnly: false,
        showLabel: false
    },
    {
        id: '2',
        size: RatingSizings.medium,
        disabled: false,
        rating: 3,
        numberOfItems: 5,
        readOnly: false,
        showLabel: true
    },
    {
        id: '3',
        size: RatingSizings.large,
        disabled: true,
        rating: 1.5,
        numberOfItems: 3,
        readOnly: false,
        showLabel: false
    },
    {
        id: '4',
        size: RatingSizings.small,
        disabled: false,
        rating: 1.8,
        numberOfItems: 5,
        readOnly: true,
        showLabel: true
    }
   ]

  ngOnInit(): void {
  }

}