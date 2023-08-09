import {createSlice} from "@reduxjs/toolkit";
import {REQUEST_STATE} from "../requestStates";
import {
    addNewCollectionAsync, deleteCollectionAsync, deleteRestaurantCollectionAsync,
    getCollectionDetailsAsync,
    getCollectionsAsync, getFriendsCollectionsAsync,
    getRestaurantsAsync, patchCollectionPinAsync
} from "../thunks/collectionsThunks";

// reducer logic for collections

const INITIAL_STATE = {
    collections: [],
    friendsCollections: [],
    currCollectionDetails: {},
    currRestaurants: [],
    formVisible: false,
    newCollectionName: "",
    newCollectionImg: "",
    newCollectionPin: false,
    loaded: false,
    getCollections: REQUEST_STATE.IDLE,
    getCollectionDetails: REQUEST_STATE.IDLE,
    getRestaurants: REQUEST_STATE.IDLE,
    addCollection: REQUEST_STATE.IDLE,
    deleteRestaurant: REQUEST_STATE.IDLE,
    deleteCollection: REQUEST_STATE.IDLE,
    pinCollection: REQUEST_STATE.IDLE,
    getFriends: REQUEST_STATE.IDLE
}

const collectionsSlice = createSlice({
    name: 'collections',
    initialState: INITIAL_STATE,
    reducers: {
        clickCollection: (state, action) => {
            state.currCollectionDetails = action.payload;
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
        },
        setLoaded: (state, action) => {
            state.loaded = action.payload;
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
            .addCase(deleteCollectionAsync.pending, (state) => {
                state.deleteCollection = REQUEST_STATE.PENDING;
            })
            .addCase(deleteCollectionAsync.fulfilled, (state) => {
                state.deleteCollection = REQUEST_STATE.FULFILLED;
                state.currCollectionDetails = {};
                state.currRestaurants = [];
            })
            .addCase(deleteCollectionAsync.rejected, (state) => {
                state.deleteCollection = REQUEST_STATE.REJECTED;
            })
            .addCase(patchCollectionPinAsync.pending, (state) => {
                state.pinCollection = REQUEST_STATE.PENDING;
            })
            .addCase(patchCollectionPinAsync.fulfilled, (state) => {
                state.pinCollection = REQUEST_STATE.FULFILLED;
            })
            .addCase(patchCollectionPinAsync.rejected, (state) => {
                state.pinCollection = REQUEST_STATE.REJECTED;
            })
            .addCase(getFriendsCollectionsAsync.pending, (state) => {
                state.getFriends = REQUEST_STATE.PENDING;
            })
            .addCase(getFriendsCollectionsAsync.fulfilled, (state, action) => {
                state.getFriends = REQUEST_STATE.FULFILLED;
                state.friendsCollection = action.payload;
            })
            .addCase(getFriendsCollectionsAsync.rejected, (state) => {
                state.getFriends = REQUEST_STATE.REJECTED;
            })
    }
})

export const {
    showForm,
    hideForm,
    setCollectionName,
    setCollectionImg,
    setLoaded
} = collectionsSlice.actions;
export default collectionsSlice.reducer;