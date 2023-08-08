import {createAsyncThunk} from "@reduxjs/toolkit";
import getCollections, {
    addNewCollection, addRestaurantCollection, deleteCollection,
    deleteRestaurantCollection,
    getCollectionDetails,
    getRestaurants, patchCollectionPin
} from "../services/collectionsService";

// thunks for collections actions

export const patchCollectionPinAsync = createAsyncThunk (
    'collections/patchCollectionPin',
    async ({isPinned, collectionId}) => {
        return patchCollectionPin({isPinned: isPinned, collectionId: collectionId});
    }
)

export const deleteCollectionAsync = createAsyncThunk (
    'collections/deleteCollection',
    async (collectionId) => {
        await deleteCollection(collectionId);
    }
)
export const getCollectionsAsync = createAsyncThunk(
    'collections/getCollections',
    async (userId) => {
        return getCollections(userId);
    }
)

export const getCollectionDetailsAsync = createAsyncThunk(
    'collections/getCollectionDetails',
    async (collectionId) => {
        return getCollectionDetails(collectionId);
    }
)

export const getRestaurantsAsync = createAsyncThunk(
    'collections/getRestaurants',
    async (collectionId) => {
        return getRestaurants(collectionId);
    }
)

export const addNewCollectionAsync = createAsyncThunk(
    'collections/addNewCollection',
    async ({name, img, userId}) => {
        return addNewCollection({name: name, img: img, userId: userId});
    }
)

export const deleteRestaurantCollectionAsync = createAsyncThunk (
    'collections/deleteRestaurant',
    async ({collectionId, restaurantId}) => {
        return deleteRestaurantCollection({collectionId: collectionId, restaurantId: restaurantId});
    }
)

export const addRestaurantCollectionAsync = createAsyncThunk (
    'collections/addRestaurant',
    async ({collectionId, restaurantId}) => {
        return addRestaurantCollection({collectionId: collectionId, restaurantId:restaurantId})
    }
)