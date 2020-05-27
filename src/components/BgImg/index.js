import PropTypes from 'prop-types';
import React from 'react';
import Lazy, {defaultOptions} from '../Lazy';
import {BackgroundImageWrapper} from './styles';

const BackgroundImage = ({lazy, lazyOptions = defaultOptions, ...rest}) => {
  return lazy ? (
    <Lazy bg={true} {...lazyOptions}>
      {(show) => (
        <BackgroundImageWrapper
          {...rest}
          src={show ? rest.src : undefined}
          srcSet={show ? rest.srcset : undefined}
        />
      )}
    </Lazy>
  ) : (
    <BackgroundImageWrapper {...rest} />
  );
};

BackgroundImage.propTypes = {
  /**
    Background image src
    */
  src: PropTypes.string,
  /**
    Background image css properties
    */
  background: PropTypes.shape({
    size: PropTypes.string,
    color: PropTypes.string,
    position: PropTypes.string,
    attachment: PropTypes.string,
    repeat: PropTypes.string,
  }),
  /**
    Lazy load image
    */
  lazy: PropTypes.bool,
  /**
    Lazy load options. Check react-intersection-observer for more info
    */
  lazyOptions: PropTypes.object,
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
   Responsive images
  */
  srcset: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
      maxWidth: PropTypes.string.isRequired,
    }),
  ),
  /**
  Image children nodes
  */
  children: PropTypes.node,
};

export default BackgroundImage;
