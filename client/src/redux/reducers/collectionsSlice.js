import {createSlice} from "@reduxjs/toolkit";
import {sampleUserCollections} from "../data/sampleCollections";

// reducer logic for collections

const INITIAL_STATE = {
    collections: sampleUserCollections,
    currCollectionDetails: {},
    currCollection: []
}

const collectionsSlice = createSlice({
    name: 'collections',
    initialState: INITIAL_STATE,
    reducers: {
        addCollection: (state, action) => {
            state.collections = [...state.collections, action.payload];
        },
        clickCollection: (state, action) => {
            state.currCollectionDetails = action.payload;
        }
    }
})

export const {addCollection, clickCollection} = collectionsSlice.actions;
export default collectionsSlice.reducer;