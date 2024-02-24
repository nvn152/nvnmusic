import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { useGetArtistSongsQuery } from "../redux/services/jioSaavan";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import ArtistDetailsHeader from "../components/ArtistDetailsHeader";

function ArtistDetails() {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { id: artistId } = useParams();
  const dispatch = useDispatch();

  const {
    data: artistSongs,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistSongsQuery(artistId);

  if (isFetchingArtistDetails) {
    return <Loader title="Loading artist details" />;
  }

  if (error) {
    return <Error />;
  }

  function handlePauseClick() {
    dispatch(playPause(false));
  }

  function handlePlayClick(song, i) {
    dispatch(setActiveSong({ song, data: artistSongs.data, i }));
    dispatch(playPause(true));
  }

  return (
    <div className="flex flex-col">
      <ArtistDetailsHeader artistId={artistId} artistSongs={artistSongs} />

      <RelatedSongs
        data={artistSongs?.data?.results}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistId}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
}

export default ArtistDetails;
