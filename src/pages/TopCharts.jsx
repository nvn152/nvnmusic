import axios from "axios";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import {
  useGetHomepageDataQuery,
  useGetTopChartsQuery,
} from "../redux/services/jioSaavan";
import TopChartsBar from "../components/TopChartBar";

const TopCharts = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Top Charts..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-[#bfff00] text-left mt-4 mb-10">
        Discover Top Charts
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.data?.charts.map((chart, i) => (
          <TopChartsBar
            key={i}
            chart={chart}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.data?.charts[i]}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default TopCharts;
