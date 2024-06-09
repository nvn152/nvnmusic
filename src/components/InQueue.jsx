import { useSelector } from "react-redux";
import QueueBar from "./QueueBar";
import { Link } from "react-router-dom";

import { FaSadTear } from "react-icons/fa";

function InQueue() {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);

  if (currentSongs?.length === 0) {
    return (
      <div className=" pb-36 flex flex-col justify-center items-center gap-8 text-7xl text-[#bfff00] font-extrabold  h-[calc(100vh-72px)]">
        <span>No Song in queue</span>

        <FaSadTear />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col h-[calc(100vh-165px)] ">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-[#bfff00] truncate w-[300px] font-bold text-lg">
          Up Next
        </h2>

        <Link>
          <p className="text-gray-300 text-xs cursor-pointer">More</p>
        </Link>
      </div>

      <div className=" h-[calc(100vh-165px)]  mt-2 flex flex-col gap-1  ">
        {/* <h1 className="text-center font-semibold md:font-extrabold text-2xl md:text-5xl text-gray-100 "></h1> */}
        <div className="">
          {currentSongs.map((song, i) => (
            <QueueBar
              key={i}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              isActive={isActive}
              currentSongs={currentSongs}
              currentIndex={currentIndex}
              data={currentSongs}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default InQueue;
