import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";

import { Pagination, Navigation, Keyboard } from "swiper/modules";
import SongCard from "./SongCard";
import { useSelector } from "react-redux";

function PlaylistSlider(playListData) {
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  return (
    <div className="mx-auto">
      <h2 className="font-extrabold text-2xl  text-center md:text-4xl text-[#bfff00] mt-4 md:mb-10 mb-4">
        {playListData?.playListData?.data?.name}
      </h2>
      <div className="overflow-x-hidden flex justify-center lg:w-[1200px] md:w-[600px] w-[400px]">
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          breakpoints={{
            320: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 4,
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
          keyboard={{
            enabled: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Keyboard, Pagination, Navigation]}
          className="mySwiper"
        >
          {playListData?.playListData?.data?.songs.map((song, i) => (
            <SwiperSlide key={song.id}>
              <SongCard
                song={song}
                i={i}
                isPlaying={isPlaying}
                activeSong={activeSong}
                data={playListData?.playListData?.data?.songs}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default PlaylistSlider;
