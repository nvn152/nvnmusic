import { useNavigate } from "react-router-dom";

function Library() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-[100px]">
    <h1 className="text-white font-extrabold text-3xl">
      This Page does not exist yet
    </h1>
    <h2 className="text-[#bfff00] font-semibold text-xl ">
    I've been sleep-deprived lately. Can I take a nap uninterrupted?
    </h2>
    <div className="flex gap-20 ">
      <button
        className="bg-[#bfff00] font-bold p-3 mt-3 rounded-3xl cursor-pointer "
        onClick={() => navigate("/")}
      >
        Yes, You can!
      </button>
      <button
        className="bg-[#bfff00] font-bold p-3 mt-3 rounded-3xl cursor-pointer "
        onClick={() =>  window.location.href = 'https://www.youtube.com/watch?v=krHY159WyTM'}
      >
        No, You can't.
      </button>
    </div>
  </div>
  );
}

export default Library;
