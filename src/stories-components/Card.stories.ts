import { Story, Meta } from '@storybook/angular';

import { BackgroundColors, BoxShadows, SurfaceColors, TextColors } from 'atlas-cdk/';
import { 
  CardComponent, 
  CardContentComponent, 
  CardFooterComponent, 
  CardHeaderActionComponent, 
  CardHeaderComponent, 
  CardMediaContentComponent, 
  CardSubHeaderComponent
 } from 'atlas-card';
import { AvatarComponent } from 'atlas-avatar';
import { ButtonComponent } from 'atlas-button';
import { IconComponent } from 'atlas-icon';

import { BADGES } from '.storybook/constants';

 export default {
  title: 'Adopters/Components/Card',
  component: CardComponent,
  subcomponents: { CardHeaderComponent, CardSubHeaderComponent, CardMediaContentComponent, CardContentComponent, CardFooterComponent }, 
  parameters: {
    badges: [BADGES.BETA],
    controls: { sort: 'requiredFirst' },
    options: {
      isToolshown: true
    },
  },
  argTypes: {
    background: {
      options: [BackgroundColors['background-default-dark'], BackgroundColors['background-default-light'], SurfaceColors['surface-default-dark'], SurfaceColors['surface-default-light'], SurfaceColors['surface-primary-dark'], SurfaceColors['surface-primary-light'], SurfaceColors['surface-secondary-dark'], SurfaceColors['surface-secondary-light'], SurfaceColors['surface-secondary-main']],
      control: { type: 'select' },
      defaultValue: BackgroundColors['background-default-light']
    },
    textColor: {
      options: [TextColors['text-default-main-dark'], TextColors['text-default-main-light'], TextColors['text-default-secondary-dark'], TextColors['text-default-secondary-light'], TextColors['text-primary-main'], TextColors['text-primary-main-light'], TextColors['text-default-disabled-dark'], TextColors['text-default-disabled-light']],
      control: { type: 'select' },
      defaultValue: TextColors['text-default-main-dark']
    },
    elevation: {
      options: [BoxShadows.flat, BoxShadows.raised, BoxShadows.elevated, BoxShadows.floating, BoxShadows.lifted],
      control: { type: 'select' },
      defaultValue: BoxShadows.raised
    },
    fullWidth: {option: false, control: "boolean"},
  },
} as Meta;

const BASIC = `
  <atlas-card [fullWidth]="fullWidth" [mediaPaddingClass]="mediaPaddingClass"
    [elevation]="elevation" [background]="background" [textColor]="textColor">
    <atlas-card-header>
      <span>Card header</span>    
    </atlas-card-header>
    <atlas-card-subheader>
        <span>Subheader</span>
    </atlas-card-subheader> 
    <atlas-card-media>
      <div>
        <img src="./atlas-docs/CardMedia.png">
      </div>
    </atlas-card-media>
    <atlas-card-content>
      <span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </span>
    </atlas-card-content>
    <atlas-card-footer>
      <atlas-button size="small" style="strong" [color]="danger" label="action">action</atlas-button>
      <atlas-button size="small" style="strong" [color]="brand" label="action">small</atlas-button>
    </atlas-card-footer>
  </atlas-card>
`;

const Template: Story<CardComponent> = (args: CardComponent) => ({
  props: args,
  moduleMetadata: {
    declarations: [CardComponent, CardMediaContentComponent, CardContentComponent, CardFooterComponent, CardHeaderComponent, CardSubHeaderComponent, ButtonComponent],
  },
  template: BASIC,
});

export const Basic = Template.bind({});
Basic.args = {
  fullWidth: false
};

Basic.parameters = {
  docs: {
    source: {
      code: BASIC,
    },
  },
};

const AVATAR_HEADER = `
  <atlas-card [avatar]="true"
    [fullWidth]="fullWidth" [mediaPaddingClass]="mediaPaddingClass"
    [elevation]="elevation" [background]="background" [textColor]="textColor"> 
    <atlas-avatar [imgSrc]="'./atlas-docs/Avatar.png'"></atlas-avatar>
    <atlas-card-header> 
      <span>Card header</span>  
    </atlas-card-header> 
    <atlas-card-subheader>
        <span>Subheader</span>
    </atlas-card-subheader>
    <atlas-card-media>
      <div>
        <img width="100%" src="./atlas-docs/CardMedia.png">
      </div>
    </atlas-card-media>
    <atlas-card-content>
      <span>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </span>
    </atlas-card-content>
    <atlas-card-footer>
      <atlas-button size="small" variant="text" label="action">action</atlas-button>
      <atlas-button size="small" variant="text" label="action">small</atlas-button>
    </atlas-card-footer>
  </atlas-card>
`;

const HeaderWithAvatar: Story<CardComponent> = (args: CardComponent) => ({
  props: args,
  moduleMetadata: {
    declarations: [ AvatarComponent, CardComponent, CardMediaContentComponent, CardContentComponent, CardFooterComponent, CardHeaderComponent, CardSubHeaderComponent, CardHeaderActionComponent, ButtonComponent, IconComponent],
  },
  template: AVATAR_HEADER,
});

export const WithAvatar = HeaderWithAvatar.bind({});
WithAvatar.args = {
  avatar: true,
  fullWidth: false,
  mediaPaddingClass: 'padding-x-8'
};

WithAvatar.parameters = {
  docs: {
    source: {
      code: AVATAR_HEADER,
    },
  },
};
