import { Link, useNavigate, useNavigation } from "react-router-dom";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useDispatch } from "react-redux";

function TopPlayListBar({ song, i, isPlaying, activeSong, data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handlePauseClick() {
    dispatch(playPause(false));
  }

  function handlePlayClick() {
    dispatch(setActiveSong({ song, data: data.trending.songs, i }));
    dispatch(playPause(true));
  }

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#999]/[0.2] ${
        isPlaying && activeSong?.name === song?.name ? "bg-[#999]/[0.2]" : ""
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
      onClick={() => {
        navigate(`/playlist/${data.id}`);
      }}
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={data?.image[2]?.link}
          alt={data?.title}
        />
        <div className="flex-1 flex flex-col justify-center mx-3 ">
          <div to={`/songs`} className="truncate w-fit">
            <p className="text-xl font-bold text-white">{data?.title}</p>
          </div>

          <div className="truncate w-fit">
            <p className="text-base text-gray-300 mt-1">Playlist</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopPlayListBar;
