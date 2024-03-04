import { useNavigate } from "react-router-dom";
import { useGetArtistDetailsQuery } from "../redux/services/jioSaavan";

function ArtistCard({ track }) {
  const navigate = useNavigate();
  const artistId = track?.primaryArtists[0]?.id;

  const { data, error, isLoading } = useGetArtistDetailsQuery(artistId);

  console.log(data);

  return (
    <div
      className="flex flex-col w-[250px] p-4  bg-opacity-80 backdrop-blur-sm  animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${artistId}`)}
    >
      <img
        alt="artist"
        src={data?.data?.image[2]?.link}
        className="w-full h-56 rounded-full"
      />
      <p className="mt-4 font-semibold text-lg flex justify-center text-white truncate">
        {track?.primaryArtists[0]?.name}
      </p>
    </div>
  );
}

export default ArtistCard;
