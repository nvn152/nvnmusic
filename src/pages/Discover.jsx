import { useSelector } from "react-redux";

import { SongCard } from "../components";

import {
  useGetHomepageDataQuery,
  useGetPlaylistSongsQuery,
  useGetTopChartsQuery,
  useGetTopPlayListsQuery,
} from "../redux/services/jioSaavan";

import TopAlbumsBar from "../components/TopAlbumsBar";
import { discoverData } from "../utils/discoverData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";

import { Scrollbar, Mousewheel, Pagination } from "swiper/modules";

import HomePageChips from "../components/HomePageChips";
import { useState } from "react";
import SongCardLoader from "../components/Loaders/SongCardLoader";
import usePlaylistSongs from "../assets/playlistSongs";
import PlaylistSlider from "../components/PlaylistSlider";
import { useGlobalSearchQuery } from "../redux/services/saavanApi";

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
  const { data: chartData, isFetching: isLoadingPlayListData } =
    useGetPlaylistSongsQuery({ playlistId });

  //Playlist Songs list
  const { playlistSongs0 } = usePlaylistSongs(0);
  const { playlistSongs1 } = usePlaylistSongs(1);
  const { playlistSongs2 } = usePlaylistSongs(2);
  const { playlistSongs3 } = usePlaylistSongs(3);
  const { playlistSongs4 } = usePlaylistSongs(4);
  const { playlistSongs5 } = usePlaylistSongs(5);

  const data = discoverData;

  // TEst

  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - offset);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX;
    const newOffset = x - startX;
    setOffset(newOffset);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    const newIndex = Math.min(
      Math.max(0, Math.round(-offset / 100)),
      data?.data.trending.songs.length - 5
    );
    setCurrentIndex(newIndex);
    setOffset(-newIndex * 100);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <div className="flex flex-col relative overflow-hidden mb-4 pb-20">
      <div
        className={`flex mx-auto gap-5 pt-3  overflow-x-hidden lg:w-[1190px] md:w-[600px] w-[400px]  
          
          }`}
      >
        <Swiper
          mousewheel={{ enabled: true, sensitivity: 1 }}
          pagination={{ clickable: true }}
          modules={[Mousewheel, Pagination]}
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

      <div className="w-fit flex   items-center sm:flex-row flex-col mt-5 ">
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
        <div className="overflow-x-hidden lg:w-[1200px] md:w-[1210px] w-[400px]">
          <Swiper
            modules={[Scrollbar, Mousewheel, Pagination]}
            breakpoints={{
              320: {
                slidesPerView: 4,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 10,
              },
            }}
            spaceBetween={40}
            slidesPerView={4}
            className="mySwiper"
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
              : chartData?.data?.songs.map((song, i) => (
                  <SwiperSlide key={song.id}>
                    <SongCard
                      song={song}
                      i={i}
                      isPlaying={isPlaying}
                      activeSong={activeSong}
                      data={chartData?.data?.songs}
                    />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      )}

      <PlaylistSlider playListData={playlistSongs4} />

      <h2 className="font-bold text-2xl md:text-3xl text-[#bfff00] text-left mt-4 md:mb-10 mb-4">
        Top Albums
      </h2>
      <div className="flex pb-10  flex-wrap sm:justify-start justify-center md:gap-2 ">
        {albumData?.data?.trending?.albums.slice(0, 5).map((chart, i) => (
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

      {/* New Playlists  */}

      <PlaylistSlider playListData={playlistSongs0} />

      <PlaylistSlider playListData={playlistSongs1} />

      <PlaylistSlider playListData={playlistSongs2} />

      <PlaylistSlider playListData={playlistSongs3} />

      <PlaylistSlider playListData={playlistSongs5} />
    </div>
  );
}

export default Discover;
