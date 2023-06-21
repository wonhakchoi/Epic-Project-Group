/**
 * Represents all outcoming friend requests sent from this user to other users
 */

const outgoingRequests = (outRequests = new Set(["12", "15"]), action) => {
    switch (action.type) {
        default:
            return outRequests;
    }
};

export default outgoingRequests;
