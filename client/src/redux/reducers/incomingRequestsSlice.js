/**
 * Represents all incoming friend requests sent from other users to this user


const incomingRequests = (inRequests = new Set(["7", "10"]), action) => {
    switch (action.type) {
        case "INCOMING_TO_FRIEND":
        case "INCOMING_TO_STRANGER":
            const updatedSet = new Set(inRequests);
            updatedSet.delete(action.payload);
            return updatedSet;
        default:
            return inRequests;
    }
};

export default incomingRequests;
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
