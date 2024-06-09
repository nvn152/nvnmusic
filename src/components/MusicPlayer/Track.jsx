import React from "react";

function Track({ isPlaying, isActive, activeSong }) {
  return (
    <div className="md:flex-1 flex items-center justify-start ">
      <div
        className={`${
          isPlaying && isActive ? "animate-[spin_3s_linear_infinite]" : ""
        } hidden sm:block h-16 w-16 mr-4`}
      >
        <img
          src={
            activeSong?.image[2].link
              ? activeSong?.image[2]?.link
              : activeSong?.image[2]?.url
          }
          alt="cover art"
          className="rounded-full"
        />
      </div>

      {/* image for smaller devices */}
      <div className=" md:hidden sm:block h-14 w-14 mr-3">
        <img
          src={
            activeSong?.image[2].link
              ? activeSong?.image[2]?.link
              : activeSong?.image[2]?.url
          }
          alt="cover art"
          className="rounded-md"
        />
      </div>

      <div className="">
        <p className="truncate  md:w-fit w-[190px] overflow-hidden text-white md:font-bold md:text-lg font-semibold text-base">
          {activeSong?.name ? activeSong?.name : "No active Song"}
        </p>

        <p className="truncate md:w-fit w-[190px] text-gray-300">
          {activeSong?.primaryArtists
            ? activeSong?.primaryArtists[0]?.name
            : activeSong?.artists?.primary[0]?.name ||
              activeSong.primaryArtists}
        </p>
      </div>
    </div>
  );
}

export default Track;
