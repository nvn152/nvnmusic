import { CgPlayTrackNextR } from "react-icons/cg";
import { MdOutlineQueueMusic } from "react-icons/md";
import { HiOutlineQueueList } from "react-icons/hi2";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { MdOutlineFileDownload } from "react-icons/md";
import { FaRegFaceGrinTongue } from "react-icons/fa6";

// my imports
import { useGetSongByTrackIdQuery } from "../redux/services/jioSaavan";

function AlbumThreeDotsMenu({ song, data, handleDotsClick }) {
  //   const { data: downloadData } = useGetSongByTrackIdQuery({ trackId: song.id });

  //   const handleDownload = () => {
  //     const fileUrl = downloadData?.data[0]?.downloadUrl[4].link;

  //     window.open(fileUrl, "_blank");

  //     handleDotsClick();
  //   };

  return (
    <div className=" gap-4 absolute bottom-14 right-10 w-48 bg-black rounded-lg p-2 flex items-between justify-start text-white font-bold">
      <p>Doesn&apos;t work yet</p>
      <FaRegFaceGrinTongue className="text-2xl " />
    </div>
  );
}

export default AlbumThreeDotsMenu;
