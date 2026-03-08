import { createSlice } from "@reduxjs/toolkit";

// now lets give the name to slice : 
const userSlice = createSlice({
    // yha par bas humko slice ka naam batna hota hai
    name: "user",
    initialState: {
        user: null,
        otherUsers: null
    },
    reducers: {
        // multiple actions: 
        getUser: (state, action) => {
            state.user = action.payload
        },
        getOtherUser: (state, action) => {
            state.otherUsers = action.payload
        }
    }
})

export const { getOtherUser, getUser } = userSlice.actions
export default userSlice.reducer;