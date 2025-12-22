import openrouter from "../utils/openRouter";

const useOpenRouterMovies = () => {
  const getMovieRecommendations = async (userQuery) => {
    if (!userQuery) return [];

    const prompt = `Return ONLY a comma-separated list of valid movie titles.
                    No numbering.
                    No explanations.
                    No extra text.
                    Give atleast 25 Movies
                    User query: "${userQuery}"`;
    try {
      const response = await openrouter.chat.send({
        model: "nex-agi/deepseek-v3.1-nex-n1:free",
        messages: [{ role: "user", content: prompt }],
      });

      const movieText = response?.choices?.[0]?.message?.content || "";

      return movieText.split(",").map((movie) => movie.trim()).filter(Boolean);
      
    } catch (error) {
      console.error("OpenRouter error:", error);
      return [];
    }
  };

  return { getMovieRecommendations };
};

export default useOpenRouterMovies;
