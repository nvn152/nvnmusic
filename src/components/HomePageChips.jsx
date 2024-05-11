function HomePageChips({ chart, playlistId }) {
  return (
    <div
      className={`md:text-[14px] truncate  text-sm font-semibold bg-white/10 hover:bg-white/20 cursor-pointer backdrop-blur-sm py-2 px-3 rounded-lg ${
        chart?.id === playlistId
          ? "bg-gradient-to-br from-green-400 to-yellow-300 text-gray-700"
          : "text-gray-200 "
      }`}
    >
      {chart?.title}
    </div>
  );
}

export default HomePageChips;
