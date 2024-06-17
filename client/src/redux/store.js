import userReducer from "./user/userSlice.js";
import modeReducer from "./mode/modeSlice.js";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
   user: userReducer,
   mode: modeReducer,
});

const presistedReducer = persistReducer(
   {
      key: "root",
      storage,
      version: 1,
   },
   rootReducer
);
export const store = configureStore({
   reducer: presistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
