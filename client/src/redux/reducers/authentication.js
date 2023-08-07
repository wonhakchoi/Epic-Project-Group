const initialState = {
    user: null,
    error: null,
    isLoggedIn: false,
};

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                user: action.payload._id,
                error: null,
                isLoggedIn: true,
            };
        case 'SIGNUP_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'LOGIN_SUCCESS':
            // console.log("authentication.js");
            // console.log(action.payload._id);
            // console.log("authentication.js end");
            return {
                ...state,
                user: action.payload,
                error: null,
                isLoggedIn: true,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                error: null,
                isLoggedIn: false,
            };
        case 'SET_MESSAGE':
            return {
                ...state,
                error: action.payload,
            };
        case 'CLEAR_MESSAGE':
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export default authentication;
