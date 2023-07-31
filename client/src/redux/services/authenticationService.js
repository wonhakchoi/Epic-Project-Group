import axios from "axios";

// const baseAuthUrl = "http://localhost:3001/auth";
const baseAuthUrl = "https://easy-eats-backend-local.onrender.com/auth";



// requests for auth
export const postAuth = async () => {
    let response = await axios(`${baseAuthUrl}`, {
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