import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name: "tweet",
    initialState: {
        tweets: null,
        // jab jab ek naya tweet add ho to humm chata hai redux state refresh ho
        refresh: false,
        isActive: true
    },
    reducers: {
        getAllTweets: (state, action) => {
            state.tweets = action.payload
        },
        getRefresh: (state) => {
            state.refresh = !state.refresh
        },
        getIsActive: (state,action) => {
            state.isActive = action.payload
        }
    }
});

export const { getAllTweets, getRefresh, getIsActive } = tweetSlice.actions
export default tweetSlice.reducer;