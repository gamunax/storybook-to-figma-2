import { RatingComponent, RatingModule } from 'atlas-rating';
import { Meta, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';
import { RatingSizings } from 'projects/rating/src/public-api';

export default {
  title: 'Adopters/Components/Rating',
  component: RatingComponent,
  decorators: [
    withDesign,
  ],
  parameters: {
    badges: [BADGES.ALPHA],
    controls: { sort: 'requiredFirst' },
    options: {
      isToolshown: true
    },
  },
  argTypes: {
    rating: {
      control: { type: 'number' },
      defaultValue: 2.5
    },
    numberOfItems: {
      control: { type: 'number' },
      defaultValue: 5
    },
    size: {
      options: [RatingSizings.small, RatingSizings.medium, RatingSizings.large],
      control: { type: 'select' },
      defaultValue: RatingSizings.medium
    },    
  }
} as Meta;

const BASIC = `
<atlas-rating 
  [numberOfItems]="numberOfItems" 
  [rating]="rating" 
  [disabled]="false" 
  [readOnly]="false" 
  [size]="size"
  [showLabel]="true"
  (rated)="onRated($event)">
</atlas-rating>`;

const RatingBasic: Story<RatingComponent> = (args: RatingComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [RatingModule],
  },
  template: BASIC,
});

export const Basic = RatingBasic.bind({});
Basic.args = {
  numberOfItems: 5,
  rating: 2.5,
  size: RatingSizings.medium, 
};
Basic.parameters = {
  docs: {
    source: {
      code: BASIC,
    },
  },
};
