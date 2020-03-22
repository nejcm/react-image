import {measure2Css} from '@nejcm/js-helpers';

/**
 *  Returns common measures css
 * @param {Object} props measure props
 * @returns {String} Css
 */
export const measuresCss = ({
  width,
  height,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
} = {}) => {
  return `${width ? `width: ${measure2Css(width)};` : ''}
    ${height ? `height: ${measure2Css(height)};` : ''}
    ${minWidth ? `min-width: ${measure2Css(minWidth)};` : ''}
    ${maxWidth ? `max-width: ${measure2Css(maxWidth)};` : ''}
    ${minHeight ? `min-height: ${measure2Css(minHeight)};` : ''}
    ${maxHeight ? `max-height: ${measure2Css(maxHeight)};` : ''}`;
};
