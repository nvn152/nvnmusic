import { createSlice, isAction } from "@reduxjs/toolkit";

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  activeSong: {},
  genreListId: "",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setActiveSong: (state, action) => {
      state.activeSong = action.payload.song;

      state.currentSongs = action.payload.data;

      state.currentIndex = action.payload.i;
      state.isActive = true;
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
    setNextSong: (state, action) => {
      state.currentSongs.splice(state.currentIndex + 1, 0, action.payload);
      state.isActive = true;
    },

    // assign the selected song as the currently playing song
    playNow: (state, action) => {
      state.activeSong = action.payload;
      state.isPlaying = true;
    },

    // To add a playlist to the queue
    setNextSongs: (state, action) => {
      state.currentSongs = state.currentSongs.concat(action.payload);
      state.isActive = true;
    },
    addToQueue: (state, action) => {
      state.currentSongs.push(action.payload);
      state.isActive = true;
    },
  },
});

export const {
  setActiveSong,
  nextSong,
  prevSong,
  playPause,
  selectGenreListId,
  setNextSong,
  setNextSongs,
  addToQueue,
  playNow,
} = playerSlice.actions;

export default playerSlice.reducer;
