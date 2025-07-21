import { addons, types } from '@storybook/addons';
// import { Tool, TOOL_ID, ADDON_ID } from './halo-theming-addon/index.js';
import haloTheme from './haloTheme.js';

// addons.register( ADDON_ID, () => {
//   addons.add(TOOL_ID, {
//     type: types.TOOL,
//     title: 'Theme configuration',
//     render: Tool,
//   });
// });
addons.setConfig({
    theme: haloTheme,
});
