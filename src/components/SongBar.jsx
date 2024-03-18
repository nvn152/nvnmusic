import React, { useState } from "react";
import { Link } from "react-router-dom";

import PlayPause from "./PlayPause";
import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import ThreeDotsMenu from "./ThreeDotsMenu";

function SongBar({
  song,
  i,
  artistId = song?.primaryArtistsId,
  isPlaying,
  activeSong,
  data,
  playlistId,
  albumId,
}) {
  const dispatch = useDispatch();

  const [menuOpen, setMenuOpen] = useState(false);

  function handlePauseClick() {
    dispatch(playPause(false));
  }

  function handlePlayClick() {
    dispatch(setActiveSong({ song, data: data.songs || data, i }));
    dispatch(playPause(true));
  }

  function handleDotsClick(e) {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  }

  return (
    <div
      className={`w-full  flex flex-row items-center hover:bg-[#999]/[0.2] ${
        isPlaying && activeSong?.id === song?.id ? "bg-[#999]/[0.2]" : ""
      } py-2 p-4 rounded-lg cursor-pointer mb-2 relative`}
      onClick={
        isPlaying && activeSong?.id === song.id
          ? handlePauseClick
          : () => handlePlayClick(song)
      }
    >
      <h3 className="font-bold text-base text-gray-200 mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-16 h-16 rounded-lg"
          src={song?.image[2]?.link}
          alt={song?.title}
        />
        <div
          className="flex-1 flex flex-col justify-center mx-3"
          onClick={() => {}}
        >
          {artistId ? (
            <Link
              onClick={(e) => e.stopPropagation()}
              className="truncate w-fit"
              to={`/songs/${song?.id}`}
            >
              <p className="md:text-lg md:w-full w-[190px] text-base font-semibold text-gray-200">
                {song?.name}
              </p>
            </Link>
          ) : (
            <>
              <Link
                className="truncate w-fit"
                onClick={(e) => e.stopPropagation()}
                to={`/songs/${song?.id}`}
              >
                <p className="md:text-xl md:w-full w-[190px] text-base font-semibold text-gray-200">
                  {song?.name}
                </p>
              </Link>
            </>
          )}
          <Link
            to={`/artists/${artistId}`}
            className="text-base w-[190px] text-gray-300 mt-1 truncate md:w-[600px]"
            onClick={(e) => e.stopPropagation()}
          >
            {artistId ? song?.primaryArtists : song?.primaryArtists}
          </Link>
        </div>

        <PiDotsThreeOutlineVerticalFill
          className={`text-3xl mr-5 rounded-full cursor-pointer ${
            menuOpen ? "text-gray-200 bg-black/30 p-1" : "text-gray-300 p-1"
          }`}
          onClick={(e) => {
            handleDotsClick(e);
          }}
        />

        {menuOpen && (
          <div className="relative top-full z-50 right-2">
            <ThreeDotsMenu
              handleDotsClick={handleDotsClick}
              song={song}
              data={data}
            />
          </div>
        )}
      </div>
      {artistId || playlistId || albumId ? (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick}
        />
      ) : null}
    </div>
  );
}

export default SongBar;
