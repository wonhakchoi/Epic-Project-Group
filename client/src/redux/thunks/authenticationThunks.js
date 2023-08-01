import {createAsyncThunk} from "@reduxjs/toolkit";
import {doLogin, doSignup, postAuth} from "../services/authenticationService";

export const postAuthAsync = createAsyncThunk(
    'authentication/postAuth',
    async () => {
        return await postAuth();
    }
)

export const loginAsync = createAsyncThunk(
    'authentication/loginAsync',
    async ({email, password}) => {
        return await doLogin({email: email, password: password});
    }
)

export const signupAsync = createAsyncThunk(
    'authentication/signUpAsync',
    async ({email, password, firstName, lastName}) => {
        return await doSignup({email: email, password: password, firstName: firstName, lastName: lastName});
    }
)
