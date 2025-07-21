import { _AtlasLegacyNavigationItem, AtlasLegacyNavigationItem } from './app-nav-items.interfaces';

export function processNavigationItems(
  navigationItems: AtlasLegacyNavigationItem[]
): _AtlasLegacyNavigationItem[] {
  const processedItems = navigationItems.map(navigationItem => {
    if (navigationItem.path.indexOf('//') !== -1) {
      return { ...navigationItem, external: true, exact: false };
    } else {
      const exact = navigationItem.path === '/';
      return { ...navigationItem, external: false, exact };
    }
  });
  return processedItems;
}