// const axios = require('axios')

// requests for collections
// const getCollections = async () => {
//     return axios.get('http://localhost:3001/collections');
// }

export const getCollections = async () => {
    const response = await fetch('http://localhost:3001/collections', {
        method: 'GET'
    })
    return response.json();
}

export default getCollections;