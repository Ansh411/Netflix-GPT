import { useDispatch, useSelector } from "react-redux";
import { SEARCH } from "../../assets/constants";
import languages from "../../utils/LanguageConstants";
import { useRef } from "react";
import useOpenRouterSearch from "../../hooks/useOpenRouterSearch";
import { addGPTResults, addSearchText, setSearchType, startGPTLoading } from "../../store/GPTSlice";



const GPT_SearchBar = () => {

  const dispatch = useDispatch();

  const langKey = useSelector((store) => store?.langauge?.lang);
  const searchType = useSelector((store) => store.GPT.searchType);
  const searchText = useRef(null);

  const { getRecommendations } = useOpenRouterSearch();

  const searchMovieTMDB = async (movieName) => {
    try{

      const res = await fetch(`https://netflix-gpt-backend-6ayv.onrender.com/api/movies/search?q=${encodeURIComponent(movieName)}`);

      if(!res.ok) return null;

      const json = await res.json();

      if(!json.results?.length) return null;

      const normalizedMovieName = movieName.trim().toLowerCase();

      const exactMatch = json.results.find((movie) => {

      const titleMatch = movie?.title?.toLowerCase() === normalizedMovieName || movie?.original_title?.toLowerCase() === normalizedMovieName;

      const languageMatch = movie?.original_language === "hi" || movie?.original_language === "en";

      const hasPoster = Boolean(movie?.poster_path);

      return titleMatch && languageMatch && hasPoster;
  });

    return exactMatch || null;
    
  } catch(err){
    console.error("TMDB Backend Error: ", err);
    return null;
  }
};

const searchTVTMDB = async (tvName) => {
  try {
    const res = await fetch(
      `https://netflix-gpt-backend-6ayv.onrender.com/api/tv/search?q=${encodeURIComponent(tvName)}`
    );

    if (!res.ok) return null;

    const json = await res.json();
    if (!json.results?.length) return null;

    const normalizedTVName = tvName.trim().toLowerCase();

    const exactMatch = json.results.find((tv) => {
      const titleMatch =
        tv?.name?.toLowerCase() === normalizedTVName ||
        tv?.original_name?.toLowerCase() === normalizedTVName;

      const languageMatch =
        tv?.original_language === "en" || tv?.original_language === "hi";

      const hasPoster = Boolean(tv?.poster_path);

      return titleMatch && languageMatch && hasPoster;
    });

    return exactMatch || null;

  } catch (err) {
    console.error("TMDB TV Backend Error:", err);
    return null;
  }
};


  const handleGPTSearchClick = async () => {

      const userQuery = searchText?.current?.value;
    
      if (!userQuery) return;

      dispatch(addSearchText(userQuery));

      dispatch(startGPTLoading());

      try{

        const gptResults = await getRecommendations({query: userQuery, type: searchType });

        const promiseArray = gptResults.map(async (title) => {
          if (searchType === "movie") {
            return await searchMovieTMDB(title);
          }

          if (searchType === "tv") {
            return await searchTVTMDB(title);
          }

          // BOTH → try movie first, then TV
          const movie = await searchMovieTMDB(title);
          if (movie) return movie;

          return await searchTVTMDB(title);
      });

        const TMDB_Results = await Promise.all(promiseArray);

        const finalResults = TMDB_Results.filter(Boolean);

        dispatch(addGPTResults({names: gptResults , results : finalResults}));

      } catch (err) {
        console.error("GPT Search Failed: ", err);
      }
    }; 
  

  return (
<form onSubmit={(e) => e.preventDefault()}
  className="w-full max-w-3xl flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] px-4 py-3">

  {/* SEARCH TYPE SELECT */}
  <div className="relative">
    <select value={searchType}
      onChange={(e) => dispatch(setSearchType(e.target.value))}
      className="appearance-none bg-zinc-800/80 text-zinc-50 text-sm md:text-base px-4 py-2.5 pr-10 rounded-xl cursor-pointer 
        border border-white/20 outline-none backdrop-blur-md focus:ring-2 focus:ring-red-500/50">
      <option value="both">All</option>
      <option value="movie">Movies</option>
      <option value="tv">TV Shows</option>
    </select>

  <img
    src="https://i.ibb.co/PvCjMQ5k/Down.png"
    alt="Dropdown"
    className="
      pointer-events-none
      absolute right-3 top-1/2 -translate-y-1/2
      w-4 h-4 opacity-80
    "
  />

  </div>

  {/* SEARCH INPUT */}
  <input ref={searchText} type="text" placeholder={languages[langKey].SearchPlaceholder}
    className="flex-1 bg-transparent text-white placeholder-gray-300 text-base md:text-lg outline-none px-2"/>

  {/* SEARCH BUTTON */}
  <button
    onClick={handleGPTSearchClick}
    type="submit"
    className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold 
    px-6 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-red-500/30 active:scale-95 cursor-pointer">
    <img src={SEARCH} alt="Search Icon" className="w-5 h-5" />
    {languages[langKey].search}
  </button>
</form>

  );
};

export default GPT_SearchBar;

