import { useRef, useState } from "react";
import { validateSignUpData } from "../utils/validate.js";
import { auth } from "../auth/firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { AVATARS } from "../assets/UserAvatars.js";
import { BANNER_IMG } from "../assets/constants.js";
import Layout from "../components/Layout.jsx";

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const avatars = Array.isArray(AVATARS) ? AVATARS : [];

  const pickRandomAvatar = () => {
    if (!avatars.length) return;
    const avatar = avatars[Math.floor(Math.random() * avatars.length)];
    setSelectedAvatar(avatar);
  };

  const handleSubmit = async () => {
    setErrorMessage(null);
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

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

      await updateProfile(user, { displayName: name, photoURL: avatarToUse });

      dispatch(addUser({
        uid: user.uid,
        email: user.email,
        displayName: name,
        photoURL: avatarToUse,
      }));

      navigate("/browse", { replace: true });
    } catch (err) {
      setErrorMessage(err.message || "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <img src={BANNER_IMG} alt="BANNER" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-30"/>
      <main className="flex items-center justify-center px-6 py-36">
        <section className="w-full max-w-5xl relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="backdrop-blur-sm bg-black/60 rounded-2xl p-8 shadow-2xl border border-white/5 flex flex-col">
            <h1 className="text-white text-3xl font-extrabold pt-10 my-6">Create your account</h1>

            <label className="block text-sm text-gray-300 my-2">Name</label>
            <input ref={nameRef} type="text" placeholder="John Doe" className="w-full p-4 rounded-lg my-3 bg-gray-800/70 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-zinc-300" />

            <label className="block text-sm text-gray-300 my-2">Email</label>
            <input ref={emailRef} type="email" placeholder="abc@example.com" className="w-full p-4 rounded-lg my-3 bg-gray-800/70 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-zinc-300" />

            <label className="block text-sm text-gray-300 my-2">Password</label>
            <input ref={passwordRef} type="password" placeholder="Enter Password" className="w-full p-4 rounded-lg my-3 bg-gray-800/70 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-zinc-300" />

            {errorMessage && <p className="text-red-400 text-sm my-3">{errorMessage}</p>}

            <button onClick={handleSubmit} disabled={loading} className="w-full py-3 my-6 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer text-white font-semibold transition disabled:opacity-60">
              {loading ? "Creating..." : "Create account"}
            </button>

            <div className="text-center mt-4 text-gray-400 text-sm">
              Already registered?{" "}
              <Link to="/" className="text-red-500 hover:underline font-medium">Sign in</Link>
            </div>

            <div className="mt-6 border-t border-white/5 pt-1 text-center text-sm text-gray-400">
              <p>By creating an account, you agree to the User Agreement and Privacy Policy.</p>
            </div>
          </div>

          <aside className="backdrop-blur-sm bg-black/50 rounded-2xl p-6 shadow-2xl border border-white/5 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-xl font-semibold">Choose an avatar</h2>
              <button onClick={pickRandomAvatar} className="text-sm text-gray-300 hover:text-white cursor-pointer">Surprise me</button>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-24 h-24 rounded-xl overflow-hidden border-2 border-white/10 bg-gray-800 flex items-center justify-center">
                {selectedAvatar ? (
                  <img src={selectedAvatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-gray-400 text-xs px-2 text-center">No avatar selected</div>
                )}
              </div>
              <div>
                <p className="text-gray-300 text-sm">Preview</p>
                <p className="text-gray-500 text-xs">Selected avatar will be set as your Profile Photo</p>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {avatars.map((a, idx) => (
                <button key={idx} onClick={() => setSelectedAvatar(a)} className={`rounded-lg cursor-pointer overflow-hidden border-2 focus:outline-none transition ${selectedAvatar === a ? "ring-4 ring-red-600/50 border-red-400" : "border-white/5"}`} type="button">
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
    </Layout>
  );
};

export default SignUp;
