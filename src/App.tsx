import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./app/store";
import CurrencyCardContainer from "./components/CurrencyCardContainer/CurrencyCardContainer";
import CurrentRate from "./components/CurrentRate/CurrentRate";
import { initAccounts } from "./features/accountsSlice";
import { initExchange } from "./features/exchangeSlice";
import { fetchCurrencies, fetchRatesFor } from "./utils/rest";

const initialAccountBalance = {
  EUR: 4000,
  USD: 3000,
  GBP: 2000,
};

function App() {
  const accountsStore = useSelector((state: RootState) => state.accounts.value);
  const exchangeStore = useSelector((state: RootState) => state.exchange.value);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(initAccounts(initialAccountBalance));

    const fetchData = async () => {
      const currencyPromise = fetchCurrencies();
      const eurRatesPromise = fetchRatesFor(
        Object.keys(initialAccountBalance)[0]
      );
      const [currencyResult, eurRatesResult] = await Promise.allSettled([
        currencyPromise,
        eurRatesPromise,
      ]);

      const currencies =
        currencyResult.status === "fulfilled"
          ? (currencyResult.value as string[])
          : [];
      const eurRates =
        eurRatesResult.status === "fulfilled" ? eurRatesResult.value : [];

      dispatch(
        initExchange({
          isBuy: false,
          fromCurrency: currencies[0],
          toCurrency: currencies[1],
          rate: eurRates[currencies[1]],
        })
      );

      console.log(currencyResult);
      console.log(eurRates);
      setIsLoading(false);
    };

    fetchData();
  }, [dispatch]);

  const getActionText = () => {
    if (exchangeStore.isBuy) {
      return (
        <span>
          Buy {exchangeStore.fromCurrency} with {exchangeStore.toCurrency}
        </span>
      );
    } else {
      return (
        <span>
          Sell {exchangeStore.fromCurrency} to {exchangeStore.toCurrency}
        </span>
      );
    }
  };

  return isLoading ? (
    <div className="App">
      <Spinner className="Spinner" animation="border" role="status"></Spinner>
    </div>
  ) : (
    <div className="App">
      <h2 className="AlignLeft">
        {exchangeStore.isBuy ? <span>Buy</span> : <span>Sell</span>}{" "}
        {exchangeStore.fromCurrency}
      </h2>
      <div className="AlignLeft">
        <CurrentRate
          fromCurrency={exchangeStore.fromCurrency}
          toCurrency={exchangeStore.toCurrency}
          rate={exchangeStore.rate}
        ></CurrentRate>
      </div>
      <CurrencyCardContainer accounts={accountsStore}></CurrencyCardContainer>
      <Button disabled={true} className="ActionButton">
        {getActionText()}
      </Button>
    </div>
  );
}

export default App;
