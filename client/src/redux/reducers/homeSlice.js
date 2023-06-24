
// reducer logic for the home page: search bar and restaurant display

import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
    addCollectionVisible: false,
}

const homeSlice = createSlice({
    name: 'home',
    initialState: INITIAL_STATE,
    reducers: {
        displayAddToCollection: (state) => {
            state.addCollectionVisible = true;
        }
    }
})

export const {displayAddToCollection} = homeSlice.actions;
export default homeSlice.reducer;