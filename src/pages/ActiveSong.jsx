import { FaSadTear } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Seekbar from "../components/MusicPlayer/Seekbar";
import { useState } from "react";

import Player from "../components/MusicPlayer/Player";
import { nextSong, playPause } from "../redux/features/playerSlice";

function ActiveSong() {
  const [duration, setDuration] = useState(0);
  const [seekTime, setSeekTime] = useState(0);
  const [appTime, setAppTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const [repeat, setRepeat] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const dispatch = useDispatch();

  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);

  if (currentSongs.length === 0) {
    return (
      <div className=" pb-36 flex flex-col justify-center items-center gap-8 text-7xl text-[#bfff00] font-extrabold  h-[calc(100vh-72px)]">
        <span>No Song in queue</span>

        <FaSadTear />
      </div>
    );
  }

  function convertSecondsToMinutesAndSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds };
  }

  const { minutes, seconds } = convertSecondsToMinutesAndSeconds(
    activeSong.duration
  );

  const handleNextSong = () => {
    dispatch(playPause(false));

    if (!shuffle) {
      dispatch(nextSong((currentIndex + 1) % currentSongs.length));
    } else {
      dispatch(nextSong(Math.floor(Math.random() * currentSongs.length)));
    }
  };

  return (
    <div className="md:flex justify-center h-full rounded-lg text-white  flex-col md:w-[200px] lg:w-[400px] py-auto px-4 bg-[#1E1E1E]">
      <div className="flex overflow-y-scroll hide-scrollbar pt-11 items-center flex-col pb-4">
        <img
          className="object-cover md:h-[350px] md:w-[350px] rounded-md"
          src={activeSong?.image[2].link}
        />
        <h1 className="text-center font-extrabold text-5xl mt-3 text-gray-100">
          {activeSong.name}
        </h1>
        <div className=" flex gap-5 justify-center items-center mt-3">
          <p className="text-center text-gray-300 font-medium text-xl">
            {activeSong?.primaryArtists[0].name || activeSong?.primaryArtists}
          </p>

          <p className="text-center text-gray-100 font-semibold text-xl">
            {minutes}m:{seconds}s
          </p>
        </div>
      </div>
      <div className="w-full ">
        <Seekbar
          value={appTime}
          min="0"
          max={duration}
          onInput={(event) => setSeekTime(event.target.value)}
          setSeekTime={setSeekTime}
          appTime={appTime}
        />

        <Player
          activeSong={activeSong}
          volume={volume}
          isPlaying={isPlaying}
          seekTime={seekTime}
          repeat={repeat}
          currentIndex={currentIndex}
          onEnded={handleNextSong}
          onTimeUpdate={(event) => setAppTime(event.target.currentTime)}
          onLoadedData={(event) => setDuration(event.target.duration)}
        />
      </div>
    </div>
  );
}

export default ActiveSong;
