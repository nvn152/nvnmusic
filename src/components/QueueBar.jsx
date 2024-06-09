import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { Link } from "react-router-dom";
import ThreeDotsMenu from "./ThreeDotsMenu";
import PlayPause from "./PlayPause";

function QueueBar({ song, i, isPlaying, activeSong, data }) {
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
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  }

  const handleOutsideClick = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setMenuOpen(!menuOpen);
    }
  };

  const handleRightClick = (e) => {
    e.preventDefault();

    handleDotsClick(e);
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
    <div
      className={`w-full flex flex-row items-center hover:bg-[#999]/[0.2] ${
        isPlaying && activeSong?.id === song?.id ? "bg-[#999]/[0.2]" : ""
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
      onClick={
        isPlaying && activeSong?.id === song.id
          ? handlePauseClick
          : handlePlayClick
      }
      onContextMenu={handleRightClick}
    >
      <h3 className="font-bold text-sm text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-[72px] h-w-[72px] rounded-lg"
          src={
            song?.image[2]?.link ? song?.image[2]?.link : song?.image[2]?.url
          }
          alt={song?.name}
        />
        {menuOpen && (
          <div
            className="relative bottom-20 top-full z-50 right-2"
            ref={divRef}
          >
            <ThreeDotsMenu
              handleDotsClick={handleDotsClick}
              song={song}
              data={data}
            />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-center mx-3 ">
          <Link
            className="truncate w-fit"
            to={`/songs/${song.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-lg truncate w-48 font-medium text-white">
              {song?.name}
            </p>
          </Link>

          <Link
            className="truncate md:w-[220px] w-[100px]"
            to={`/artists/${
              song?.primaryArtists
                ? song?.primaryArtists[0]?.id
                : song?.artists?.primary[0]?.id
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {typeof song?.primaryArtists === "string" ? (
              <p className="text-base text-gray-300 mt-1">
                {song?.primaryArtists}
              </p>
            ) : (
              <p className="text-base text-gray-300 mt-1">
                {song.primaryArtists?.length
                  ? song.primaryArtists[0]?.name
                  : song.artists.primary[0]?.name}
              </p>
            )}
          </Link>
        </div>
      </div>
      <PlayPause
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
}

export default QueueBar;
