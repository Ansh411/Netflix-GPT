import { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../assets/constants";

const BACKEND_URL = "https://netflix-gpt-backend-6ayv.onrender.com";

/* *
 * @param {string|number} id - TMDB id
 * @param {"movie" | "tv"} type
 */
const useMediaLogo = (id, type = "movie") => {
  const [logo, setLogo] = useState(null);
  const [source, setSource] = useState("none");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !type) return;

    const controller = new AbortController();

    const fetchLogo = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${BACKEND_URL}/api/${type}/${id}/logo`,
          { signal: controller.signal }
        );

        if (!res.ok) throw new Error("Logo fetch failed");

        const json = await res.json();

        if (!json?.logo) {
          setLogo(null);
          setSource("none");
          return;
        }

        // 🔁 TMDB gives file_path, FanArt gives full URL
        const finalLogo = json.logo.startsWith("/") ? IMG_CDN_URL + json.logo : json.logo;

        setLogo(finalLogo);
        setSource(json.source || "unknown");

      } catch (err) {
        if (err.name !== "AbortError") {
          console.warn("Logo not available");
        }
        setLogo(null);
        setSource("none");
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();

    return () => controller.abort();
  }, [id, type]);

  return { logo, loading, source };
};

export default useMediaLogo;
