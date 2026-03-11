import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

// now lets give the name to slice : 
const userSlice = createSlice({
    // yha par bas humko slice ka naam batna hota hai
    name: "user",
    initialState: {
        user: null,
        otherUsers: null,
        profile: null,
    },
    reducers: {
        // multiple actions
        getUser: (state, action) => {
            state.user = action.payload
        },
        getOtherUser: (state, action) => {
            state.otherUsers = action.payload
        },
        getProfile: (state,action) => {
            state.profile = action.payload
        },
        followingUpdate: (state,action) => {
            if(state.user.following.includes(action.payload)) {
                // unfollow
                state.user.following = state.user.following.filter((itemId) => itemId !== action.payload)
            }
            else {
                // follow
                state.user.following.push(action.payload)
            }
        }
    }
})

export const { getOtherUser, getUser, getProfile, followingUpdate } = userSlice.actions
export default userSlice.reducer;