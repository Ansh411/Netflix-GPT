import GPT_Suggestions from "../components/GPT/GPT_Suggestions";
import GPT_SearchBar from "../components/GPT/GPT_SearchBar";
import { BANNER_IMG, MOVIE } from "../assets/constants.js";
import languages from "../utils/LanguageConstants.js";
import { useSelector } from "react-redux";
import Header from "../components/Header.jsx";

const GPTSearch = () => {
  const langKey = useSelector((store) => store.langauge.lang);

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Header/>

      {/* BACKGROUND */}
      <img src={BANNER_IMG} alt="BG-IMG" aria-hidden className="absolute inset-0 w-full h-full object-cover"/>

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center pt-[18vh] px-4 text-center">

        {/* TITLE */}
        <h1 className="flex items-center gap-3 text-white text-2xl md:text-4xl font-extrabold mb-8">
          {languages[langKey].GPTPageTitle}
          <img src={MOVIE} alt="Movie Icon" className="hidden md:block w-8 h-8 md:w-9 md:h-9" />
        </h1>

        <GPT_SearchBar />
        <GPT_Suggestions />
      </div>
    </div>
  );
};

export default GPTSearch;
