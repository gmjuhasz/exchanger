import React, { useEffect } from "react";
import styles from "./CurrentRate.module.css";

import symbols from "../../static/currency-symbols.json";

import { AiOutlineStock } from "react-icons/ai";
import { fetchRatesFor } from "../../utils/rest";
import { useDispatch } from "react-redux";
import { updateRate } from "../../features/exchange/exchangeSlice";

interface CurrentRateProps {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
}

type SymbolKey = keyof typeof symbols;

const CurrentRate = ({ fromCurrency, toCurrency, rate }: CurrentRateProps) => {
  const fromCurrencySymbol = symbols[fromCurrency as SymbolKey].symbol_native;
  const toCurrencySymbol = symbols[toCurrency as SymbolKey].symbol_native;

  const dispatch = useDispatch();

  useEffect(() => {
    const getRates = async () => {
      const ratesPromise = fetchRatesFor(fromCurrency);
      const [ratesResult] = await Promise.allSettled([ratesPromise]);

      const rates = ratesResult.status === "fulfilled" ? ratesResult.value : [];
      dispatch(updateRate(rates[toCurrency]));
      console.log("Updated Rates: ", rates[toCurrency]);
    };
    getRates();
    const interval = setInterval(() => getRates(), 10000);
    return () => {
      clearInterval(interval);
    };
  }, [fromCurrency, toCurrency, dispatch]);

  return (
    <div className={styles.CurrentRate} data-testid="CurrentRate">
      <AiOutlineStock /> {fromCurrencySymbol}1 = {toCurrencySymbol}
      {rate.toFixed(4)}
    </div>
  );
};

export default CurrentRate;
