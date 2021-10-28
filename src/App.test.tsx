import React, { useEffect } from "react";
import { act, render } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom/extend-expect";
import { store } from "./app/store";
import App from "./App";

describe("On mount test", () => {
  it("fetches data and loads", async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(getByTestId("LoadingDiv")).toBeInTheDocument();
  });
});
