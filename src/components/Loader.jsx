import { loader } from "../assets";

console.log(loader);

const Loader = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <img
      src="../assets/loader2.svg"
      alt="loader"
      className="w-32 h-32 object-contain"
    />
    <h1 className="font-bold text-2xl text-white mt-2">
      {title || "Loading ..."}
    </h1>
  </div>
);

export default Loader;
