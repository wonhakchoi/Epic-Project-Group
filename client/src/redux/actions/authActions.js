// actions/authActions.js
export const login = (email, password) => {
    // Perform login logic here (API request)
    return {
        type: 'LOGIN',
        payload: { email, password },
    };
};

// actions/signupActions.js
export const signup = (email, password) => {
    // Perform signup logic here (API request)
    return {
        type: 'SIGNUP',
        payload: { email, password },
    };
};
