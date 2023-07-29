import axios from "axios";
import {baseURL} from "./backendURL";

const baseCollectionsUrl = "https://easy-eats-backend-9u5y.onrender.com/collections";
// requests for collections
export const getCollections = async () => {
    console.log("GET collections")
    let data = (await axios.get(baseCollectionsUrl)).data;
    return data;
}

export const getCollectionDetails = async (collectionId) => {
    const data = (await axios.get(`${baseCollectionsUrl}/${collectionId}`)).data;
    return data;
}

export const getRestaurants = async (collectionId) => {
    const data = (await axios.get(`${baseCollectionsUrl}/${collectionId}/restaurants`)).data;
    // console.log(data[0].result);
    return data;

}

export const addNewCollection = async ({name, img}) => {
    const data = (await axios.post(`${baseCollectionsUrl}`,
        {
            name: name,
            img: img,
            pinned: false,
        })).data
    return data;

}

export const deleteRestaurantCollection = async ({collectionId, restaurantId}) => {
    await axios.delete(`${baseCollectionsUrl}/${collectionId}/${restaurantId}`)
}

export const addRestaurantCollection = async ({collectionId, restaurantId}) => {
    await axios.put(`${baseCollectionsUrl}/${collectionId}/${restaurantId}`)
}

export default getCollections;
