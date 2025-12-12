import { useRef, useState, useMemo } from "react";
import Header from "../components/Header";
import { validateSignUpData } from "../utils/validate.js";
import { auth } from "../auth/firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice.js";
import { AVATARS } from "../assets/UserAvatars.js";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const avatars = useMemo(() => (Array.isArray(AVATARS) && AVATARS.length ? AVATARS : []), []);

  const pickRandomAvatar = () => {
    if (!avatars.length) return;
    const idx = Math.floor(Math.random() * avatars.length);
    const avatar = avatars[idx];
    setSelectedAvatar(avatar);
    setPreviewAvatar(avatar);
  };

  const handleSelectAvatar = (avatar) => {
    setSelectedAvatar(avatar);
    setPreviewAvatar(avatar);
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    const name = nameRef.current?.value ?? "";
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    const message = validateSignUpData(name, email, password);
    if (message) {
      setErrorMessage(message);
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const avatarToUse = selectedAvatar || (avatars.length ? avatars[Math.floor(Math.random() * avatars.length)] : "");

      await updateProfile(user, {
        displayName: name,
        photoURL: avatarToUse,
      });

      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: name,
          photoURL: avatarToUse,
        })
      );

      navigate("/browse");
    } catch (err) {
      setErrorMessage(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-black to-black relative">
      <Header />
      <div
        className="absolute inset-0 bg-[url('https://assets.nflxext.com/ffe/siteui/vlv3/c81956f1-5750-454c-9b3c-7a4d990d3d06/web/IN-en-20251208-TRIFECTA-perspective_d69f5f82-9a35-45d7-a7b6-9af6e0643bf5_large.jpg')] bg-cover bg-center opacity-30"
        aria-hidden
      />

      <main className="flex items-center justify-center px-6 py-36">
        <section className="w-full max-w-5xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left: Form */}
          <div className="backdrop-blur-sm bg-black/60 rounded-2xl p-8 shadow-2xl border border-white/5 flex flex-col">
            <h1 className="text-white text-3xl font-extrabold pt-10 my-6">Create your account</h1>

            {/* Name */}
            <label className="block text-sm text-gray-300 my-2">Name</label>
            <input
              ref={nameRef}
              type="text"
              placeholder="John Doe"
              className="w-full p-4 rounded-lg my-3 bg-gray-800/70 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-zinc-300"
            />

            {/* Email */}
            <label className="block text-sm text-gray-300 my-2">Email</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="abc@example.com"
              className="w-full p-4 rounded-lg my-3 bg-gray-800/70 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-zinc-300"
            />

            {/* Password */}
            <label className="block text-sm text-gray-300 my-2">Password</label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter Password"
              className="w-full p-4 rounded-lg my-3 bg-gray-800/70 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-zinc-300"
            />

            {errorMessage && <p className="text-red-400 text-sm my-3">{errorMessage}</p>}

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="w-full  py-3 my-6 rounded-lg bg-red-600 cursor-pointer hover:bg-red-700 text-white font-semibold transition disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create account"}
            </button>

            <div className="text-center mt-4 text-gray-400 text-sm">
              Already registered?{" "}
              <Link to="/" className="text-red-500 hover:underline font-medium">
                Sign in
              </Link>
            </div>
            <div className="mt-6 border-t border-white/5 pt-1 text-center text-sm text-gray-400">
              <p>By creating an account, you agree to the User Agreement and Privacy Policy.</p>
            </div>
          </div>

          {/* Right: Avatar picker */}
          <aside className="backdrop-blur-sm bg-black/50 rounded-2xl p-6 shadow-2xl border border-white/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-xl font-semibold">Choose an avatar</h2>
              <button onClick={pickRandomAvatar} className="text-sm text-gray-300 hover:text-white cursor-pointer">
                Surprise me
              </button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-white/10 bg-gray-800 flex items-center justify-center">
                {previewAvatar ? (
                  <img src={previewAvatar} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 text-xs px-2 text-center">No avatar selected</div>
                )}
              </div>
              <div>
                <p className="text-gray-300 text-sm">Preview</p>
                <p className="text-gray-500 text-xs">Selected avatar will be set as your Profile Photo</p>
              </div>
            </div>

            {/* Avatar grid (all avatars visible, taller) */}
            <div className="grid grid-cols-5 gap-3" style={{ maxHeight: "auto" }}>
              {avatars.map((a, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectAvatar(a)}
                  className={`rounded-lg cursor-pointer overflow-hidden border-2 focus:outline-none transition ${selectedAvatar === a ? "ring-4 ring-red-600/50 border-red-400" : "border-white/5"}`}
                  type="button"
                >
                  <img src={a} alt={`avatar-${idx}`} className="w-full h-16 object-cover" />
                </button>
              ))}
            </div>

            <div className="text-gray-400 text-xs mt-2">
              Tip: Click an avatar to select it — or press <span className="font-medium text-white">Surprise me</span>.
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
};

export default SignUp;
