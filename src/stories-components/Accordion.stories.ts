// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { AccordionModule } from 'atlas-accordion';
import { Actions, BoxShadows } from 'atlas-cdk';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';

import { BADGES } from '.storybook/constants';
import { IconModule, IconSizes } from 'atlas-icon';
import { ButtonModule } from 'atlas-button';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

/**
 * The accordion consists of two regions. One is displayed when the component loads and the other is hidden until an interaction occurs. 
 */
@Component({
  selector: 'app-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
 <div class="row expanded collapse">
    <div class="column medium-8">
      <atlas-accordion [expandedAll]="expandedAll" [elevation]="elevation">
        <atlas-accordion-item *ngFor="let item of accordion; let i = index"  
              [expanded]="item.expanded" 
              (onExpand)="changeExpandStatus($event, i)"
              [ngClass]="typographyClass"
              [disabled]="disabled"
        >
          <atlas-accordion-heading>
            <div class="padding-y-6">{{ item.heading }}</div>
          </atlas-accordion-heading>
          <atlas-accordion-subheading>
          <div class="padding-y-6">{{ item.subheading }}</div>  
          </atlas-accordion-subheading>
          <atlas-accordion-content>
            <div class="padding-y-10 padding-x-8" [innerHTML]="item.content"></div>
          </atlas-accordion-content>
          <atlas-accordion-expand>
            <div>
              <atlas-icon-button [icon]="item.expanded ? 'icon-chevron-up-24' : 'icon-chevron-down-24'"></atlas-icon-button>
            </div>
          </atlas-accordion-expand>
        </atlas-accordion-item>
      </atlas-accordion>
    </div>
  </div>  
 `,
})

class AccordionSampleComponent {
    /** Expand all the accordion items */
    @Input() expandedAll: boolean = false;
    /** Shadow elevation of the accordion group */
    @Input() elevation = BoxShadows.flat;
    /** Set disabled state of accordion */
    @Input() disabled: boolean = false;
    /** Set typography of accordion */
    @Input() typographyClass: string = 'typographyStyles-body-medium';
    /**
     * Sets if accordion item is expanded or not.
     */
    @Input() expanded: boolean = false;
    /**
     * Emits on expand.
     */
    @Output() onExpand: EventEmitter<any> = new EventEmitter();

    /** @internal */
    accordion: any[] = [];
    
  constructor() {
    this.accordion.push(
      {
        heading: "Heading",
        subheading: "SubHeading",
        expanded: false,
        disabled: false,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        heading: "Heading",
        subheading: "SubHeading",
        expanded: false,
        disabled: false,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
      {
        heading: "Heading",
        subheading: "SubHeading",
        expanded: false,
        disabled: false,
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      },
    )
  }

  changeExpandStatus(ev, index) {
    this.accordion[index].expanded = ev;
  }
}

export default {
  title: 'Adopters/Components/Accordion/Accordion',
  component: AccordionSampleComponent,
  decorators: [
    withDesign,
    moduleMetadata({
      imports: [AccordionModule, IconModule, ButtonModule],
    })
  ],
  parameters: {
    options: {
      isToolshown: true,
    },
    badges: [BADGES.BETA],
    controls: { sort: 'requiredFirst' },
    actions: { argTypesRegex: '^on.*' },
    // TODO [AG]: I need to keep this code, we are going to fixed in a different ticket
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/x74LhhNgStoUDZtMqGjGhg/Foundation-0.0.2?node-id=12423%3A17656',
    //   allowFullscreen: true,
    // },
  },
  argTypes: {
    elevation: {
      options: [BoxShadows.flat, BoxShadows.raised, BoxShadows.elevated, BoxShadows.floating, BoxShadows.lifted],
      control: { type: 'select' },
      defaultValue: BoxShadows.raised
    },
    disabled: {
      options: [false, true],
      control: { type: 'boolean' }
    },
    expandedAll: {
      options: [false, true],
      control: { type: 'boolean' }
    },
    expanded: {
      options: [false, true],
      control: { type: 'boolean' }
    },
    typographyClass: {
      defaultValue: 'typographyStyles-body-medium',
      control: { type: 'text' }
    },
  }
} as Meta;

const BASIC_TEMPLATE = `
<div class="row expanded collapse">
  <div class="column medium-8">
    <atlas-accordion [expandedAll]="expandedAll" [elevation]="elevation">
      <atlas-accordion-item *ngFor="let item of accordion; let i = index"  
            [expanded]="item.expanded" 
            (onExpand)="changeExpandStatus($event, i)"
      >
        <atlas-accordion-heading>
          <div class="padding-y-6">{{ item.heading }}</div>
        </atlas-accordion-heading>
        <atlas-accordion-subheading>
        <div class="padding-y-6">{{ item.subheading }}</div>  
        </atlas-accordion-subheading>
        <atlas-accordion-content>
          <div class="padding-y-10 padding-x-8" [innerHTML]="item.content"></div>
        </atlas-accordion-content>
        <atlas-accordion-expand>
          <div>
            <atlas-icon-button [icon]="item.expanded ? 'icon-chevron-up-24' : 'icon-chevron-down-24'"></atlas-icon-button>
          </div>
        </atlas-accordion-expand>
      </atlas-accordion-item>
    </atlas-accordion>
  </div>
</div>  
`;

export const Accordion: Story = (args: AccordionSampleComponent) => {
  /** Expand all the accordion items */
  let expandedAll = args.expandedAll;
  /** Shadow elevation of the accordion group */
  let elevation = args.elevation;
  /** Set disabled state of accordion */
  let disabled = args.disabled;
  /** Set typography of accordion */
  let typographyClass = args.typographyClass;
  /**
   * Sets if accordion item is expanded or not.
   */
  let expanded = args.expanded;

  return {
    props: {
      expandedAll,
      elevation,
      disabled,
      typographyClass,
      expanded,
    }
  }
};
Accordion.args = {
  elevation: BoxShadows.raised,
  disabled: false,
  expanded: false,
  expandedAll: false,
  typography: 'typographyStyles-body-medium'

};

Accordion.parameters = {
  docs: {
    source: {
      code: BASIC_TEMPLATE
    }
  }
}


