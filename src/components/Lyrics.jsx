import React from "react";
import { useSelector } from "react-redux";
import { useSongLyricsQuery } from "../redux/services/saavanApi";

const Lyrics = () => {
  const { activeSong } = useSelector((state) => state.player);

  const songid = activeSong?.id;

  const { data: lyricsData, error: lyricsError } = useSongLyricsQuery({
    songid,
  });

  if (lyricsError) {
    return <div className="text-gray-400 text-base my-1">No Lyrics found</div>;
  }

  return (
    <div className="p-4 max-w-2xl mx-auto h-[calc(100vh-165px)] overflow-auto">
      <div
        className="whitespace-pre-line leading-relaxed text-white text-lg"
        dangerouslySetInnerHTML={{ __html: lyricsData?.data?.lyrics }}
      ></div>
    </div>
  );
};

export default Lyrics;
