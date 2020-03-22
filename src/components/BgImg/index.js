import PropTypes from 'prop-types';
import React from 'react';
import {BackgroundImageWrapper} from './styles';

const BackgroundImage = (props) => <BackgroundImageWrapper {...props} />;

BackgroundImage.propTypes = {
  src: PropTypes.string.isRequired,
  background: PropTypes.shape({
    size: PropTypes.string,
    color: PropTypes.string,
    position: PropTypes.string,
    attachment: PropTypes.string,
    repeat: PropTypes.string,
  }),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  srcset: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      maxWidth: PropTypes.string,
    }),
  ),
  children: PropTypes.node,
};

export default BackgroundImage;
