import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Accounts {
  [currency: string]: number;
}

interface TransactionInterface {
  fromCurrency: string;
  fromAmount: number;
  toCurrency: string;
  toAmount: number;
}

interface AccountsState {
  value: Accounts;
}

const initialState: AccountsState = {
  value: {},
};

export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    initAccounts: (state, action: PayloadAction<Accounts>) => {
      state.value = action.payload;
    },
    makeTransaction: (state, action: PayloadAction<TransactionInterface>) => {
      const { fromCurrency, fromAmount, toCurrency, toAmount } = action.payload;
      state.value[fromCurrency] -= fromAmount;
      if (!state.value[toCurrency]) {
        state.value[toCurrency] = 0;
      }
      state.value[toCurrency] += toAmount;
    },
  },
});

export const { initAccounts, makeTransaction } = accountSlice.actions;
export default accountSlice.reducer;
