import React from "react";
import styles from "./CurrentRate.module.css";

import symbols from "../../static/currency-symbols.json";

import { AiOutlineStock } from "react-icons/ai";

interface CurrentRateProps {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
}

type SymbolKey = keyof typeof symbols;

const CurrentRate = ({ fromCurrency, toCurrency, rate }: CurrentRateProps) => {
  const fromCurrencySymbol = symbols[fromCurrency as SymbolKey].symbol_native;
  const toCurrencySymbol = symbols[toCurrency as SymbolKey].symbol_native;

  return (
    <div className={styles.CurrentRate} data-testid="CurrentRate">
      <AiOutlineStock /> {fromCurrencySymbol}1 = {toCurrencySymbol}
      {rate.toFixed(4)}
    </div>
  );
};

export default CurrentRate;
