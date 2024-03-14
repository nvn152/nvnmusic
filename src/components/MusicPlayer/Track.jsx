import React from "react";

function Track({ isPlaying, isActive, activeSong }) {
  return (
    <div className="flex-1 flex items-center justify-start ">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img
          src={activeSong?.image[2].link}
          alt="cover art"
          className="rounded-full"
        />
      </div>
      <div className="">
        <p className="truncate w-fit text-white font-bold text-lg">
          {activeSong?.name ? activeSong?.name : "No active Song"}
        </p>
        <p className="truncate w-fit text-gray-300">
          {activeSong?.primaryArtists[0].name
            ? activeSong?.primaryArtists[0]?.name
            : activeSong?.primaryArtists}
        </p>
      </div>
    </div>
  );
}

export default Track;
