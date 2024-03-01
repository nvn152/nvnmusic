// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

// import { useGetArtistSongsQuery } from "../redux/services/jioSaavan";
// import { playPause, setActiveSong } from "../redux/features/playerSlice";
// import ArtistDetailsHeader from "../components/ArtistDetailsHeader";

// function ArtistDetails() {
//   const page = 1;

//   const { activeSong, isPlaying } = useSelector((state) => state.player);
//   const { id: artistId } = useParams();
//   const dispatch = useDispatch();

//   const {
//     data: artistSongs,
//     isFetching: isFetchingArtistDetails,
//     error,
//   } = useGetArtistSongsQuery({artistId, page });

//   if (isFetchingArtistDetails) {
//     return <Loader title="Loading artist details" />;
//   }

//   if (error) {
//     return <Error />;
//   }

//   function handlePauseClick() {
//     dispatch(playPause(false));
//   }

//   function handlePlayClick(song, i) {
//     dispatch(setActiveSong({ song, data: artistSongs.data, i }));
//     dispatch(playPause(true));
//   }

//   return (
//     <div className="flex flex-col">
//       <ArtistDetailsHeader artistId={artistId} artistSongs={artistSongs} />

//       <RelatedSongs
//         data={artistSongs?.data?.results}
//         isPlaying={isPlaying}
//         activeSong={activeSong}
//         artistId={artistId}
//         handlePauseClick={handlePauseClick}
//         handlePlayClick={handlePlayClick}
//       />
       
//     </div>
//   );
// }

// export default ArtistDetails;

import { useEffect } from "react"; // Import useEffect
import { useParams, useNavigate, useLocation } from "react-router-dom"; // Import useHistory and useLocation
import { useDispatch, useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistSongsQuery } from "../redux/services/jioSaavan";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import ArtistDetailsHeader from "../components/ArtistDetailsHeader";

function ArtistDetails() {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { id: artistId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const queryParams = new URLSearchParams(location.search); 
  const page = parseInt(queryParams.get("page")) || 1;

  const {
    data: artistSongs,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistSongsQuery({ artistId, page });

  useEffect(() => {
    // Update URL query parameters when the page changes
    const newParams = new URLSearchParams(location.search);
    newParams.set("page", page);
   navigate({ search: newParams.toString() });
  }, [page, history, location.search]);

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

      <div className="flex justify-between  text-gray-500 mt-4 text-2xl font-semibold">

      <button className="mx-28 bg-black/80 text-white py-2 px-4 rounded-lg shadow-md hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-gray-400"  onClick={() =>navigate({ search: `?page=${page - 1}` })}>
          Previous Page
        </button>

     
        <button className="mx-28 bg-black/80 text-white py-2 px-4 rounded-lg shadow-md hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-gray-400"   onClick={() =>navigate({ search: `?page=${page + 1}` })}>
          Next Page
        </button>

        

        </div>
     
    </div>
  );
}

export default ArtistDetails;