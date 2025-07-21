export enum Colors {
  neutral = 'neutral',
  brand = 'brand',
  danger = 'danger',
  info = 'info',
  caution = 'caution',
  success = 'success',
}

export enum PaginationVariants {
  outlined = 'outlined',
  text = 'text',  
}

export enum Styles {
  soft = 'soft',
  strong = 'strong',
  outlined = 'outlined',
  'no-fill' = 'no-fill',
  filled = 'filled',
  invalid = "invalid"
}

export enum Actions {
  default = 'neutral',
  primary = 'brand',
  'primary-reverse' = 'brand',
  secondary = 'brand',
  'secondary-reverse' = 'brand',
  error = 'danger',
  info = 'info',
  warning = 'caution',
  success = 'success',
}

export enum BoxShadows {
  flat = "flat",
  raised = "raised",
  elevated = "elevated",
  floating = "floating",
  lifted = "lifted"
}

export enum ChipVariants {
  filled = 'filled',
  outlined = 'outlined',
}


export enum ChipSizings {
  small = 'small',
  medium = 'medium',
}

export enum IndicatorLocation {
  right = 'right',
  left = 'left',
}

// TODO: mix with ChipSizings, looking for a good name
export enum SwitchSizings {
  small = 'small',
  medium = 'medium',
}


export enum ButtonVariants {
  soft = 'soft', // new variant
  outlined = 'strong',
  contained = 'outlined',
  text = 'no-fill'
}

export enum ButtonSizings {
  xsmall = 'xsmall',
  small = 'small',
  medium = 'medium',
  large = 'large',
  xlarge = 'xlarge'
}

export enum FieldVariants {
  outlined = 'outlined',
  filled = 'filled',
  invalid = "invalid"
}

export enum FieldSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum Radii { 
  none = 'none',
  soft = 'soft',
  softer = 'softer',
  rounded = "full"
}

export  enum IconSizes {
  xsmall = "xsmall",
  small = "small",
  medium = "medium",
  large = "large",
  xlarge = "xlarge",
  xxlarge = "xxlarge"
}
export interface PaginationInfo {
  page: number;
  itemsByPage: number;
  total: number;
}
export enum PaginationSizings {
  small = "small",
  medium = "medium",
  large = "large",
  xlarge = "xlarge",
}

export  enum PaginationRadius {
  round = "round",
  rounded = "rounded"
}

export enum RatingSizings {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum CheckboxIcons {
  default = 'icon-checkbox-default-24',
  checked = 'icon-checkbox-checked-24',
  indeterminate = 'icon-checkbox-indeterminate-24',
}

export enum AvatarSizes {
  small = "small",
  medium = "medium",
  large = "large",
  xlarge = "xlarge",
  xxlarge = "xxlarge"
}

export enum BadgePositions {
  topRight = "top-right",
  topLeft = "top-left",
  bottomRight = "bottom-right",
  bottomLeft = "bottom-left"
}

export enum BadgeModes {
  dot = "dot",
  numbers = "numbers",  
}

export enum BadgeStyles {
  dot = "dot",
  numbers = "numbers",  
}


export enum SliderSizings {
  small = 'small',
  medium = 'medium',
}

export enum TabVariants {
  filled = 'filled',
  empty = 'empty',
}

export enum BackgroundColors {
  'background-default-main' = 'layer-neutral-00',
  'background-default-dark' = 'layer-neutral-02',
  'background-default-light' = 'layer-neutral-01',
  'background-default-modal-overlay' = 'layer-screen',
  'background-default-divider' = 'border-divider',
  'background-primary-main' = 'layer-brand-accent-main',
  'background-primary-dark' = 'layer-brand-accent-dark',
  'background-primary-light' = 'layer-brand-accent-light',
  'background-secondary-main' = 'layer-brand-accent-main',
  'background-secondary-dark' = 'layer-brand-accent-dark',
  'background-secondary-light' = 'layer-brand-accent-light',
}

export enum TextColors {
  'text-default-main-dark' = 'text-default',
  'text-default-main-light' = 'text-default',
  'text-default-secondary-dark' = 'text-secondary',
  'text-default-secondary-light' = 'text-secondary',
  'text-default-disabled-dark' = 'text-disabled',
  'text-default-disabled-light' = 'text-disabled',
  'text-primary-main' = 'text-default',
  'text-primary-main-light' = 'text-default',
  'text-primary-secondary' = 'text-secondary',
  'text-primary-secondary-light' = 'text-secondary',
  'text-primary-disabled-dark' = 'text-disabled',
  'text-primary-disabled-light' = 'text-disabled',
  'text-secondary-main' ='text-default',
  'text-secondary-main-light' = 'text-default',
  'text-secondary-secondary' = 'text-secondary',
  'text-secondary-secondary-light' = 'text-secondary',
  'text-secondary-disabled-dark' = 'text-disabled',
  'text-secondary-disabled-light' = 'text-disabled',
}
export enum SurfaceColors {
  'surface-default-main' = 'layer-neutral-01',
  'surface-default-dark' = 'layer-neutral-02',
  'surface-default-light' = 'layer-neutral-00',
  'surface-primary-main' = 'layer-brand-accent-main',
  'surface-primary-dark' = 'layer-brand-accent-dark',
  'surface-primary-light' = 'layer-brand-accent-light',
  'surface-secondary-main' = 'layer-brand-accent-main',
  'surface-secondary-dark' = 'layer-brand-accent-dark',
  'surface-secondary-light' = 'layer-brand-accent-light',
}
