import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies : null,
        trailerVideo : null,
        popularMovies : null,
        upcomingMovies : null,
        topRatedMovies : null,
        classicMovies:null,
        crimeMovies:null,
        fantasyMovies:null,
        horrorMovies:null,
        romanceMovies : null,
        documentaries : null,
        comedyMovies: null,
    },
    reducers : {
        addNowPlayingMovies : (state, action) => {
            state.nowPlayingMovies = action.payload;
        },

        addPopularMovies : (state , action) => {
            state.popularMovies = action.payload;
        },

        addTopRatedMovies : (state , action) => {
            state.topRatedMovies = action.payload;
        },

        addUpcomingMovies : (state, action) => {
            state.upcomingMovies = action.payload;
        },

        addTrailerVideo : (state, action) => {
            state.trailerVideo = action.payload;
        },

        addClassicMovies : (state, action) => {
            state.classicMovies = action.payload;
        },

        addCrimeMovies : (state, action) => {
            state.crimeMovies = action.payload;
        },

        addFantasyMovies : (state, action) => {
            state.fantasyMovies = action.payload;
        },

        addHorrorMovies : (state, action) => {
            state.horrorMovies = action.payload;
        },

        addRomanceMovies : (state, action) => {
            state.romanceMovies = action.payload;
        },

        addDocumentaries : (state , action) => {
            state.documentaries = action.payload;
        },

        addComedyMovies : (state , action) => {
            state.comedyMovies = action.payload;
        }
        
    },
});

export const { 
    addNowPlayingMovies, addTrailerVideo, addPopularMovies,
    addUpcomingMovies, addTopRatedMovies, addClassicMovies,
    addCrimeMovies, addFantasyMovies, addHorrorMovies,
    addDocumentaries, addRomanceMovies, addComedyMovies } = moviesSlice.actions;

export default moviesSlice.reducer;