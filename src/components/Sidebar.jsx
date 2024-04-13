import { links, personalLinks } from "../assets/constants";

import { NavLink } from "react-router-dom";

function NavLinks({ handleClick, link }) {
  return (
    <div className="mt-10 ">
      {link.map((item) => (
        <NavLink
          className="flex flex-row justify-start items-center my-3 text-lg font-[550] text-gray-400 hover:text-[#80ff00]"
          key={item.name}
          to={item.to}
          onClick={() => handleClick && handleClick()}
        >
          <item.icon className="w-7 h-7 mr-4" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}

function Sidebar() {
  return (
    <>
      <div className="md:flex hidden border-r border-gray-500 flex-col w-[210px] py-10 px-4 bg-[#000000]">
        <div className="flex items-center justify-center  rounded-lg ">
          <h1 className="text-[#80ff00] font-black text-[30px] ml-1">
            NVN<span className="text-white">MUSIC</span>
          </h1>
        </div>
        <div className="mx-auto">
          <div className="my-10 ">
            <NavLinks link={links} />
          </div>

          <hr className="border-[0.5px] border-gray-500  " />
          <NavLinks link={personalLinks} />
        </div>
      </div>
    </>
  );
}

export default Sidebar;
