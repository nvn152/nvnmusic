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
          className="flex flex-row justify-start items-center my-6 text-lg font-semibold text-gray-400 hover:text-[#80ff00]"
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
      <div className="md:flex hidden flex-col w-[210px] py-10 px-4 bg-[#000000]">
        <div className="flex items-center justify-center  rounded-lg ">
          {/* <img src={logo} alt="logo" className="w-full h-10 object-contain" /> */}
          <h1 className="text-[#80ff00] font-black text-[30px] ml-1">
            NVN<span className="text-white">MUSIC</span>
          </h1>
        </div>
        <NavLinks />
      </div>
      {/* Mobile Menu */}
    </>
  );
}

export default Sidebar;
