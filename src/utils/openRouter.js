import { OpenRouter } from "@openrouter/sdk";

const openrouter = new OpenRouter({
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": window.location.origin, // required by OpenRouter
    "X-Title": "Netflix-GPT",                // any app name
  },
});

export default openrouter;
