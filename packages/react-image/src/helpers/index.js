export const measure2Css = (value) =>
  value ? (typeof value === 'string' ? value : `${value}px`) : undefined;

export const isDefined = (value) => value !== undefined;

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
} = {}) => `
  ${isDefined(width) ? `width: ${measure2Css(width)};` : ''}
  ${isDefined(height) ? `height: ${measure2Css(height)};` : ''}
  ${isDefined(minWidth) ? `min-width: ${measure2Css(minWidth)};` : ''}
  ${isDefined(maxWidth) ? `max-width: ${measure2Css(maxWidth)};` : ''}
  ${isDefined(minHeight) ? `min-height: ${measure2Css(minHeight)};` : ''}
  ${isDefined(maxHeight) ? `max-height: ${measure2Css(maxHeight)};` : ''}
`;
