// import { INFO, PLAY } from "../assets/constants";

// const VideoTitle = ({ title, overview }) => {
//   return (
//     <div className="absolute inset-0 px-6 md:px-12 lg:px-24 pt-[18%] text-white bg-linear-to-r from-black via-black/60 to-transparent">

//       <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold max-w-2xl"> {title} </h1>

//       <p className="mt-6 max-w-xl text-sm md:text-base text-gray-200 line-clamp-4"> {overview} </p>

//       <div className="flex gap-4 mt-8">
//         <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-md cursor-pointer font-semibold hover:bg-gray-200 transition">
//           <img src={PLAY} className="w-6" />
//           Play
//         </button>

//         <button className="flex items-center gap-2 cursor-pointer bg-gray-600/70 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600 transition">
//           <img src={INFO} className="w-6" />
//           More Info
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VideoTitle;


import { INFO, PLAY } from "../assets/constants";

const VideoTitle = ({ title, overview }) => {
  return (
    <div
      className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 text-white bg-linear-to-r from-black/70 via-black/40 to-transparent">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold max-w-2xl">
        {title}
      </h1>

      <p className="hidden lg:block mt-6 max-w-xl text-gray-200 text-base line-clamp-4">
        {overview}
      </p>

      <div className="flex gap-4 mt-6">
        <button className="flex items-center gap-2 bg-white cursor-pointer text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition">
          <img src={PLAY} className="w-6" />
          Play
        </button>

        <button className="flex items-center gap-2 bg-gray-600/60 cursor-pointer text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600 transition">
          <img src={INFO} className="w-7" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
