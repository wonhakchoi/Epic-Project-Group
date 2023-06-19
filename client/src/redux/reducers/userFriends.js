/**
 * Represents all friends of the user
 */

let initialFriends = ["1", "2", "3", "4", "5", "9"];

const userFriends = (friends = initialFriends, action) => {
    switch (action.type) {
        default:
            return friends;
    }
};

export default userFriends;
