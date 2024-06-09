import { NavLink, Outlet, useLocation } from "react-router-dom";

import { MusicPlayer, Searchbar, Sidebar, TopPlay } from "../components";
import NavigationButtons from "../components/NavigationButtons";
import { useSelector } from "react-redux";
import { links } from "../assets/constants";
import Tabs from "../components/Tabs";

function RootLayout() {
  const { activeSong } = useSelector((state) => state.player);
  const { pathname } = useLocation();

  return (
    <div className="relative flex bg-[#030303]">
      <Sidebar />

      <div className="w-screen flex flex-col overflow-x-hidden  ">
        <div
          className="flex items-center   bg-gradient-to-br
  from-emerald-900/40 to-black gap-5"
        >
          <NavigationButtons />
          <Searchbar />
        </div>

        <div className="md:px-4 px-2 h-[calc(100vh-60px)] overflow-y-scroll hide-scrollbar flex xl:flex-row md:flex-col-reverse">
          <div className="flex-1 h-fit">
            <Outlet />
          </div>
        </div>
      </div>
      <div className="xl:sticky xl:w-full p-2 md:px-4 overflow-y-scroll relative top-0 hidden md:flex max-w-md md:flex-col h-fit">
        <Tabs />
        {/* <TopPlay /> */}
      </div>
      {/* Mobile Footer */}

      <section className="fixed bottom-0 py-4 z-10 w-full lg:hidden bg-glassmorphism p-4 backdrop-blur-lg xs:px-7">
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
        <div
          className={`md:mb-0 mb-[52px] h-16 fixed md:h-24 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-black backdrop-blur-lg rounded-t-none md:rounded-t-3xl z-10 ${
            pathname === "/activesong" && "hidden"
          } `}
        >
          <MusicPlayer />
        </div>
      )}
    </div>
  );
}

export default RootLayout;
