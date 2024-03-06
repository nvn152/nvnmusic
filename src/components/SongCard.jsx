import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import { Link } from "react-router-dom";

import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import { useState } from "react";
import ThreeDotsMenu from "./ThreeDotsMenu";

function SongCard({ song, isPlaying, activeSong, data, i }) {
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  function handlePauseClick() {
    dispatch(playPause(false));
  }

  function handlePlayClick() {
    dispatch(setActiveSong({ song, data: data.trending.songs, i }));
    dispatch(playPause(true));
  }

  function handleDotsClick(e) {
    setMenuOpen(!menuOpen);
  }

  return (
    <div className="flex flex-col md:w-[250px] p-4 bg-opacity-80 w-[150px] backdrop-blur-sm rounded-lg cursor-pointer  ">
      <div className="relative w-full md:h-56 h-30 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-[#000000] bg-opacity-50 cursor-pointer group-hover:flex rounded-xl md:mb-[6px]    ${
            activeSong?.name === song.name
              ? "flex bg-[#000000] bg-opacity-70"
              : "hidden"
          }`}
          onClick={
            isPlaying && activeSong?.name === song.name
              ? handlePauseClick
              : handlePlayClick
          }
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img className="rounded-xl" alt="song_img" src={song.image[2].link} />
      </div>
      <div className="mt-4 flex flex-col ">
        <div className="font-semibold text-lg text-white truncate flex justify-between ">
          <Link to={`/songs/${song?.id}`} className="truncate w-48">
            {song.name}
          </Link>

          <PiDotsThreeOutlineVerticalFill
            className={`text-3xl rounded-full cursor-pointer ${
              menuOpen ? "text-white bg-black/30 p-1" : "text-gray-300 p-1"
            }`}
            onClick={(e) => handleDotsClick(e)}
          />

          {menuOpen && (
            <ThreeDotsMenu
              handleDotsClick={handleDotsClick}
              song={song}
              data={data}
            />
          )}
        </div>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.primaryArtists
                ? `/artists/${song?.primaryArtists[0]?.id}`
                : "/top-artists"
            }
          >
            {song.primaryArtists[0]?.name}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SongCard;
