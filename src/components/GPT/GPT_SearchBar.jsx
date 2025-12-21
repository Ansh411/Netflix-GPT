import { useSelector } from "react-redux";
import { SEARCH } from "../../assets/constants";
import languages from "../../utils/LanguageConstants";

const GPT_SearchBar = () => {
  const langKey = useSelector((store) => store.langauge.lang);

  return (
    <form className="w-full max-w-3xl flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl px-4 py-3">

      <input type="text" placeholder={languages[langKey].SearchPlaceholder}
        className="flex-1 bg-transparent text-white placeholder-gray-300 text-base md:text-lg outline-none px-2"/>

      <button type="submit" className="flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-lg transition shadow-lg cursor-pointer">
        <img src={SEARCH} alt="Search Icon" className="w-5 h-5" />
        {languages[langKey].search}
      </button>
    </form>
  );
};

export default GPT_SearchBar;
