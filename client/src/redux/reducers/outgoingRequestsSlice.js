/**
 * Represents all outcoming friend requests sent from this user to other users
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
