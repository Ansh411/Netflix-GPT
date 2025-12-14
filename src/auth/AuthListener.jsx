import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../store/userSlice";

const AuthListener = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
      } else {
        dispatch(removeUser());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  // Prevent app from rendering routes until auth status is determined
  return null;
};

export default AuthListener;


