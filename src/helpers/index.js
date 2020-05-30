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
} = {}) => {
  return `${isDefined(width) ? `width: ${measure2Css(width)};` : ''}
    ${isDefined(height) ? `height: ${measure2Css(height)};` : ''}
    ${isDefined(minWidth) ? `min-width: ${measure2Css(minWidth)};` : ''}
    ${isDefined(maxWidth) ? `max-width: ${measure2Css(maxWidth)};` : ''}
    ${isDefined(minHeight) ? `min-height: ${measure2Css(minHeight)};` : ''}
    ${isDefined(maxHeight) ? `max-height: ${measure2Css(maxHeight)};` : ''}`;
};

export const loader =
  "data:image/svg+xml,%3Csvg width='38' height='38' viewBox='0 0 38 38' xmlns='http://www.w3.org/2000/svg' stroke='%23bbb'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg transform='translate(1 1)' stroke-width='2'%3E%3Ccircle stroke-opacity='.5' cx='18' cy='18' r='18'/%3E%3Cpath d='M36 18c0-9.94-8.06-18-18-18'%3E%3CanimateTransform attributeName='transform' type='rotate' from='0 18 18' to='360 18 18' dur='1s' repeatCount='indefinite'/%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/svg%3E";
