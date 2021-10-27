import React, { useState } from "react";
import { Accounts } from "../../features/accountsSlice";
import CurrencyCard from "../CurrencyCard/CurrencyCard";
import styles from "./CurrencyCardContainer.module.css";
import { BsArrowUpCircleFill, BsArrowDownCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { changeAction } from "../../features/exchangeSlice";

interface CurrencyCardContainerProps {
  accounts: Accounts;
}

const CurrencyCardContainer = ({ accounts }: CurrencyCardContainerProps) => {
  const exchangeStore = useSelector((state: RootState) => state.exchange.value);
  const dispatch = useDispatch();

  const [fromCurrencyInput, setFromCurrencyInput] = useState("0");
  const [toCurrencyInput, setToCurrencyInput] = useState("0");
  const [rate, setRate] = useState(exchangeStore.rate);

  const handleFromValueChange = (newValue: string) => {
    setFromCurrencyInput(newValue);
    setToCurrencyInput((parseFloat(newValue) * rate).toString());
  };

  const handleToValueChange = (newValue: string) => {
    setToCurrencyInput(newValue);
    setFromCurrencyInput((parseFloat(newValue) / rate).toString());
  };

  const handleActionChange = () => {
    dispatch(changeAction());
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
        onValueChange={handleToValueChange}
      ></CurrencyCard>
    </div>
  );
};

export default CurrencyCardContainer;
