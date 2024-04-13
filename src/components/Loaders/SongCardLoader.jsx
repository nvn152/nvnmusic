const SongCardLoader = ({ title }) => (
  <div className=" p-2 mb-5">
    <div className="md:h-48 h-30 object-cover animate-pulse ">
      <div className="h-full w-full bg-gray-200/30 rounded-xl" />
    </div>

    <div className="flex flex-col gap mt-4">
      <div className="w-48 h-[17px] ">
        <div className="h-full w-full bg-gray-200/30 " />
      </div>

      <div className="w-24 h-[17px]">
        <div className="h-full my-4 w-full bg-gray-200/30 " />
      </div>
    </div>
  </div>
);

export default SongCardLoader;
