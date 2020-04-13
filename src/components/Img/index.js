import PropTypes from 'prop-types';
import React from 'react';
import {ImageWrapper} from './styles';

const buildSrcSet = (srcSet) => {
  return srcSet
    ? srcSet.map((x) => `${x.src} ${x.condition || ''}`).join(',')
    : null;
};

const buildSizes = (sizes) => {
  return sizes
    ? sizes.map((x) => `${x.condition || ''} ${x.size}`).join(',')
    : null;
};

const onLoad = (event) => event.currentTarget.classList.add('loaded');

const onError = (event, fallback) => {
  const elem = event.currentTarget;
  if (fallback && elem.src !== fallback) {
    elem.src = fallback;
  } else {
    elem.style.display = 'none';
  }
};

const Img = ({
  loader = true,
  fallback,
  srcset,
  sizes,
  hideOnError = true,
  ...rest
}) => (
  <ImageWrapper
    loader={loader}
    srcSet={buildSrcSet(srcset)}
    sizes={buildSizes(sizes)}
    onLoad={loader ? onLoad : null}
    onError={hideOnError ? onError.bind(fallback) : loader ? onLoad : null}
    {...rest}
  />
);

Img.propTypes = {
  /**
    Image src
    */
  src: PropTypes.string.isRequired,
  /**
    Fallback image src
    */
  fallback: PropTypes.string,
  /**
    Image srcset
    */
  srcset: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      condition: PropTypes.string,
    }),
  ),
  /**
    Image sizes
    */
  sizes: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.string.isRequired,
      condition: PropTypes.string,
    }),
  ),
  /**
    Show loader or custom loader
    */
  loader: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /**
    Image alt text
    */
  alt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  /**
    Image width
    */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
    Image height
    */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
    Image background color
    */
  backgroundColor: PropTypes.string,
  /**
    Hide image if not found or on error
    */
  hideOnError: PropTypes.bool,
};

export default Img;
