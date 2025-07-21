import './styles.css';


import { makeDecorator } from '@storybook/addons';
import { IconButton, Icons, WithTooltip } from '@storybook/components';
import React, { Fragment } from 'react';
import { ThemingServiceGlobal, Theme } from 'atlas-cdk';

export const withTheming = makeDecorator({
  name: 'withTheming',
  wrapper: (getStory, context) => {
    // theming context can be accessed through context?.parameters?.globalTypes?.theming
    return getStory(context);
  }
});
export const ADDON_ID = 'halo-theming-addon';
export const TOOL_ID = '${ADDON_ID}/tool';
const SWITCH_ID = 'customswitch';

let theming = new ThemingServiceGlobal();
let state = false;
let style = 'Off';

let changeState = () => {
  state = !state;
  style = state ? 'On' : 'Off';
};

let change = (event) => {
  applyConfiguration(Theme[event.target.value]);
};

let applyConfiguration = (theme) => {
  try {
    theming.applyTheme(
      theme,
      document?.getElementsByTagName('iframe')[0]?.contentWindow?.document?.documentElement,
    );
  } catch (error) {
    console.log(error);
    alert('Something went wrong when parsing the config');
  }
};

export const Tool = () => {
  return (
    <Fragment>
      <WithTooltip
        placement='bottom'
        trigger='click'
        tooltip={() => {
          return (
            <div style={{ padding: '4px' }}>
              <div id={SWITCH_ID} onClick={changeState} className="toggle">
                <select onChange={change}>
                  {
                    theming.getListOfThemes().map(theme => (
                      <option key={theme} value={theme}>{theme}</option>
                    ))
                    }
                </select>
              </div>
            </div>
          )
        }}>
        <IconButton
          key='config-btn'
          title='Change a config'>
          <Icons icon='cog' />
        </IconButton>
      </WithTooltip>
    </Fragment>
  )
};
