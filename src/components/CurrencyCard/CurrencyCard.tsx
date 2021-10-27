import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import styles from "./CurrencyCard.module.css";
import { BsChevronDown } from "react-icons/bs";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";

interface CurrenyCardProp {
  currency: string;
  inputValue: string;
  balance: number;
  routerLocation: string;
  onValueChange: (e: string) => void;
}

const CurrencyCard = ({
  currency,
  inputValue,
  balance,
  routerLocation,
  onValueChange,
}: CurrenyCardProp) => {
  const history = useHistory();
  const exchangeStore = useSelector((state: RootState) => state.exchange.value);

  const formatStringValue = (value: string) => {
    if (value === "") {
      return "0";
    } else {
      if (value.includes(".")) {
        return value.substr(0, value.indexOf(".") + 3);
      }
      return parseFloat(value).toString();
    }
  };

  const renderExceedesText = () => {
    const buyerCard = exchangeStore.fromCurrency === currency;
    const exceedTest = (
      <span className={styles.ExceedBalanceText}>Exceeds balance</span>
    );

    if (buyerCard) {
      if (parseFloat(inputValue) > balance && !exchangeStore.isBuy) {
        return exceedTest;
      }
    } else {
      if (parseFloat(inputValue) > balance && exchangeStore.isBuy) {
        return exceedTest;
      }
    }
  };

  const handleCurrencyChange = () => {
    history.push("/currency-switcher/" + routerLocation);
  };

  return (
    <Card className={styles.CurrencyCard} data-testid="CurrencyCard">
      <Container>
        <Row>
          <Col className={styles.Currency}>
            <div
              className={styles.CurrencyCellDiv}
              onClick={handleCurrencyChange}
            >
              <h5 data-testid="CurrencyCell">
                {currency} <BsChevronDown className={styles.Icon} />
              </h5>
            </div>
          </Col>
          <Col className={styles.InputValue}>
            <h5>
              <input
                data-testid="InputField"
                className={styles.InputElement}
                type="number"
                value={formatStringValue(inputValue)}
                onChange={(e) =>
                  onValueChange(formatStringValue(e.target.value))
                }
              />
            </h5>
          </Col>
        </Row>
        <Row>
          <Col data-testid="BalanceCell" className={styles.Balance}>
            Balance: {balance.toFixed(2)}
          </Col>
          <Col data-testid="ExceedBalanceCell" className={styles.ExceedBalance}>
            {renderExceedesText()}
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default CurrencyCard;
