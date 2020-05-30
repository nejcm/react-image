import styled from '@emotion/styled';
import React from 'react';
import {loader as defaultLoader, measuresCss} from '../../helpers';

export const ImageWrapper = styled(
  ({
    alt,
    loader,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    backgroundColor,
    ...rest
  }) => <img alt={alt} {...rest} />,
)`
  ${({backgroundColor, loader, ...rest}) => `
    ${measuresCss(rest)}
    ${
      loader
        ? `background: url(${
            typeof loader === 'string' ? loader : defaultLoader
          }) 50% no-repeat; 
          &.loaded {
            background-image: none;
          }`
        : ''
    }
    ${backgroundColor ? `background-color: ${backgroundColor};` : ''}
  `}
`;
