import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CurrentRate from "./CurrentRate";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import rest from "../../utils/rest";

const DEFAULT_TEXT = " $1 = €1.0000";

describe("<CurrentRate />", () => {
  test("it should mount and have correct values", () => {
    render(
      <Provider store={store}>
        <CurrentRate fromCurrency="USD" toCurrency="EUR" rate={1} />
      </Provider>
    );

    const currentRate = screen.getByTestId("CurrentRate");
    expect(currentRate.textContent).toBe(DEFAULT_TEXT);
  });
});
