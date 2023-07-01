/**
 * Represents all friends of the user
 */

import { createSlice } from "@reduxjs/toolkit";

const userFriendsSlice = createSlice({
    name: "userFriends",
    initialState: new Set(["1", "2", "3", "4", "5", "9"]),
    reducers: {
        incomingToFriend(state, action) {
            state.add(action.payload);
        },
    },
});

export const { incomingToFriend } = userFriendsSlice.actions;

export default userFriendsSlice.reducer;
