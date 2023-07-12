import {createSlice} from "@reduxjs/toolkit";
import {REQUEST_STATE} from "../requestStates";
import {getCollectionsAsync} from "../thunks/collectionsThunks";

import {v4 as uuid} from "uuid";

// reducer logic for collections

const INITIAL_STATE = {
    collections: [],
    currCollectionDetails: {},
    getCollections: REQUEST_STATE.IDLE,
    formVisible: false,
    newCollectionName: "",
    newCollectionImg: ""
}

const collectionsSlice = createSlice({
    name: 'collections',
    initialState: INITIAL_STATE,
    reducers: {
        addCollection: (state) => {
            let newCollection = {
                id: uuid(),
                name: state.newCollectionName,
                img: state.newCollectionImg,
                restaurants: []
            }
            state.collections = [...state.collections, newCollection];
        },
        clickCollection: (state, action) => {
            state.currCollectionDetails = action.payload;
        },
        addRestaurantToCollection: (state, action) => {
            let id = action.payload.collectionId;
            let currCollection = state.collections.find(element => element.id === id);
            currCollection.restaurants.push(action.payload.restaurant);
        },
        deleteRestaurantFromCollection: (state, action) => {
            let restaurantId = action.payload.id;
            let collectionId = state.currCollectionDetails.id;
            let currCollection = state.collections.find(element => element.id === collectionId);
            let cIndex = state.collections.indexOf(currCollection)
            currCollection.restaurants = currCollection.restaurants.filter(element => element.id !== restaurantId);
            state.collections[cIndex] = currCollection;
            state.currCollectionDetails = currCollection;
        },
        showForm: (state) => {
            state.formVisible = true;
        },
        hideForm: (state) => {
            state.formVisible = false;
        },
        setCollectionName: (state, action) => {
            state.newCollectionName = action.payload;
        },
        setCollectionImg: (state, action) => {
            state.newCollectionImg = action.payload;
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

export const {addCollection, clickCollection, addRestaurantToCollection, deleteRestaurantFromCollection,
    showForm, hideForm, setCollectionName, setCollectionImg} = collectionsSlice.actions;
export default collectionsSlice.reducer;