import { createSlice } from "@reduxjs/toolkit";

const videoSlice = createSlice({
  name: "video",
  initialState: {
    muted: true,
  },
  reducers: {
    toggleMute: (state) => {
      state.muted = !state.muted;
    },
    setMuted: (state, action) => {
      state.muted = action.payload;
    },
  },
});

export const { toggleMute, setMuted } = videoSlice.actions;
export default videoSlice.reducer;


"Added more components like caste and crew info and similar movies components with meta tags in MoviesInfo Page"