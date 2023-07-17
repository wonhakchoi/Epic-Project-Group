// actions/authActions.js
// export const login = (email, password) => {
//     // Perform login logic here (API request)
//     return {
//         type: 'LOGIN',
//         payload: { email, password },
//     };
// };

// // actions/signupActions.js
// export const signup = (email, password) => {
//     // Perform signup logic here (API request)
//     return {
//         type: 'SIGNUP',
//         payload: { email, password },
//     };
// };

import axios from 'axios';

export const signup = (email, password) => {
    return dispatch => {
        axios
            .post('http://localhost:3001/auth/signup', { email, password })
            .then(response => {
                // console.log(response);
                dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data });
            }
            )
            .catch(error => {
                // console.log(error);
                // dispatch({ type: 'SIGNUP_FAILURE', payload: error.response.data.error });
                dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
                // dispatch({ type: 'SIGNUP_FAILURE', payload: error.message });
            });
    };
};

export const login = (email, password) => {
    return dispatch => {
        axios
            .post('http://localhost:3001/auth/login', { email, password })
            .then(response => {
                dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
            })
            .catch(error => {
                // dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.error });
                dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
            });
    };
};

export const logout = () => {
    return { type: 'LOGOUT' };
};

export const setMessage = (message) => ({
    type: 'SET_MESSAGE',
    payload: message,
});

export const clearMessage = () => ({
    type: 'CLEAR_MESSAGE',
});
