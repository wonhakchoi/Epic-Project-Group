const initialState = {
    loggedIn: true,
    user: "64a20849b5b47429af1b7900",
    error: null,
    isAuthenticated: false,
};

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                user: action.payload,
                error: null,
                loggedIn: true,
                isAuthenticated: true,
            };
        case 'SIGNUP_FAILURE':
            return {
                ...state,
                error: action.payload,
            };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload,
                error: null,
                loggedIn: true,
                isAuthenticated: true,
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
                loggedIn: false,
                isAuthenticated: false,
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
