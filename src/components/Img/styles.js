import styled from '@emotion/styled';
import React from 'react';
import {measuresCss} from '../../helpers';

export const ImageWrapper = styled(
  ({
    alt,
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
  ${({backgroundColor, ...rest}) => `
    ${measuresCss(rest)}
    ${backgroundColor ? `background-color: ${backgroundColor};` : ''}
  `}
`;
