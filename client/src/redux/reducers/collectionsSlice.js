import {createSlice} from "@reduxjs/toolkit";
import {REQUEST_STATE} from "../requestStates";
import {
    addNewCollectionAsync, deleteRestaurantCollectionAsync,
    getCollectionDetailsAsync,
    getCollectionsAsync,
    getRestaurantsAsync
} from "../thunks/collectionsThunks";

// reducer logic for collections

const INITIAL_STATE = {
    collections: [],
    currCollectionDetails: {},
    currRestaurants: [],
    formVisible: false,
    newCollectionName: "",
    newCollectionImg: "",
    getCollections: REQUEST_STATE.IDLE,
    getCollectionDetails: REQUEST_STATE.IDLE,
    getRestaurants: REQUEST_STATE.IDLE,
    addCollection: REQUEST_STATE.IDLE,
    deleteRestaurant: REQUEST_STATE.IDLE
}

const collectionsSlice = createSlice({
    name: 'collections',
    initialState: INITIAL_STATE,
    reducers: {
        clickCollection: (state, action) => {
            state.currCollectionDetails = action.payload;
        },
        addRestaurantToCollection: (state, action) => {
            let id = action.payload.collectionId;
            let currCollection = state.collections.find(element => element.id === id);
            currCollection.restaurants.push(action.payload.restaurant);
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
            .addCase(getCollectionDetailsAsync.pending, (state) => {
                state.getCollectionDetails = REQUEST_STATE.PENDING;
            })
            .addCase(getCollectionDetailsAsync.fulfilled, (state, action) => {
                state.getCollectionDetails = REQUEST_STATE.FULFILLED;
                state.currCollectionDetails = action.payload;
            })
            .addCase(getCollectionDetailsAsync.rejected, (state) => {
                state.getCollectionDetails = REQUEST_STATE.REJECTED;
            })
            .addCase(getRestaurantsAsync.pending, (state) => {
                state.getRestaurants = REQUEST_STATE.PENDING;
            })
            .addCase(getRestaurantsAsync.fulfilled, (state, action) => {
                state.getRestaurants = REQUEST_STATE.FULFILLED;
                state.currRestaurants = action.payload;
            })
            .addCase(getRestaurantsAsync.rejected, (state) => {
                state.getRestaurants = REQUEST_STATE.REJECTED;
            })
            .addCase(addNewCollectionAsync.pending, (state) => {
                state.addCollection = REQUEST_STATE.PENDING;
            })
            .addCase(addNewCollectionAsync.fulfilled, (state) => {
                state.addCollection = REQUEST_STATE.FULFILLED;
            })
            .addCase(addNewCollectionAsync.rejected, (state) => {
                state.addCollection = REQUEST_STATE.REJECTED;
            })
            .addCase(deleteRestaurantCollectionAsync.rejected, (state) => {
                state.deleteRestaurant = REQUEST_STATE.REJECTED;
            })
            .addCase(deleteRestaurantCollectionAsync.pending, (state) => {
                state.deleteRestaurant = REQUEST_STATE.PENDING;
            })
            .addCase(deleteRestaurantCollectionAsync.fulfilled, (state) => {
                state.deleteRestaurant = REQUEST_STATE.FULFILLED;
            })
    }
})

export const {
    addRestaurantToCollection,
    showForm,
    hideForm,
    setCollectionName,
    setCollectionImg
} = collectionsSlice.actions;
export default collectionsSlice.reducer;