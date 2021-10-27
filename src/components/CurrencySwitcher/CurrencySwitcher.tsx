import React from "react";
import { Row, Col, Dropdown } from "react-bootstrap";
import { Accounts } from "../../features/accountsSlice";
import styles from "./CurrencySwitcher.module.css";
import symbols from "../../static/currency-symbols.json";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFromCurrency,
  changeToCurrency,
} from "../../features/exchangeSlice";
import { useHistory } from "react-router-dom";
import { RootState } from "../../app/store";
type SymbolKey = keyof typeof symbols;

interface CurrencySwitcherProps {
  accounts: Accounts;
  isFromSwitcher: boolean;
}

const CurrencySwitcher = ({
  accounts,
  isFromSwitcher,
}: CurrencySwitcherProps) => {
  const exchangeStore = useSelector((state: RootState) => state.exchange.value);
  const dispatch = useDispatch();
  const history = useHistory();

  const filteredCurrencies = exchangeStore.currencies.filter((currency) => {
    const itemSymbol = symbols[currency as SymbolKey]?.symbol_native;
    const fullName = symbols[currency as SymbolKey]?.name;
    const currentOtherCurrency = isFromSwitcher
      ? exchangeStore.toCurrency
      : exchangeStore.fromCurrency;
    return itemSymbol && fullName && currency !== currentOtherCurrency;
  });

  const handleCurrencyChange = (currency: string) => {
    if (isFromSwitcher) {
      dispatch(changeFromCurrency(currency));
    } else {
      dispatch(changeToCurrency(currency));
    }
    history.push("/");
  };

  return (
    <div className={styles.CurrencySwitcher} data-testid="CurrencySwitcher">
      <Dropdown.Menu show className={styles.DropDownMenu}>
        {filteredCurrencies.map((currency) => {
          const itemSymbol = symbols[currency as SymbolKey]?.symbol_native;
          const fullName = symbols[currency as SymbolKey]?.name;

          return (
            <div key={currency} onClick={() => handleCurrencyChange(currency)}>
              <Dropdown.Item className={styles.DropDownItem}>
                <Row>
                  <Col xs={2} className={styles.ItemSymbol}>
                    <span className={styles.ItemSymbolText}>{itemSymbol}</span>
                  </Col>
                  <Col>
                    <Row className={styles.CurrencyAndBalance}>
                      {currency} {accounts[currency]?.toFixed(2)}
                    </Row>
                    <Row className={styles.FullCurrencyName}>{fullName}</Row>
                  </Col>
                </Row>
              </Dropdown.Item>
              <Dropdown.Divider />
            </div>
          );
        })}
      </Dropdown.Menu>
    </div>
  );
};

export default CurrencySwitcher;
