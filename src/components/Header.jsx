import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGO } from "../assets/constants.js";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch(() => navigate("/error"));
  };

  return (
    <header className="fixed top-0 left-0 w-full px-8 md:px-14 py-4 bg-linear-to-b from-black/90 to-transparent backdrop-blur-sm flex items-center justify-between z-50">
      {/* Logo */}
      <img
        src= {LOGO}
        className="w-37 md:w-50 drop-shadow-xl select-none"
      />

      {/* User Section */}
      {user && (
        <div className="flex items-center gap-4">
          <img
            className="w-10 h-10 md:w-12 md:h-12 rounded-lg border border-white/20 shadow-lg object-cover"
            src={user.photoURL}
            alt="user_avatar"
          />

          <button
            onClick={handleSignOut}
            className="text-white font-semibold tracking-wide text-sm md:text-base hover:text-red-500 transition-colors duration-200 cursor-pointer">
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
