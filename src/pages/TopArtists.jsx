import { ArtistCard, Loader, Error } from "../components";
import { useGetHomepageDataQuery } from "../redux/services/jioSaavan";

const TopArtists = () => {
  const { data, isFetching, error } = useGetHomepageDataQuery(["english"]);

  if (isFetching) return <Loader title="Loading Top Artists..." />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-[#bfff00] text-left mt-4 mb-10">
        Top Artists
      </h2>

      <div className="grid grid-cols-3 md:grid-cols-5 md:gap-2 ">
        {data?.data.trending.songs?.map((track, i) => (
          <ArtistCard key={track.id} track={track} />
        ))}
      </div>
    </div>
  );
};

export default TopArtists;
