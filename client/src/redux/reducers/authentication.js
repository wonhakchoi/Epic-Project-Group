const initialState = {
    loggedIn: false,
    user: null,
};

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            const { email: loginEmail, password: loginPassword } = action.payload;
            // Perform login logic here (verify credentials, make API requests)
            // Update the state based on the login result

            // const loginSuccessful = verifyCredentials(loginEmail, loginPassword);
            const loginSuccessful = true;

            if (loginSuccessful) {
                return {
                    loggedIn: true,
                    user: loginEmail,
                };
            } else {
                return state; // Handle login failure
            }
        case "SIGNUP":
            const { email: signupEmail, password: signupPassword } = action.payload;
            // Perform signup logic here (make API requests)
            // Update the state based on the signup result

            // const signupSuccessful = registerUser(signupEmail, signupPassword);
            const signupSuccessful = true;

            if (signupSuccessful) {
                return {
                    loggedIn: true,
                    user: signupEmail,
                };
            } else {
                return state; // Handle signup failure
            }
        default:
            return state;
    }
};

export default authentication;
