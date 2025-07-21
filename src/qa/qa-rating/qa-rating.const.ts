import { RatingSizings } from 'atlas-rating';

export interface QaRating {

    disabled: boolean,
    size: RatingSizings,
    rating: number,
    numberOfItems: number,
    readOnly: boolean,
    showLabel: boolean,
    id: string
}