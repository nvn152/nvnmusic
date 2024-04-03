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
import "swiper/css";
import { Link, useLocation } from "react-router-dom";
import HomePageChips from "../components/HomePageChips";
import { useState } from "react";
import HomePageLoader from "../components/Loaders/HomePageLoader";
import ScrollToTop from "../utils/ScrollToTop";

function Discover() {
  const [playlistId, setPlaylistId] = useState("");
  const { pathname } = useLocation();

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
  const topCharts = topChartsData?.data?.charts;
  const { data: playListData, isFetching: isLoadingPlayListData } =
    useGetPlaylistSongsQuery({ playlistId });
  const { data: mostStreamData } = useGetPlaylistSongsQuery({
    playlistId: 87510850,
  });

  const data = discoverData;

  // if (isLoadingPlayListData) {
  //   return (
  //     <div className="mt-20 flex flex-wrap sm:justify-start justify-center gap-5 mx-auto">
  //       {Array.from({ length: 30 }).map((_, i) => (
  //         <HomePageLoader key={i} />
  //       ))}
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col  pb-20">
      <div className="flex mx-auto gap-5 pt-3 overflow-x-hidden lg:w-[1100px] md:w-[600px] w-[400px]">
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
          slidesPerView={6}
          spaceBetween={20}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {topCharts?.map((chart, i) => (
            <SwiperSlide key={i}>
              <div onClick={() => setPlaylistId(chart?.id)}>
                <HomePageChips playlistId={playlistId} chart={chart} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-fit flex  items-center sm:flex-row flex-col mt-5 ">
        <h2 className="font-extrabold text-2xl mr-7 mx-3 md:text-4xl text-[#bfff00] text-left">
          Discover
        </h2>
      </div>
      <div className="overflow-x-hidden lg:w-[1200px] md:w-[600px] w-[400px]">
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          spaceBetween={40}
          slidesPerView={4}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {playlistId === ""
            ? data?.data.trending.songs.map((song, i) => (
                <SwiperSlide key={song.id}>
                  <SongCard
                    song={song}
                    i={i}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={data?.data?.trending?.songs}
                  />
                </SwiperSlide>
              ))
            : playListData?.data?.songs.map((song, i) => (
                <SwiperSlide key={song.id}>
                  <SongCard
                    song={song}
                    i={i}
                    isPlaying={isPlaying}
                    activeSong={activeSong}
                    data={playListData?.data?.songs}
                  />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>

      <h2 className="font-extrabold mt-5 text-2xl mr-7 mx-3 md:text-4xl text-[#bfff00] text-left">
        Most Streamed Love Songs
      </h2>

      <div className="overflow-x-hidden lg:w-[1200px] md:w-[600px] w-[400px]">
        <Swiper
          breakpoints={{
            320: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          spaceBetween={40}
          slidesPerView={4}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {mostStreamData?.data?.songs.map((song, i) => (
            <SwiperSlide key={song.id}>
              <SongCard
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={mostStreamData?.data?.songs}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <h2 className="font-bold text-2xl md:text-3xl text-[#bfff00] text-left mt-4 md:mb-10 mb-4">
        Top Albums
      </h2>
      <div className="flex pb-10  flex-wrap sm:justify-start justify-center md:gap-2 ">
        {albumData?.data?.trending?.albums.map((chart, i) => (
          <TopAlbumsBar
            isLoading={isLoading}
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
