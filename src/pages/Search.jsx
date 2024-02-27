import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Error, Loader, SearchCard } from "../components";
import { useGetSongsBySearchQuery } from "../redux/services/jioSaavan";

const Search = () => {
  const { searchTerm } = useParams();

  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  if (isFetching) return <Loader title="Loading Search Results..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-[#bfff00] text-left mt-4 mb-10">
        Search results for{" "}
        <span className="font-black text-white">{searchTerm}</span>
      </h2>

      <div className="flex flex-wrap sm:justify-start justify-center md:gap-8">
        {data.data.results.map((song, i) => (
          <SearchCard
            key={song.id}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={data}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
