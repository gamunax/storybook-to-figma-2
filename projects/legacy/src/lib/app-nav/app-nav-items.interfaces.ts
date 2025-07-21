export type NavigationAllowedTargets = '_self' | '_blank' | '_parent' | '_top';

export enum ShowHideState {
  Show = 'show',
  Hide = 'hide',
}

export interface AtlasLegacyNavigationItem {
  name: string;
  /**
   * URL or absolute path
   */
  path: string;
  /**
   * Mercer icon to represent this item
   */
  icon?: string;
  /**
   * Mercer icon theme
   */
  iconCollection?: string;
  /**
   * Target for controlling how link is handled
   */
  target?: NavigationAllowedTargets;
  /**
   * Controls if a menu item is active. For absolute paths, this is will be handled by the router
   */
  active?: boolean;
}
// tslint:disable-next-line
export interface _AtlasLegacyNavigationItem extends AtlasLegacyNavigationItem {
  external: boolean;
  exact: boolean;
}

export interface AtlasLegacyTieredNavigationItem extends AtlasLegacyNavigationItem {
  /**
   * Set the level associated with the item
   */
  level: number;

  /**
   * Toggle the expanded value of the item
   */
  expanded?: boolean;

  /**
   * Toggle the item to be a leaf, or the end of item list
   */
  isLeaf?: boolean;

  /**
   * Toggle the item to be invisible
   */
  isInvisible?: boolean;

  /**
   * @internal
   * Whether not this node contains the active route child
   */
  _containsActiveChild?: boolean;
}