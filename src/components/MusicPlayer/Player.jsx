// import React, { useRef, useEffect } from "react";
// import { useState } from "react";
// import { useGetSongByTrackIdQuery } from "../../redux/services/jioSaavan";
// import { useSelector } from "react-redux";

// const Player = ({
//   isPlaying,
//   volume,
//   seekTime,
//   onEnded,
//   onTimeUpdate,
//   onLoadedData,
//   repeat,
// }) => {
//   const { activeSong } = useSelector((state) => state.player);
//   const trackId = activeSong.id;

//   const [audioSrc, setAudioSrc] = useState("");

//   const { data } = useGetSongByTrackIdQuery({ trackId });

//   useEffect(() => {
//     if (data) {
//       setAudioSrc(data?.data[0]?.downloadUrl[4]?.link);
//     }
//   }, [data]);

//   const ref = useRef(null);
//   if (ref.current) {
//     if (isPlaying) {
//       ref.current.play();
//     } else {
//       ref.current.pause();
//     }
//   }

//   useEffect(() => {
//     ref.current.volume = volume;
//   }, [volume]);
//   useEffect(() => {
//     ref.current.currentTime = seekTime;
//   }, [seekTime]);

//   return (
//     <audio
//       src={audioSrc}
//       ref={ref}
//       loop={repeat}
//       onEnded={onEnded}
//       onTimeUpdate={onTimeUpdate}
//       onLoadedData={onLoadedData}
//     />
//   );
// };

// export default Player;

import React, { useRef, useEffect, useState } from "react";
import { useGetSongByTrackIdQuery } from "../../redux/services/jioSaavan";
import { useSelector } from "react-redux";

const Player = ({
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}) => {
  const { activeSong } = useSelector((state) => state.player);
  const trackId = activeSong.id;

  const [audioSrc, setAudioSrc] = useState("");

  const { data } = useGetSongByTrackIdQuery({ trackId });

  useEffect(() => {
    setAudioSrc("");
  }, [activeSong]);

  useEffect(() => {
    if (data) {
      setAudioSrc(data?.data[0]?.downloadUrl[4]?.link);
    }
  }, [data]);

  const ref = useRef(null);
  if (ref?.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    if (ref.current) {
      ref.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (ref.current) {
      ref.current.currentTime = seekTime;
    }
  }, [seekTime]);

  return (
    <audio
      src={audioSrc}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
