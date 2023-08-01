import {createSlice} from "@reduxjs/toolkit";
import {REQUEST_STATE} from "../requestStates";
import {loginAsync, postAuthAsync, signupAsync} from "../thunks/authenticationThunks";

// reducer logic for auth
const INITIAL_STATE = {
    isLoggedIn: false,
    currUser: null,
    error: null,
    // token: null,
    postAuth: REQUEST_STATE.IDLE,
    login: REQUEST_STATE.IDLE,
    signup: REQUEST_STATE.IDLE
}

const sauthSlice = createSlice({
    name: 'sauth',
    initialState: INITIAL_STATE,
    extraReducers: (builder) => {
        builder
            .addCase(postAuthAsync.pending, (state) => {
                state.postAuth = REQUEST_STATE.PENDING;
            })
            .addCase(postAuthAsync.fulfilled, (state) => {
                state.postAuth = REQUEST_STATE.FULFILLED;
            })
            .addCase(postAuthAsync.rejected, (state, action) => {
                state.postAuth = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(loginAsync.pending, (state) => {
                state.login = REQUEST_STATE.PENDING;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.login = REQUEST_STATE.FULFILLED;
                state.isLoggedIn = true;
                // state.token = action.payload.token;
                state.currUser = action.payload.user;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.login = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
            .addCase(signupAsync.pending, (state) => {
                state.signup = REQUEST_STATE.PENDING;
            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.signup = REQUEST_STATE.FULFILLED;
                state.isLoggedIn = true;
                // state.token = action.payload.token;
                state.currUser = action.payload.user;
            })
            .addCase(signupAsync.rejected, (state, action) => {
                state.signup = REQUEST_STATE.REJECTED;
                state.error = action.error;
            })
    }
})

export default sauthSlice.reducer;