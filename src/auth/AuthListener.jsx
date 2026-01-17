import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser, setAuthLoading } from "../store/userSlice";

const AuthListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // 🔒 Start auth loading
    dispatch(setAuthLoading(true));

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(removeUser());
      }

      // ✅ Auth status resolved
      dispatch(setAuthLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  return null;
};

export default AuthListener;
