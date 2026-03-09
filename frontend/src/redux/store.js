import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userSlice from "./userslice";
import tweetSlice from "./tweetslice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


// combine all reducers
const rootReducer = combineReducers({
  user: userSlice,
  tweet: tweetSlice
});


// persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"] 
  // only persist user data (recommended)
};


// create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


// create store
const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});


// persistor
export const persistor = persistStore(store);

export default store;