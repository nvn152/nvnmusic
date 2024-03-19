import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/playerSlice";
import { jioSaavanApi } from "./services/jioSaavan";
import currentSongReducer from "./features/currentSongSlice";

export const store = configureStore({
  reducer: {
    [jioSaavanApi.reducerPath]: jioSaavanApi.reducer,
    player: playerReducer,
    currentSong: currentSongReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(jioSaavanApi.middleware),
});
