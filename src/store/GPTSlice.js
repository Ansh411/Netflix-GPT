import { createSlice } from "@reduxjs/toolkit";

const GPTSlice = createSlice({
    name: "GPT",
    initialState : {
        showGPTSearch : false,
        GPTSearchText : "",
        movieResults : null,
        movieNames : null,
        isLoading: false,
    },
    reducers : {
        toggleGPTSearchView : (state) => {
            state.showGPTSearch = !state.showGPTSearch;
        },

        startGPTLoading : (state) => {
            state.isLoading = true;
        },

        addSearchText : (state, action) => {
            state.GPTSearchText = action.payload;
        },

        addGPTMovieResult : (state, action) => {
            const { movieNames , movieResults } = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
            state.isLoading = false;
        },
    },
});

export const { toggleGPTSearchView, startGPTLoading, addSearchText, addGPTMovieResult } = GPTSlice.actions;

export default GPTSlice.reducer;