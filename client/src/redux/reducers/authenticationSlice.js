import {createSlice} from "@reduxjs/toolkit";
import {REQUEST_STATE} from "../requestStates";
import {loginAsync, postAuthAsync, signupAsync} from "../thunks/authenticationThunks";

// reducer logic for auth
const INITIAL_STATE = {
    isLoggedIn: false,
    currUser: null,
    error: null,
    postAuth: REQUEST_STATE.IDLE,
    login: REQUEST_STATE.IDLE,
    signup: REQUEST_STATE.IDLE
}

const sauthSlice = createSlice({
    name: 'sauth',
    initialState: INITIAL_STATE,
    reducers: {
        doLogout: (state ) => {
            state.isLoggedIn = true;
            state.currUser = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(postAuthAsync.pending, (state) => {
                state.postAuth = REQUEST_STATE.PENDING;
            })
            .addCase(postAuthAsync.fulfilled, (state, action) => {
                state.postAuth = REQUEST_STATE.FULFILLED;
                if (action.payload.status) {
                    state.currUser = action.payload.user._id;
                    state.isLoggedIn = true;
                } else {
                    state.currUser = null;
                    state.isLoggedIn = false;
                }
            })
            .addCase(postAuthAsync.rejected, (state) => {
                state.postAuth = REQUEST_STATE.REJECTED;
                state.isLoggedIn = false;
                state.currUser = null;
            })
            .addCase(loginAsync.pending, (state) => {
                state.login = REQUEST_STATE.PENDING;
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.login = REQUEST_STATE.FULFILLED;
                state.isLoggedIn = true;
                state.currUser = action.payload.user._id;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.login = REQUEST_STATE.REJECTED;
                state.error = action.payload;
            })
            .addCase(signupAsync.pending, (state) => {
                state.signup = REQUEST_STATE.PENDING;
            })
            .addCase(signupAsync.fulfilled, (state, action) => {
                state.signup = REQUEST_STATE.FULFILLED;
                state.isLoggedIn = true;
                state.currUser = action.payload.user._id;
            })
            .addCase(signupAsync.rejected, (state, action) => {
                state.signup = REQUEST_STATE.REJECTED;
                state.error = action.payload;
            })
    }
})

export const {
    doLogout
} = sauthSlice.actions;

export default sauthSlice.reducer;