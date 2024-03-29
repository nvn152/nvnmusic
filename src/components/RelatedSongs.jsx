import SongBar from "./SongBar";

function RelatedSongs({
  data,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
  artistId,
}) {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-3xl text-[#bfff00]">
        Songs you might like:
      </h1>
      <div className="mt-6 w-full flex flex-col ">
        {data?.map((song, i) => (
          <SongBar
            key={`${song.id}-${artistId}`}
            song={song}
            i={i}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
            data={data}
          />
        ))}
      </div>
    </div>
  );
}

export default RelatedSongs;
