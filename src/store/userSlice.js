import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState : {
        data: null,
        loading: true,
    },
    reducers : {
        addUser : (state , action) => {
            state.data = action.payload;
            state.loading = false;
        },
        removeUser : (state) => {
            state.data = null;
            state.loading = false;
        },
        setAuthLoading : (state, action) => {
            state.loading = action.payload;
        },
    },
});

export const { addUser, removeUser, setAuthLoading } = userSlice.actions;

export default userSlice.reducer;