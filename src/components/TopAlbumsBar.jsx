import { Link, useNavigate, useNavigation } from "react-router-dom";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useDispatch } from "react-redux";

import { useState } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import AlbumThreeDotsMenu from "./AlbumThreeDotsMenu";
import BarLoader from "./Loaders/BarLoader";

function TopAlbumsBar({
  song,
  i,
  isPlaying,
  activeSong,
  data,
  albumId,
  isLoading,
}) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleDotsClick(e) {
    e.stopPropagation();
    setMenuOpen(!menuOpen);
  }

  if (isLoading) {
    return (
      <div className="mt-20 flex flex-wrap sm:justify-start justify-center gap-5 mx-auto">
        {Array.from({ length: 5 }).map((_, i) => (
          <BarLoader key={i} />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`w-full  flex flex-row items-center hover:bg-[#999]/[0.2] ${
        isPlaying && activeSong?.id === song?.id ? "bg-[#999]/[0.2]" : ""
      } py-2 p-4 rounded-lg cursor-pointer mb-2 relative`}
      onClick={() => {
        navigate(albumId ? `/albums/${albumId}` : `/albums/${data.id}`);
      }}
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex flex-row justify-between items-center w-full">
        <img
          className="w-16 h-16 rounded-lg"
          src={data?.image[2]?.link}
          alt={data?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3 ">
          <p className="md:text-lg text-base font-semibold text-gray-200">
            {data?.name}
          </p>

          <p className="text-base text-gray-300 mt-1">Album</p>
        </div>
        <PiDotsThreeOutlineVerticalFill
          className={`text-3xl rounded-full cursor-pointer ${
            menuOpen ? "text-white bg-black/30 p-1" : "text-gray-300 p-1"
          }`}
          onClick={handleDotsClick}
        />
        {menuOpen && (
          <div className="absolute top-full right-0">
            <AlbumThreeDotsMenu song={song} data={data} />
          </div>
        )}
      </div>
    </div>
  );
}

export default TopAlbumsBar;
