import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import moviesReducer from "./moviesSlice.js";
import GPTReducer from "./GPTSlice.js";
import langReducer from "./languageSlice.js";
import watchlistReducer from "./watchlistSlice.js";

const appStore = configureStore({
    reducer : {
        user : userReducer,
        movies : moviesReducer,
        GPT : GPTReducer,
        langauge : langReducer,
        watchlist: watchlistReducer,
    },
});

export default appStore;