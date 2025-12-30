import { useEffect, useState } from "react";

const BACKEND_URL = "https://netflix-gpt-backend-6ayv.onrender.com";

const useFanartLogo = (tmdbId) => {
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tmdbId) return;

    const fetchLogo = async () => {
      try {
        const res = await fetch(
          `${BACKEND_URL}/api/fanart/movie/${tmdbId}`
        );

        if (!res.ok) throw new Error("Fanart fetch failed");

        const json = await res.json();

        // Prefer HD logo
        if (json?.logos?.length) {
          setLogo(json.logos[0].url);
        }
      } catch (err) {
        console.warn("Fanart logo not available");
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, [tmdbId]);

  return { logo, loading };
};

export default useFanartLogo;
