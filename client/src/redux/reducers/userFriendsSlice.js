/**
 * Represents all friends of the user
 */

import { createSlice } from "@reduxjs/toolkit";

const userFriendsSlice = createSlice({
    name: "userFriends",
    initialState: [
        "64a20849b5b47429af1b7900",
        "64a20849b5b47429af1b7908",
        "64a20849b5b47429af1b7901",
        "64a20849b5b47429af1b7904",
    ],
    reducers: {
        incomingToFriend(state, action) {
            state.push(action.payload);
        },
    },
});

export const { incomingToFriend } = userFriendsSlice.actions;

export default userFriendsSlice.reducer;
