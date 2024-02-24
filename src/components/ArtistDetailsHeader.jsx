import { Link } from "react-router-dom";
import { useGetArtistDetailsQuery } from "../redux/services/jioSaavan";

function ArtistDetailsHeader({ artistId, artistSongs }) {
  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error,
  } = useGetArtistDetailsQuery(artistId);

  function formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    } else {
      return num?.toString();
    }
  }

  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to to-black sm:h-48 h-28" />
      <div className="absolute inset-0 flex items-center">
        <img
          className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          alt="art"
          src={artistData?.data?.image[2]?.link}
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId ? artistData?.data?.name : artistSongs?.data[0]?.name}
          </p>

          {!artistId && (
            <Link to={`/artists/${artistSongs?.primaryArtistsId}`}>
              <p className="text-base text-gray-400 mt-2">
                {artistSongs?.data[0]?.primaryArtists}
              </p>
            </Link>
          )}
          <p className="text-base text-gray-400 mt-2">
            Followers Count : {formatNumber(artistData?.data?.followerCount)}
          </p>
        </div>
      </div>
      <div className="w-full sm:h-44 h-24" />
    </div>
  );
}

export default ArtistDetailsHeader;
