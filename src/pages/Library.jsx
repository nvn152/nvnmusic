import { useNavigate } from "react-router-dom";

function Library() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-5 mt-[100px]">
      <h1 className="text-white font-extrabold text-3xl">
        This Page does not exist yet
      </h1>
      <h2 className="text-[#bfff00] text-xl">
        I'll make a concerted effort to finish it as soon as possible.
      </h2>
      <div>
        <button
          className="bg-[#bfff00] font-semibold p-3 mt-3 rounded-3xl cursor-pointer "
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default Library;
