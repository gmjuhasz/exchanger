import { configureStore } from "@reduxjs/toolkit";
import accountsReducer from "../features/accountsSlice";
import exchangeReducer from "../features/exchangeSlice";

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
    exchange: exchangeReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
