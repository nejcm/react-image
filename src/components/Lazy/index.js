import useNativeLazyLoading from '@charlietango/use-native-lazy-loading';
import PropTypes from 'prop-types';
import React from 'react';
import {useInView} from 'react-intersection-observer';

export const defaultOptions = {
  threshold: 0,
  triggerOnce: true,
  rootMargin: '150px 0px',
};

const Lazy = ({bg, children, ...options}) => {
  const supportsLazyLoading = useNativeLazyLoading();
  const [ref, inView] = useInView(options);
  const useObserver = bg || !supportsLazyLoading;
  return (
    <div ref={useObserver ? ref : undefined}>
      {children(inView || !useObserver)}
    </div>
  );
};

Lazy.propTypes = {
  bg: PropTypes.bool,
  children: PropTypes.func.isRequired,
};

export default Lazy;
