import {fireEvent, render} from '@testing-library/react';
import React from 'react';
import {Image} from '../index';

describe('Image', () => {
  const intersectionObserverMock = () => ({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  beforeAll(() => {
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(intersectionObserverMock);
  });

  test('renders image with props', () => {
    const props = {
      className: 'custom-class',
      src: 'https://via.placeholder.com/1024x600.jpg',
      alt: 'Image',
      width: 800,
      height: 600,
      title: 'Image title',
      srcset: [
        {src: 'https://via.placeholder.com/800x600.jpg', condition: '800w'},
        {src: 'https://via.placeholder.com/600x400.jpg', condition: '600w'},
        {src: 'https://via.placeholder.com/400x200.jpg'},
      ],
      sizes: [
        {size: '800px', condition: '(min-width: 768px)'},
        {size: '600px', condition: '(min-width: 1200px)'},
        {size: '1000px'},
      ],
      backgroundColor: '#666',
      loader: false,
      hideOnError: false,
    };
    const {getByTestId} = render(<Image data-testid="target" {...props} />);
    const element = getByTestId('target');
    expect(element).toHaveClass(props.className);
    expect(element).toHaveStyle({
      backgroundColor: props.backgroundColor,
    });
    expect(element).toHaveAttribute('src', props.src);
    expect(element).toHaveAttribute('width', props.width.toString());
    expect(element).toHaveAttribute('height', props.height.toString());
    expect(element).toHaveAttribute('alt', props.alt);
    expect(element).toHaveAttribute('title', props.title);
    expect(element).toHaveAttribute('srcset');
    expect(element).toHaveAttribute('sizes');
  });

  test('renders image without some props', () => {
    const props = {
      src: 'https://via.placeholder.com/1024x600.jpg',
      fallback: 'https://via.placeholder.com/800x600.jpg',
      alt: 'Image',
    };
    const {getByTestId} = render(<Image data-testid="target" {...props} />);
    const element = getByTestId('target');
    expect(element).not.toHaveAttribute('srcset');
    expect(element).not.toHaveAttribute('sizes');
  });

  test('should replace image src with fallback on error', () => {
    const props = {
      src: 'no-image.jpg',
      fallback: 'no-image2.jpg',
      alt: 'Image',
    };
    const {getByTestId} = render(<Image data-testid="target" {...props} />);
    const element = getByTestId('target');

    expect(element).toHaveAttribute('src', props.src);

    fireEvent(element, new Event('error'));

    expect(element).toHaveAttribute('src', props.fallback);
  });

  test('should hide image src on error without fallback', () => {
    const props = {
      src: 'no-image.jpg',
      alt: 'Image',
    };
    const {getByTestId} = render(<Image data-testid="target" {...props} />);
    const element = getByTestId('target');

    expect(element).toHaveAttribute('src', props.src);

    fireEvent(element, new Event('error'));

    expect(element).toHaveStyle({
      display: 'none',
    });
  });

  test('should hide loader on error', () => {
    const props = {
      src: 'no-image.jpg',
      alt: 'Image',
    };
    const {getByTestId} = render(<Image data-testid="target" {...props} />);
    const element = getByTestId('target');

    //expect(element).toHaveStyle({background: /.*url\(.*/i});

    fireEvent(element, new Event('load'));

    // Should hide on error
    expect(element).toHaveStyle({
      backgroundImage: 'none',
    });
  });

  test('should show custom loader', () => {
    const props = {
      loader: 'custom.svg',
      src: 'no-image.jpg',
      alt: 'Image',
      hideOnError: false,
      onLoad: () => {}, // for testing
    };
    const {getByTestId} = render(<Image data-testid="target" {...props} />);
    const element = getByTestId('target');
    expect(element).toHaveStyle({
      background: 'url(custom.svg) 50% no-repeat',
    });
  });

  test('should lazy load image', () => {
    const props = {
      src: 'https://via.placeholder.com/1024x600.jpg',
      alt: 'Image',
      hideOnError: false,
      lazy: true,
      lazyOptions: {threshold: 1},
    };
    const {getByTestId} = render(<Image data-testid="target" {...props} />);
    const element = getByTestId('target');
    expect(element).toBeDefined();
    expect(element).not.toHaveAttribute('src');
  });
});
