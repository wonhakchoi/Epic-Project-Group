/**
 * Represents all outcoming friend requests sent from this user to other users
 */

const outgoingRequests = (outRequests = new Set(["12", "15"]), action) => {
    switch (action.type) {
        case "STRANGER_TO_OUTGOING":
            return new Set([...outRequests, action.payload]);
        case "OUTGOING_TO_STRANGER":
            const updatedSet = new Set(outRequests);
            updatedSet.delete(action.payload);
            return updatedSet;
        default:
            return outRequests;
    }
};

export default outgoingRequests;
