import React from "react";
import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

function PlayPause({ isPlaying, activeSong, song, handlePause, handlePlay }) {
  return (
    <>
      {isPlaying && activeSong?.id === song.id ? (
        <FaPauseCircle
          size={30}
          className="text-gray-300"
          onClick={handlePause}
        />
      ) : (
        <FaPlayCircle
          size={30}
          className="text-gray-300"
          onClick={handlePlay}
        />
      )}
    </>
  );
}

export default PlayPause;
