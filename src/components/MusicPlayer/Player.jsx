import React, { useRef, useEffect } from "react";
import { useState } from "react";

const Player = ({
  activeSong,
  isPlaying,
  volume,
  seekTime,
  onEnded,
  onTimeUpdate,
  onLoadedData,
  repeat,
}) => {
  const trackId = activeSong.id;

  const [audioSrc, setAudioSrc] = useState("");

  useEffect(() => {
    const apiEndpoint = `https://saavn.dev/songs?id=${trackId}`;
    fetch(apiEndpoint)
      .then((response) => response.json())
      .then((data) => {
        const audioUrl = data.data[0].downloadUrl[4].link;
        setAudioSrc(audioUrl);
      })
      .catch((error) => {
        console.error("Error fetching audio URL:", error);
      });
  }, [trackId]);

  const ref = useRef(null);
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  useEffect(() => {
    ref.current.currentTime = seekTime;
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
