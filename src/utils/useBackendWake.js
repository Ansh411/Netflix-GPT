import { useEffect, useState } from "react";

const useBackendWake = () => {
  const [backendReady, setBackendReady] = useState(false);

  useEffect(() => {
    fetch("https://netflix-gpt-backend-6ayv.onrender.com")
      .then(() => setBackendReady(true))
      .catch(() => setBackendReady(true));
  }, []);

  return backendReady;
};

export default useBackendWake;
