import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import { Link } from "react-router-dom";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import ThreeDotsMenu from "./ThreeDotsMenu";
import { useEffect, useRef, useState } from "react";

function SearchCard({ song, isPlaying, activeSong, data, i }) {
  const dispatch = useDispatch();
  const divRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function handlePauseClick() {
    dispatch(playPause(false));
  }

  function handlePlayClick() {
    dispatch(setActiveSong({ song, data: data.data.results, i }));
    dispatch(playPause(true));
  }

  function handleDotsClick(e) {
    setMenuOpen(!menuOpen);
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
    <div className="flex flex-col md:w-[220px] p-2 bg-opacity-80 w-[110px] backdrop-blur-sm rounded-lg cursor-pointer   ">
      <div
        className="relative w-full h-30 md:h-56 group"
        onContextMenu={handleRightClick}
      >
        <div
          className={`absolute inset-0 justify-center items-center bg-[#000000] bg-opacity-50 cursor-pointer group-hover:flex rounded-ls md:mb-[6px]    ${
            activeSong?.id === song?.id
              ? "flex bg-[#000000] bg-opacity-70"
              : "hidden"
          }`}
          onClick={
            isPlaying && activeSong?.id === song?.id
              ? handlePauseClick
              : handlePlayClick
          }
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>

        <img className="rounded-lg" alt="song_img" src={song.image[2].link} />

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
        <div className="md:font-semibold font-medium md:text-lg text-base flex justify-between text-white truncate">
          <Link to={`/songs/${song?.id}`} className="truncate w-48">
            {song.name}
          </Link>
        </div>
        <p className="md:text-sm text-xs truncate text-gray-300 mt-1">
          <Link
            to={
              song?.primaryArtists
                ? `/artists/${song?.primaryArtists[0]?.id}`
                : "/top-artists"
            }
          >
            {song?.primaryArtists}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SearchCard;
