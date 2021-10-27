import React from "react";
import {
  fireEvent,
  Matcher,
  MatcherOptions,
  render,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CurrencyCard from "./CurrencyCard";

const TEST_PROPS = {
  currency: "USD",
  inputValue: "32.43",
  balance: 2000,
  onValueChange: () => null,
};

describe("<CurrencyCard />", () => {
  describe("Default tests", () => {
    let getByTestId: (
      text: Matcher,
      options?: MatcherOptions | undefined,
      waitForElementOptions?: unknown
    ) => HTMLElement;
    beforeEach(() => {
      ({ getByTestId } = render(
        <CurrencyCard
          currency={TEST_PROPS.currency}
          inputValue={TEST_PROPS.inputValue}
          balance={TEST_PROPS.balance}
          onValueChange={TEST_PROPS.onValueChange}
        />
      ));
    });
    test("it should mount", () => {
      const currencyCard = getByTestId("CurrencyCard");
      expect(currencyCard).toBeInTheDocument();
    });

    test("Currency should be displayed in its tag", () => {
      const currencyTag = getByTestId("CurrencyCell");
      expect(currencyTag.textContent).toBe(TEST_PROPS.currency);
    });

    test("Value is rendered correctly", () => {
      const inputField = getByTestId("InputField") as HTMLInputElement;
      expect(inputField.value).toBe(TEST_PROPS.inputValue);
    });
  });

  describe("Input tests", () => {
    test("Value can be changed", () => {
      const changeFunction = (value: string) => {
        return value;
      };

      const { getByTestId } = render(
        <CurrencyCard
          currency={TEST_PROPS.currency}
          inputValue={TEST_PROPS.inputValue}
          balance={TEST_PROPS.balance}
          onValueChange={changeFunction}
        />
      );

      const inputField = getByTestId("InputField") as HTMLInputElement;
      const testInput = "23.45";
      fireEvent.change(inputField, { target: { value: "." } });
      expect(inputField.value).toBe(testInput);
    });
  });
});
