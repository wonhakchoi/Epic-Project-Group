import axios from "axios";

const baseAuthUrl = "http://localhost:3001/auth";
// const baseAuthUrl = "https://easy-eats-backend-local.onrender.com/auth";
// const baseAuthUrl = "https://easy-eats-backend-9u5y.onrender.com/auth";

// requests for auth
export const postAuth = async (token) => {
    let response;
    try {
        response = await axios(`${baseAuthUrl}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            // credentials: 'same-origin',
            withCredentials: true,
            data: {
                token: token
            }
        })
    } catch (e) {
        throw new Error(e.response.data.message)
    }
    // console.log("auth \n" + JSON.stringify(response.data))
    return response.data;
}

export const doLogin = async ({email, password}) => {
    let response;
    try {
        response = await axios.post(`${baseAuthUrl}/login`, {email, password}, {withCredentials: true});
    } catch (e) {
        throw new Error(e.response.data.message);
    }
    console.log("post login: \n" + JSON.stringify(response));
    return response.data;
}

export const doSignup = async ({email, password, firstName, lastName}) => {
    let response;
    try {
        response = await axios
            .post(`${baseAuthUrl}/signup`, {
                email,
                password,
                firstName,
                lastName
            }, {withCredentials: true});
    } catch (e) {
        throw new Error(e.response.data.message);
    }
    console.log("post signup: \n" + JSON.stringify(response.data));
    return response.data;
}