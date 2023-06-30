import {createAsyncThunk} from "@reduxjs/toolkit";
import getCollections from "../services/collectionsService";

// thunks for collections actions
export const getCollectionsAsync = createAsyncThunk(
    'collections/getCollections',
    async () => {
        return await getCollections();
    }
)