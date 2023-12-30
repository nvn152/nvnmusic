import { configureStore } from "@reduxjs/toolkit";

import playerReducer from "./features/playerSlice";
import { jioSaavanApi } from "./services/jioSaavan";

export const store = configureStore({
  reducer: {
    [jioSaavanApi.reducerPath]: jioSaavanApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jioSaavanApi.middleware),
});
