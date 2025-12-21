import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGO, SUPPORTED_LANGUAGES } from "../assets/constants.js";
import { toggleGPTSearchView } from "../store/GPTSlice.js";
import { changeLanguage } from "../store/languageSlice.js";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const showGPTSearch = useSelector((store) => store.GPT.showGPTSearch);
  const langKey = useSelector((store) => store.langauge.lang);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Sign out failed:", err);
      navigate("/error");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 md:px-14 h-[74px] flex items-center justify-between
     bg-linear-to-b from-black/90 via-black/70 to-transparent backdrop-blur-md">

      {/* LOGO */}

      <img src={LOGO} alt="Netflix GPT" className="w-32 md:w-44 drop-shadow-xl select-none"/>

      {/* USER ACTIONS */}

      {user && (

        <div className="flex items-center gap-3 md:gap-4">

          {/* 🌐 LANGUAGE SELECT */}

          {showGPTSearch && (

            <select value={langKey} onChange={(e) => dispatch(changeLanguage(e.target.value))}
              className="bg-zinc-800/80 text-white text-sm md:text-base px-3 py-2 rounded-lg border border-white/10
                 focus:outline-none focus:ring-2 focus:ring-red-500/50 hover:bg-zinc-700 transition cursor-pointer">
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier} className="text-zinc-50">
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          {/* 🤖 GPT BUTTON */}

          <button onClick={() => dispatch(toggleGPTSearchView())}
            className="relative px-5 py-2.5 rounded-lg text-sm md:text-base font-semibold cursor-pointer text-white bg-linear-to-r from-red-600 via-red-700 to-red-600
              hover:from-red-700 hover:to-red-800 shadow-md shadow-red-600/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/60">
            {showGPTSearch ? "Home" : "GPT Search"}
          </button>

          {/* AVATAR */}
          <img src={user.photoURL} alt="User Avatar"
            className="w-10 h-10 md:w-11 md:h-11 rounded-lg object-cover border border-white/20 shadow-md"/>

          {/* SIGN OUT */}
          <button
            onClick={handleSignOut}
            className="text-white/90 text-sm md:text-base font-medium hover:text-red-500 cursor-pointer transition">
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
