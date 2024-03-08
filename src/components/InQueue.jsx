import { useSelector } from "react-redux";
import SongBar from "./SongBar";
import QueueBar from "./QueueBar";

function InQueue() {
  const { activeSong, currentSongs, currentIndex, isActive, isPlaying } =
    useSelector((state) => state.player);

  return (
    <div className="flex md:flex-row mt-2 gap-5 mx-auto justify-center ">
      <div className="flex max-w-[350px] items-center flex-col my-14 ">
        <img
          className="object-cover md:h-[350px] md:w-[350px]  rounded-md"
          src={activeSong?.image[2].link}
        />

        <h1 className="text-center font-extrabold text-5xl mt-3 text-gray-100">
          {activeSong.name}
        </h1>
        <p className="text-center text-gray-100 font-medium text-xl">
          {activeSong?.primaryArtists[0].name || activeSong?.primaryArtists}
        </p>
      </div>

      <div className="flex flex-col mx-auto">
        <h1 className="text-center font-extrabold text-5xl text-gray-100">
          In Queue
        </h1>

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
      </div>
    </div>
  );
}

export default InQueue;
