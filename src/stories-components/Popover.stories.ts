import { Actions, BoxShadows, Colors } from 'atlas-cdk';
import { PopoverModule } from 'atlas-popover';
import { IconSizes } from 'atlas-icon';
import { ButtonModule } from 'atlas-button';
import { Meta, Story } from '@storybook/angular';
import { withDesign } from 'storybook-addon-designs';
import { BADGES } from '.storybook/constants';
import { Component, Input } from '@angular/core';

/** Basic Popover Test */
@Component({
  selector: 'popover-test',
  template: `
    <ng-container *ngIf="key">
      <atlas-button atlas-popover [color]="color" (hidePopover)="onHide($event)">
        Open Popover
        <atlas-popover-content
          [autoClose]="autoClose"
          [size]="size"
          [backButton]="backButton"
          [responsiveWidth]="responsiveWidth"
          [isDropdownVariant]="isDropdownVariant"
          [showCloseButton]="showCloseButton"
          [popoverTitle]="popoverTitle"
          [position]="position"
          [elevation]="elevation"
          [color]="color">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
        </atlas-popover-content>
      </atlas-button>
    </ng-container>
  `,
})
class PopoverTest {
  @Input() color = Colors.brand;
  @Input() popoverTitle: string;
  @Input() position: string = 'right';
  @Input() elevation = 'raised';
  @Input() showCloseButton = true;
  @Input() isDropdownVariant = false;
  @Input() defaultWidth = 435;
  @Input() responsiveWidth = 1024;
  @Input() backButton = false;
  @Input() autoClose = true;
  @Input() size = IconSizes.medium;
  @Input() key = 0;

  onHide(): void {
    alert('popover closed');
  }
}

/** Storybook setup */

export default {
  title: 'Adopters/Components/Popover',
  component: PopoverTest,
  decorators: [withDesign],
  parameters: {
    docs: {
      source: {
        code: `<popover-test ...></popover-test>`,
      },
    },
    options: {
      isToolshown: true,
    },
    badges: [BADGES.BETA],
    controls: { sort: 'requiredFirst' },
  },
  argTypes: {
    action: {
      description: 'Deprecated. Use `color` instead.',
      options: Object.values(Actions),
      control: { type: 'select' },
      defaultValue: Actions.primary,
    },
    color: {
      options: Object.values(Colors),
      control: { type: 'select' },
      defaultValue: Colors.brand,
    },
    autoClose: {
      options: [true, false],
      control: { type: 'boolean' },
      defaultValue: true,
    },
    position: {
      options: ['top', 'left', 'right', 'bottom'],
      control: { type: 'select' },
      defaultValue: 'right',
    },
    elevation: {
      options: Object.values(BoxShadows),
      control: { type: 'select' },
      defaultValue: BoxShadows.elevated,
    },
    size: {
      options: Object.values(IconSizes),
      control: { type: 'select' },
      defaultValue: IconSizes.medium,
    },
    onHide: { action: 'popover hidden' },
  },
} as Meta;

export const Basic: Story<PopoverTest> = (args: PopoverTest) => {
  const key = Math.random(); // Se genera uno nuevo cada vez para forzar recreación
  return {
    moduleMetadata: {
      declarations: [PopoverTest],
      imports: [PopoverModule, ButtonModule],
    },
    props: { ...args, key },
    template: `<popover-test
      [color]="color"
      [popoverTitle]="popoverTitle"
      [position]="position"
      [elevation]="elevation"
      [showCloseButton]="showCloseButton"
      [isDropdownVariant]="isDropdownVariant"
      [defaultWidth]="defaultWidth"
      [responsiveWidth]="responsiveWidth"
      [backButton]="backButton"
      [autoClose]="autoClose"
      [size]="size"
      [key]="key"
      (hidePopover)="onHide($event)">
    </popover-test>`,
  };
};

Basic.args = {
  popoverTitle: 'DEMO',
  autoClose: true,
};
