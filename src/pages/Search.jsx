import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { ArtistCard, Error, Loader, SearchCard } from "../components";
import {
  useGetAlbumsBySearchQuery,
  useGetSongsBySearchQuery,
} from "../redux/services/jioSaavan";
import TopAlbumsBar from "../components/TopAlbumsBar";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import SongCardLoader from "../components/Loaders/SongCardLoader";

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [showCount, setShowCount] = useState(10);
  const [showAlbumsCount, setShowAlbumsCount] = useState(4);
  const [showArtistsCount, setShowArtistsCount] = useState(10);

  //Search Data
  const { data, isFetching, error } = useGetSongsBySearchQuery({ searchTerm });
  const {
    data: albumData,
    isFetching: albumIsFetching,
    error: albumError,
  } = useGetAlbumsBySearchQuery({ searchTerm });
  const {
    data: artistsData,
    isFetching: artistsIsFetching,
    error: artistsError,
  } = useGetAlbumsBySearchQuery({ searchTerm });

  const totalResults = data?.data?.results?.length;

  const handleShowMore = (buttonType) => {
    if (buttonType === "moreSongs") {
      setShowCount((prevCount) => Math.min(prevCount + 10, totalResults));
    }
    if (buttonType === "moreAlbums") {
      setShowAlbumsCount((prevCount) => Math.min(prevCount + 4, totalResults));
    }
  };

  useEffect(() => {
    // Reset showCount to 8 whenever new search data is received
    setShowCount(10);
  }, [data]);

  if (isFetching) return <Loader title="Loading Search Results..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-[#bfff00] text-left mt-4 md:mb-10 mb-4">
        Search results for{" "}
        <span className="font-black text-white">{searchTerm}</span>
      </h2>

      <h2 className="font-bold text-3xl text-[#bfff00] text-left ml-4">
        Songs
      </h2>

      {isFetching ? (
        <SongCardLoader title="Songs" />
      ) : (
        <div className="flex flex-wrap  justify-between md:gap-5 md:mx-auto mx-0 ">
          {data.data.results.slice(0, showCount).map((song, i) => (
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
      )}

      {showCount < totalResults && (
        <div className="flex items-center justify-center my-5">
          <hr className="border-1 hidden md:block border-[#bfff00] w-44 ml-40" />
          <button
            onClick={() => handleShowMore("moreSongs")}
            className="flex justify-between border-[#bfff00] border-2 w-44 hover:bg-black/50 text-white font-normal  px-2 rounded-3xl bg-transparent "
          >
            <span className="mx-4"> Show More</span>

            <IoIosArrowDown className="text-2xl mx-2" />
          </button>

          <hr className="border-1 hidden md:block border-[#bfff00] w-44 mr-40 " />
        </div>
      )}

      <h2 className="font-bold text-3xl text-[#bfff00] text-left ml-4 my-4">
        Albums
      </h2>

      <div className="flex pb-10  flex-wrap sm:justify-start justify-center md:gap-2">
        {albumData?.data.results.slice(0, showAlbumsCount).map((album, i) => (
          <TopAlbumsBar
            key={i}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={album}
            i={i}
          />
        ))}
      </div>
      {showAlbumsCount < albumData?.data?.results?.length && (
        <div className="flex items-center justify-center my-10">
          <hr className="border-1 hidden md:block border-[#bfff00] w-44 ml-40" />
          <button
            onClick={() => handleShowMore("moreAlbums")}
            className="flex justify-between border-[#bfff00] border-2 w-44 hover:bg-black/50 text-white font-normal  px-2 rounded-3xl bg-transparent "
          >
            <span className="mx-4"> Show More</span>

            <IoIosArrowDown className="text-2xl mx-2" />
          </button>
          <hr className="border-1 hidden md:block border-[#bfff00] w-44 mr-40 " />
        </div>
      )}
      <h2 className="font-bold text-3xl text-[#bfff00] text-left ml-4 my-4">
        Artists
      </h2>

      <div className="flex pb-20 mb-20 md:pb-10 flex-wrap sm:justify-start justify-center gap-2">
        {artistsData?.data?.results
          .slice(0, showArtistsCount)
          .map((artist, i) => (
            <ArtistCard key={artist.id} track={artist} />
          ))}
      </div>
    </div>
  );
};

export default Search;
