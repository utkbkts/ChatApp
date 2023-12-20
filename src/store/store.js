import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../redux/AuthSlice";
export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
