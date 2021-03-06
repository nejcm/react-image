import {render, waitFor} from '@testing-library/react';
import React from 'react';
import {act} from 'react-dom/test-utils';
import {mockAllIsIntersecting} from 'react-intersection-observer/test-utils';
import {BackgroundImage} from '../index';

describe('Background image', () => {
  test('renders background image with props', () => {
    const props = {
      className: 'custom-class',
      src: 'https://via.placeholder.com/1024x600.jpg',
      width: 800,
      height: 600,
      background: {
        color: '#999',
        repeat: 'repeat',
      },
      srcset: [
        {src: 'https://via.placeholder.com/800x600.jpg', maxWidth: '800px'},
        {src: 'https://via.placeholder.com/600x400.jpg', maxWidth: '600px'},
      ],
    };
    const {getByTestId} = render(
      <BackgroundImage {...props} data-testid="target" />,
    );

    const element = getByTestId('target');
    expect(element).toHaveClass(props.className);
    expect(element).toHaveStyle({
      width: `${props.width}px`,
      height: `${props.height}px`,
      backgroundSize: 'cover',
      backgroundColor: props.background.color,
      backgroundRepeat: props.background.repeat,
    });
  });

  test('renders background image without props', () => {
    const props = {
      src: 'https://via.placeholder.com/1024x600.jpg',
    };
    const {getByTestId} = render(
      <BackgroundImage {...props} data-testid="target" />,
    );

    const element = getByTestId('target');
    expect(element).toHaveStyle({
      width: '100%',
      height: '100%',
    });
  });

  test('renders background image without src', () => {
    const {getByTestId} = render(<BackgroundImage data-testid="target" />);

    const element = getByTestId('target');
    expect(element).not.toHaveStyle({
      backgroundImage: 'url()',
    });
  });

  test('should lazy load background image', async () => {
    const props = {
      src: 'https://via.placeholder.com/1024x600.jpg',
      lazy: true,
      lazyOptions: {threshold: 1},
    };
    const {getByTestId} = render(
      <BackgroundImage {...props} data-testid="target" />,
    );
    const element = getByTestId('target');
    expect(element).toBeDefined();
    expect(element).not.toHaveStyle({
      backgroundImage: 'url()',
    });
    act(() => {
      mockAllIsIntersecting(true);
    });
    const style = `background-image: url(${props.src})`;
    await waitFor(() => expect(element).toHaveStyle(style));
  });
});
