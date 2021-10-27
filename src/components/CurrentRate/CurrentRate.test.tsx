import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrentRate from './CurrentRate';

describe('<CurrentRate />', () => {
  test('it should mount', () => {
    render(<CurrentRate />);
    
    const currentRate = screen.getByTestId('CurrentRate');

    expect(currentRate).toBeInTheDocument();
  });
});