import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../features/accounts/accountsSlice";
import exchangeReducer from "../features/exchange/exchangeSlice";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    exchange: exchangeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
