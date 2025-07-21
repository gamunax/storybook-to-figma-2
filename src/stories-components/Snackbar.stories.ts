import { BADGE } from '@geometricpanda/storybook-addon-badges/';
import { IconModule, IconSizes } from 'atlas-icon';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { SnackbarComponent, SnackbarModule, SnackbarService } from 'atlas-snackbar';
import { Actions, BoxShadows } from 'atlas-cdk';
import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'atlas-button';
import { withDesign } from 'storybook-addon-designs';

/** LaunchSnackbarComponent */
@Component({
  selector: 'launcher',
  template: `
     <atlas-button (click)="launch()">Open snackbar</atlas-button>
  `
})
class LaunchSnackbarComponent {
  /** Example of message */
  @Input() message: string = '';
  /** Example of variant */  
  @Input() variant: string = '';
  /** Box shadow elevation*/
  @Input() elevation: BoxShadows = BoxShadows.elevated;
  /** Whether the dialog should enable the action button or not. */
  @Input() enableAction: boolean = false;
  /** Label of action button. */
  @Input() actionLabel: string = '';
  /** Horizontal position of snackbar. */
  @Input() horizontalPosition: string = 'left';
  /** Vertical position of snackbar. */
  @Input() verticalPosition: string = 'top';
  /**
   * Autoclose property for snackbar. Set by default for 3sec (3000). Set it to 0 to disable autoclose.
   */
  @Input() autoclose: number = 3000;

  constructor(private _snackbar: SnackbarService) { }

  launch(): void {
    this._snackbar.create({
      message: this.message,
      variant: this.variant,
      elevation: this.elevation,
      enableAction: this.enableAction,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      actionLabel: this.actionLabel,
      autoclose: this.autoclose,
      actionClick: () => console.log('clicked action'),
      closeClick: () => console.log( 'closed snackbar')
    });
  }
}
/** Finish LaunchSnackbarComponent  */

export default {
  title: 'Adopters/Components/Snackbar',
  component: LaunchSnackbarComponent,  
  decorators: [
    moduleMetadata({
      imports:[SnackbarModule, BrowserAnimationsModule, ButtonModule]
    }),
    withDesign,
  ],
  parameters: {
    options: {
      isToolshown: true,      
    },
    // TODO [AG]: I need to keep this code, we are going to fixed in a different ticket
    //badges: [ BADGE.BETA ],
    controls: { sort: 'requiredFirst'},
    // TODO [AG]: I need to keep this code, we are going to fixed in a different ticket
    // design: {
    //   type: 'figma',
    //   url: 'https://www.figma.com/file/x74LhhNgStoUDZtMqGjGhg/Foundation-0.0.2?node-id=12586%3A17979',
    //   allowFullscreen: true,
    // },
  },
  argTypes: {
    variant: {
      options: ['light', 'dark'],
      control: { type: 'select' },   
      defaultValue: 'light'
    },
    elevation: {
      options: [BoxShadows.flat, BoxShadows.raised, BoxShadows.elevated, BoxShadows.floating, BoxShadows.lifted],
      control: { type: 'select' },
    },
  },
} as Meta<SnackbarComponent>;

const SnackbarBasic: Story<LaunchSnackbarComponent> = (args: LaunchSnackbarComponent) => ({
  props: { ...args }, 
});

export const Basic = SnackbarBasic.bind({});
Basic.args = {
  message: 'This is an snackbar message',
  enableAction: true,
  actionLabel: 'Action',
  horizontalPosition: 'left',
  verticalPosition: 'top',
  variant: 'light'
};