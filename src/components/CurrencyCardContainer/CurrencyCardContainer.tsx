import React, { useState } from "react";
import { Accounts, makeTransaction } from "../../features/accountsSlice";
import CurrencyCard from "../CurrencyCard/CurrencyCard";
import styles from "./CurrencyCardContainer.module.css";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { changeAction } from "../../features/exchangeSlice";
import { Button } from "react-bootstrap";

interface CurrencyCardContainerProps {
  accounts: Accounts;
}

const CurrencyCardContainer = ({ accounts }: CurrencyCardContainerProps) => {
  const exchangeStore = useSelector((state: RootState) => state.exchange.value);
  const dispatch = useDispatch();

  const [fromCurrencyInput, setFromCurrencyInput] = useState("0");
  const [toCurrencyInput, setToCurrencyInput] = useState("0");

  const handleFromValueChange = (newValue: string) => {
    setFromCurrencyInput(newValue);
    setToCurrencyInput((parseFloat(newValue) * exchangeStore.rate).toString());
  };

  const handleToValueChange = (newValue: string) => {
    setToCurrencyInput(newValue);
    setFromCurrencyInput(
      (parseFloat(newValue) / exchangeStore.rate).toString()
    );
  };

  const handleActionChange = () => {
    dispatch(changeAction());
  };

  const isTransactionPossible = () => {
    if (fromCurrencyInput === "0") {
      return false;
    }
    if (exchangeStore.isBuy) {
      if (
        parseFloat(toCurrencyInput) <= (accounts[exchangeStore.toCurrency] || 0)
      ) {
        return true;
      }
    } else {
      if (
        parseFloat(fromCurrencyInput) <=
        (accounts[exchangeStore.fromCurrency] || 0)
      ) {
        return true;
      }
    }
    return false;
  };

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

  const handleTransaction = () => {
    dispatch(
      makeTransaction({
        fromCurrency: !exchangeStore.isBuy
          ? exchangeStore.fromCurrency
          : exchangeStore.toCurrency,
        fromAmount: !exchangeStore.isBuy
          ? parseFloat(fromCurrencyInput)
          : parseFloat(toCurrencyInput),
        toCurrency: !exchangeStore.isBuy
          ? exchangeStore.toCurrency
          : exchangeStore.fromCurrency,
        toAmount: !exchangeStore.isBuy
          ? parseFloat(toCurrencyInput)
          : parseFloat(fromCurrencyInput),
      })
    );
  };

  return (
    <div
      className={styles.CurrencyCardContainer}
      data-testid="CurrencyCardContainer"
    >
      <CurrencyCard
        currency={exchangeStore.fromCurrency}
        balance={accounts[exchangeStore.fromCurrency] || 0}
        inputValue={fromCurrencyInput}
        routerLocation="from"
        onValueChange={handleFromValueChange}
      ></CurrencyCard>
      <h3>
        {exchangeStore.isBuy ? (
          <BsArrowUpCircleFill
            className={styles.IconButton}
            onClick={handleActionChange}
          />
        ) : (
          <BsArrowDownCircleFill
            className={styles.IconButton}
            onClick={handleActionChange}
          />
        )}
      </h3>
      <CurrencyCard
        currency={exchangeStore.toCurrency}
        balance={accounts[exchangeStore.toCurrency] || 0}
        inputValue={toCurrencyInput}
        routerLocation="to"
        onValueChange={handleToValueChange}
      ></CurrencyCard>

      <Button
        disabled={!isTransactionPossible()}
        className="ActionButton"
        onClick={handleTransaction}
      >
        {getActionText()}
      </Button>
    </div>
  );
};

export default CurrencyCardContainer;
