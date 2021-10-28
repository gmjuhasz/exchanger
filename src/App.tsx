import React, { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Switch } from "react-router";
import { Route } from "react-router-dom";
import "./App.css";
import { RootState } from "./app/store";
import CurrencyCardContainer from "./components/CurrencyCardContainer/CurrencyCardContainer";
import CurrencySwitcher from "./components/CurrencySwitcher/CurrencySwitcher";
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
          fromCurrency: "EUR",
          toCurrency: currencies[0],
          rate: eurRates["USD"],
          currencies,
        })
      );

      setIsLoading(false);
    };

    fetchData();
  }, [dispatch]);

  return isLoading ? (
    <div className="App" data-testid="LoadingDiv">
      <Spinner className="Spinner" animation="border" role="status"></Spinner>
    </div>
  ) : (
    <div className="App" data-testid="LoadedDiv">
      <Switch>
        <Route path="/currency-switcher/from">
          <CurrencySwitcher
            accounts={accountsStore}
            isFromSwitcher={true}
          ></CurrencySwitcher>
        </Route>
        <Route path="/currency-switcher/to">
          <CurrencySwitcher
            accounts={accountsStore}
            isFromSwitcher={false}
          ></CurrencySwitcher>
        </Route>
        <Route path="/">
          <h2 className="AlignLeft Title">
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
          <CurrencyCardContainer
            accounts={accountsStore}
          ></CurrencyCardContainer>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
