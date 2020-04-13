import styled from '@emotion/styled';
import React from 'react';
import LoaderSvg from '../../../assets/loader.svg';
import {measuresCss} from '../../helpers';

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
  width: 100%;
  height: auto;
  ${({backgroundColor, loader, ...rest}) => `
    ${measuresCss(rest)}
    ${
      loader
        ? `background: url(${
            typeof loader === 'string' ? loader : LoaderSvg
          }) 50% no-repeat; 
          &.loaded {
            background-image: none;
          }`
        : ''
    }
    ${backgroundColor ? `background-color: ${backgroundColor};` : ''}
  `}
`;
