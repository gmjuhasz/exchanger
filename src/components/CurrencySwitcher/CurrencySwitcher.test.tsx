import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CurrencySwitcher from "./CurrencySwitcher";
import { Provider } from "react-redux";
import { store } from "../../app/store";

describe("<CurrencySwitcher />", () => {
  test("it should mount", () => {
    render(
      <Provider store={store}>
        <CurrencySwitcher
          accounts={{ USD: 300, EUR: 499 }}
          isFromSwitcher={false}
        />
      </Provider>
    );

    const currencySwitcher = screen.getByTestId("CurrencySwitcher");

    expect(currencySwitcher).toBeInTheDocument();
  });
});
