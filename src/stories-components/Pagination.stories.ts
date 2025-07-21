// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Actions, Colors, Styles } from 'atlas-cdk';
import {
  PaginationComponent,
  PaginationModule,
  PaginationRadius,
  PaginationSizings,
  PaginationVariants,
} from 'atlas-pagination';
import { Meta, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';

export default {
  title: 'Adopters/Components/Pagination',
  component: PaginationComponent,
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
    color: {
      description: 'Select the color of the button.',
      options: [Colors.neutral, Colors.brand],
      control: { type: 'select' },
      defaultValue: Colors.brand,
    },
    action: {
      description: 'This property is deprecated and will be removed in a future version. Please use `color` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [
        Actions.default, 
        Actions.primary, 
        Actions.secondary,       
      ],
      control: { type: 'select' },
      defaultValue: Actions.primary
    },
    radius: {
      options: [
        PaginationRadius.round,
        PaginationRadius.rounded
      ],
      control: { type: 'select' },
      defaultValue: PaginationRadius.round,
    },
    size: {
      options: [
        PaginationSizings.small,
        PaginationSizings.medium,
        PaginationSizings.large,
        PaginationSizings.xlarge
      ],
      control: { type: 'select' },
      defaultValue: PaginationSizings.large,
    },
    iconSize: {
      table: {
        disable: true
      }
    },
    style: {
      description: 'Set the button style',
      options: [Styles['no-fill'],Styles.outlined],
      control: { type: 'select' },
      defaultValue: Styles['no-fill']
    },
    variant: {
      description: 'This property is deprecated and will be removed in a future version. Please use `style` instead. Note: Storybook functionality has been removed; this property is displayed for documentation purposes only.',
      options: [
        PaginationVariants.text,
        PaginationVariants.outlined,
      ],
      control: { type: 'select' },
      defaultValue: PaginationVariants.text,
    },
  }
} as Meta;

const TEMPLATE = `
<atlas-pagination 
    [maxSize]="5"
    [paginationInfo]="paginationInfo" 
    [size]="size"  
    [style]="style"    
    [radius]="radius"
    [color]="color"
    [disabled]="disabled"
    (selectedPageNumber)="onLoadPageNumberRequested($event)">
  </atlas-pagination>
`;

const PAGINATION_EXAMPLE = `
import {
  PaginationComponent,
  PaginationModule,
  PaginationRadius,
  PaginationSizings,
  PaginationVariants,
} from 'atlas-pagination';
import { Actions, Colors, Styles } from 'atlas-cdk';

/** Pagination Example */
@Component({
  selector: 'pagination-example',
  template:\`
  <atlas-pagination 
    [maxSize]="5"
    [paginationInfo]="paginationInfo" 
    [size]="size"  
    [style]="style"    
    [radius]="radius"
    [color]="color"
    [disabled]="disabled"
    (selectedPageNumber)="onLoadPageNumberRequested($event)">
  </atlas-pagination>\` 
  ,
})

class PaginationExample {
  color: Colors = Colors.neutral,  
  radius: PaginationRadius = PaginationRadius.round,
  style: Styles = Styles['no-fill'],
  size: PaginationSizings = PaginationSizings.medium,
  disabled: boolean = false,
  paginationInfo: any = {
    page: 1,
    itemsByPage: 10,
    total: 200,
  }
 
  onLoadPageNumberRequested(pageRequested: number): void {
    this.paginationInfo = { ...this.paginationInfo, page: pageRequested };
    console.log(this.paginationInfo);
  }

}
`;

const Pagination: Story<PaginationComponent> = (args: PaginationComponent) => ({
  props: { ...args },
  moduleMetadata: {
    imports: [PaginationModule],
  },
  template: TEMPLATE,
});

export const Basic = Pagination.bind({});
Basic.args = {
  color: Colors.neutral, 
  radius: PaginationRadius.round,
  style: Styles['no-fill'],
  size: PaginationSizings.medium,
  disabled: false,
  paginationInfo:{
    page: 1,
    itemsByPage: 10,
    total: 200,
  }
};
Basic.parameters = {
  docs: {
    source: {
      code: TEMPLATE,
    },
  },
};

export const PaginationExample = Pagination.bind({});
PaginationExample.args = {
  color: Colors.neutral, 
  radius: PaginationRadius.round,
  style: Styles['no-fill'],
  size: PaginationSizings.medium,
  disabled: false,
  paginationInfo:{
    page: 1,
    itemsByPage: 10,
    total: 200,
  }
};
PaginationExample.parameters = {
  docs: {
    source: {
      code: PAGINATION_EXAMPLE,
    },
  },
};

