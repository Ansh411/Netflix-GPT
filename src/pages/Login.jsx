import { useRef, useState } from "react";
import { validateLoginData } from "../utils/validate.js";
import { auth } from "../auth/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../store/userSlice";
import { BANNER_IMG } from "../assets/constants.js";
import Layout from "../components/Layout.jsx";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmitButton = async () => {
    if(loading) return;

    setErrorMessage(null);
    setLoading(true);

    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    const message = validateLoginData(email, password);
    if (message) {
      setErrorMessage(message);
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      dispatch(
        addUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
        })
      );

      navigate("/browse", { replace: true });
    } catch (err) {
      setErrorMessage(err.message || "Failed to sign in");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <img src={BANNER_IMG} alt="BANNER" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-30"/>
      <main className="flex items-center justify-center px-6 py-44">
        <section className="w-full max-w-md relative z-10">
          <div className="backdrop-blur-sm bg-black/60 rounded-2xl p-10 shadow-2xl border border-white/5">
            <h1 className="text-white text-3xl font-extrabold my-6">Sign In</h1>

            <label className="block text-sm text-gray-300 my-2">Email</label>
            <input ref={emailRef} type="email" placeholder="abc@example.com" className="w-full p-4 rounded-lg my-3 bg-gray-800/70 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-zinc-300" />

            <label className="block text-sm text-gray-300 my-2">Password</label>
            <input ref={passwordRef} type="password" placeholder="Your password" className="w-full p-4 rounded-lg my-3 bg-gray-800/70 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-zinc-300" />

            {errorMessage && <p className="text-red-400 text-sm my-3">{errorMessage}</p>}

            <button onClick={handleSubmitButton} disabled={loading} className="w-full py-3 my-6 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer text-white font-semibold transition disabled:opacity-60">
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="mt-4 text-center text-sm text-gray-400">
              New to NetflixGPT?{" "}
              <Link to="/signup" className="text-red-500 hover:underline ml-1">Create an account</Link>
            </div>
            <div className="mt-6 border-t border-white/5 pt-2 text-center text-sm text-gray-400">
              <p>By continuing you agree to the NetflixGPT terms.</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Login;
