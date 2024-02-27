import { useParams } from "react-router-dom";
import { useGetPlaylistSongsQuery } from "../redux/services/jioSaavan";

import { useDispatch, useSelector } from "react-redux";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

import { Error, Loader, SongBar } from "../components";

function PlayListSongsList() {
  const { playlistId } = useParams();
  const dispatch = useDispatch();

  const { data, isFetching, error } = useGetPlaylistSongsQuery({
    playlistId: playlistId,
  });

  function handlePauseClick() {
    dispatch(playPause(false));
  }

  function handlePlayClick(song, i) {
    dispatch(setActiveSong({ song, data: data?.data?.songs, i }));
    dispatch(playPause(true));
  }

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Top Charts..." />;
  if (error) return <Error />;
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-[#bfff00]">All Songs</h1>
      <div className="mt-6 w-full flex flex-col">
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
            playlistId={playlistId}
          />
        ))}
      </div>
    </div>
  );
}

export default PlayListSongsList;
