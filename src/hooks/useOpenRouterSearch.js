const useOpenRouterSearch = () => {
  const getRecommendations = async ({
    query,
    type = "both" // movie | tv | both
  }) => {
    if (!query) return [];

    try {
      const res = await fetch(
        "https://netflix-gpt-backend-6ayv.onrender.com/api/gpt/search",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, type }),
        }
      );

      if (!res.ok) {
        throw new Error("GPT API failed");
      }

      const results = await res.json(); // already array
      return results;

    } catch (err) {
      console.error("GPT Backend error:", err);
      return [];
    }
  };

  return { getRecommendations };
};

export default useOpenRouterSearch;
