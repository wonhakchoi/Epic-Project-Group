import {createSlice} from "@reduxjs/toolkit";
// import {sampleUserCollections} from "../data/sampleCollections";
import {REQUEST_STATE} from "../requestStates";
import {getCollectionsAsync} from "../thunks/collectionsThunks";
// import getCollections from "../services/collectionsService";

// reducer logic for collections

const INITIAL_STATE = {
    collections: [],
    currCollectionDetails: {},
    currCollection: [],
    getCollections: REQUEST_STATE.IDLE
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCollectionsAsync.pending, (state) => {
                state.getCollections = REQUEST_STATE.PENDING;
            })
            .addCase(getCollectionsAsync.fulfilled, (state, action) => {
                state.getCollections = REQUEST_STATE.FULFILLED;
                state.collections = action.payload;
            })
            .addCase(getCollectionsAsync.rejected, (state) => {
                state.getCollections = REQUEST_STATE.REJECTED;
            })
    }
})

export const {addCollection, clickCollection} = collectionsSlice.actions;
export default collectionsSlice.reducer;