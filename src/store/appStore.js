import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.js";
import moviesReducer from "./moviesSlice.js";
import GPTReducer from "./GPTSlice.js";
import langReducer from "./languageSlice.js";

const appStore = configureStore({
    reducer : {
        user : userReducer,
        movies : moviesReducer,
        GPT : GPTReducer,
        langauge : langReducer,
    },
});

export default appStore;