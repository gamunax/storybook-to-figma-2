export enum ActionsDeprecated {
    default = 'default',
    primary = 'primary',
    'primary-reverse' = 'primary-reverse',
    secondary = 'secondary',
    'secondary-reverse' = 'secondary-reverse',
    error = 'error',
    info = 'info',
    warning = 'warning',
    success = 'success',
}

export enum Gradients {
  'gradient-blue-green' = 'gradient-blue-green',
  'gradient-blue-teal' = 'gradient-blue-teal',
  'gradient-blue-purple' = 'gradient-blue-purple',
  'gradient-blue-pink' = 'gradient-blue-pink',
  'gradient-blue-turquoise' = 'gradient-blue-turquoise',
}

export enum Density {
  expanded = 'expanded',
  dense = 'dense',
  condensed = 'condensed',
}

export enum Shadows {
  default = 'default',
  none = 'none'
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

export enum Theme {
  default = 'light',
  dark = "dark",
  light = 'light',
}

export enum Positions {
  relative = 'relative',
  absolute = 'absolute',
  fixed = 'fixed',
  static = 'static',
  sticky = 'sticky',
  inherit = 'inherit',
}

export enum Layers {
  hidden = -9999,
  under = -1,
  default = 0,
  content = 1,
  header = 10,
  above = 1000,
  forced = 9999,
}