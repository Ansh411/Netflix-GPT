import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS, SEARCH } from "../../assets/constants";
import languages from "../../utils/LanguageConstants";
import { useRef } from "react";
import useOpenRouterMovies from "../../hooks/useOpenRouterMovies";
import { addGPTMovieResult, addSearchText, startGPTLoading } from "../../store/GPTSlice";
import capitalize from "../../utils/capitalizeWords";


const GPT_SearchBar = () => {

  const dispatch = useDispatch();

  const langKey = useSelector((store) => store?.langauge?.lang);
  const searchText = useRef(null);

  const { getMovieRecommendations } = useOpenRouterMovies();

  const searchMovieTMDB = async (movieName) => {

    const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movieName + "&include_adult=false&language=en-US&page=1", API_OPTIONS);

    const json = await data.json();

    if (!json?.results?.length) return null;

    const normalizedMovieName = movieName.trim().toLowerCase();

    // 🎯 Exact match + language + poster
    const exactMatch = json.results.find((movie) => {

    const titleMatch = movie?.title?.toLowerCase() === normalizedMovieName || movie?.original_title?.toLowerCase() === normalizedMovieName;

    const languageMatch = movie?.original_language === "hi" || movie?.original_language === "en";

    const hasPoster = Boolean(movie?.poster_path);

    return titleMatch && languageMatch && hasPoster;
  });

  return exactMatch || null;
    
  };

  const handleGPTSearchClick = async () => {
    
      if (!searchText.current?.value) return;

      const query = searchText?.current?.value;

      dispatch(addSearchText(query));

      dispatch(startGPTLoading());

      const gptMovies = await getMovieRecommendations(capitalize(query));

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

      const TMDB_Results = await Promise.all(promiseArray);

      const finalMovies = TMDB_Results.filter(Boolean);

      console.log("FINAL MOVIES:", finalMovies);

      dispatch(addGPTMovieResult({movieNames: gptMovies , movieResults : finalMovies}));
      
    }; 
  

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-3xl flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl px-4 py-3">

      <input ref={searchText} type="text" placeholder={languages[langKey].SearchPlaceholder}
        className="flex-1 bg-transparent text-white placeholder-gray-300 text-base md:text-lg outline-none px-2"/>

      <button onClick={handleGPTSearchClick} type="submit" className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-lg transition shadow-lg cursor-pointer">
        <img src={SEARCH} alt="Search Icon" className="w-5 h-5" />
        {languages[langKey].search}
      </button>
    </form>
  );
};

export default GPT_SearchBar;
