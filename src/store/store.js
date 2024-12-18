import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "./features/todoSlice";

const store = configureStore({
  reducer: {
    todo: todoSlice,
  },
  middleware: (GetDefaultMiddleware) => GetDefaultMiddleware(),
  devTools: true,
});

export default store;
