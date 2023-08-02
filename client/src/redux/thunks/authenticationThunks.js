import {createAsyncThunk} from "@reduxjs/toolkit";
import {doLogin, doSignup, postAuth} from "../services/authenticationService";
import {useDispatch} from "react-redux";

export const postAuthAsync = createAsyncThunk(
    'authentication/postAuth',
    async (token) => {
        try {
            return await postAuth(token);
        } catch (e) {
            console.error(e)
        }
    }
)

export const loginAsync = createAsyncThunk(
    'authentication/loginAsync',
    async ({email, password}, {rejectWithValue}) => {
        try {
            return await doLogin({email: email, password: password});
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

export const signupAsync = createAsyncThunk(
    'authentication/signUpAsync',
    async ({email, password, firstName, lastName}, {rejectWithValue}) => {
        try {
            return await doSignup({email: email, password: password, firstName: firstName, lastName: lastName});
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)
