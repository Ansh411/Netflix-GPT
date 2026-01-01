import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase.js";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LOGO, SUPPORTED_LANGUAGES } from "../assets/constants.js";
import { changeLanguage } from "../store/languageSlice.js";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);
  const langKey = useSelector(store => store.langauge.lang);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/"); // redirect to login after sign out
    } catch (err) {
      console.error("Sign out failed:", err);
      navigate("/error");
    }
  };

  // Determine which buttons to show based on current route
  const isBrowse = location.pathname === "/browse";
  const isGPT = location.pathname === "/gpt-search";
  const isMovie = location.pathname.startsWith("/movie/");
  const isTV = location.pathname.startsWith("/tv/");

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-14 h-[88px] flex items-center justify-between
      bg-linear-to-b from-black/90 to-transparent backdrop-blur-xs">
      
      {/* LOGO */}
      <Link className="block" to="/"><img src={LOGO} alt="Netflix GPT" className="w-28 sm:w-32 md:w-44 drop-shadow-xl select-none"/></Link>

      {/* ACTION BUTTONS */}
      {user && (
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">

          {/* LANGUAGE SELECT (only on GPT page) */}
          {isGPT && (
            <select
              value={langKey}
              onChange={(e) => dispatch(changeLanguage(e.target.value))}
              className="bg-zinc-800/80 text-white text-xs sm:text-sm md:text-base px-2 sm:px-3 sm:py-2 py-1 rounded-lg border border-white/10
              focus:outline-none focus:ring-2 focus:ring-red-500/50 hover:bg-zinc-700 transition cursor-pointer"
            >
              {SUPPORTED_LANGUAGES.map(lang => (
                <option key={lang.identifier} value={lang.identifier} className="text-zinc-50">
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          {/* GPT SEARCH BUTTON */}
          {(isBrowse || isMovie || isTV) && (
            <button
              onClick={() => navigate("/gpt-search")}
              className="px-3 sm:px-4 md:px-5 py-1 sm:py-2 md:py-2.5 rounded-lg text-xs sm:text-sm md:text-base font-semibold cursor-pointer text-white
              bg-linear-to-r from-red-600 via-red-700 to-red-600 hover:from-red-700 hover:to-red-800 shadow-md shadow-red-600/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/60"
            >
              GPT Search
            </button>
          )}

          {/* HOME BUTTON */}
          {(isGPT || isMovie || isTV) && (
            <button
              onClick={() => navigate("/browse")}
              className="px-3 sm:px-4 md:px-5 py-1 sm:py-2 md:py-2.5 rounded-lg text-xs sm:text-sm md:text-base font-semibold cursor-pointer text-white
              bg-linear-to-r from-gray-500 via-zinc-600 to-slate-700 hover:from-zinc-800 hover:via-gray-700 hover:to-slate-900 shadow-md shadow-black/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/60"
            >
              Home
            </button>
          )}

          {/* AVATAR (hidden on smaller screens) */}
          <img
            src={user.photoURL}
            alt="User Avatar"
            className="hidden sm:block w-8 sm:w-10 md:w-11 h-8 sm:h-10 md:h-11 rounded-lg object-cover border border-white/20 shadow-md"
          />

          {/* SIGN OUT */}
          <button
            onClick={handleSignOut}
            className="text-white/90 text-xs sm:text-sm md:text-base font-medium hover:text-red-500 cursor-pointer transition"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
