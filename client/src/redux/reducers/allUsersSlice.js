/**
 * Represents all users on the site
 */

import { createSlice } from "@reduxjs/toolkit";
import { getUsersAsync, editIconAsync, editBiographyAsync } from "../thunks/usersThunks";
import { REQUEST_STATE } from "../requestStates";

let initialState = {
    users: [],
    getUsers: REQUEST_STATE.PENDING,
    editIcon: REQUEST_STATE.PENDING,
    editBiography: REQUEST_STATE.PENDING,
    error: null,
};

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
            })
            .addCase(editIconAsync.pending, (state) => {
                state.editIcon = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(editIconAsync.fulfilled, (state, action) => {
                state.editIcon = REQUEST_STATE.FULFILLED;
                const updatedUser = action.payload.data;
                state.users = state.users.map((user) =>
                    user._id === updatedUser._id ? { ...user, icon: updatedUser.icon } : user
                );
            })
            .addCase(editIconAsync.rejected, (state, action) => {
                state.editIcon = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(editBiographyAsync.pending, (state) => {
                state.editBiography = REQUEST_STATE.PENDING;
                state.error = null;
            })
            .addCase(editBiographyAsync.fulfilled, (state, action) => {
                state.editBiography = REQUEST_STATE.FULFILLED;
                const updatedUser = action.payload.data;
                state.users = state.users.map((user) =>
                    user._id === updatedUser._id ? { ...user, biography: updatedUser.biography } : user
                );
            })
            .addCase(editBiographyAsync.rejected, (state, action) => {
                state.editBiography = REQUEST_STATE.REJECTED;
                state.error = action.error;
            });
    },
});

export default allUsersSlice.reducer;
