import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExchangeType {
  isBuy: boolean;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
}

interface ExchangeState {
  value: ExchangeType;
}

const initialState: ExchangeState = {
  value: {
    isBuy: false,
    fromCurrency: "NaN",
    toCurrency: "NaN",
    rate: 0,
  },
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    initExchange: (state, action: PayloadAction<ExchangeType>) => {
      state.value = action.payload;
    },
    changeAction: (state) => {
      state.value.isBuy = !state.value.isBuy;
    },
  },
});

export const { initExchange, changeAction } = exchangeSlice.actions;
export default exchangeSlice.reducer;
