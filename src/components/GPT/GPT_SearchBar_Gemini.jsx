import { useSelector } from "react-redux";
import { API_OPTIONS, SEARCH } from "../../assets/constants";
import languages from "../../utils/LanguageConstants";
import { useRef } from "react";
import ai from "../../utils/Gemini_AI";

const GPT_SearchBar = () => {
  const langKey = useSelector((store) => store.langauge.lang);
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {

    const data = await fetch("https://api.themoviedb.org/3/search/movie?query=" + movie + "&include_adult=false&language=en-US&page=1", API_OPTIONS);

    const json = await data.json();

    console.log(json.results);
    
  }

  const handleGPTSearchClick = async () => {
    if (!searchText.current?.value) return;

    const prompt = "Return ONLY a comma-separated list of valid movie titles." +
                    "No numbering." +
                    "No explanations." +
                    "User query: " + searchText.current.value;

    try {
      const gptResults = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      console.log(gptResults.text);

      const gptMovies = gptResults.text.split(",");

      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));

      const TMDB_Results = await Promise.all(promiseArray);

      console.log(TMDB_Results);

    } catch (err) {
      console.error("Gemini error:", err);
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
