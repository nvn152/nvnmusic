import { useSelector } from "react-redux";

import { SongCard } from "../components";

import {
  useGetHomepageDataQuery,
  useGetPlaylistSongsQuery,
  useGetTopChartsQuery,
} from "../redux/services/jioSaavan";

import TopAlbumsBar from "../components/TopAlbumsBar";
import { discoverData } from "../utils/discoverData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import HomePageChips from "../components/HomePageChips";
import { useState } from "react";
import SongCardLoader from "../components/Loaders/SongCardLoader";

function Discover() {
  const [playlistId, setPlaylistId] = useState("");

  const { activeSong, isPlaying } = useSelector((state) => state.player);

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

  return (
    <div className="flex flex-col  pb-20">
      <div
        className={`flex mx-auto gap-5 pt-3  overflow-x-hidden lg:w-[1100px] md:w-[600px] w-[400px]
          
          }`}
      >
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

      {isLoadingPlayListData ? (
        <div className="overflow-x-hidden flex gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <SongCardLoader key={i} />
          ))}
        </div>
      ) : (
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
      )}

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
