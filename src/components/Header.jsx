import { signOut } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

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
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-12-03/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="Logo"
        className="w-32 md:w-44 drop-shadow-xl select-none"
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
