import axios from "axios";

const baseCollectionsUrl = "http://localhost:3001/collections";
// requests for collections
export const getCollections = async () => {
    let data = (await axios.get(baseCollectionsUrl)).data;
    // console.log(data)
    return data;
}

export const getCollectionDetails = async (collectionId) => {
    const data = (await axios.get(`${baseCollectionsUrl}/${collectionId}`)).data;
    // console.log(data)
    return data;
}

export const getRestaurants = async (collectionId) => {
    const data = (await axios.get(`${baseCollectionsUrl}/${collectionId}/restaurants`)).data;
    // console.log(data);
    return data;

}

export default getCollections;
