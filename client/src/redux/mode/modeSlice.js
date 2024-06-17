import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   modeClass: true,
};

const modeSlice = createSlice({
   name: "mode",
   initialState,
   reducers: {
      toggleMode: (state, action) => {
         state.modeClass = !state.modeClass;
      },
   },
});

export const { toggleMode } = modeSlice.actions;

export default modeSlice.reducer;
