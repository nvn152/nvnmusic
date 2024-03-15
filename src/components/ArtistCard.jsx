import { useNavigate } from "react-router-dom";
import { useGetArtistDetailsQuery } from "../redux/services/jioSaavan";

function ArtistCard({ track }) {
  const navigate = useNavigate();
  const artistId = track?.primaryArtists[0]?.id;

  const { data, error, isLoading } = useGetArtistDetailsQuery(artistId);

  return (
    <div
      className="flex flex-col w-[220px]   bg-opacity-80 backdrop-blur-sm  animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${artistId}`)}
    >
      <img
        alt="artist"
        src={data?.data?.image[2]?.link}
        className="w-44 h-44 mx-auto rounded-full"
      />
      <p className="mt-4 text-center  font-semibold text-lg  text-white truncate">
        {track?.primaryArtists[0]?.name}
      </p>
    </div>
  );
}

export default ArtistCard;
