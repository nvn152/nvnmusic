import React from "react";
import { Link } from "react-router-dom";

import PlayPause from "./PlayPause";

function SongBar({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) {
  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#000]/[0.6] ${
        activeSong?.name === song?.name ? "bg-[#000]/[0.6]" : "bg-transparent"
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
      onClick={
        isPlaying && activeSong?.name === song.name
          ? handlePauseClick
          : () => handlePlayClick(song)
      }
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.image[2]?.link}
          alt={song?.title}
        />
        <div
          className="flex-1 flex flex-col justify-center mx-3"
          onClick={(e) => e.stopPropagation()}
        >
          {artistId ? (
            <Link to={`/songs/${song.id}`}>
              <p className="text-xl font-bold text-white">{song?.name}</p>
            </Link>
          ) : (
            <p className="text-xl font-bold text-white">{song?.name}</p>
          )}
          <p className="text-base text-gray-300 mt-1">
            {artistId ? song?.primaryArtists : song?.primaryArtists}
          </p>
        </div>
      </div>
      {artistId ? (
        <PlayPause
          isPlaying={isPlaying}
          activeSong={activeSong}
          song={song}
          handlePause={handlePauseClick}
          handlePlay={() => handlePlayClick(song, i)}
        />
      ) : null}
    </div>
  );
}

export default SongBar;
