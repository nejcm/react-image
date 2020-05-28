import {render, waitFor} from '@testing-library/react';
import React from 'react';
import {act} from 'react-dom/test-utils';
import {mockAllIsIntersecting} from 'react-intersection-observer/test-utils';
import Lazy from '../components/Lazy';

describe('Lazy', () => {
  test('renders lazy with props', async () => {
    const on = 'On';
    const off = 'Off';
    const props = {
      children: (show) => (show ? on : off),
    };
    const {getByText} = render(<Lazy data-testid="target" {...props} />);
    expect(getByText(off)).toBeInTheDocument();
    act(() => {
      mockAllIsIntersecting(true);
    });
    await waitFor(() => expect(getByText(on)).toBeInTheDocument());
  });
});
