import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import MediaCard from "../components/MediaCard";
import { BANNER_IMG, IMG_CDN_URL } from "../assets/constants";
import { BACKEND_API } from "../assets/constants";



const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

 useEffect(() => {
    if (!query) return;

    const controller = new AbortController();

    const debounceTimer = setTimeout(() => {
    const fetchResults = async () => {
    setLoading(true);
      try {
        const res = await fetch(
          `${BACKEND_API}/api/search?query=${query}`,
          { signal: controller.signal }
        );
        const json = await res.json();
        setResults(json);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Search failed", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, 500); // ⏱ DEBOUNCE DELAY

  return () => {
    clearTimeout(debounceTimer);
    controller.abort();
  };
}, [query]);


  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Header />

      {/* BACKGROUND */}
      <img
        src={BANNER_IMG}
        alt="BG"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* CONTENT */}
      <div className="relative z-10 pt-32 px-4 sm:px-6 md:px-12">
        <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6">
          Search results for "{query}"
        </h1>

        {loading ? (
          <p className="text-gray-400">Searching...</p>
        ) : results.length === 0 ? (
          <p className="text-gray-400">No results found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {results.map((item) => (
              <MediaCard
                key={`${item.media_type}-${item.id}`}
                id={item.id}
                type={item.media_type}
                posterPath={item.poster_path || item.backdrop_path}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
