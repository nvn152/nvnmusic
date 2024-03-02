import { useState } from "react";

import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    navigate(`/search/${searchTerm}`);
  }
  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="p-3 text-gray-400 lg:w-[500px] focus-within:text-gray-600"
    >
      <label htmlFor="search-field" className="sr-only">
        Search All Songs
      </label>
      <div className="flex ml-5 sm:ml-0 md:ml-0 flex-row justify-start items-center">
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search songs, albums and artists"
          type="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-black rounded-full border-none  outline-none placeholder-gray-500 text-base text-white p-3 "
        />
        <div className="w-5 hidden lg:block text-[#bfff00] cursor-pointer h-5 ml-4">
          <FiSearch onClick={handleSubmit} className="w-5 h-5" />
        </div>
      </div>
    </form>
  );
}

export default Searchbar;
