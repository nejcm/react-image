import React from 'react';
import styled from 'styled-components';
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
  ${({backgroundColor, loader, ...rest}) => `
    ${measuresCss(rest)}
    ${backgroundColor ? `background-color: ${backgroundColor};` : ''}
    ${
      loader
        ? `
          &:not(.loaded) {
            background: linear-gradient(
              90deg,
              rgba(30, 30, 30, 0.04) 0%,
              rgba(30, 30, 30, 0.095) 25%,
              rgba(30, 30, 30, 0.04) 50%
            );
            background-size: 200%;
            background-position: 100% 0;
            animation: loading 1.75s 0.5s infinite;
          }
          
          @keyframes loading {
            100% {
              background-position: -100% 0;
            }
          }`
        : ''
    }
  `}
`;
