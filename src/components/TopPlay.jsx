import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode } from "swiper";
import { useGetHomepageDataQuery } from "../redux/services/jioSaavan";
import "swiper/css";
import "swiper/css/free-mode";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function TopPlay() {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, error, isLoading } = useGetHomepageDataQuery(["english"]);
  const divRef = useRef(null);
  const topPlays = data?.data.trending.songs?.slice(0, 5);

  useEffect(function () {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-[#bfff00] font-bold text-xl">Top Songs</h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>
        <div className="mt-4 flex flex-col gap-1 ">
          {topPlays?.map((song, i) => (
            <TopChartCard
              song={song}
              i={i}
              key={song.id}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={data?.data}
            />
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col mt-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-[#bfff00] font-bold text-xl">Top Artists</h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          className="mt-4"
        >
          {topPlays?.map((song, i) => (
            <SwiperSlide
              key={song?.id}
              style={{ width: "25%", height: "auto" }}
              className="shadow-lg rounded-full animate-slideright"
            >
              <Link to={`/artists/${song?.primaryArtists[0].id}`}>
                <img
                  src={song?.primaryArtists[0]?.image[2]?.link}
                  alt="name"
                  className="rounded-full w-full object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TopPlay;

// Song Card 2

function TopChartCard({ song, i, isPlaying, activeSong, data }) {
  const dispatch = useDispatch();

  function handlePauseClick() {
    dispatch(playPause(false));
  }

  function handlePlayClick() {
    dispatch(setActiveSong({ song, data: data.trending.songs, i }));
    dispatch(playPause(true));
  }

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#999]/[0.2] ${
        isPlaying && activeSong.name === song.name ? "bg-[#999]/[0.2]" : ""
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
      onClick={
        isPlaying && activeSong?.name === song.name
          ? handlePauseClick
          : handlePlayClick
      }
    >
      <h3 className="font-bold text-base text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.image[2]?.link}
          alt={song?.name}
        />
        <div
          className="flex-1 flex flex-col justify-center mx-3 "
          
        >
          <Link className="truncate w-fit" to={`/songs/${song.id}`} onClick={(e) => e.stopPropagation()}>
            <p className="text-xl  font-bold text-white">{song?.name}</p>
          </Link>

          <Link className="truncate w-fit " to={`/artists/${song?.primaryArtists[0].id}`} onClick={(e) => e.stopPropagation()}>
            <p className="text-base text-gray-300 mt-1">
              {song?.primaryArtists[0]?.name}
            </p>
          </Link>
        </div>
      </div>
      <PlayPause
        song={song}
        handlePause={handlePauseClick}
        handlePlay={handlePlayClick}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
}
