import styled from '@emotion/styled';
import React from 'react';
import {measuresCss} from '../../helpers';

const buildSrcSet = (srcset = []) => {
  return (
    srcset
      .map(
        ({src, maxWidth}) =>
          `@media (max-width: ${maxWidth}) {background-image: url(${src});}`,
      )
      .join('') || ''
  );
};

export const BackgroundImageWrapper = styled(
  ({
    src,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    background,
    srcset,
    ...rest
  }) => <div {...rest} />,
)`
  ${({
    src,
    width = '100%',
    height = '100%',
    background = {},
    srcset,
    ...rest
  }) => `
    ${measuresCss({width, height, ...rest})}
    background-image: url(${src});
    ${background.color ? `background-color: ${background.color};` : ''}
    background-size: ${background.size || 'cover'};
    background-position: ${background.position || 'center'};
    background-attachment: ${background.attachment || 'scroll'};
    background-repeat: ${background.repeat || 'no-repeat'};
    ${buildSrcSet(srcset)}
  `}
`;
