/**
 * Represents all incoming friend requests sent from other users to this user
 */

import { createSlice } from "@reduxjs/toolkit";

const incomingRequestsSlice = createSlice({
    name: "incomingRequests",
    initialState: ["64a20849b5b47429af1b790a"],
    reducers: {
        setIncomingRequests(state, action) {
            return action.payload;
        },
        incomingToFriend(state, action) {
            return state.filter((id) => id !== action.payload);
        },
        incomingToStranger(state, action) {
            return state.filter((id) => id !== action.payload);
        },
    },
});

export const { setIncomingRequests, incomingToFriend, incomingToStranger } = incomingRequestsSlice.actions;

export default incomingRequestsSlice.reducer;
