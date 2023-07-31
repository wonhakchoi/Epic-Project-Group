import {createSlice} from "@reduxjs/toolkit";
import {REQUEST_STATE} from "../requestStates";
import {postAuthAsync} from "../thunks/authenticationThunks";

// reducer logic for auth
const INITIAL_STATE = {
    postAuth: REQUEST_STATE.IDLE
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
            .addCase(postAuthAsync.rejected, (state) => {
                state.postAuth = REQUEST_STATE.REJECTED;
            })
    }
})

export default sauthSlice.reducer;