import axios from "axios";

// requests for collections
export const getCollections = async () => {
    let data = (await axios.get(`${process.env.REACT_APP_BACKEND}/collections`)).data;
    return data;
}

export const getCollectionDetails = async (collectionId) => {
    const data = (await axios.get(`${process.env.REACT_APP_BACKEND}/collections/${collectionId}`)).data;
    return data;
}

export const getRestaurants = async (collectionId) => {
    const data = (await axios.get(`${process.env.REACT_APP_BACKEND}/collections/${collectionId}/restaurants`)).data;
    // console.log(data[0].result);
    return data;

}

export const addNewCollection = async ({name, img}) => {
    const data = (await axios.post(`${process.env.REACT_APP_BACKEND}/collections`,
        {
            name: name,
            img: img,
            pinned: false,
        })).data
    return data;

}

export const deleteRestaurantCollection = async ({collectionId, restaurantId}) => {
    await axios.delete(`${process.env.REACT_APP_BACKEND}/collections/${collectionId}/${restaurantId}`)
}

export const addRestaurantCollection = async ({collectionId, restaurantId}) => {
    await axios.put(`${process.env.REACT_APP_BACKEND}/collections/${collectionId}/${restaurantId}`)
}

export default getCollections;
