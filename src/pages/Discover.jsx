import { useDispatch, useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import {
  useGetHomepageDataQuery,
  useGetPlaylistSongsQuery,
  useGetTopChartsQuery,
} from "../redux/services/jioSaavan";
import { selectGenreListId } from "../redux/features/playerSlice";
import TopAlbumsBar from "../components/TopAlbumsBar";
import { discoverData } from "../utils/discoverData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import HomePageChips from "../components/HomePageChips";
import { useState } from "react";

function Discover() {
  const [playlistId, setPlaylistId] = useState("");

  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const {
    data: albumData,
    error,
    isLoading,
  } = useGetHomepageDataQuery(["english"]);
  const { data: topChartsData } = useGetTopChartsQuery();
  const topCharts = topChartsData?.data?.charts.slice(0, 7);
  const { data: playListData } = useGetPlaylistSongsQuery({ playlistId });

  const data = discoverData;

  console.log(playListData);

  return (
    <div className="flex flex-col  pb-20">
      <div className="flex gap-5 pt-3">
        {topCharts?.map((chart, i) => (
          <div key={i} onClick={() => setPlaylistId(chart?.id)}>
            <HomePageChips ke chart={chart} />
          </div>
        ))}
      </div>
      <div className="w-fit flex  items-center sm:flex-row flex-col mt-3 mb-3  ">
        <h2 className="font-extrabold  mr-7 mx-3 text-4xl text-[#bfff00] text-left">
          Discover
        </h2>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-5 mx-auto ">
        {playlistId === ""
          ? data?.data.trending.songs.map((song, i) => (
              <SongCard
                key={song.id}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={data?.data?.trending?.songs}
              />
            ))
          : playListData?.data?.songs.map((song, i) => (
              <SongCard
                key={song.id}
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={playListData?.data?.songs}
              />
            ))}
      </div>
      <h2 className="font-bold text-3xl text-[#bfff00] text-left mt-4 mb-10">
        Top Albums
      </h2>
      <div className="flex pb-10 flex-wrap sm:justify-start justify-center md:gap-2 ">
        {albumData?.data?.trending?.albums.map((chart, i) => (
          <TopAlbumsBar
            key={i}
            chart={chart}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={albumData?.data?.trending?.albums[i]}
            i={i}
          />
        ))}
      </div>
    </div>
  );
}

export default Discover;
