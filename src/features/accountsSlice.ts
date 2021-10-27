import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Accounts {
  [currency: string]: number;
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
  },
});

export const { initAccounts } = accountSlice.actions;
export default accountSlice.reducer;
