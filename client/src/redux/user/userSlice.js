import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   currentUser: null,
   error: null,
   loading: false,
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      loginInStart: (state) => {
         state.loading = true;
      },
      loginInSuccess: (state, action) => {
         state.currentUser = action.payload;
         state.loading = false;
         state.error = null;
      },
      loginInFailure: (state, action) => {
         state.error = action.payload;
         state.loading = false;
      },
      updateUserStart: (state) => {
         state.loading = true;
      },
      updateUserSuccess: (state, action) => {
         state.currentUser = action.payload;
         state.loading = false;
         state.error = null;
      },
      updateUserFailure: (state, action) => {
         state.error = action.payload;
         state.loading = false;
      },
      deleteUserStart: (state) => {
         state.loading = true;
      },
      deleteUserSuccess: (state) => {
         state.currentUser = null;
         state.loading = false;
         state.error = null;
      },
   },
});

export const {
   loginInFailure,
   loginInStart,
   loginInSuccess,
   updateUserStart,
   updateUserSuccess,
   updateUserFailure,
   deleteUserStart,
   deleteUserSuccess,
} = userSlice.actions;

export default userSlice.reducer;
