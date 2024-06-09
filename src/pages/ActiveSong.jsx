import { FaSadTear } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Seekbar from "../components/MusicPlayer/Seekbar";
import { useState } from "react";

import Player from "../components/MusicPlayer/Player";
import { nextSong, playPause, prevSong } from "../redux/features/playerSlice";

import {
  setAppTime,
  setDuration,
  setRepeat,
  setSeekTime,
  setShuffle,
  setVolume,
} from "../redux/features/currentSongSlice";
import Controls from "../components/MusicPlayer/Controls";

function ActiveSong() {
  const { duration, seekTime, appTime, volume, repeat, shuffle } = useSelector(
    (state) => state.currentSong
  );
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);

  const dispatch = useDispatch();

  if (currentSongs.length === 0) {
    return (
      <div className=" pb-36 flex flex-col justify-center items-center gap-8 text-7xl text-[#bfff00] font-extrabold  h-[calc(100vh-72px)]">
        <span>No Song in queue</span>

        <FaSadTear />
      </div>
    );
  }

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  const handleRepeatChange = (e) => {
    dispatch(setRepeat(e));
  };
  const handleShuffleChange = (e) => {
    dispatch(setShuffle(e));
  };

  const handlePrevSong = () => {
    if (currentIndex === 0) {
      dispatch(prevSong(currentSongs.length - 1));
    } else if (shuffle) {
      dispatch(prevSong(Math.floor(Math.random() * currentSongs.length)));
    } else {
      dispatch(prevSong(currentIndex - 1));
    }
  };

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  const handleSeekChange = (e) => {
    dispatch(setSeekTime(e));
  };

  return (
    <div className="md:flex  justify-center md:pb-56 rounded-lg h-[calc(100vh-60px)] text-white  flex-col md:w-[300px] lg:w-full  py-auto px-2 bg-[#1E1E1E]">
      <div className="flex  overflow-y-scroll  hide-scrollbar pt-11 md:p-5  items-center flex-col pb-4">
        <img
          className="object-cover md:h-[400px] md:w-[400px] h-[375px] w-[375px] rounded-md"
          src={
            activeSong?.image[2].link
              ? activeSong?.image[2]?.link
              : activeSong?.image[2]?.url
          }
        />
        <h1 className="text-center font-bold text-2xl md:text-4xl mt-8 text-gray-100">
          {activeSong.name}
        </h1>
        <div className=" flex gap-5 justify-center items-center mt-3">
          <p className="text-center text-gray-300 font-medium text-base">
            {activeSong?.primaryArtists
              ? activeSong?.primaryArtists[0]?.name
              : activeSong?.artists?.primary[0]?.name ||
                activeSong.primaryArtists}
          </p>
        </div>
      </div>
      <div className="w-full mt-5  flex flex-col gap-6">
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => handleSeekChange(event.target.value)}
          setSeekTime={handleSeekChange}
          appTime={appTime}
        />

        <div className="mx-auto">
          <Controls
            isPlaying={isPlaying}
            isActive={isActive}
            repeat={repeat}
            setRepeat={handleRepeatChange}
            shuffle={shuffle}
            setShuffle={handleShuffleChange}
            currentSongs={currentSongs}
            handlePlayPause={handlePlayPause}
            handlePrevSong={handlePrevSong}
            handleNextSong={handleNextSong}
          />
        </div>
      </div>
    </div>
  );
}

export default ActiveSong;
