/**
 * Represents all users on the site
 */

let initialUsers = [
    {
        id: 1,
        name: "Cedric Pulmano",
        biography: "UBC student",
    },
    {
        id: 2,
        name: "Wonhak Choi",
        biography: "UBC student",
    },
    {
        id: 3,
        name: "Wendy Shen",
        biography: "UBC student",
    },
    {
        id: 4,
        name: "Tammy Kim",
        biography: "UBC student",
    },
    {
        id: 5,
        name: "Malcolm Zhao",
        biography: "SFU student",
    },
];

const allUsers = (users = initialUsers, action) => {
    switch (action.type) {
        default:
            return users;
    }
};

export default allUsers;
