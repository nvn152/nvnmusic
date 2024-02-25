import { useSelector } from "react-redux";

import { Error, Loader } from "../components";
import { useGetTrendingSongsQuery } from "../redux/services/jioSaavan";
import AlbumCard from "../components/AlbumCard";

const Album = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTrendingSongsQuery();

  if (isFetching) return <Loader title="Loading Search Results..." />;

  if (error) return <Error />;

  console.log(data?.data?.albums);
  console.log(`songs : ${data?.data?.songs}`);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-[#bfff00] text-left mt-4 mb-10">
        Top Albums
        {/* <span className="font-black text-white">{searchTerm}</span> */}
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.data?.albums.map((song, i) => (
          <AlbumCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Album;
