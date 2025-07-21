import { TemplateRef, Type } from "@angular/core";

// TODO (MF): Pull out global obj

export enum Actions {
  default = 'default',
  primary = 'primary',
  secondary = 'secondary'
}

export enum ButtonSizings {
  xsmall = 'xsmall',
  small = 'small',
  medium = 'medium',
  large = 'large',
  xlarge = 'xlarge'
}

export enum ButtonVariants {
  soft = 'soft', // new variant
  outlined = 'strong',
  contained = 'outlined',
  text = 'no-fill'
}
export interface IElementStates {
  hover?: boolean;
  focus?: boolean;
  active?: boolean;
  disabled?: boolean;
  default?: boolean;
}

export enum ElementState {
  hover = 'hover',
  focus = 'focus',
  active = 'active',
  disabled = 'disabled',
  default = 'default',
}

export enum Radii { 
  none = 'none',
  soft = 'soft',
  softer = 'softer',
  rounded = "full"
}

export enum Shadows {
  default = 'default',
  none = 'none'
}

export interface ComponentData {
  component: {
      action: {
          variant: {
            type: string,
            description: string,
            value: {
              property: string,
            },
            states: [
              StateData
            ];
          }
      }
      size: {
          label: {
              property: {
                  type: any;
                  value: string;
                }
          }
      }
  }
}

export interface StateData {
  state: {
    type: string,
    description: string,
    value: {
        property: string,
    }
  },
}

export interface ButtonConfig {
  content: string | TemplateRef<any> | Type<any>;
  disabled?: boolean;
  event?: any;
  alt?: string;
  tabindex?: string;
  ariaLabel?: string;
  customBtnClass?: string;
}
