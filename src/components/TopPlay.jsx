import { Swiper, SwiperSlide } from "swiper/react";
// import { FreeMode } from "swiper";
import {
  useGetHomepageDataQuery,
  useGetSongRelatedQuery,
} from "../redux/services/jioSaavan";
import "swiper/css";
import "swiper/css/free-mode";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import BarLoader from "./Loaders/BarLoader";

function TopPlay() {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const songid = activeSong?.id;
  const allArtistId = activeSong?.primaryArtistsId;

  function extractFirstId() {
    const match = allArtistId && allArtistId.match(/\d+/);
    return match ? match[0] : null;
  }
  const artistId = extractFirstId();

  const {
    data: relatedData,
    isLoading: isRelatedLoading,
    error: relatedError,
  } = useGetSongRelatedQuery({ artistId, songid } || "");

  const { data, error, isLoading } = useGetHomepageDataQuery(["english"]);

  const divRef = useRef(null);
  const topPlays = data?.data?.trending.songs?.slice(0, 6);
  const relatedSongs = relatedData?.data.slice(0, 6);

  useEffect(function () {
    divRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  if (isLoading || isRelatedLoading) {
    return (
      <div className=" xl:ml-6 ml-0 xl:mb-0 mb-8 flex-1 xl:max-w-[500px] max-w-full flex flex-col">
        <Loader />
      </div>
    );
  }

  console.log(topPlays);

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-8 flex-1 xl:max-w-[500px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-[#bfff00] truncate w-[300px] font-bold text-lg">
            {relatedSongs?.length > 0
              ? `Related Songs`
              : "Songs you might like"}
          </h2>

          <Link
            to={
              relatedSongs?.length > 0
                ? `/songs/${activeSong?.id}`
                : `/top-charts`
            }
          >
            <p className="text-gray-300 text-sm cursor-pointer">See More</p>
          </Link>
        </div>

        <div className="mt-2 flex flex-col gap-1 ">
          {relatedSongs?.length > 0
            ? relatedSongs?.map((song, i) => (
                <TopChartCard
                  song={song}
                  i={i}
                  key={song.id}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                  data={data?.data}
                />
              ))
            : topPlays?.map((song, i) => (
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
      <div className="w-full flex flex-col mt-2">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-[#bfff00] font-bold text-lg">Top Artists</h2>

          <Link to="/top-artists">
            <p className="text-gray-300 text-sm cursor-pointer">See More</p>
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
          {topPlays
            ?.filter((song) => song?.primaryArtists[0]?.image !== false)
            .map((song, i) => (
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
    dispatch(setActiveSong({ song, data: data?.trending?.songs, i }));
    dispatch(playPause(true));
  }

  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#999]/[0.2] ${
        isPlaying && activeSong?.id === song?.id ? "bg-[#999]/[0.2]" : ""
      } py-2 p-4 rounded-lg cursor-pointer mb-2`}
      onClick={
        isPlaying && activeSong?.id === song.id
          ? handlePauseClick
          : handlePlayClick
      }
    >
      <h3 className="font-bold text-sm text-white mr-3">{i + 1}.</h3>
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-[72px] h-w-[72px] rounded-lg"
          src={song?.image[2]?.link}
          alt={song?.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3 ">
          <Link
            className="truncate w-fit"
            to={`/songs/${song.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-lg truncate w-48 font-medium text-white">
              {song?.name}
            </p>
          </Link>

          <Link
            className="truncate md:w-[220px] w-[100px] "
            to={`/artists/${
              song?.primaryArtists[0]?.id || song?.primaryArtistsId
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-base text-gray-300 mt-1">
              {song?.primaryArtists[0]?.name || song?.primaryArtists}
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
