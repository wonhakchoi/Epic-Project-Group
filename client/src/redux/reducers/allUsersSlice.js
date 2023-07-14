/**
 * Represents all users on the site
 *
 * id: {
 *      name: "Michael Myers",
 *      biography: "UBC Student",
 *      rated_restaurants: {
 *          1: 4.5,
 *          3: 2.9
 *      }
 * }
 */

import { createSlice } from "@reduxjs/toolkit";
import { getUsersAsync } from "../thunks/usersThunks";
import { REQUEST_STATE } from "../requestStates";

let initialState = { users: [], getUsers: REQUEST_STATE.PENDING, error: null };

const allUsersSlice = createSlice({
    name: "allUsers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getUsersAsync.pending, (state) => {
                state.getUsers = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(getUsersAsync.fulfilled, (state, action) => {
                state.getUsers = REQUEST_STATE.FULFILLED;
                state.users = action.payload.data;
            })
            .addCase(getUsersAsync.rejected, (state, action) => {
                state.getUsers = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    },
});

export default allUsersSlice.reducer;
