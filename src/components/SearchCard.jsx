import { useDispatch } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import PlayPause from "./PlayPause";
import { Link } from "react-router-dom";

function SearchCard({ song, isPlaying, activeSong, data, i }) {
  const dispatch = useDispatch();

  function handlePauseClick() {
    dispatch(playPause(false));
  }

  function handlePlayClick() {
    dispatch(setActiveSong({ song, data: data.data.results, i }));
    dispatch(playPause(true));
  }

  return (
    <div className="flex flex-col w-[250px] p-4  bg-opacity-80 backdrop-blur-sm rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center opacity-0 items-center bg-black hover:opacity-80 bg-opacity-0 group-hover:bg-opacity-50 group-hover:flex ${
            activeSong?.name === song?.name
              ? " flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        </div>

        <img className="rounded-lg" alt="song_img" src={song.image[2].link} />
      </div>
      <div className="mt-4 flex flex-col ">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/songs/${song?.id}`}>{song.name}</Link>
        </p>
        <p className="text-sm truncate text-gray-300 mt-1">
          <Link
            to={
              song.primaryArtists
                ? `/artists/${song?.primaryArtists[0]?.id}`
                : "/top-artists"
            }
          >
            {song.primaryArtists[0]?.name}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SearchCard;
