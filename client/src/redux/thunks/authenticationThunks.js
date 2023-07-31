import {createAsyncThunk} from "@reduxjs/toolkit";
import {postAuth} from "../services/authenticationService";

export const postAuthAsync = createAsyncThunk(
    'authentication/postAuth',
    async () => {
        return postAuth();
    }
)
