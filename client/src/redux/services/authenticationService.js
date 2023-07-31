import axios from "axios";

// const baseCollectionsUrl = "https://easy-eats-backend-9u5y.onrender.com/collections";
const baseAuthUrl = "http://localhost:3001/auth";

// requests for auth
export const postAuth = async () => {
    let response = await axios("http://localhost:3001/auth/", {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        },
        // credentials: 'same-origin',
        withCredentials: true
    })
    // console.log("auth \n" + JSON.stringify(response.data))
    return response.data;
}