import axios from 'axios';

export const signup = (email, password, firstName, lastName) => {
    // console.log("POST signup")
    return dispatch => {
        axios
            // .post('https://easy-eats-backend-9u5y.onrender.com/auth/signup', { email, password, firstName, lastName }, { withCredentials: true })
            .post('http://localhost:3001/auth/signup', { email, password, firstName, lastName }, { withCredentials: true })
            .then(response => {
                if (response.data.success) {
                    let userID = response.data.user._id;
                    dispatch({ type: 'SIGNUP_SUCCESS', payload: userID });
                } else {
                    dispatch({ type: 'SET_MESSAGE', payload: response.data.message });
                }
            })
            .catch(error => {
                // console.log(error);
                // dispatch({ type: 'SIGNUP_FAILURE', payload: error.response.data.error });
                dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
                // dispatch({ type: 'SIGNUP_FAILURE', payload: error.message });
            });
    };
};

export const login = (email, password) => {
    // console.log("POST login")
    return dispatch => {
        axios
            .post('http://localhost:3001/auth/login', { email, password }, { withCredentials: true })
            // .post('https://easy-eats-backend-9u5y.onrender.com/auth/login', { email, password }, { withCredentials: true })
            .then(response => {
                if (response.data.success) {
                    let userID = response.data.user._id;
                    dispatch({ type: 'LOGIN_SUCCESS', payload: userID });
                } else {
                    dispatch({ type: 'SET_MESSAGE', payload: response.data.message });
                }
            })
            .catch(error => {
                // dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data.error });
                dispatch({ type: 'SET_MESSAGE', payload: error.response.data.message });
            });
    };
};

export const verifySession = (cookies) => {
    // console.log("POST verify session")
    return dispatch => {
        if (!cookies.token) {
            dispatch({ type: 'LOGOUT' });
        }

        // https://stackoverflow.com/questions/42474262/cors-issue-with-external-api-works-via-postman-but-not-http-request-with-axios
        // axios("https://easy-eats-backend-9u5y.onrender.com/auth/", {
        axios("http://localhost:3001/auth/", {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            withCredentials: true
        }).then(response => {
            // console.log(response.data);
            let data = response.data
            const { status, user } = data;

            if (status) {
                // console.log(user);
                dispatch({ type: 'LOGIN_SUCCESS', payload: user });
                // return <div>Hello {user}</div>
            } else {
                dispatch({ type: 'LOGOUT' });
                // return (removeCookie("token"), navigate("/login"));
            }
        })

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
