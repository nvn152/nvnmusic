import { RiCloseLine } from "react-icons/ri";
import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlineMenu,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";

import { logo } from "../assets";
import { links } from "../assets/constants";
import { useState } from "react";
import { NavLink } from "react-router-dom";

function NavLinks({ handleClick }) {
  return (
    <div className="mt-10 ">
      {links.map((item) => (
        <NavLink
          className="flex flex-row justify-start items-center my-8 text-xl font-semibold text-gray-400 hover:text-[#80ff00]"
          key={item.name}
          to={item.to}
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-7 h-7 mr-2" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}

function Sidebar() {
  const [mobileMeneOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#000000]">
        <div className="flex items-center">
          {/* <img src={logo} alt="logo" className="w-full h-10 object-contain" /> */}
          <h1 className="text-[#80ff00] font-black text-[30px] ml-1">
            NVN<span className="text-white">MUSIC</span>
          </h1>
        </div>
        <NavLinks />
      </div>
      {/* Mobile Menu */}
      <div className="absolute md:hidden block text-white top-6 right-3">
        {mobileMeneOpen ? (
          <RiCloseLine
            className="w-6 h-6 mr-2"
            onClick={() => setMobileMenuOpen(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 mr-2"
            onClick={() => setMobileMenuOpen(true)}
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#000000] backdrop-blur-lg z-10 p-6 md:hidden
      smooth-transition ${mobileMeneOpen ? "left-0" : "-left-full"} `}
      >
        <div className="flex items-center">
          {/* <img src={logo} alt="logo" className="w-full h-10 object-contain" /> */}
          <h1 className="text-[#80ff00] font-black text-[30px] ml-1">
            NVN<span className="text-white">MUSIC</span>
          </h1>
        </div>
        <NavLinks handleClick={() => setMobileMenuOpen(false)} />
      </div>
    </>
  );
}

export default Sidebar;
