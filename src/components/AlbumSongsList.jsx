import { useParams } from "react-router-dom";
import {
  useGetAlbumSongQuery,
  useGetPlaylistSongsQuery,
} from "../redux/services/jioSaavan";
import SongBar from "./SongBar";
import { useDispatch, useSelector } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import Loader from "./Loader";
import Error from "./Error";

function AlbumSongsList() {
  const { albumId } = useParams();
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetAlbumSongQuery({ albumId });

  function handlePauseClick() {
    dispatch(playPause(false));
  }

  function handlePlayClick(song, i) {
    dispatch(setActiveSong({ song, data: data?.data?.songs, i }));
    dispatch(playPause(true));
  }

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isLoading) return <Loader title="Loading songs..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl my-5 text-[#bfff00]">
        All Songs
        <span className="font-black text-white"> from {data?.data?.name}</span>
      </h1>
      <div className="mt-6  w-full flex flex-col">
        {data?.data?.songs.map((song, i) => (
          <SongBar
            key={i}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
            data={data?.data}
            albumId={albumId}
          />
        ))}
      </div>
    </div>
  );
}

export default AlbumSongsList;
