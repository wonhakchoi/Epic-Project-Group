/**
 * Represents all incoming friend requests sent from other users to this user
 */

import { createSlice } from "@reduxjs/toolkit";

const incomingRequestsSlice = createSlice({
    name: "incomingRequests",
    initialState: new Set(["7", "10"]),
    reducers: {
        incomingToFriend(state, action) {
            state.delete(action.payload);
        },
        incomingToStranger(state, action) {
            state.delete(action.payload);
        },
    },
});

export const { incomingToFriend, incomingToStranger } = incomingRequestsSlice.actions;

export default incomingRequestsSlice.reducer;
