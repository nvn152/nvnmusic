import loaderImage from "../assets/loader.svg";

const Loader = ({ title }) => (
  <div className="w-full flex justify-center items-center flex-col">
    <img
      src={loaderImage}
      alt="loader"
      width={24}
      height={24}
      className="animate-spin my-64"
    />
    {/* <h1 className="text-3xl font-bold text-white">{title}</h1> */}
  </div>
);

export default Loader;
