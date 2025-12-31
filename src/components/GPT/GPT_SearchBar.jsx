import { useDispatch, useSelector } from "react-redux";
import { SEARCH } from "../../assets/constants";
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

  const handleGPTSearchClick = async () => {

      const query = searchText?.current?.value;
    
      if (!query) return;

      dispatch(addSearchText(query));

      dispatch(startGPTLoading());

      try{

        const gptMovies = await getMovieRecommendations(capitalize(query));

        const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

        const TMDB_Results = await Promise.all(promiseArray);

        const finalMovies = TMDB_Results.filter(Boolean);

        dispatch(addGPTMovieResult({movieNames: gptMovies , movieResults : finalMovies}));

      } catch (err) {
        console.error("GPT Search Failed: ", err);

      }
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
