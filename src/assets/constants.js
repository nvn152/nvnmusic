import {
  HiOutlineHashtag,
  HiOutlineHome,
  HiOutlinePhotograph,
  HiOutlineUserGroup,
} from "react-icons/hi";

//my icons

import { IoLocationOutline } from "react-icons/io5";
import { IoMdTrendingUp } from "react-icons/io";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { FaChartSimple } from "react-icons/fa6";
import { IoMdAlbums } from "react-icons/io";
import { HiMiniQueueList } from "react-icons/hi2";

export const genres = [
  { title: "Pop", value: "POP" },
  { title: "Hip-Hop", value: "HIP_HOP_RAP" },
  { title: "Dance", value: "DANCE" },
  { title: "Electronic", value: "ELECTRONIC" },
  { title: "Soul", value: "SOUL_RNB" },
  { title: "Alternative", value: "ALTERNATIVE" },
  { title: "Rock", value: "ROCK" },
  { title: "Latin", value: "LATIN" },
  { title: "Film", value: "FILM_TV" },
  { title: "Country", value: "COUNTRY" },
  { title: "Worldwide", value: "WORLDWIDE" },
  { title: "Reggae", value: "REGGAE_DANCE_HALL" },
  { title: "House", value: "HOUSE" },
  { title: "K-Pop", value: "K_POP" },
];

export const links = [
  { name: "Home", to: "/", icon: HiOutlineHome },
  { name: "Top Charts", to: "/top-charts", icon: FaChartSimple },
  { name: "Albums", to: "/albums", icon: IoMdAlbums },
  { name: "Trending", to: "/trending", icon: IoMdTrendingUp },

  { name: "Top Artists", to: "/top-artists", icon: HiOutlineUserGroup },

  { name: "Around You", to: "/around-you", icon: IoLocationOutline },
  { name: "Queued", to: "/inqueue", icon: HiMiniQueueList },
  { name: "Library", to: "/library", icon: MdOutlineLibraryMusic },
  {
    name: "Your Account",
    to: "your-account",
    icon: MdOutlineSupervisorAccount,
  },
];
