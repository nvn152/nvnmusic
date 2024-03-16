function HomePageChips({ chart }) {
  return (
    <div className="text-[14px] font-semibold text-gray-200 bg-white/10 hover:bg-white/20 cursor-pointer backdrop-blur-sm py-2 px-3 rounded-lg">
      {chart?.title}
    </div>
  );
}

export default HomePageChips;
