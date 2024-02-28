import { CgPlayTrackNextR } from "react-icons/cg";
import { MdOutlineQueueMusic } from "react-icons/md";
import { HiOutlineQueueList } from "react-icons/hi2";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";

// my imports
import { useGetSongByTrackIdQuery } from "../redux/services/jioSaavan";

function ThreeDotsMenu({ song, data, handleDotsClick }) {
  //   const { data: downloadData } = useGetSongByTrackIdQuery({ trackId: song.id });

  //   const handleDownload = () => {
  //     const fileUrl = downloadData?.data[0]?.downloadUrl[4].link;

  //     window.open(fileUrl, "_blank");

  //     handleDotsClick();
  //   };

  return (
    <div className="absolute bottom-14 right-10 w-48 bg-black rounded-lg p-2 flex flex-col items-between justify-start ">
      <button className="flex items-center ">
        <CgPlayTrackNextR className="text-2xl" />
        <div className=" text-gray-300 p-2 rounded-lg ">Play Next</div>
      </button>
      <button className="flex items-center ">
        <MdOutlineQueueMusic className="text-2xl" />
        <div className=" text-gray-300 p-2 rounded-lg ">Add to queue</div>
      </button>
      <button className="flex items-center ">
        <HiOutlineQueueList className="text-2xl" />
        <div className=" text-gray-300 p-2 rounded-lg ">Listen Later</div>
      </button>

      <button className="flex items-center ">
        <MdOutlinePlaylistAdd className="text-2xl" />
        <div className=" text-gray-300 p-2 rounded-lg">Add to playlist</div>
      </button>

      <button className="flex items-center ">
        <CiHeart className="text-2xl" />
        <div className=" text-gray-300 p-2 rounded-lg">Like Song</div>
      </button>
      <button className="flex items-center ">
        <CiShare2 className="text-2xl" />
        <div className=" text-gray-300 p-2 rounded-lg">Share</div>
      </button>

      <button className="flex items-center " onClick={() => {}}>
        <MdOutlineFileDownload className="text-2xl" />
        <div className=" text-gray-300 p-2 rounded-lg">Download</div>
      </button>
    </div>
  );
}

export default ThreeDotsMenu;
