import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/playerSlice";
import { jioSaavanApi } from "./services/jioSaavan";
import currentSongReducer from "./features/currentSongSlice";
import { saavanApi } from "./services/saavanApi";

export const store = configureStore({
  reducer: {
    [jioSaavanApi.reducerPath]: jioSaavanApi.reducer,
    [saavanApi.reducerPath]: saavanApi.reducer,
    player: playerReducer,
    currentSong: currentSongReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      jioSaavanApi.middleware,
      saavanApi.middleware
    ),
});
