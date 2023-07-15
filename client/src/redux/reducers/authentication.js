// const initialState = {
//     loggedIn: true,
//     user: "64a20849b5b47429af1b7900",
//     error: null,
// };

// const authentication = (state = initialState, action) => {
//     switch (action.type) {
//         case "LOGIN":
//             const { email: loginEmail, password: loginPassword } = action.payload;
//             // Perform login logic here (verify credentials, make API requests)
//             // Update the state based on the login result

//             // const loginSuccessful = verifyCredentials(loginEmail, loginPassword);
//             const loginSuccessful = true;

//             if (loginSuccessful) {
//                 return {
//                     loggedIn: true,
//                     user: loginEmail,
//                 };
//             } else {
//                 return state; // Handle login failure
//             }
//         case "SIGNUP":
//             const { email: signupEmail, password: signupPassword } = action.payload;
//             // Perform signup logic here (make API requests)
//             // Update the state based on the signup result

//             // const signupSuccessful = registerUser(signupEmail, signupPassword);
//             const signupSuccessful = true;

//             if (signupSuccessful) {
//                 return {
//                     loggedIn: true,
//                     user: signupEmail,
//                 };
//             } else {
//                 return state; // Handle signup failure
//             }
//         default:
//             return state;
//     }
// };

// export default authentication;

// !! =================== 
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
            };
        case 'SET_MESSAGE':
            return {
                ...state,
                error: action.payload,
            };
        case 'CLEAR_MESSAGE':
            return { 
                ...state,
                error: null ,
            };
        default:
            return state;
    }
};

export default authentication;
