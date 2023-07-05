import { createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../services/usersService";

export const getUsersAsync = createAsyncThunk("users", async () => {
    return await UserService.getUsers();
});
