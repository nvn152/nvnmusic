import React, { useState } from "react";
import TopPlay from "./TopPlay";
import InQueue from "./InQueue";
import Lyrics from "./Lyrics";
import { useSongLyricsQuery } from "../redux/services/saavanApi";
import { useSelector } from "react-redux";

const Tabs = () => {
  const { activeSong } = useSelector((state) => state.player);
  const songid = activeSong?.id;

  const { data: lyricsData, error: lyricsError } = useSongLyricsQuery({
    songid,
  });

  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { id: 0, title: "RELATED", content: <TopPlay /> },
    {
      id: 1,
      title: "LYRICS",
      content: <Lyrics />,
    },
    { id: 2, title: "UP NEXT", content: <InQueue /> },
  ];

  return (
    <div className="w-full max-w-md mx-auto my-3 ">
      <div className="border-b border-gray-300  sticky top-0">
        <ul className="flex justify-between mx-5">
          {tabs.map((tab, index) => (
            <li
              key={tab.id}
              className={`cursor-pointer py-2 px-4 ${
                activeTab === index
                  ? "border-b-2 font-[550] border-[#80ff00] text-[#80ff00]"
                  : "text-gray-200"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="p-4 overflow-y-auto">
        {tabs[activeTab] && <p>{tabs[activeTab].content}</p>}
      </div>
    </div>
  );
};

export default Tabs;
