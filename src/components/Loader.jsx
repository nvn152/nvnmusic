import { loader } from "../assets";

const Loader = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <img
      src="src/assets/loader.svg"
      alt="loader"
      width={24}
      height={24}
      className="animate-spin my-64"
    />
    <h1 className="text-3xl font-bold text-white">{title}</h1>
  </div>
);

export default Loader;
