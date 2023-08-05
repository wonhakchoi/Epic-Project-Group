import {createAsyncThunk} from "@reduxjs/toolkit";
import getCollections, {
    addNewCollection, addRestaurantCollection,
    deleteRestaurantCollection,
    getCollectionDetails,
    getRestaurants
} from "../services/collectionsService";

// thunks for collections actions
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