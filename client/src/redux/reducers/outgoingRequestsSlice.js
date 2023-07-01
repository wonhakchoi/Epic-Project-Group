/**
 * Represents all outcoming friend requests sent from this user to other users
 */

import { createSlice } from "@reduxjs/toolkit";

const outgoingRequestsSlice = createSlice({
    name: "outgoingRequests",
    initialState: ["12", "15"],
    reducers: {
        strangerToOutgoing: (state, action) => {
            state.push(action.payload);
        },
        outgoingToStranger: (state, action) => {
            return state.filter((id) => id !== action.payload);
        },
    },
});

export const { strangerToOutgoing, outgoingToStranger } = outgoingRequestsSlice.actions;
export default outgoingRequestsSlice.reducer;
