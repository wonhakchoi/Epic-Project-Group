/**
 * Represents all incoming friend requests sent from other users to this user
 */

const incomingRequests = (inRequests = new Set(["7", "10"]), action) => {
    switch (action.type) {
        case "INCOMING_TO_FRIEND":
        case "INCOMING_TO_STRANGER":
            const updatedSet = new Set(inRequests);
            updatedSet.delete(action.payload);
            return updatedSet;
        default:
            return inRequests;
    }
};

export default incomingRequests;
