import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function Searchbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
  };

  const handleInputChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    try {
      const response = await fetch(`/autocomplete?client=firefox&q=${term}`);
      const data = await response.json();
      setSuggestions(data[1]);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="p-2 text-gray-400 lg:w-[1000px] focus-within:text-gray-600"
    >
      <label htmlFor="search-field" className="sr-only">
        Search All Songs
      </label>
      <div className="flex ml-5 sm:ml-0 md:ml-0 flex-row justify-start gap-3 items-center">
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="Search"
          value={searchTerm}
          onChange={handleInputChange}
          className="flex-1 bg-black rounded-3xl border-none  outline-none placeholder-gray-500 text-base text-white p-4 "
        />
        <div className="w-5 hidden lg:block text-[#bfff00] cursor-pointer h-5 ml-4">
          <FiSearch onClick={handleSubmit} className="w-5 h-5" />
        </div>
      </div>
      {/* Display suggestions */}
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion}</li>
        ))}
      </ul>
    </form>
  );
}

export default Searchbar;
