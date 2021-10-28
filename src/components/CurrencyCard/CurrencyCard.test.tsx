import React from "react";
import {
  cleanup,
  fireEvent,
  Matcher,
  MatcherOptions,
  render,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CurrencyCard from "./CurrencyCard";
import { Provider } from "react-redux";
import { store } from "../../app/store";

const TEST_PROPS = {
  currency: "USD",
  inputValue: "32.43",
  balance: 2000,
  routerLocation: "from",
  onValueChange: () => null,
};

const renderCurrencyCard = (inputValue: string = "") => {
  return render(
    <Provider store={store}>
      <CurrencyCard
        currency={TEST_PROPS.currency}
        inputValue={inputValue || TEST_PROPS.inputValue}
        routerLocation={TEST_PROPS.routerLocation}
        balance={TEST_PROPS.balance}
        onValueChange={TEST_PROPS.onValueChange}
      />
    </Provider>
  );
};

describe("<CurrencyCard />", () => {
  describe("Default tests", () => {
    let getByTestId: (
      text: Matcher,
      options?: MatcherOptions | undefined,
      waitForElementOptions?: unknown
    ) => HTMLElement;
    beforeEach(() => {
      ({ getByTestId } = renderCurrencyCard());
    });
    test("it should mount", () => {
      const currencyCard = getByTestId("CurrencyCard");
      expect(currencyCard).toBeInTheDocument();
    });

    test("Currency should be displayed in its tag", () => {
      const currencyTag = getByTestId("CurrencyCell");
      expect(currencyTag.textContent).toBe(TEST_PROPS.currency + " ");
    });

    test("Value is rendered correctly", () => {
      const inputField = getByTestId("InputField") as HTMLInputElement;
      expect(inputField.value).toBe(TEST_PROPS.inputValue);
    });
  });
});

describe("Value tests", () => {
  afterEach(() => {
    cleanup();
  });

  test("value is modified to 2 decimals", () => {
    const { getByTestId } = renderCurrencyCard("56.76565");

    const inputField = getByTestId("InputField") as HTMLInputElement;
    expect(inputField.value).toBe("56.76");
  });

  test("string input is not taken", () => {
    const { getByTestId } = renderCurrencyCard("joijlcnas");

    const inputField = getByTestId("InputField") as HTMLInputElement;
    expect(inputField.value).toBe("");
  });
});
