import {measuresCss} from '../helpers';

describe('Helpers', () => {
  test('measuresCss should return empty string', () => {
    const result = measuresCss();
    expect(result.trim()).toBe('');
  });
  test('measuresCss should return all css', () => {
    const props = {
      width: 100,
      height: '5rem',
      minWidth: '50%',
      maxWidth: '1000px',
      minHeight: 25,
      maxHeight: '100vh',
    };
    const result = measuresCss(props);
    expect(result).not.toBeNull();
    expect(result.includes(`width: ${props.width}px`)).toBeTruthy();
    expect(result.includes(`height: ${props.height}`)).toBeTruthy();
    expect(result.includes(`min-width: ${props.minWidth}`)).toBeTruthy();
    expect(result.includes(`max-width: ${props.maxWidth}`)).toBeTruthy();
    expect(result.includes(`min-height: ${props.minHeight}px`)).toBeTruthy();
    expect(result.includes(`max-height: ${props.maxHeight}`)).toBeTruthy();
  });
});
