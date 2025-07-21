import { create } from '@storybook/theming';
import pkg from '../package.json';

export default create({
  base: 'dark',
  brandTitle: 'Atlas UI Kit v' + pkg.version,
  brandUrl: '/',
  brandImage: 'https://www.marshmclennan.com/content/dam/mmc-web/v3/homepage/mmc-logo-v3-transparent-background-white-letters.svg',
});
