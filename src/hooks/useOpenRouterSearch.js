import { BACKEND_API } from "../assets/constants";

const useOpenRouterSearch = () => {
  const getRecommendations = async ({
    query,
    type = "both" // movie | tv | both
  }) => {
    if (!query) return [];

    try {
      const res = await fetch(
        `${BACKEND_API}/api/gpt/search`,
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
