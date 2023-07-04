/**
 * Represents all outcoming friend requests sent from this user to other users
 */

import { createSlice } from "@reduxjs/toolkit";

const outgoingRequestsSlice = createSlice({
    name: "outgoingRequests",
    initialState: ["64a20849b5b47429af1b7909"],
    reducers: {
        setOutgoingRequests(state, action) {
            return action.payload;
        },
        strangerToOutgoing: (state, action) => {
            state.push(action.payload);
        },
        outgoingToStranger: (state, action) => {
            return state.filter((id) => id !== action.payload);
        },
    },
});

export const { setOutgoingRequests, strangerToOutgoing, outgoingToStranger } = outgoingRequestsSlice.actions;

export default outgoingRequestsSlice.reducer;
