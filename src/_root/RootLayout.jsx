import { NavLink, Outlet } from "react-router-dom";

import { MusicPlayer, Searchbar, Sidebar, TopPlay } from "../components";
import NavigationButtons from "../components/NavigationButtons";
import { useSelector } from "react-redux";
import { links } from "../assets/constants";

function RootLayout() {
  const { activeSong } = useSelector((state) => state.player);

  return (
    <div className="relative flex">
      <Sidebar />

      <div className="flex-1 flex flex-col  custom-gradient">
        <div className="flex items-center gap-5">
          <NavigationButtons />
          <Searchbar />
        </div>

        <div className="md:px-6 px-2 h-[calc(100vh-60px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit  ">
            <Outlet />
          </div>

          <div className="xl:sticky relative top-0 hidden md:flex max-w-md  h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {/* Mobile Footer */}

      <section className="fixed bottom-0 py-4 z-10 w-full md:hidden bg-glassmorphism p-4 backdrop-blur-lg xs:px-7 md:hidden;">
        <div className="flex items-center justify-between gap-3 xs:gap-5">
          {links.map((link) => {
            return (
              <NavLink
                to={link.to}
                key={link.label}
                className="flex flex-row justify-start items-center  text-lg font-semibold text-gray-400 hover:text-[#80ff00]"
              >
                <link.icon className="w-6 h-6" />
                {/* <p className="max-sm:hidden text-subtle-medium text-light-1 ">
                  {link.name}
                </p> */}
              </NavLink>
            );
          })}
        </div>
      </section>

      {activeSong?.name && (
        <div className="absolute md:mb-0 mb-[52px] h-16 md:h-24 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-black backdrop-blur-lg rounded-t-none md:rounded-t-3xl z-10">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}

export default RootLayout;

//
// className={` relative flex flex-col items-center gap-2 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 bg-primary-500`}
