/**
 * Represents all outcoming friend requests sent from this user to other users
 

const outgoingRequests = (outRequests = new Set(["12", "15"]), action) => {
    switch (action.type) {
        case "STRANGER_TO_OUTGOING":
            return new Set([...outRequests, action.payload]);
        case "OUTGOING_TO_STRANGER":
            const updatedSet = new Set(outRequests);
            updatedSet.delete(action.payload);
            return updatedSet;
        default:
            return outRequests;
    }
};

export default outgoingRequests;
*/

import { createSlice } from "@reduxjs/toolkit";

const outgoingRequestsSlice = createSlice({
    name: "outgoingRequests",
    initialState: new Set(["12", "15"]),
    reducers: {
        strangerToOutgoing: (state, action) => {
            state.add(action.payload);
        },
        outgoingToStranger: (state, action) => {
            state.delete(action.payload);
        },
    },
});

export const { strangerToOutgoing, outgoingToStranger } = outgoingRequestsSlice.actions;
export default outgoingRequestsSlice.reducer;
