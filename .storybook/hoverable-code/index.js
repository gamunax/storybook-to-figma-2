import { Source } from '@storybook/addon-docs';
import React from 'react';
import ReactHoverObserver from 'react-hover-observer';
import styled from 'styled-components';

const codeStyles = `  
  height: 100%;
  width: 100%;
  display: flex;
  min-height: 90px;
  max-width:250px;
  border-radius: 0 !important;
  border: 0;
  font-family: monospace;
  font-size: 13px;
  overflow-x: auto;
  background: inherit;
`

const codeNoHover = `
  padding: 18px 20px;
`; 

const HoverableWrapper = styled.div`
  ${codeStyles}
  & > div {
    ${codeStyles}
  }
  .docblock-source {
    ${codeStyles}
  }
  .static-code {
    ${codeNoHover}
  }
`;

const HoverableItem = styled.div`
  ${codeStyles}
`;

const code = (code) => (
  <Source
      code={code}
  />
);

export const HoverableCode = (props) => {
    return (
        <HoverableWrapper>
            <HoverableWrapper>
                <ReactHoverObserver>
                    {({ isHovering }) => (
                        <HoverableItem>
                            {isHovering ? code(props.children) : <span className={'static-code'}>{props.children}</span> }
                        </HoverableItem>)
                    }
                </ReactHoverObserver>
            </HoverableWrapper>
        </HoverableWrapper>
    );
}
