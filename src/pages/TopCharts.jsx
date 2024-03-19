import axios from "axios";
import { useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import {
  useGetTopChartsQuery,
  useGetTopPlayListsQuery,
} from "../redux/services/jioSaavan";
import TopChartsBar from "../components/TopChartBar";
import TopPlayListBar from "../components/TopPlayListBar";

const TopCharts = () => {
  const { data, isFetching, error } = useGetTopChartsQuery();
  const {
    data: playListData,
    isFetching: isFetchingPlaylist,
    error: playListError,
  } = useGetTopPlayListsQuery();

  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Top Charts..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col md:flex-row gap-2 justify-between">
      <div className="w-fit overflow-hidden">
        <h2 className="font-bold text-2xl text-[#bfff00] text-left mt-4 mb-6">
          Top Playlists
        </h2>
        <div className="flex flex-wrap sm:justify-start justify-center gap-4">
          {playListData?.data?.playlists.map((playlist, i) => (
            <TopPlayListBar
              key={i}
              playlist={playlist}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={playListData?.data?.playlists[i]}
              i={i}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col overflow-hidden w-fit">
        <h2 className="font-bold text-2xl text-[#bfff00] text-left mt-4 mb-6">
          Top Charts
        </h2>

        <div className="flex flex-wrap sm:justify-start justify-center gap-4">
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
    </div>
  );
};

export default TopCharts;
