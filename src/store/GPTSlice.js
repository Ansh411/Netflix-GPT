import { createSlice } from "@reduxjs/toolkit";

const GPTSlice = createSlice({
  name: "GPT",
  initialState: {
    GPTSearchText: "",
    results: null,
    names: null,
    isLoading: false,
    searchType: "both"
  },
  reducers: {
    startGPTLoading: (state) => {
      state.isLoading = true;
    },
    addSearchText: (state, action) => {
      state.GPTSearchText = action.payload;
    },
    addGPTResults: (state, action) => {
      const { names, results } = action.payload;
      state.names = names;
      state.results = results;
      state.isLoading = false;
    },
    setSearchType: (state, action) => {
      state.searchType = action.payload;
    }
  }
});


export const { startGPTLoading, addSearchText, addGPTResults, setSearchType } = GPTSlice.actions;

export default GPTSlice.reducer;