import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userslice";

const store = configureStore({
    // eska andar humm sara reducer pass kara ga
    reducer: {
        // actions :
        user: userSlice
    }
})

export default store;