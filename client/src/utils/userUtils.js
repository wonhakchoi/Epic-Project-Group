// status of the relationship of each user to this user
export const Status = {
    FRIEND: "friend",
    OUTGOING: "outgoing",
    INCOMING: "incoming",
    STRANGER: "stranger",
};

// returns the status of the user
export const determineStatus = (userId, friends, outRequests, inRequests) => {
    if (isFriend(userId, friends)) {
        return Status.FRIEND;
    }
    if (isOutgoing(userId, outRequests)) {
        return Status.OUTGOING;
    }
    if (isIncoming(userId, inRequests)) {
        return Status.INCOMING;
    }
    return Status.STRANGER;
};

// returns true if the user's id is found within the list of friends
const isFriend = (userId, friends) => {
    return friends.includes(userId);
};

// returns true if the user's id is found within this user's outgoing friend requests
const isOutgoing = (userId, outRequests) => {
    return outRequests.includes(userId);
};

// returns true if the user's id is found within this user's incoming friend requests
const isIncoming = (userId, inRequests) => {
    return inRequests.includes(userId);
};
