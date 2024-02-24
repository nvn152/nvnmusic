import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";
import {
  useGetLyricsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} from "../redux/services/jioSaavan";

function SongDetails() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { songid } = useParams();
  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid });

  const { data: lyricsData, error: lyricsError } = useGetLyricsQuery({
    songid,
  });

  //TODO 3. get lyrics

  const artistIds = songData?.data[0]?.primaryArtistsId?.split(",") || [];
  const artistId = artistIds.length > 0 ? artistIds[0] : null;

  const {
    data,
    isFetching: isFetchingRelatedSongs,
    error,
  } = useGetSongRelatedQuery({ artistId, songid });

  function handlePauseClick() {
    dispatch(playPause(false));
  }

  function handlePlayClick(song, i) {
    dispatch(setActiveSong({ song, data: data.data, i }));
    dispatch(playPause(true));
  }

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title="Searching songs details" />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId="" songData={songData} />

      <div className="mb-10 ">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <div className="mt-5">
          {lyricsData ? (
            lyricsData.data.lyrics
          ) : (
            <p className="text-gray-400 text-base my-1">
              Sorry! lyrics not found
            </p>
          )}
        </div>
      </div>
      <RelatedSongs
        data={data.data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        artistId={artistId}
      />
    </div>
  );
}

export default SongDetails;
