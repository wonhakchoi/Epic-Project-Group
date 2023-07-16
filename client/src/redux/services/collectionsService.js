import axios from "axios";

const baseCollectionsUrl = "http://localhost:3001/collections";
// requests for collections
export const getCollections = async () => {
    let data = (await axios.get(baseCollectionsUrl)).data;
    return data;
}

export const getCollectionDetails = async (collectionId) => {
    const data = (await axios.get(`${baseCollectionsUrl}/${collectionId}`)).data;
    return data;
}

export const getRestaurants = async (collectionId) => {
    const data = (await axios.get(`${baseCollectionsUrl}/${collectionId}/restaurants`)).data;
    return data;

}

export const addNewCollection = async ({name, img}) => {
    const data = (await axios.post(`${baseCollectionsUrl}`,
        {
            name: name,
            img: img
        })).data
    return data;

}

export const deleteRestaurantCollection = async ({collectionId, restaurantId}) => {
    await axios.delete(`${baseCollectionsUrl}/${collectionId}/${restaurantId}`)
}

export default getCollections;
