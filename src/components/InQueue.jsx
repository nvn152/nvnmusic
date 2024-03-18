import { useSelector } from "react-redux";
import SongBar from "./SongBar";
import QueueBar from "./QueueBar";
import { redirect, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { FaSadTear } from "react-icons/fa";

function InQueue() {
  const navigate = useNavigate();

  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);

  if (currentSongs.length === 0) {
    return (
      <div className=" pb-36 flex flex-col justify-center items-center gap-8 text-7xl text-[#bfff00] font-extrabold  h-[calc(100vh-72px)]">
        <span>No Song in queue</span>

        <FaSadTear />
      </div>
    );
  }

  function convertSecondsToMinutesAndSeconds(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return { minutes, seconds };
  }

  const { minutes, seconds } = convertSecondsToMinutesAndSeconds(
    activeSong.duration
  );

  return (
    <div className="flex  gap-10 overflow-hidden flex-col md:flex-row">
      <div className="md:flex  h-[calc(100vh-165px)] rounded-lg text-white hidden flex-col md:w-[200px] lg:w-[400px] py-auto px-4 bg-[#000000]">
        <div className="flex overflow-y-scroll hide-scrollbar pt-11 items-center flex-col">
          <img
            className="object-cover md:h-[350px] md:w-[350px] rounded-md"
            src={activeSong?.image[2].link}
          />
          <h1 className="text-center font-extrabold text-5xl mt-3 text-gray-100">
            {activeSong.name}
          </h1>
          <div className=" flex gap-5 justify-center items-center mt-3">
            <p className="text-center text-gray-300 font-medium text-xl">
              {activeSong?.primaryArtists[0].name || activeSong?.primaryArtists}
            </p>

            <p className="text-center text-gray-100 font-semibold text-xl">
              {minutes}m:{seconds}s
            </p>
          </div>
          <p className="mt-3 text-gray-100 text-center text-sm font-semibold">
            <span className="mx-2 text-gray-300 font-semibold text-lg">
              Released in
            </span>

            {activeSong.releaseDate}
          </p>
        </div>
      </div>

      <div className=" py-2 h-[calc(100vh-165px)] rounded-lg bg-black/60 overflow-y-scroll hide-scrollbar flex flex-col-reverse ">
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
            />
          ))}
        </div>
        <h1 className="text-center font-semibold md:font-extrabold text-2xl md:text-5xl text-gray-100 ">
          In Queue
        </h1>
      </div>
    </div>
  );
}

export default InQueue;

// <div className=" hidden md:flex flex-col fixed lg:flex-row mt-2 gap-10 mx-auto justify-center ">
//       <div className="flex  w-[400px] pt-11 items-center flex-col">
//         <img
//           className="object-cover md:h-[350px] md:w-[350px] rounded-md"
//           src={activeSong?.image[2].link}
//         />
//         <h1 className="text-center font-extrabold text-5xl mt-3 text-gray-100">
//           {activeSong.name}
//         </h1>
//         <div className=" flex gap-5 justify-center items-center mt-3">
//           <p className="text-center text-gray-300 font-medium text-xl">
//             {activeSong?.primaryArtists[0].name || activeSong?.primaryArtists}
//           </p>

//           <p className="text-center text-gray-100 font-semibold text-xl">
//             {minutes}m:{seconds}s
//           </p>
//         </div>
//         <p className="mt-3 text-gray-100 text-center text-sm font-semibold">
//           <span className="mx-2 text-gray-300 font-semibold text-lg">
//             Released in
//           </span>

//           {activeSong.releaseDate}
//         </p>
//       </div>
//       <div className="flex flex-col  h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar pb-20">
//         <h1 className="text-center font-extrabold text-5xl text-gray-100 ">
//           In Queue
//         </h1>
//         <div className="">
//           {currentSongs.map((song, i) => (
//             <QueueBar
//               key={i}
//               song={song}
//               i={i}
//               isPlaying={isPlaying}
//               activeSong={activeSong}
//               isActive={isActive}
//               currentSongs={currentSongs}
//               currentIndex={currentIndex}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
