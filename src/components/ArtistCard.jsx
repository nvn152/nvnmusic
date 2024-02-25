import { useNavigate } from "react-router-dom";

function ArtistCard({ track }) {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-[250px] p-4  bg-opacity-80 backdrop-blur-sm  animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${track?.primaryArtists[0]?.id}`)}
    >
      <img
        alt="artist"
        src={track?.image[2].link}
        className="w-full h-56 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lg flex justify-center text-white truncate">
        {track?.primaryArtists[0]?.name}
      </p>
    </div>
  );
}

export default ArtistCard;
