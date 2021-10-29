import { cleanup } from "@testing-library/react";
import { store } from "../../app/store";
import {
  changeAction,
  initExchange,
  changeFromCurrency,
  changeToCurrency,
  updateRate,
} from "./exchangeSlice";

const TEST_EXCHANGE = {
  isBuy: false,
  fromCurrency: "EUR",
  toCurrency: "USD",
  rate: 3,
  currencies: ["USD", "GBP", "EUR"],
};

const GBP_CURRENCY = "GBP";
const TEST_RATE = 10;

const initExchangeStore = () => {
  store.dispatch(initExchange(TEST_EXCHANGE));
};

const getExchangeStoreValue = () => {
  return store.getState().exchange.value;
};

describe("Exchange store reducers", () => {
  afterEach(() => {
    cleanup();
  });
  it("initAccounts initalize accounts with object", () => {
    const initialState = getExchangeStoreValue();
    initExchangeStore();
    const initalizedState = getExchangeStoreValue();

    expect(initialState).not.toBe(TEST_EXCHANGE);
    expect(initalizedState).toBe(TEST_EXCHANGE);
  });

  it("action can be changed with changeAction", () => {
    const initialState = getExchangeStoreValue();
    store.dispatch(changeAction());
    const initalizedState = getExchangeStoreValue();

    expect(initialState.isBuy).toBe(TEST_EXCHANGE.isBuy);
    expect(initalizedState.isBuy).toBe(!TEST_EXCHANGE.isBuy);
  });

  it("fromCurrency can be changed", () => {
    const initialState = getExchangeStoreValue();
    store.dispatch(changeFromCurrency(GBP_CURRENCY));
    const initalizedState = getExchangeStoreValue();

    expect(initialState.fromCurrency).toBe(TEST_EXCHANGE.fromCurrency);
    expect(initalizedState.fromCurrency).toBe(GBP_CURRENCY);
  });

  it("toCurrecny can be changed", () => {
    const initialState = getExchangeStoreValue();
    store.dispatch(changeToCurrency(GBP_CURRENCY));
    const initalizedState = getExchangeStoreValue();

    expect(initialState.toCurrency).toBe(TEST_EXCHANGE.toCurrency);
    expect(initalizedState.toCurrency).toBe(GBP_CURRENCY);
  });

  it("rate can be updated", () => {
    const initialState = getExchangeStoreValue();
    store.dispatch(updateRate(TEST_RATE));
    const initalizedState = getExchangeStoreValue();

    expect(initialState.rate).toBe(TEST_EXCHANGE.rate);
    expect(initalizedState.rate).toBe(TEST_RATE);
  });
});
