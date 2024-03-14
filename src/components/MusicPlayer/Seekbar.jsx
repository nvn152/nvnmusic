import React from "react";
import { GrForwardTen } from "react-icons/gr";

import { GrBackTen } from "react-icons/gr";

const Seekbar = ({ value, min, max, onInput, setSeekTime, appTime }) => {
  // converts the time to format 0:00
  const getTime = (time) =>
    `${Math.floor(time / 60)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;

  return (
    <div className="hidden sm:flex flex-row w-full items-center">
      <button
        type="button"
        onClick={() => setSeekTime(appTime - 10)}
        className="hidden lg:mr-4 lg:block text-white"
      >
        <GrBackTen size={25} />
      </button>
      <p className="text-white">{value === 0 ? "0:00" : getTime(value)}</p>
      <input
        type="range"
        step="any"
        value={value}
        min={min}
        max={max}
        onInput={onInput}
        className="flex-1 h-1 mx-4 2xl:mx-6 rounded-lg"
      />
      <p className="text-white">{max === 0 ? "0:00" : getTime(max)}</p>
      <button
        type="button"
        onClick={() => setSeekTime(appTime + 10)}
        className="hidden lg:ml-4 lg:block text-white"
      >
        <GrForwardTen size={25} />
      </button>
    </div>
  );
};

export default Seekbar;
