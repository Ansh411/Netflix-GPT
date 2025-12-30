const useOpenRouterMovies = () => {
  const getMovieRecommendations = async (userQuery) => {
    if (!userQuery) return [];

    try {
      const res = await fetch(
        "https://netflix-gpt-backend-6ayv.onrender.com/api/gpt/movies",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: userQuery }),
        }
      );

      if (!res.ok) throw new Error("GPT API failed");

      const movies = await res.json(); // already array
      return movies;

    } catch (err) {
      console.error("GPT Backend error:", err);
      return [];
    }
  };

  return { getMovieRecommendations };
};

export default useOpenRouterMovies;
