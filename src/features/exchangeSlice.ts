import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ExchangeType {
  isBuy: boolean;
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  currencies: string[];
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
    currencies: [],
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
    changeFromCurrency: (state, action: PayloadAction<string>) => {
      state.value.fromCurrency = action.payload;
    },
    changeToCurrency: (state, action: PayloadAction<string>) => {
      state.value.toCurrency = action.payload;
    },
    updateRate: (state, action: PayloadAction<number>) => {
      state.value.rate = action.payload;
    },
  },
});

export const {
  initExchange,
  changeAction,
  changeFromCurrency,
  changeToCurrency,
  updateRate,
} = exchangeSlice.actions;
export default exchangeSlice.reducer;
