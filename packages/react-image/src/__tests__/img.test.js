import {fireEvent, render, waitFor} from '@testing-library/react';
import React from 'react';
import {act} from 'react-dom/test-utils';
import {mockAllIsIntersecting} from 'react-intersection-observer/test-utils';
import {Image} from '../index';

describe('Image', () => {
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

  test('renders image with string srcset and sizes', () => {
    const props = {
      src: 'https://via.placeholder.com/1024x600.jpg',
      srcset:
        'https://via.placeholder.com/400x200.jpg 400w, https://via.placeholder.com/600x400.jpg 600w',
      sizes: '(max-width: 600px) 480px, 800px',
      alt: 'Image',
    };
    const {getByTestId} = render(<Image data-testid="target" {...props} />);
    const element = getByTestId('target');
    expect(element).toHaveAttribute('srcset', props.srcset);
    expect(element).toHaveAttribute('sizes', props.sizes);
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

  test('should not hide image src on error without fallback', () => {
    const props = {
      src: 'no-image.jpg',
      alt: 'Image',
      hideOnError: false,
    };
    const {getByTestId} = render(<Image data-testid="target" {...props} />);
    const element = getByTestId('target');

    expect(element).toHaveAttribute('src', props.src);

    fireEvent(element, new Event('error'));

    expect(element).not.toHaveStyle({
      display: 'none',
    });
  });

  test('should have class loaded on load', () => {
    const props = {
      loader: true,
      src: 'no-image.jpg',
      alt: 'Image',
    };
    const {getByTestId} = render(<Image data-testid="target" {...props} />);
    const element = getByTestId('target');

    fireEvent(element, new Event('load'));

    // Should
    expect(element).toHaveClass('loaded');
  });

  test('should lazy load image', async () => {
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
    act(() => {
      mockAllIsIntersecting(true);
    });
    await waitFor(() => expect(element).toHaveAttribute('src'));
  });
});
