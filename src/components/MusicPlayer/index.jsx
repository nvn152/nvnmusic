import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  nextSong,
  prevSong,
  playPause,
} from "../../redux/features/playerSlice";
import Controls from "./Controls";
import Player from "./Player";
import Seekbar from "./Seekbar";
import Track from "./Track";
import VolumeBar from "./VolumeBar";
import {
  setAppTime,
  setDuration,
  setRepeat,
  setSeekTime,
  setShuffle,
  setVolume,
} from "../../redux/features/currentSongSlice";

const MusicPlayer = () => {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);
  // const [duration, setDuration] = useState(0);
  // const [seekTime, setSeekTime] = useState(0);
  // const [appTime, setAppTime] = useState(0);
  // const [volume, setVolume] = useState(1);
  // const [repeat, setRepeat] = useState(false);
  // const [shuffle, setShuffle] = useState(false);

  const { duration, seekTime, appTime, volume, repeat, shuffle } = useSelector(
    (state) => state.currentSong
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentSongs.length) dispatch(playPause(true));
  }, [currentIndex]);

  const navigate = useNavigate();

  const handlePlayPause = () => {
    if (!isActive) return;

    if (isPlaying) {
      dispatch(playPause(false));
    } else {
      dispatch(playPause(true));
    }
  };

  // from my active song
  const handleDurationChange = (e) => {
    dispatch(setDuration(e));
  };
  const handleSeekChange = (e) => {
    dispatch(setSeekTime(e));
  };
  const handleAppTimeChange = (e) => {
    dispatch(setAppTime(e));
  };
  const handleVolumeChange = (e) => {
    dispatch(setVolume(e));
  };
  const handleRepeatChange = (e) => {
    dispatch(setRepeat(e));
  };
  const handleShuffleChange = (e) => {
    dispatch(setShuffle(e));
  };

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
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

  function handleInnerClick(e) {
    e.stopPropagation();
  }
  return (
    <div
      className="relative sm:px-4 md:px-8 px-2 w-full flex justify-between items-center cursor-pointer"
      onClick={() => (activeSong ? navigate(`/activesong`) : navigate(`/`))}
    >
      <div className="md:w-1/4  md:ml-0">
        {" "}
        {/* Adjusted width for the left div */}
        <Track
          isPlaying={isPlaying}
          isActive={isActive}
          activeSong={activeSong}
        />
      </div>

      <div
        onClick={handleInnerClick}
        className="md:flex-1 flex flex-col items-center justify-center md:w-1/2 w-[10]"
      >
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

        <div className="hidden w-full md:block">
          <Seekbar
            value={appTime}
            min="0"
            max={duration}
            onInput={(event) => handleSeekChange(event.target.value)}
            setSeekTime={handleSeekChange}
            appTime={appTime}
          />
        </div>

        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) =>
            handleAppTimeChange(event.target.currentTime)
          }
          onLoadedData={(event) => handleDurationChange(event.target.duration)}
        />
      </div>

      <div className="w-1/4 md:block hidden">
        {" "}
        {/* Adjusted width for the right div */}
        <VolumeBar
          onClick={handleInnerClick}
          value={volume}
          min="0"
          max="1"
          onChange={(event) => handleVolumeChange(event.target.value)}
          setVolume={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
