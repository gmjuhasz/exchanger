import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CurrencyCardContainer from "./CurrencyCardContainer";
import { Provider } from "react-redux";
import { store } from "../../app/store";

const getInputFields = () => {
  return screen.getAllByTestId("InputField") as HTMLInputElement[];
};

const getActionButton = () => {
  return screen.getByTestId("ActionButton");
};

const testValue = "3000";
const testAccounts = { USD: 3000, EUR: 4000 };

const changeInput = (inputField: HTMLInputElement, value: string) => {
  fireEvent.change(inputField, { target: { value: value } });
};

describe("<CurrencyCardContainer />", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CurrencyCardContainer accounts={testAccounts} />
      </Provider>
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("it should mount", () => {
    const currencyCardContainer = screen.getByTestId("CurrencyCardContainer");
    expect(currencyCardContainer).toBeInTheDocument();
  });

  test("second input changes on changing the first", () => {
    const inputFields = getInputFields();

    changeInput(inputFields[0], testValue);

    expect(inputFields[0].value).toBe(testValue);
    expect(inputFields[1].value).toBe(
      (parseFloat(testValue) * store.getState().exchange.value.rate).toString()
    );
  });

  test("first input changes by changing the first", () => {
    const inputFields = getInputFields();
    changeInput(inputFields[1], testValue);

    expect(inputFields[1].value).toBe(testValue);
    expect(inputFields[0].value).toBe(
      (parseFloat(testValue) / store.getState().exchange.value.rate).toString()
    );
  });

  test("Button is disabled by default", () => {
    const button = getActionButton();
    expect(button).toHaveAttribute("disabled");
  });

  test("button is enabled with enough value", () => {
    const inputFields = getInputFields();
    changeInput(inputFields[0], "1");

    const button = getActionButton();
    expect(button).not.toHaveAttribute("disabled");
  });

  test("button is enabled and gets disabled on direction change if balance is low", () => {
    const actionButton = getActionButton();
    const directionChangeButton = screen.getByTestId("ChangeDirectionButton");
    const inputFields = getInputFields();

    changeInput(inputFields[0], testValue);
    const buttonBeforeChange = actionButton;
    fireEvent.click(directionChangeButton);

    expect(actionButton).toHaveAttribute("disabled");
    expect(buttonBeforeChange).toHaveAttribute("disabled", "");
  });

  test("Transaction changes both accounts correctly", () => {
    const inputFields = getInputFields();
    changeInput(inputFields[0], testValue);
    const beforeAccounts = store.getState().accounts.value;
    const directionChangeButton = screen.getByTestId("ChangeDirectionButton");
    fireEvent.click(directionChangeButton);

    fireEvent.click(getActionButton());

    const afterAccounts = store.getState().accounts.value;
    expect(beforeAccounts).toStrictEqual(testAccounts);
    expect(afterAccounts.EUR).toBe(testAccounts.EUR - parseFloat(testValue));
    expect(afterAccounts.USD).toBe(
      testAccounts.USD +
        parseFloat(testValue) * store.getState().exchange.value.rate
    );
  });
});
