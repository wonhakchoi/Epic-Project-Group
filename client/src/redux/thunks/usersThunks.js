import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/usersService";

export const getUsersAsync = createAsyncThunk("users/getUsers", async () => {
    return await UserService.getUsers();
});

export const acceptIncomingAsync = createAsyncThunk("users/acceptIncoming", async ({ userID, otherID }) => {
    return await UserService.acceptIncoming(userID, otherID);
});

export const rejectIncomingAsync = createAsyncThunk("users/rejectIncoming", async ({ userID, otherID }) => {
    return await UserService.rejectIncoming(userID, otherID);
});

export const sendOutgoingAsync = createAsyncThunk("users/sendOutgoing", async ({ userID, otherID }) => {
    return await UserService.sendOutgoing(userID, otherID);
});

export const cancelOutgoingAsync = createAsyncThunk("users/cancelOutgoing", async ({ userID, otherID }) => {
    return await UserService.cancelOutgoing(userID, otherID);
});

export const unfriendAsync = createAsyncThunk("users/unfriend", async ({ userID, otherID }) => {
    return await UserService.unfriend(userID, otherID);
});

export const editIconAsync = createAsyncThunk("users/editIcon", async ({ userID, iconID }) => {
    return await UserService.editIcon(userID, iconID);
});

export const editBiographyAsync = createAsyncThunk("users/editBio", async ({ userID, biography }) => {
    return await UserService.editBiography(userID, biography);
});
