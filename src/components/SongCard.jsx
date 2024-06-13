import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import { Link } from "react-router-dom";

import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import { useEffect, useRef, useState } from "react";
import ThreeDotsMenu from "./ThreeDotsMenu";

function SongCard({ song, isPlaying, activeSong, data, i }) {
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function handlePauseClick() {
    dispatch(playPause(false));
  }

  function handlePlayClick() {
    dispatch(setActiveSong({ song, data: data, i }));
    dispatch(playPause(true));
  }

  function handleDotsClick(e) {
    setMenuOpen(!menuOpen);
  }

  function getFirstWord(str) {
    const firstWord = str.split(",")[0].trim();
    return firstWord;
  }

  const handleOutsideClick = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setMenuOpen(!menuOpen);
    }
  };

  const handleRightClick = (event) => {
    event.preventDefault();

    handleDotsClick(event);
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  return (
    <div className="flex flex-col lg:w-[220px] md:w-[160px] p-0 bg-opacity-80 w-[110px] backdrop-blur-sm rounded-lg cursor-pointer  ">
      <div
        className="relative z-10 w-full md:h-48 h-30 group"
        onContextMenu={handleRightClick}
      >
        <div
          className={`absolute inset-0 justify-center items-center bg-[#000000] bg-opacity-50 cursor-pointer group-hover:flex rounded-xl md:h-[230.4px] h-[94px] md:mb-[20px]  ${
            activeSong?.id === song.id
              ? "flex bg-[#000000] bg-opacity-70"
              : "hidden"
          }`}
          onClick={
            isPlaying && activeSong?.id === song.id
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

        {menuOpen && (
          <div className="z-50" ref={divRef}>
            <ThreeDotsMenu
              handleDotsClick={handleDotsClick}
              song={song}
              data={data}
            />
          </div>
        )}
      </div>
      <div className="mt-4 flex flex-col ">
        <div className="font-semibold md:text-lg text-sm text-white  truncate flex justify-between ">
          <Link to={`/songs/${song?.id}`} className="truncate w-48">
            {song.name}
          </Link>
        </div>
        <p className="md:text-sm text-xs truncate text-gray-300 mt-1">
          <Link
            to={
              song?.primaryArtists[0]?.id
                ? `/artists/${song?.primaryArtists[0]?.id} `
                : `/artists/${getFirstWord(song?.primaryArtistsId)}`
            }
          >
            {song?.primaryArtists[0]?.name || song?.primaryArtists}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SongCard;
