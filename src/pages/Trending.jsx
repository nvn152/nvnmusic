import { useSelector } from "react-redux";

import { Error, Loader } from "../components";
import { useGetTrendingSongsQuery } from "../redux/services/jioSaavan";
import TrendingCard from "../components/TrendingCard";

const Trending = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetTrendingSongsQuery();

  if (isFetching) return <Loader title="Loading Trending Songs..." />;

  if (error) return <Error />;

  console.log(data?.data?.albums);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-[#bfff00] text-left mt-4 md:mb-10 mb-2">
        Top Albums
        {/* <span className="font-black text-white">{searchTerm}</span> */}
      </h2>

      <div className="flex flex-wrap mb-28 justify-between md:gap-5 md:mx-auto mx-0 ">
        {data?.data?.albums
          .filter((song) => song.type === "song")
          .map((song, i) => (
            <TrendingCard
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

export default Trending;
