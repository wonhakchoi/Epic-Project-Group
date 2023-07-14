/**
 * Represents all incoming friend requests sent from other users to this user
 */

import { createSlice } from "@reduxjs/toolkit";
import { acceptIncomingAsync, rejectIncomingAsync } from "../thunks/usersThunks";
import { REQUEST_STATE } from "../requestStates";

let initialState = {
    incomingRequests: [],
    acceptIncoming: REQUEST_STATE.PENDING,
    rejectIncoming: REQUEST_STATE.PENDING,
    error: null,
};

const incomingRequestsSlice = createSlice({
    name: "incomingRequests",
    initialState,
    reducers: {
        setIncomingRequests(state, action) {
            state.incomingRequests = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(acceptIncomingAsync.pending, (state) => {
                state.acceptIncoming = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(acceptIncomingAsync.fulfilled, (state, action) => {
                state.acceptIncoming = REQUEST_STATE.FULFILLED;
                state.incomingRequests = action.payload.data.incomingRequests;
            })
            .addCase(acceptIncomingAsync.rejected, (state, action) => {
                state.acceptIncoming = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(rejectIncomingAsync.pending, (state) => {
                state.rejectIncoming = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(rejectIncomingAsync.fulfilled, (state, action) => {
                state.rejectIncoming = REQUEST_STATE.FULFILLED;
                state.incomingRequests = action.payload.data.incomingRequests;
            })
            .addCase(rejectIncomingAsync.rejected, (state, action) => {
                state.rejectIncoming = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    },
});

export const { setIncomingRequests } = incomingRequestsSlice.actions;

export default incomingRequestsSlice.reducer;
