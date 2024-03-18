// import React from "react";
// import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
// import {
//   BsArrowRepeat,
//   BsFillPauseFill,
//   BsFillPlayFill,
//   BsShuffle,
// } from "react-icons/bs";

// function Controls({
//   isPlaying,
//   repeat,
//   setRepeat,
//   shuffle,
//   setShuffle,
//   currentSongs,
//   handlePlayPause,
//   handlePrevSong,
//   handleNextSong,
// }) {
//   return (
//     <div className="flex items-center justify-around md:w-36 lg:w-52 2xl:w-80">
//       <BsArrowRepeat
//         size={20}
//         color={repeat ? "red" : "white"}
//         onClick={() => setRepeat((prev) => !prev)}
//         className="hidden sm:block cursor-pointer"
//       />
//       {currentSongs?.length && (
//         <MdSkipPrevious
//           size={30}
//           color="#FFF"
//           className="cursor-pointer"
//           onClick={handlePrevSong}
//         />
//       )}
//       {isPlaying ? (
//         <BsFillPauseFill
//           size={45}
//           color="#FFF"
//           onClick={handlePlayPause}
//           className="cursor-pointer"
//         />
//       ) : (
//         <BsFillPlayFill
//           size={45}
//           color="#FFF"
//           onClick={handlePlayPause}
//           className="cursor-pointer"
//         />
//       )}
//       {currentSongs?.length && (
//         <MdSkipNext
//           size={30}
//           color="#FFF"
//           className="cursor-pointer"
//           onClick={handleNextSong}
//         />
//       )}
//       <BsShuffle
//         size={20}
//         color={shuffle ? "red" : "white"}
//         onClick={() => setShuffle((prev) => !prev)}
//         className="hidden sm:block cursor-pointer"
//       />
//     </div>
//   );
// }

// export default Controls;

import React from "react";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import {
  BsArrowRepeat,
  BsFillPauseFill,
  BsFillPlayFill,
  BsShuffle,
} from "react-icons/bs";

function Controls({
  isPlaying,
  repeat,
  setRepeat,
  shuffle,
  setShuffle,
  currentSongs,
  handlePlayPause,
  handlePrevSong,
  handleNextSong,
}) {
  return (
    <div className="flex md:mr-0 mr-2 items-center justify-around md:w-36 lg:w-52 2xl:w-80">
      <BsArrowRepeat
        size={20}
        color={repeat ? "#bfff00" : "white"}
        onClick={() => setRepeat((prev) => !prev)}
        className="hidden sm:block cursor-pointer"
      />

      <MdSkipPrevious
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handlePrevSong}
      />

      {isPlaying ? (
        <BsFillPauseFill
          md
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer "
        />
      ) : (
        <BsFillPlayFill
          size={45}
          color="#FFF"
          onClick={handlePlayPause}
          className="cursor-pointer"
        />
      )}

      <MdSkipNext
        size={30}
        color="#FFF"
        className="cursor-pointer"
        onClick={handleNextSong}
      />

      <BsShuffle
        size={20}
        color={shuffle ? "#bfff00" : "white"}
        onClick={() => setShuffle((prev) => !prev)}
        className="hidden sm:block cursor-pointer"
      />
    </div>
  );
}

export default Controls;
