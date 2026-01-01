import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import moviesReducer from "./moviesSlice.js";
import GPTReducer from "./GPTSlice.js";
import langReducer from "./languageSlice.js";
import videoReducer from "./videoSlice.js";
import tvShowsReducer from "./tvShowsSlice.js";

const appStore = configureStore({
    reducer : {
        user : userReducer,
        movies : moviesReducer,
        GPT : GPTReducer,
        langauge : langReducer,
        video: videoReducer,
        tvShows : tvShowsReducer,
    },
});

export default appStore;