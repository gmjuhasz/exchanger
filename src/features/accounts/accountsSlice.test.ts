import { cleanup } from "@testing-library/react";
import { store } from "../../app/store";
import {
  initAccounts,
  makeTransaction,
  TransactionInterface,
} from "./accountsSlice";

const TEST_ACCOUNTS = {
  EUR: 12,
  USD: 32,
  TEST: 4,
};

const TEST_TRANSACTION_RESULT = {
  EUR: 2,
  USD: 37,
  TEST: 4,
};

const TEST_TRANSACTION: TransactionInterface = {
  fromCurrency: "EUR",
  toCurrency: "USD",
  fromAmount: 10,
  toAmount: 5,
};

const initAccountStore = () => {
  store.dispatch(initAccounts(TEST_ACCOUNTS));
};

const getAccountsValue = () => {
  return store.getState().accounts.value;
};

describe("Account store reducers", () => {
  afterEach(() => {
    cleanup();
  });
  it("initAccounts initalize accounts with object", () => {
    const initialState = getAccountsValue();
    initAccountStore();
    const initalizedState = getAccountsValue();

    expect(initialState).not.toBe(TEST_ACCOUNTS);
    expect(initalizedState).toBe(TEST_ACCOUNTS);
  });

  it("makeTransaction deducts amount from store", () => {
    initAccountStore();
    const initialState = getAccountsValue();
    store.dispatch(makeTransaction(TEST_TRANSACTION));
    const initalizedState = getAccountsValue();

    expect(initialState).toBe(TEST_ACCOUNTS);
    expect(initalizedState).toStrictEqual(TEST_TRANSACTION_RESULT);
  });
});
