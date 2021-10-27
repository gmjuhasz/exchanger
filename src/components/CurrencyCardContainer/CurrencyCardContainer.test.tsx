import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencyCardContainer from './CurrencyCardContainer';

describe('<CurrencyCardContainer />', () => {
  test('it should mount', () => {
    render(<CurrencyCardContainer />);
    
    const currencyCardContainer = screen.getByTestId('CurrencyCardContainer');

    expect(currencyCardContainer).toBeInTheDocument();
  });
});