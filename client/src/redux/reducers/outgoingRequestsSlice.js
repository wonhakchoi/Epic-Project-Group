/**
 * Represents all outcoming friend requests sent from this user to other users
 */

import { createSlice } from "@reduxjs/toolkit";
import { sendOutgoingAsync, cancelOutgoingAsync } from "../thunks/usersThunks";
import { REQUEST_STATE } from "../requestStates";

let initialState = {
    outgoingRequests: [],
    sendOutgoing: REQUEST_STATE.PENDING,
    cancelOutgoing: REQUEST_STATE.PENDING,
    error: null,
};

const outgoingRequestsSlice = createSlice({
    name: "outgoingRequests",
    initialState,
    reducers: {
        setOutgoingRequests(state, action) {
            state.outgoingRequests = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendOutgoingAsync.pending, (state) => {
                state.sendOutgoing = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(sendOutgoingAsync.fulfilled, (state, action) => {
                state.sendOutgoing = REQUEST_STATE.FULFILLED;
                state.outgoingRequests = action.payload.data.outgoingRequests;
            })
            .addCase(sendOutgoingAsync.rejected, (state, action) => {
                state.sendOutgoing = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(cancelOutgoingAsync.pending, (state) => {
                state.cancelOutgoing = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(cancelOutgoingAsync.fulfilled, (state, action) => {
                state.cancelOutgoing = REQUEST_STATE.FULFILLED;
                state.outgoingRequests = action.payload.data.outgoingRequests;
            })
            .addCase(cancelOutgoingAsync.rejected, (state, action) => {
                state.cancelOutgoing = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    },
});

export const { setOutgoingRequests } = outgoingRequestsSlice.actions;

export default outgoingRequestsSlice.reducer;
