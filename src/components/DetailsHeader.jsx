import { Link } from "react-router-dom";

function DetailsHeader({ artistId, artistData, songData }) {
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
          src={songData?.data[0]?.image[2]?.link}
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {artistId
              ? artistData?.attributes?.genreNames[0]
              : songData?.data[0]?.name}
          </p>

          {!artistId && (
            <Link to={`/artists/${songData?.primaryArtistsId}`}>
              <p className="text-base text-gray-400 mt-2">
                {songData?.data[0]?.primaryArtists}
              </p>
            </Link>
          )}
          <p className="text-base text-gray-400 mt-2">
            Released on {songData?.data[0]?.releaseDate}
          </p>
        </div>
        <div className="mx-5 font-bold sm:text-xl text-xl text-white">
          Total plays : {formatNumber(songData?.data[0]?.playCount)}
        </div>
      </div>

      <div className="w-full sm:h-44 h-24 " />
    </div>
  );
}

export default DetailsHeader;
