import { Link } from "react-router-dom";
import { getRandomErrorImg } from "../assets/UserAvatars";

const UnderConstruction = () => {

  const ErrorImg = getRandomErrorImg();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center
       bg-black text-gray-200"
    >
      <div>
        <p className="flex justify-center  items-center text-md md:text-lg lg:text-2xl tracking-[0.35em] animate-pulse space-x-2 mb-2
            text-rose-400">
          <span> 💀 ERROR 💀 </span>
        </p>
      </div>

      {/* IMAGE */}
      <div>
        <img
          src={ErrorImg}
          alt="Website under construction"
          className="max-w-5xl w-full object-fill my-5"
        />
      </div>

      {/* HOME BUTTON */}
      <Link to="/">
        <p
          className="flex gap-6 px-6 mb-6 rounded-xl shadow-sm text-md lg:text-lg transition cursor-pointer bg-zinc-950 hover:bg-gray-800 text-gray-100 hover:text-amber-400">
          🏠 Home
        </p>
      </Link>

      {/* CONTACT */}
      <div
        className="flex gap-6 px-6 py-4 rounded-xl shadow-sm text-lg
          bg-zinc-950"
      >
        <span
          className="flex items-center gap-2 text-gray-200">
          <span className="hover:text-rose-500 cursor-pointer text-xs lg:text-lg">
           💌 4gansh11@gmail.com
          </span>
        </span>

        <span
          className="flex items-center gap-2 text-gray-200">
          <span className="cursor-pointer text- hover:text-green-600 lg:text-lg">
           📞 +91 8949423532
          </span>
        </span>
      </div>
    </div>
  );
};

export default UnderConstruction;

