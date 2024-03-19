import { createSlice } from "@reduxjs/toolkit";

export const currentSongSlice = createSlice({
  name: "player",
  initialState: {
    duration: 0,
    seekTime: 0,
    appTime: 0,
    volume: 1,
    repeat: false,
    shuffle: false,
  },
  reducers: {
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setSeekTime: (state, action) => {
      state.seekTime = action.payload;
    },
    setAppTime: (state, action) => {
      state.appTime = action.payload;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setRepeat: (state, action) => {
      state.repeat = action.payload;
    },
    setShuffle: (state, action) => {
      state.shuffle = action.payload;
    },
  },
});

export const {
  setDuration,
  setSeekTime,
  setAppTime,
  setVolume,
  setRepeat,
  setShuffle,
} = currentSongSlice.actions;

export default currentSongSlice.reducer;
