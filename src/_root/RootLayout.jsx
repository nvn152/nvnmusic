import { Outlet } from "react-router-dom";

import { MusicPlayer, Searchbar, Sidebar, TopPlay } from "../components";
import NavigationButtons from "../components/NavigationButtons";
import { useSelector } from "react-redux";

function RootLayout() {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex ">
      <Sidebar />

      <div className="flex-1 flex flex-col custom-gradient">
        <div className="flex items-center mx-5 gap-5">
          <NavigationButtons />
          <Searchbar />
        </div>

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Outlet />
          </div>

          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>
      {activeSong?.name && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-black backdrop-blur-lg rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}

export default RootLayout;
