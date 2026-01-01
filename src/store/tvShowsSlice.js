import { createSlice } from "@reduxjs/toolkit";

const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState: {
    popularTV: [],
    topRatedTV: [],
    onTheAir: [],
    detailsTV: {},
    trailersTV: {},
    loading: true,
  },
  reducers: {
    addPopularTV: (state, action) => {
      state.popularTV = action.payload;
    },
    addTopRatedTV : (state, action) => {
      state.topRatedTV = action.payload;
    },
    addOnTheAir : (state , action) => {
      state.onTheAir = action.payload;
    },
    addTVDetails: (state, action) => {
      state.detailsTV[action.payload.id] = action.payload;
    },
    addTVTrailer: (state, action) => {
      state.trailersTV[action.payload.id] = action.payload.trailer;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },  
  },
});

export const { addPopularTV, addTopRatedTV, addOnTheAir, addTVDetails, addTVTrailer, setLoading } = tvShowsSlice.actions;

export default tvShowsSlice.reducer;
