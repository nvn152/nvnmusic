import { loader } from "../assets";

const Loader = ({ title }) => (
  <div className="w-fullb flex justify-center items-center flex-col">
    <img
      src="src/assets/loader.svg"
      alt="loader"
      width={24}
      height={24}
      className="animate-spin my-64"
    />
  </div>
);

export default Loader;
