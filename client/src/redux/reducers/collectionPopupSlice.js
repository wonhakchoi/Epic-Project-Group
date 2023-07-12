// reducer logic for the home page: search bar and restaurant display

import {createSlice} from "@reduxjs/toolkit";

const INITIAL_STATE = {
    addCollectionVisible: false,
    popupRestaurant: {}
}

const collectionPopupSlice = createSlice({
    name: 'collectionPopup',
    initialState: INITIAL_STATE,
    reducers: {
        displayAddToCollection: (state) => {
            state.addCollectionVisible = true;
        },
        hideAddToCollection: (state) => {
            state.addCollectionVisible = false;
        },
        setRestaurant: (state, action) => {
            state.popupRestaurant = action.payload;
        }
    }
})

export const {displayAddToCollection, hideAddToCollection, setRestaurant} = collectionPopupSlice.actions;
export default collectionPopupSlice.reducer;