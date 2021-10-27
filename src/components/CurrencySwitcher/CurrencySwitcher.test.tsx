import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencySwitcher from './CurrencySwitcher';

describe('<CurrencySwitcher />', () => {
  test('it should mount', () => {
    render(<CurrencySwitcher />);
    
    const currencySwitcher = screen.getByTestId('CurrencySwitcher');

    expect(currencySwitcher).toBeInTheDocument();
  });
});