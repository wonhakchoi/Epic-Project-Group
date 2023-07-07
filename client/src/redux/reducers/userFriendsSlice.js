/**
 * Represents all friends of the user
 */

import { createSlice } from "@reduxjs/toolkit";
import { acceptIncomingAsync } from "../thunks/usersThunks";
import { REQUEST_STATE } from "../requestStates";

let initialState = { friends: [], acceptIncoming: REQUEST_STATE.PENDING, error: null };

const userFriendsSlice = createSlice({
    name: "userFriends",
    initialState,
    reducers: {
        setFriends(state, action) {
            state.friends = action.payload;
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
                state.friends = action.payload.data.friends;
            })
            .addCase(acceptIncomingAsync.rejected, (state, action) => {
                state.acceptIncoming = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    },
});

export const { setFriends } = userFriendsSlice.actions;

export default userFriendsSlice.reducer;
