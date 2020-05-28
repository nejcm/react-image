import PropTypes from 'prop-types';
import React from 'react';
import Lazy, {defaultOptions} from '../Lazy';
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

const onError = ({fallback, hideOnError}, event) => {
  const img = event.currentTarget;
  if (fallback && img.src !== fallback) {
    img.src = fallback;
    return;
  }
  if (hideOnError) {
    img.style.display = 'none';
  }
  onLoad(event);
};

const buildImage = ({
  loader,
  fallback,
  srcset,
  sizes,
  hideOnError,
  ...rest
}) => (
  <ImageWrapper
    loader={loader}
    srcSet={buildSrcSet(srcset)}
    sizes={buildSizes(sizes)}
    onLoad={loader ? onLoad : null}
    onError={onError.bind(null, {fallback, hideOnError})}
    {...rest}
  />
);

const Img = ({
  lazy,
  lazyOptions,
  loader = true,
  hideOnError = true,
  ...rest
}) => {
  return lazy ? (
    <Lazy {...{...defaultOptions, ...lazyOptions}}>
      {(show) =>
        buildImage({
          loader,
          hideOnError: show && hideOnError,
          loading: 'lazy',
          ...rest,
          src: show ? rest.src : undefined,
          srcSet: show ? rest.srcset : undefined,
        })
      }
    </Lazy>
  ) : (
    buildImage({loader, hideOnError, ...rest})
  );
};

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
    Lazy load image
    */
  lazy: PropTypes.bool,
  /**
    Lazy load options. Check react-intersection-observer for more info
    */
  lazyOptions: PropTypes.object,
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
