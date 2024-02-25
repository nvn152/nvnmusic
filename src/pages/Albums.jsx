import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import {
  useGetHomepageDataQuery,
  useGetTopChartsQuery,
  useGetTrendingAblumsQuery,
} from "../redux/services/jioSaavan";
import TopChartsBar from "../components/TopChartBar";
import TopAlbumsBar from "../components/TopAlbumsBar";

const Albums = () => {
  const { data, isFetching, error } = useGetTrendingAblumsQuery();

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Top Charts..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-[#bfff00] text-left mt-4 mb-10">
        Discover Top Albums
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.data?.trending?.albums.map((chart, i) => (
          <TopAlbumsBar
            key={i}
            chart={chart}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.data?.trending?.albums[i]}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Albums;
