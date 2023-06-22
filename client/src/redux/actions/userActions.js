// accept incoming friend request
export const incomingToFriend = (userId) => {
    return {
        type: "INCOMING_TO_FRIEND",
        payload: userId,
    };
};

// reject incoming friend request
export const incomingToStranger = (userId) => {
    return {
        type: "INCOMING_TO_STRANGER",
        payload: userId,
    };
};

// cancel outgoing friend request
export const outgoingToStranger = (userId) => {
    return {
        type: "OUTGOING_TO_STRANGER",
        payload: userId,
    };
};

// sends friend request to user
export const strangerToOutgoing = (userId) => {
    return {
        type: "STRANGER_TO_OUTGOING",
        payload: userId,
    };
};
