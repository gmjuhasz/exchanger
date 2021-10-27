import React from "react";
import { Card, Col, Container, Row, Form } from "react-bootstrap";
import styles from "./CurrencyCard.module.css";

interface CurrenyCardProp {
  currency: string;
  inputValue: string;
  balance: number;
  onValueChange: (e: string) => void;
}

const CurrencyCard = ({
  currency,
  inputValue,
  balance,
  onValueChange,
}: CurrenyCardProp) => {
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
    if (parseFloat(inputValue) > balance) {
      return <span>Exceeds balance</span>;
    }
  };

  return (
    <Card className={styles.CurrencyCard} data-testid="CurrencyCard">
      <Container>
        <Row>
          <Col className={styles.Currency}>
            <h5 data-testid="CurrencyCell">{currency}</h5>
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
            Balance: {balance}
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
