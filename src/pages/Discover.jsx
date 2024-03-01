import { useDispatch, useSelector } from "react-redux";

import { Error, Loader, SongCard } from "../components";
import { genres } from "../assets/constants";
import { useGetHomepageDataQuery } from "../redux/services/jioSaavan";
import { selectGenreListId } from "../redux/features/playerSlice";
import TopAlbumsBar from "../components/TopAlbumsBar";

function Discover() {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const { data, error, isLoading } = useGetHomepageDataQuery(["english"]);

  if (isLoading) return <Loader title="Loading songs..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10  ">
        <h2 className="font-bold text-3xl text-[#bfff00] text-left">
          Discover songs
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "pop"}
          className="bg-black text-[#bfff00] p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5 "
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-wrap sm:justify-start justify-center md:gap-2 ">
        {data?.data.trending.songs?.map((song, i) => (
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
        {data?.data?.trending?.albums.map((chart, i) => (
          <TopAlbumsBar
            key={i}
            chart={chart}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data?.data?.trending?.albums[i]}
            i={i}
          />
        ))}
      </div>
    </div>
  );
}

export default Discover;
