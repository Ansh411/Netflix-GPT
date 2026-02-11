import { useDispatch, useSelector } from "react-redux";
import { SEARCH_GPT } from "../../assets/constants";
import languages from "../../utils/LanguageConstants";
import { useRef } from "react";
import useOpenRouterSearch from "../../hooks/useOpenRouterSearch";
import {
  addGPTResults,
  addSearchText,
  setSearchType,
  startGPTLoading,
} from "../../store/GPTSlice";

import { BACKEND_API } from "../../assets/constants";

const GPT_SearchBar = () => {
  const dispatch = useDispatch();

  const langKey = useSelector((store) => store?.langauge?.lang);
  const searchType = useSelector((store) => store.GPT.searchType);
  const searchText = useRef(null);

  const { getRecommendations } = useOpenRouterSearch();

  // 🔒 TMDB cache to avoid duplicate API calls
  const tmdbCache = new Map();

  const searchMovieTMDB = async (movieName) => {
    const cacheKey = `movie-${movieName.toLowerCase()}`;
    if (tmdbCache.has(cacheKey)) return tmdbCache.get(cacheKey);

    try {
      const res = await fetch(
        `${BACKEND_API}/api/movies/search?q=${encodeURIComponent(
          movieName
        )}`
      );

      if (!res.ok) return null;

      const json = await res.json();
      if (!json.results?.length) return null;

      const normalizedName = movieName.toLowerCase();

      const exactMatch =
        json.results.find((movie) => {
          const titleMatch =
            movie?.title?.toLowerCase().includes(normalizedName) ||
            movie?.original_title?.toLowerCase().includes(normalizedName);

          const languageMatch = ["en", "hi"].includes(
            movie?.original_language
          );

          return titleMatch && languageMatch && movie?.poster_path;
        }) || null;

      tmdbCache.set(cacheKey, exactMatch);
      return exactMatch;
    } catch (err) {
      console.error("TMDB Movie Error:", err);
      return null;
    }
  };

  const searchTVTMDB = async (tvName) => {
    const cacheKey = `tv-${tvName.toLowerCase()}`;
    if (tmdbCache.has(cacheKey)) return tmdbCache.get(cacheKey);

    try {
      const res = await fetch(
        `${BACKEND_API}/api/tv/search?q=${encodeURIComponent(
          tvName
        )}`
      );

      if (!res.ok) return null;

      const json = await res.json();
      if (!json.results?.length) return null;

      const normalizedName = tvName.toLowerCase();

      const exactMatch =
        json.results.find((tv) => {
          const titleMatch =
            tv?.name?.toLowerCase().includes(normalizedName) ||
            tv?.original_name?.toLowerCase().includes(normalizedName);

          const languageMatch = ["en", "hi"].includes(tv?.original_language);

          return titleMatch && languageMatch && tv?.poster_path;
        }) || null;

      tmdbCache.set(cacheKey, exactMatch);
      return exactMatch;
    } catch (err) {
      console.error("TMDB TV Error:", err);
      return null;
    }
  };

  const handleGPTSearchClick = async () => {
    const userQuery = searchText?.current?.value?.trim();
    if (!userQuery) return;

    dispatch(addSearchText(userQuery));
    dispatch(startGPTLoading());

    try {
      const gptResults = await getRecommendations({
        query: userQuery,
        type: searchType,
      });

      if (!Array.isArray(gptResults) || gptResults.length === 0) {
        dispatch(addGPTResults({ names: [], results: [] }));
        return;
      }

      // ✅ DEDUPE GPT TITLES
      const uniqueGPTTitles = Array.from(
        new Map(
          gptResults.map((t) => [t.toLowerCase(), t])
        ).values()
      );

      const tmdbPromises = uniqueGPTTitles.map(async (title) => {
        if (searchType === "movie") {
          return await searchMovieTMDB(title);
        }

        if (searchType === "tv") {
          return await searchTVTMDB(title);
        }

        // BOTH → movie first, then TV
        const movie = await searchMovieTMDB(title);
        if (movie) return movie;

        return await searchTVTMDB(title);
      });

      const tmdbResults = await Promise.all(tmdbPromises);

      // ✅ FINAL DEDUPE BY ID + TYPE
      const finalResults = Array.from(
        new Map(
          tmdbResults
            .filter(Boolean)
            .map((item) => [
              `${item.media_type || (item.title ? "movie" : "tv")}-${item.id}`,
              item,
            ])
        ).values()
      );

      dispatch(
        addGPTResults({
          names: uniqueGPTTitles,
          results: finalResults,
        })
      );
    } catch (err) {
      console.error("GPT Search Failed:", err);
      dispatch(addGPTResults({ names: [], results: [] }));
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

  <img src="https://i.ibb.co/PvCjMQ5k/Down.png" alt="Dropdown"
    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-80"/>
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
    <img src={SEARCH_GPT} alt="Search Icon" className="w-6 h-6" />
    {languages[langKey].search}
  </button>
</form>

  );
};

export default GPT_SearchBar;




