import { useDispatch, useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import {
  useGetHomepageDataQuery,
  useGetTopChartsQuery,
} from "../redux/services/jioSaavan";
import { selectGenreListId } from "../redux/features/playerSlice";
import TopAlbumsBar from "../components/TopAlbumsBar";
import { discoverData } from "../utils/discoverData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

function Discover() {
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

  const data = discoverData;

  console.log(topChartsData);

  return (
    <div className="flex flex-col  ">
      <div className="w-fit flex  items-center sm:flex-row flex-col mt-3 mb-3  ">
        <h2 className="font-bold  mr-7 text-2xl text-[#bfff00] text-left">
          Discover
        </h2>

        {/* <Swiper slidesPerView="auto" spaceBetween={15}>
          {topChartsData?.data?.charts.map((data, i) => (
            <SwiperSlide
              className=" bg-white/10 text-gray-300 animate-slideright text-[14px]  rounded-3xl px-3 py-[10px] font-[600]"
              key={i}
              style={{ width: "auto", height: "10%" }}
            >
              <Link to={`/playlist/${data?.id}`}>{data?.title}</Link>
            </SwiperSlide>
          ))}
        </Swiper> */}
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center gap-5 mx-auto ">
        {data?.data.trending.songs.map((song, i) => (
          <SongCard
            key={song.id}
            song={song}
            i={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.data}
          />
        ))}
      </div>
      <h2 className="font-bold text-3xl text-[#bfff00] text-left mt-4 mb-10">
        Top Albums
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center md:gap-2 ">
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
